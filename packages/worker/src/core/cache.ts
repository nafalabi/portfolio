export interface ExecutionContextLike {
  waitUntil(promise: Promise<unknown>): void;
}

export interface EdgeCacheOptions<T> {
  key: string;
  ttlSeconds: number;
  fetcher: () => Promise<T>;
  ctx?: ExecutionContextLike;
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
    const age = Math.floor(Date.now() / 1000) - storedAt;
    if (age >= ttlSeconds && ctx) {
      ctx.waitUntil(refreshEdgeCache(ttlSeconds, fetcher, cache, cacheKey));
    }
    return cached.json() as Promise<T>;
  }

  const refreshed = await refreshEdgeCache(ttlSeconds, fetcher, cache, cacheKey);
  if (!refreshed.ok) {
    return null;
  }
  return refreshed.response.json() as Promise<T>;
}

export async function refreshEdgeCache<T>(
  ttlSeconds: number,
  fetcher: () => Promise<T>,
  cache: Cache,
  cacheKey: Request
): Promise<{ ok: true; response: Response } | { ok: false }> {
  try {
    const data = await fetcher();
    const response = new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": `public, max-age=${ttlSeconds}`,
        "x-stored-at": String(Math.floor(Date.now() / 1000)),
      },
    });
    await cache.put(cacheKey, response.clone());
    return { ok: true, response };
  } catch (error) {
    console.error("edge cache refresh failed:", error instanceof Error ? error.message : error);
    return { ok: false };
  }
}
