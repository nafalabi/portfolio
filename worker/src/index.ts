import { fetchPosts, UpstreamError } from "./medium";

export interface Env {
  CORS_ALLOWED_ORIGINS: string;
}

export const CACHE_KEY = "https://cache.internal/posts";

export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/posts") {
      try {
        const posts = await fetchPosts();
        return jsonResponse({ posts }, 200, corsHeaders(request, env));
      } catch (error) {
        if (error instanceof UpstreamError) {
          console.error(error.message);
          return jsonResponse(
            { error: "upstream_unavailable" },
            502,
            corsHeaders(request, env)
          );
        }
        throw error;
      }
    }

    return jsonResponse({ error: "not_found" }, 404, corsHeaders(request, env));
  },
} satisfies ExportedHandler<Env>;

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
