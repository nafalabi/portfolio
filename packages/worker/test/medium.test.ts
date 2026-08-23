import { describe, expect, it } from "vitest";
import { BlogService } from "../src/modules/blog/blog.service";
import { MediumClient } from "../src/modules/blog/blog.client";
import { FEED_XML } from "./fixtures";

const blogService = new BlogService();

describe("BlogService.parseFeed", () => {
  it("parses items into BlogPost metadata", () => {
    const posts = blogService.parseFeed(FEED_XML);

    expect(posts).toHaveLength(2); // title-less third item is skipped

    const [first] = posts;
    expect(first.title).toBe("TypeScript Tips From Real Projects");
    expect(first.link).toBe(
      "https://medium.com/@nandaabifahmi/typescript-tips-from-real-projects-abc123"
    );
    expect(first.publishedAt).toBe("2026-08-03T10:00:00.000Z");
    expect(first.tags).toEqual(["typescript", "web-development"]);
    expect(first.coverImage).toBe(
      "https://cdn-images-1.medium.com/v2/cover.png"
    );
    expect(first.preview).toContain("TypeScript helps teams");
  });

  it("handles a post without a cover image and decodes entities", () => {
    const [, second] = blogService.parseFeed(FEED_XML);
    expect(second.coverImage).toBeNull();
    expect(second.tags).toEqual(["go"]);
    expect(second.preview).toBe("A short one about Go & tooling.");
  });

  it("returns empty array for malformed or empty feeds", () => {
    expect(blogService.parseFeed("this is not xml")).toEqual([]);
    expect(blogService.parseFeed("<rss><channel></channel></rss>")).toEqual([]);
  });

  it("caps results at 10 posts", () => {
    const manyItems = Array.from(
      { length: 14 },
      (_, i) =>
        `<item><title>P ${i}</title><link>https://medium.com/p/${i}</link><content:encoded><![CDATA[<p>x</p>]]></content:encoded></item>`
    ).join("");
    const xml = `<rss><channel>${manyItems}</channel></rss>`;
    expect(blogService.parseFeed(xml)).toHaveLength(10);
  });

  it("estimates reading minutes from word count", () => {
    const words = Array.from({ length: 401 }, () => "word").join(" ");
    const xml = `<rss><channel><item><title>Long</title><link>https://medium.com/long</link><content:encoded><![CDATA[<p>${words}</p>]]></content:encoded></item></channel></rss>`;
    expect(blogService.parseFeed(xml)[0].readingMinutes).toBe(3); // ceil(401/200)
  });

  it("never returns fewer than 1 reading minute", () => {
    expect(blogService.parseFeed(FEED_XML)[1].readingMinutes).toBeGreaterThanOrEqual(1);
  });

  it("truncates preview to 200 characters", () => {
    const longText = Array.from(
      { length: 80 },
      () => "loremipsumdolor"
    ).join(" ");
    const xml = `<rss><channel><item><title>T</title><link>https://medium.com/t</link><content:encoded><![CDATA[<p>${longText}</p>]]></content:encoded></item></channel></rss>`;
    expect(blogService.parseFeed(xml)[0].preview.length).toBeLessThanOrEqual(200);
  });
});

describe("MediumClient.fetchRawFeed", () => {
  it("fetches raw feed using global fetch without illegal invocation", async () => {
    const client = new MediumClient("https://example.com/feed", async function (
      this: unknown,
      _input: RequestInfo | URL,
      _init?: RequestInit
    ) {
      // If invoked with MediumClient instance as `this`, this assertion would fail
      expect(this).not.toBeInstanceOf(MediumClient);
      return new Response("<rss><channel><item><title>Test</title></item></channel></rss>", {
        status: 200,
      });
    });

    const feed = await client.fetchRawFeed();
    expect(feed).toContain("<rss>");
  });
});

