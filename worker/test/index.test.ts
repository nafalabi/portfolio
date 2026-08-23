import { SELF, fetchMock } from "cloudflare:test";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { CACHE_KEY } from "../src/index";
import { FEED_XML } from "./fixtures";

const FEED_ORIGIN = "https://medium.com";
const FEED_PATH = "/feed/@nandaabifahmi";

function mockFeed(status: number, body: string) {
  fetchMock.get(FEED_ORIGIN).intercept({ path: FEED_PATH }).reply(status, body);
}

beforeEach(async () => {
  fetchMock.activate();
  fetchMock.disableNetConnect();
  await caches.default.delete(new Request(CACHE_KEY));
});

afterEach(() => {
  fetchMock.assertNoPendingInterceptors();
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
