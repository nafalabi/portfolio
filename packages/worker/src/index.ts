import { Hono } from "hono";
import { cors } from "hono/cors";
import { AppContext, Env } from "./core/env";
import { AppError } from "./core/errors";
import { blogController } from "./modules/blog/blog.controller";
import { cvController } from "./modules/cv/cv.controller";
import { healthController } from "./modules/health/health.controller";

export type { Env };

const app = new Hono<AppContext>();

// Global CORS Middleware
app.use("*", async (c, next) => {
  const allowedOrigins = (c.env?.CORS_ALLOWED_ORIGINS || "")
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean);

  const corsHandler = cors({
    origin: (origin) => {
      return allowedOrigins.includes(origin) ? origin : null;
    },
    allowMethods: ["GET", "POST", "OPTIONS"],
  });

  return corsHandler(c, next);
});

// Feature Routes
app.route("/posts", blogController);
app.route("/cv", cvController);
app.route("/health", healthController);

// Not Found Handler
app.notFound((c) => {
  return c.json({ error: "not_found" }, 404);
});

// Global Error Handler
app.onError((err, c) => {
  if (err instanceof AppError) {
    return c.json({ error: err.code || "error" }, err.statusCode as any);
  }
  console.error("Unhandled worker error:", err);
  return c.json({ error: "internal_error" }, 500);
});

export default app;
