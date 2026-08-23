import { SELF } from "cloudflare:test";
import { describe, expect, it } from "vitest";

describe("GET /posts", () => {
  it("responds 200 with a posts array", async () => {
    const res = await SELF.fetch("https://example.com/posts");
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toContain("application/json");
    expect(await res.json()).toEqual({ posts: [] });
  });

  it("sets Access-Control-Allow-Origin for an allowlisted origin", async () => {
    const res = await SELF.fetch("https://example.com/posts", {
      headers: { Origin: "https://nandaabi.my.id" },
    });
    expect(res.headers.get("access-control-allow-origin")).toBe(
      "https://nandaabi.my.id"
    );
  });

  it("omits Access-Control-Allow-Origin for unknown origins", async () => {
    const res = await SELF.fetch("https://example.com/posts", {
      headers: { Origin: "https://evil.example" },
    });
    expect(res.headers.get("access-control-allow-origin")).toBeNull();
  });
});

describe("unknown routes", () => {
  it("responds 404 with a JSON error", async () => {
    const res = await SELF.fetch("https://example.com/nope");
    expect(res.status).toBe(404);
    expect(await res.json()).toEqual({ error: "not_found" });
  });
});
