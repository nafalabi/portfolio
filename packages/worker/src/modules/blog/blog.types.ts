export interface BlogPost {
  title: string;
  link: string;
  publishedAt: string;
  tags: string[];
  coverImage: string | null;
  preview: string;
  readingMinutes: number;
}

export const BLOG_CONSTANTS = {
  MAX_ITEMS: 10,
  PREVIEW_MAX_CHARS: 200,
  WORDS_PER_MINUTE: 200,
  FEED_URL: "https://medium.com/feed/@nandaabifahmi",
  CACHE_KEY: "https://cache.internal/posts",
  CACHE_TTL_SECONDS: 3600,
  KV_KEY: "blog:posts:latest",
  KV_TTL_SECONDS: 86400 * 7,
} as const;
