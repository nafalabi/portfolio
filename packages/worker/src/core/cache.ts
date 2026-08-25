import { UpstreamError } from "./errors";

export interface ExecutionContextLike {
  waitUntil(promise: Promise<unknown>): void;
}

export interface EdgeCacheOptions<T> {
  key: string;
  ttlSeconds: number;
  fetcher: () => Promise<T>;
  ctx?: ExecutionContextLike;
}

type RefreshResult<T> =
  | { ok: true; response: Response }
  | { ok: false; error?: unknown };

const inflightRefreshes = new Map<string, Promise<RefreshResult<unknown>>>();
const memoryBackoffUntil = new Map<string, number>();

const COOLDOWN_SECONDS = 60;
const BACKOFF_429_SECONDS = 300;

function nowSeconds(): number {
  return Math.floor(Date.now() / 1000);
}

function isRateLimitedError(error: unknown): boolean {
  if (error instanceof UpstreamError) {
    if (error.upstreamStatus === 429) return true;
    return error.message.includes("429");
  }
  if (error instanceof Error) {
    return error.message.includes("429");
  }
  return false;
}

function getRetryAfterSeconds(error: unknown): number | undefined {
  if (error instanceof UpstreamError && typeof error.retryAfterSeconds === "number") {
    return error.retryAfterSeconds;
  }
  return undefined;
}

// Test-only helper to reset in-memory state between isolated tests.
export function __clearCacheState(): void {
  inflightRefreshes.clear();
  memoryBackoffUntil.clear();
}

export async function withEdgeCache<T>({
  key,
  ttlSeconds,
  fetcher,
  ctx,
}: EdgeCacheOptions<T>): Promise<T | null> {
  const cache = caches.default;
  const cacheKey = new Request(key);

  const cached = await cache.match(cacheKey);
  if (cached) {
    const storedAt = Number(cached.headers.get("x-stored-at") ?? "0");
    const cooldownHeader = Number(cached.headers.get("x-cooldown-until") ?? "0");
    const memoryBackoff = memoryBackoffUntil.get(key) ?? 0;
    const cooldownUntil = Math.max(cooldownHeader, memoryBackoff);
    const nowSec = nowSeconds();
    const age = nowSec - storedAt;
    const isStale = age >= ttlSeconds;
    const isCooldown = nowSec < cooldownUntil;

    if (isStale && ctx && !isCooldown) {
      if (!inflightRefreshes.has(key)) {
        const promise = (async (): Promise<RefreshResult<T>> => {
          return (await refreshEdgeCache<T>(ttlSeconds, fetcher, cache, cacheKey)) as RefreshResult<T>;
        })().finally(() => {
          inflightRefreshes.delete(key);
        });

        inflightRefreshes.set(key, promise as Promise<RefreshResult<unknown>>);
        ctx.waitUntil(promise.catch(() => {}));
      }
    }

    return cached.json() as Promise<T>;
  }

  // Cache miss path — check backoff to avoid hammering upstream
  const nowSec = nowSeconds();
  const backoffUntil = memoryBackoffUntil.get(key) ?? 0;
  if (nowSec < backoffUntil) {
    return null;
  }

  // Dedupe concurrent misses
  if (inflightRefreshes.has(key)) {
    const existing = inflightRefreshes.get(key)! as Promise<RefreshResult<T>>;
    const result = await existing;
    if (result.ok) {
      const maybeCached = await cache.match(cacheKey);
      if (maybeCached) {
        return maybeCached.json() as Promise<T>;
      }
      return result.response.json() as Promise<T>;
    }
    return null;
  }

  const promise = refreshEdgeCache<T>(ttlSeconds, fetcher, cache, cacheKey) as Promise<RefreshResult<T>>;
  inflightRefreshes.set(key, promise as Promise<RefreshResult<unknown>>);
  try {
    const result = await promise;
    if (!result.ok) {
      return null;
    }
    return result.response.json() as Promise<T>;
  } finally {
    inflightRefreshes.delete(key);
  }
}

export async function refreshEdgeCache<T>(
  ttlSeconds: number,
  fetcher: () => Promise<T>,
  cache: Cache,
  cacheKey: Request
): Promise<RefreshResult<T>> {
  try {
    const data = await fetcher();
    const response = new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": `public, max-age=${ttlSeconds}`,
        "x-stored-at": String(nowSeconds()),
      },
    });
    await cache.put(cacheKey, response.clone());
    memoryBackoffUntil.delete(cacheKey.url);
    return { ok: true, response };
  } catch (error) {
    console.error("edge cache refresh failed:", error instanceof Error ? error.message : error);

    const nowSec = nowSeconds();
    const isRateLimited = isRateLimitedError(error);
    const retryAfter = getRetryAfterSeconds(error);
    const backoffSec = isRateLimited ? (retryAfter ?? BACKOFF_429_SECONDS) : COOLDOWN_SECONDS;
    const cooldownUntil = nowSec + backoffSec;
    memoryBackoffUntil.set(cacheKey.url, cooldownUntil);

    // Persist cooldown header on existing stale entry for cross-isolate protection
    try {
      const existing = await cache.match(cacheKey);
      if (existing) {
        const headers = new Headers(existing.headers);
        headers.set("x-cooldown-until", String(cooldownUntil));
        const body = await existing.clone().text();
        const updated = new Response(body, {
          headers,
        });
        await cache.put(cacheKey, updated.clone());
      }
    } catch {
      // ignore cache update failures — memory backoff is still in effect
    }

    return { ok: false, error };
  }
}
