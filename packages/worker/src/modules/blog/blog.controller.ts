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
    fetcher: async () => ({ posts: await blogService.getPosts() }),
    ctx: c.executionCtx,
  });

  if (!data) {
    throw new UpstreamError("upstream_unavailable");
  }

  return c.json(data);
});
