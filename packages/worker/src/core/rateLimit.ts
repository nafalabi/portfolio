import { RateLimitError } from "./errors";

export interface RateLimitOptions {
  store: KVNamespace;
  keyPrefix: string;
  identifier: string;
  max: number;
  windowSeconds: number;
  now?: () => number;
}

export interface RateLimitResult {
  remaining: number;
}

/**
 * Fixed-window rate limiter backed by Workers KV.
 * NOTE: KV has no atomic increment; concurrent requests from the same
 * identifier may race and slightly undercount. Acceptable trade-off for
 * this workload — see docs/superpowers/specs/2026-08-23-cv-download-design.md.
 */
export async function enforceRateLimit(
  options: RateLimitOptions
): Promise<RateLimitResult> {
  const { store, keyPrefix, identifier, max, windowSeconds } = options;
  const nowMs = (options.now ?? Date.now)();
  const windowIndex = Math.floor(nowMs / 1000 / windowSeconds);
  const key = `${keyPrefix}:${identifier}:${windowIndex}`;

  const current = Number((await store.get(key)) ?? "0");
  if (current >= max) {
    throw new RateLimitError(
      `rate limit exceeded for ${identifier} in window ${windowIndex}`
    );
  }

  await store.put(key, String(current + 1), {
    expirationTtl: windowSeconds,
  });
  return { remaining: max - (current + 1) };
}
