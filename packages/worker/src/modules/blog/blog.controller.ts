import { Hono } from "hono";
import { AppContext } from "../../core/env";
import { BlogService } from "./blog.service";
import { withEdgeCache } from "../../core/cache";
import { UpstreamError } from "../../core/errors";
import { BLOG_CONSTANTS, BlogPost } from "./blog.types";

export const blogController = new Hono<AppContext>();
const blogService = new BlogService();

blogController.get("/", async (c) => {
  const data = await withEdgeCache<{ posts: BlogPost[] }>({
    key: BLOG_CONSTANTS.CACHE_KEY,
    ttlSeconds: BLOG_CONSTANTS.CACHE_TTL_SECONDS,
    fetcher: async () => {
      const posts = await blogService.getPosts();
      const payload = { posts };
      // Persist to KV for cold-start fallback (survives edge cache eviction/deploy).
      // Keep core independent — KV handling stays in blog module.
      try {
        await c.env.CV_RATE_LIMIT_KV.put(
          BLOG_CONSTANTS.KV_KEY,
          JSON.stringify(payload),
          { expirationTtl: BLOG_CONSTANTS.KV_TTL_SECONDS }
        );
      } catch {
        // KV write failures should not break the request
      }
      return payload;
    },
    ctx: c.executionCtx,
  });

  if (!data) {
    // Cold miss + upstream 429/5xx (edge cache empty, backoff active) -> try KV fallback
    try {
      const fallback = await c.env.CV_RATE_LIMIT_KV.get<{ posts: BlogPost[] }>(
        BLOG_CONSTANTS.KV_KEY,
        "json"
      );
      if (fallback && Array.isArray((fallback as any).posts)) {
        return c.json(fallback, 200, { "x-cache": "kv-fallback" } as any);
      }
    } catch {
      // fall through to 502
    }
    throw new UpstreamError("upstream_unavailable");
  }

  return c.json(data);
});
