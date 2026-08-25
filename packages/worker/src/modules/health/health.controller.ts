import { Hono } from "hono";
import { AppContext } from "../../core/env";

export const healthController = new Hono<AppContext>();

healthController.get("/", (c) => {
  return c.json({ status: "healthy", timestamp: new Date().toISOString() });
});
