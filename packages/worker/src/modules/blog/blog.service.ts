import { XMLParser } from "fast-xml-parser";
import { MediumClient } from "./blog.client";
import { BLOG_CONSTANTS, BlogPost } from "./blog.types";

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
});

const ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&apos;": "'",
};

export class BlogService {
  constructor(private client: MediumClient = new MediumClient()) {}

  async getPosts(): Promise<BlogPost[]> {
    const xml = await this.client.fetchRawFeed();
    return this.parseFeed(xml);
  }

  parseFeed(xml: string): BlogPost[] {
    const channel = parser.parse(xml)?.rss?.channel;
    const rawItems: Array<Record<string, unknown>> =
      channel?.item == null
        ? []
        : Array.isArray(channel.item)
          ? channel.item
          : [channel.item];

    return rawItems
      .map((item: Record<string, unknown>) => this.parseItem(item))
      .filter((post: BlogPost | null): post is BlogPost => post !== null)
      .slice(0, BLOG_CONSTANTS.MAX_ITEMS);
  }

  private parseItem(item: Record<string, unknown>): BlogPost | null {
    const title = typeof item.title === "string" ? item.title.trim() : "";
    const link = typeof item.link === "string" ? item.link : "";
    if (!title || !link) return null;

    const html =
      typeof item["content:encoded"] === "string"
        ? item["content:encoded"]
        : "";
    const text = this.stripHtml(html);
    const words = this.countWords(text);

    return {
      title,
      link,
      publishedAt: this.toIso(item.pubDate),
      tags: this.toTags(item.category),
      coverImage: this.extractFirstImage(html),
      preview: text.slice(0, BLOG_CONSTANTS.PREVIEW_MAX_CHARS).trim(),
      readingMinutes: Math.max(
        1,
        Math.ceil(words / BLOG_CONSTANTS.WORDS_PER_MINUTE)
      ),
    };
  }

  private toIso(value: unknown): string {
    const date = new Date(typeof value === "string" ? value : "");
    return isNaN(date.getTime()) ? "" : date.toISOString();
  }

  private toTags(value: unknown): string[] {
    if (value == null) return [];
    return (Array.isArray(value) ? value : [value]).map(String);
  }

  private extractFirstImage(html: string): string | null {
    return html.match(/<img[^>]+src=["']([^"']+)["']/i)?.[1] ?? null;
  }

  private stripHtml(html: string): string {
    let text = html.replace(/<[^>]*>/g, " ");
    for (const [entity, char] of Object.entries(ENTITIES)) {
      text = text.replaceAll(entity, char);
    }
    return text.replace(/\s+/g, " ").trim();
  }

  private countWords(text: string): number {
    return text.split(/\s+/).filter(Boolean).length;
  }
}
