import {
  CACHE_KEY,
  CACHE_TTL_SECONDS,
  fetchPosts,
  UpstreamError,
} from "./medium";

export interface Env {
  CORS_ALLOWED_ORIGINS: string;
}

export default {
  async fetch(request, env, ctx): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/posts") {
      return servePosts(request, env, ctx);
    }

    return jsonResponse({ error: "not_found" }, 404, corsHeaders(request, env));
  },
} satisfies ExportedHandler<Env>;

async function servePosts(
  request: Request,
  env: Env,
  ctx: ExecutionContext
): Promise<Response> {
  const cache = caches.default;
  const cacheKey = new Request(CACHE_KEY);

  const cached = await cache.match(cacheKey);
  if (cached) {
    const storedAt = Number(cached.headers.get("x-stored-at") ?? "0");
    const age = Math.floor(Date.now() / 1000) - storedAt;
    if (age >= CACHE_TTL_SECONDS) {
      ctx.waitUntil(refreshCache(cacheKey, cache, env));
    }
    return jsonResponse(await cached.json(), 200, corsHeaders(request, env));
  }

  const refreshed = await refreshCache(cacheKey, cache, env);
  if (!refreshed.ok) {
    return jsonResponse(
      { error: "upstream_unavailable" },
      502,
      corsHeaders(request, env)
    );
  }
  return jsonResponse(
    await refreshed.response.json(),
    200,
    corsHeaders(request, env)
  );
}

async function refreshCache(
  cacheKey: Request,
  cache: Cache,
  env: Env
): Promise<{ ok: true; response: Response } | { ok: false }> {
  void env;
  try {
    const posts = await fetchPosts();
    const response = new Response(JSON.stringify({ posts }), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": `public, max-age=${CACHE_TTL_SECONDS}`,
        "x-stored-at": String(Math.floor(Date.now() / 1000)),
      },
    });
    await cache.put(cacheKey, response.clone());
    return { ok: true, response };
  } catch (error) {
    if (error instanceof UpstreamError) {
      console.error(error.message);
    } else {
      console.error("unexpected refresh failure", error);
    }
    return { ok: false };
  }
}

function corsHeaders(request: Request, env: Env): Record<string, string> {
  const origin = request.headers.get("Origin");
  const allowed = env.CORS_ALLOWED_ORIGINS.split(",").map((o) => o.trim());
  if (origin && allowed.includes(origin)) {
    return { "Access-Control-Allow-Origin": origin };
  }
  return {};
}

function jsonResponse(
  body: unknown,
  status: number,
  headers: Record<string, string>
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  });
}
