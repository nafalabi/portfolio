import { describe, expect, it, beforeEach, vi, afterEach } from "vitest";
import { BLOG_CONSTANTS } from "../src/modules/blog/blog.types";
import { withEdgeCache, __clearCacheState } from "../src/core/cache";
import { UpstreamError } from "../src/core/errors";

const CACHE_KEY = BLOG_CONSTANTS.CACHE_KEY;

function createCtx() {
  const promises: Promise<unknown>[] = [];
  return {
    ctx: {
      waitUntil(p: Promise<unknown>) {
        promises.push(p);
      },
    } as any,
    promises,
    async drain() {
      await Promise.allSettled(promises);
      promises.length = 0;
    },
  };
}

async function putStale(posts: unknown[] = [{ title: "stale" }], secondsAgo = 7200) {
  const staleAt = Math.floor(Date.now() / 1000) - secondsAgo;
  await caches.default.put(
    new Request(CACHE_KEY),
    new Response(JSON.stringify({ posts }), {
      headers: {
        "content-type": "application/json",
        "cache-control": "public, max-age=3600",
        "x-stored-at": String(staleAt),
      },
    })
  );
}

describe("withEdgeCache thundering herd", () => {
  beforeEach(async () => {
    await caches.default.delete(new Request(CACHE_KEY));
    __clearCacheState();
    vi.useRealTimers();
  });

  afterEach(() => {
    __clearCacheState();
    vi.useRealTimers();
  });

  it("coalesces concurrent stale refreshes into a single fetcher call", async () => {
    await putStale();

    let callCount = 0;
    const fetcher = async () => {
      callCount++;
      // simulate network latency so concurrent calls overlap
      await new Promise((r) => setTimeout(r, 20));
      return { posts: [{ title: "fresh" }] };
    };

    const ctx1 = createCtx();
    const ctx2 = createCtx();
    const ctx3 = createCtx();

    // fire 3 concurrent requests while stale
    const results = await Promise.all([
      withEdgeCache({ key: CACHE_KEY, ttlSeconds: 3600, fetcher, ctx: ctx1.ctx }),
      withEdgeCache({ key: CACHE_KEY, ttlSeconds: 3600, fetcher, ctx: ctx2.ctx }),
      withEdgeCache({ key: CACHE_KEY, ttlSeconds: 3600, fetcher, ctx: ctx3.ctx }),
    ]);

    // all should serve stale immediately
    for (const r of results) {
      expect((r as any).posts[0].title).toBe("stale");
    }

    // drain background refreshes
    await Promise.all([
      ctx1.drain(),
      ctx2.drain(),
      ctx3.drain(),
    ]);

    // HERD BUG: currently callCount === 3, should be 1
    expect(callCount).toBe(1);

    // next request should see fresh data
    const next = await withEdgeCache({ key: CACHE_KEY, ttlSeconds: 3600, fetcher: async () => ({ posts: [{ title: "should-not-be-called" }] }) });
    expect((next as any).posts[0].title).toBe("fresh");
  });

  it("backs off after 429 so immediate retry does not hammer upstream", async () => {
    await putStale([{ title: "stale survivor" }]);

    let calls = 0;
    const failingFetcher = async () => {
      calls++;
      throw new UpstreamError("feed responded with status 429", 429);
    };

    const ctxA = createCtx();
    const first = await withEdgeCache({ key: CACHE_KEY, ttlSeconds: 3600, fetcher: failingFetcher, ctx: ctxA.ctx });
    expect((first as any).posts[0].title).toBe("stale survivor");
    await ctxA.drain();
    expect(calls).toBe(1);

    // immediate second request - should NOT trigger another fetch due to backoff
    calls = 0;
    let secondFetcherCalled = false;
    const secondFetcher = async () => {
      secondFetcherCalled = true;
      calls++;
      return { posts: [{ title: "fresh2" }] };
    };
    const ctxB = createCtx();
    const second = await withEdgeCache({ key: CACHE_KEY, ttlSeconds: 3600, fetcher: secondFetcher, ctx: ctxB.ctx });
    expect((second as any).posts[0].title).toBe("stale survivor");
    await ctxB.drain();

    // BUG: currently secondFetcherCalled === true (calls===1), should be false/0 due to cooldown
    expect(secondFetcherCalled).toBe(false);
    expect(calls).toBe(0);
  });

  it("dedupes concurrent cache misses into single fetch", async () => {
    // no cache entry -> miss path
    let callCount = 0;
    const fetcher = async () => {
      callCount++;
      await new Promise((r) => setTimeout(r, 20));
      return { posts: [{ title: "fresh miss" }] };
    };

    const results = await Promise.all([
      withEdgeCache({ key: CACHE_KEY, ttlSeconds: 3600, fetcher }),
      withEdgeCache({ key: CACHE_KEY, ttlSeconds: 3600, fetcher }),
    ]);

    // with current code, both do separate fetches (callCount 2). Should be 1.
    expect(callCount).toBe(1);
    for (const r of results) {
      expect((r as any).posts[0].title).toBe("fresh miss");
    }
  });

  it("persists cooldown header on stale entry after 429", async () => {
    await putStale([{ title: "stale survivor" }]);
    const failing = async () => {
      throw new UpstreamError("feed responded with status 429", 429);
    };
    const ctx = createCtx();
    await withEdgeCache({ key: CACHE_KEY, ttlSeconds: 3600, fetcher: failing, ctx: ctx.ctx });
    await ctx.drain();

    const stored = await caches.default.match(new Request(CACHE_KEY));
    expect(stored).toBeDefined();
    const cooldown = Number(stored?.headers.get("x-cooldown-until") ?? "0");
    expect(cooldown).toBeGreaterThan(Math.floor(Date.now() / 1000));
  });

  it("respects Retry-After seconds for 429 backoff", async () => {
    await putStale([{ title: "stale" }]);
    const failing = async () => {
      throw new UpstreamError("feed responded with status 429", 429, 2);
    };
    const ctx = createCtx();
    await withEdgeCache({ key: CACHE_KEY, ttlSeconds: 3600, fetcher: failing, ctx: ctx.ctx });
    await ctx.drain();

    const stored = await caches.default.match(new Request(CACHE_KEY));
    const cooldown = Number(stored?.headers.get("x-cooldown-until") ?? "0");
    const nowSec = Math.floor(Date.now() / 1000);
    // retry-after 2 seconds => cooldown ~ now+2
    expect(cooldown - nowSec).toBeGreaterThanOrEqual(1);
    expect(cooldown - nowSec).toBeLessThanOrEqual(5);
  });

  it("allows refresh again after cooldown expires", async () => {
    vi.useFakeTimers();
    await putStale([{ title: "stale" }]);

    const failing = async () => {
      throw new UpstreamError("feed responded with status 429", 429, 2);
    };
    const ctx1 = createCtx();
    await withEdgeCache({ key: CACHE_KEY, ttlSeconds: 3600, fetcher: failing, ctx: ctx1.ctx });
    await ctx1.drain();

    // immediate retry should be blocked
    let blockedCalls = 0;
    const blockedFetcher = async () => {
      blockedCalls++;
      return { posts: [{ title: "fresh" }] };
    };
    const ctx2 = createCtx();
    await withEdgeCache({ key: CACHE_KEY, ttlSeconds: 3600, fetcher: blockedFetcher, ctx: ctx2.ctx });
    await ctx2.drain();
    expect(blockedCalls).toBe(0);

    // advance past retry-after (2s) + a bit
    vi.advanceTimersByTime(3000);
    await vi.advanceTimersByTimeAsync(0);

    let freshCalls = 0;
    const freshFetcher = async () => {
      freshCalls++;
      return { posts: [{ title: "fresh after cooldown" }] };
    };
    const ctx3 = createCtx();
    const res = await withEdgeCache({ key: CACHE_KEY, ttlSeconds: 3600, fetcher: freshFetcher, ctx: ctx3.ctx });
    expect((res as any).posts[0].title).toBe("stale");
    await ctx3.drain();
    expect(freshCalls).toBe(1);

    // after background refresh, next fetch sees fresh
    const next = await withEdgeCache({ key: CACHE_KEY, ttlSeconds: 3600, fetcher: freshFetcher, ctx: createCtx().ctx });
    expect((next as any).posts[0].title).toBe("fresh after cooldown");
  });

  it("also throttles non-429 failures with short cooldown", async () => {
    await putStale([{ title: "stale" }]);
    const failing = async () => {
      throw new UpstreamError("feed responded with status 500", 500);
    };
    const ctx1 = createCtx();
    await withEdgeCache({ key: CACHE_KEY, ttlSeconds: 3600, fetcher: failing, ctx: ctx1.ctx });
    await ctx1.drain();

    let calls = 0;
    const second = async () => {
      calls++;
      return { posts: [{ title: "fresh" }] };
    };
    const ctx2 = createCtx();
    await withEdgeCache({ key: CACHE_KEY, ttlSeconds: 3600, fetcher: second, ctx: ctx2.ctx });
    await ctx2.drain();
    expect(calls).toBe(0);

    const stored = await caches.default.match(new Request(CACHE_KEY));
    const cooldown = Number(stored?.headers.get("x-cooldown-until") ?? "0");
    const nowSec = Math.floor(Date.now() / 1000);
    // non-429 => 60s cooldown
    expect(cooldown - nowSec).toBeGreaterThanOrEqual(55);
    expect(cooldown - nowSec).toBeLessThanOrEqual(65);
  });
});
