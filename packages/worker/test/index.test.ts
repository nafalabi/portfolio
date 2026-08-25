import { SELF, fetchMock, env } from "cloudflare:test";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { BLOG_CONSTANTS } from "../src/modules/blog/blog.types";
import { FEED_XML } from "./fixtures";
import { __clearCacheState } from "../src/core/cache";

const FEED_ORIGIN = "https://medium.com";
const FEED_PATH = "/feed/@nandaabifahmi";

function mockFeed(status: number, body: string) {
  fetchMock.get(FEED_ORIGIN).intercept({ path: FEED_PATH }).reply(status, body);
}

beforeEach(async () => {
  fetchMock.activate();
  fetchMock.disableNetConnect();
  await caches.default.delete(new Request(BLOG_CONSTANTS.CACHE_KEY));
  await env.CV_RATE_LIMIT_KV.delete(BLOG_CONSTANTS.KV_KEY);
  __clearCacheState();
});

afterEach(async () => {
  fetchMock.assertNoPendingInterceptors();
  __clearCacheState();
  await env.CV_RATE_LIMIT_KV.delete(BLOG_CONSTANTS.KV_KEY);
});

describe("GET /posts", () => {
  it("sets Access-Control-Allow-Origin for an allowlisted origin", async () => {
    mockFeed(200, FEED_XML);
    const res = await SELF.fetch("https://example.com/posts", {
      headers: { Origin: "https://nandaabi.my.id" },
    });
    expect(res.status).toBe(200);
    expect(res.headers.get("access-control-allow-origin")).toBe(
      "https://nandaabi.my.id"
    );
  });

  it("omits Access-Control-Allow-Origin for unknown origins", async () => {
    mockFeed(200, FEED_XML);
    const res = await SELF.fetch("https://example.com/posts", {
      headers: { Origin: "https://evil.example" },
    });
    expect(res.headers.get("access-control-allow-origin")).toBeNull();
  });
});

describe("GET /health", () => {
  it("returns healthy status", async () => {
    const res = await SELF.fetch("https://example.com/health");
    expect(res.status).toBe(200);
    const body = (await res.json()) as { status: string };
    expect(body.status).toBe("healthy");
  });
});

describe("unknown routes", () => {
  it("responds 404 with a JSON error and never touches upstream", async () => {
    const res = await SELF.fetch("https://example.com/nope");
    expect(res.status).toBe(404);
    expect(await res.json()).toEqual({ error: "not_found" });
  });
});

describe("GET /posts (upstream wired)", () => {
  it("returns parsed posts from the medium feed", async () => {
    mockFeed(200, FEED_XML);
    const res = await SELF.fetch("https://example.com/posts");
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toContain("application/json");
    const body = (await res.json()) as { posts: Array<{ title: string }> };
    expect(body.posts).toHaveLength(2);
    expect(body.posts[0].title).toBe("TypeScript Tips From Real Projects");
  });

  it("responds 502 with an error body when upstream returns non-200", async () => {
    mockFeed(500, "server error");
    const res = await SELF.fetch("https://example.com/posts");
    expect(res.status).toBe(502);
    expect(await res.json()).toEqual({ error: "upstream_unavailable" });
  });

  it("responds 502 when upstream is unreachable", async () => {
    fetchMock
      .get(FEED_ORIGIN)
      .intercept({ path: FEED_PATH })
      .replyWithError(new Error("connection reset"));
    const res = await SELF.fetch("https://example.com/posts");
    expect(res.status).toBe(502);
    expect(await res.json()).toEqual({ error: "upstream_unavailable" });
  });
});

describe("GET /posts (cache)", () => {
  it("stores a fresh entry after a miss and serves hits without hitting upstream twice", async () => {
    mockFeed(200, FEED_XML);

    const first = await SELF.fetch("https://example.com/posts");
    expect(first.status).toBe(200);
    expect(
      ((await first.json()) as { posts: unknown[] }).posts
    ).toHaveLength(2);

    const stored = await caches.default.match(new Request(BLOG_CONSTANTS.CACHE_KEY));
    expect(stored).toBeDefined();
    expect(stored?.headers.get("cache-control")).toBe("public, max-age=3600");
    expect(Number(stored?.headers.get("x-stored-at"))).toBeGreaterThan(0);

    const second = await SELF.fetch("https://example.com/posts");
    expect(second.status).toBe(200);
    expect(
      ((await second.json()) as { posts: unknown[] }).posts
    ).toHaveLength(2);
  });

  it("serves stale content immediately and refreshes in the background", async () => {
    const staleSecondsAgo = Math.floor(Date.now() / 1000) - 7200;
    await caches.default.put(
      new Request(BLOG_CONSTANTS.CACHE_KEY),
      new Response(JSON.stringify({ posts: [{ title: "stale post" }] }), {
        headers: {
          "content-type": "application/json",
          "cache-control": "public, max-age=3600",
          "x-stored-at": String(staleSecondsAgo),
        },
      })
    );
    mockFeed(200, FEED_XML);

    const res = await SELF.fetch("https://example.com/posts");
    expect(res.status).toBe(200);
    const body = (await res.json()) as { posts: Array<{ title: string }> };
    expect(body.posts[0].title).toBe("stale post");

    // background refresh has landed by the time the next request arrives
    const next = await SELF.fetch("https://example.com/posts");
    const nextBody = (await next.json()) as { posts: Array<{ title: string }> };
    expect(nextBody.posts[0].title).toBe("TypeScript Tips From Real Projects");
  });

  it("keeps serving stale content when upstream fails during refresh", async () => {
    const staleSecondsAgo = Math.floor(Date.now() / 1000) - 7200;
    await caches.default.put(
      new Request(BLOG_CONSTANTS.CACHE_KEY),
      new Response(JSON.stringify({ posts: [{ title: "stale survivor" }] }), {
        headers: {
          "content-type": "application/json",
          "cache-control": "public, max-age=3600",
          "x-stored-at": String(staleSecondsAgo),
        },
      })
    );
    mockFeed(500, "server error");

    const res = await SELF.fetch("https://example.com/posts");
    expect(res.status).toBe(200);
    const body = (await res.json()) as { posts: Array<{ title: string }> };
    expect(body.posts[0].title).toBe("stale survivor");
  });

  it("writes posts to KV on successful fetch for cold-start fallback", async () => {
    mockFeed(200, FEED_XML);
    const res = await SELF.fetch("https://example.com/posts");
    expect(res.status).toBe(200);
    const kv = await env.CV_RATE_LIMIT_KV.get(BLOG_CONSTANTS.KV_KEY, "json") as any;
    expect(kv).toBeDefined();
    expect(kv.posts[0].title).toBe("TypeScript Tips From Real Projects");
  });

  it("serves KV fallback on cold miss when upstream is 429", async () => {
    // seed KV with previous successful fetch
    await env.CV_RATE_LIMIT_KV.put(
      BLOG_CONSTANTS.KV_KEY,
      JSON.stringify({ posts: [{ title: "kv fallback post" }] })
    );
    // ensure edge cache is empty
    await caches.default.delete(new Request(BLOG_CONSTANTS.CACHE_KEY));
    mockFeed(429, "rate limited");

    const res = await SELF.fetch("https://example.com/posts");
    expect(res.status).toBe(200);
    expect(res.headers.get("x-cache")).toBe("kv-fallback");
    const body = (await res.json()) as { posts: Array<{ title: string }> };
    expect(body.posts[0].title).toBe("kv fallback post");
  });

  it("still returns 502 on cold miss with 429 when KV is empty", async () => {
    await env.CV_RATE_LIMIT_KV.delete(BLOG_CONSTANTS.KV_KEY);
    await caches.default.delete(new Request(BLOG_CONSTANTS.CACHE_KEY));
    mockFeed(429, "rate limited");

    const res = await SELF.fetch("https://example.com/posts");
    expect(res.status).toBe(502);
    expect(await res.json()).toEqual({ error: "upstream_unavailable" });
  });
});
