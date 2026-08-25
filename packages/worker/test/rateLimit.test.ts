import { env } from "cloudflare:test";
import { afterEach, describe, expect, it } from "vitest";
import { RateLimitError } from "../src/core/errors";
import { enforceRateLimit } from "../src/core/rateLimit";

const STORE = env.CV_RATE_LIMIT_KV;
let counter = 0;
const id = () => `ip-${++counter}`;

afterEach(async () => {
  const list = await STORE.list({ prefix: "test:" });
  await Promise.all(list.keys.map((k: { name: string }) => STORE.delete(k.name)));
});

describe("enforceRateLimit", () => {
  it("allows requests under the limit and reports remaining", async () => {
    const identifier = id();
    const first = await enforceRateLimit({
      store: STORE,
      keyPrefix: "test",
      identifier,
      max: 3,
      windowSeconds: 60,
    });
    expect(first.remaining).toBe(2);
    const second = await enforceRateLimit({
      store: STORE,
      keyPrefix: "test",
      identifier,
      max: 3,
      windowSeconds: 60,
    });
    expect(second.remaining).toBe(1);
  });

  it("throws RateLimitError once the max is reached in the window", async () => {
    const identifier = id();
    const opts = {
      store: STORE,
      keyPrefix: "test",
      identifier,
      max: 2,
      windowSeconds: 60,
    };
    await enforceRateLimit(opts);
    await enforceRateLimit(opts);
    await expect(enforceRateLimit(opts)).rejects.toBeInstanceOf(RateLimitError);
  });

  it("starts fresh in the next window (injected clock)", async () => {
    let nowMs = 1_000_000;
    const opts = {
      store: STORE,
      keyPrefix: "test",
      identifier: id(),
      max: 1,
      windowSeconds: 60,
      now: () => nowMs,
    };
    await enforceRateLimit(opts);
    await expect(enforceRateLimit(opts)).rejects.toBeInstanceOf(RateLimitError);
    nowMs += 61_000;
    const next = await enforceRateLimit(opts);
    expect(next.remaining).toBe(0);
  });

  it("isolates different identifiers", async () => {
    await enforceRateLimit({
      store: STORE,
      keyPrefix: "test",
      identifier: id(),
      max: 1,
      windowSeconds: 60,
    });
    const other = await enforceRateLimit({
      store: STORE,
      keyPrefix: "test",
      identifier: id(),
      max: 1,
      windowSeconds: 60,
    });
    expect(other.remaining).toBe(0);
  });
});
