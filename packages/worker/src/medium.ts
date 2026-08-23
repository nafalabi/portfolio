import { XMLParser } from "fast-xml-parser";

export interface BlogPost {
  title: string;
  link: string;
  publishedAt: string;
  tags: string[];
  coverImage: string | null;
  preview: string;
  readingMinutes: number;
}

const MAX_ITEMS = 10;
const PREVIEW_MAX_CHARS = 200;
const WORDS_PER_MINUTE = 200;

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
});

export function parseFeed(xml: string): BlogPost[] {
  const channel = parser.parse(xml)?.rss?.channel;
  const rawItems =
    channel?.item == null
      ? []
      : Array.isArray(channel.item)
        ? channel.item
        : [channel.item];

  return rawItems
    .map(parseItem)
    .filter((post: BlogPost | null): post is BlogPost => post !== null)
    .slice(0, MAX_ITEMS);
}

function parseItem(item: Record<string, unknown>): BlogPost | null {
  const title = typeof item.title === "string" ? item.title.trim() : "";
  const link = typeof item.link === "string" ? item.link : "";
  if (!title || !link) return null;

  const html =
    typeof item["content:encoded"] === "string" ? item["content:encoded"] : "";
  const text = stripHtml(html);
  const words = countWords(text);

  return {
    title,
    link,
    publishedAt: toIso(item.pubDate),
    tags: toTags(item.category),
    coverImage: extractFirstImage(html),
    preview: text.slice(0, PREVIEW_MAX_CHARS).trim(),
    readingMinutes: Math.max(1, Math.ceil(words / WORDS_PER_MINUTE)),
  };
}

function toIso(value: unknown): string {
  const date = new Date(typeof value === "string" ? value : "");
  return isNaN(date.getTime()) ? "" : date.toISOString();
}

function toTags(value: unknown): string[] {
  if (value == null) return [];
  return (Array.isArray(value) ? value : [value]).map(String);
}

function extractFirstImage(html: string): string | null {
  return html.match(/<img[^>]+src=["']([^"']+)["']/i)?.[1] ?? null;
}

const ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&apos;": "'",
};

function stripHtml(html: string): string {
  let text = html.replace(/<[^>]*>/g, " ");
  for (const [entity, char] of Object.entries(ENTITIES)) {
    text = text.replaceAll(entity, char);
  }
  return text.replace(/\s+/g, " ").trim();
}

function countWords(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

export const FEED_URL = "https://medium.com/feed/@nandaabifahmi";
export const CACHE_KEY = "https://cache.internal/posts";
export const CACHE_TTL_SECONDS = 3600;

export class UpstreamError extends Error {}

export async function fetchPosts(
  feedUrl: string = FEED_URL,
  fetchImpl: typeof fetch = fetch
): Promise<BlogPost[]> {
  let response: Response;
  try {
    response = await fetchImpl(feedUrl);
  } catch (error) {
    throw new UpstreamError(
      `feed request failed: ${error instanceof Error ? error.message : "unknown"}`
    );
  }
  if (!response.ok) {
    throw new UpstreamError(`feed responded with status ${response.status}`);
  }
  try {
    return parseFeed(await response.text());
  } catch (error) {
    throw new UpstreamError(
      `failed to parse feed: ${error instanceof Error ? error.message : "unknown"}`
    );
  }
}
