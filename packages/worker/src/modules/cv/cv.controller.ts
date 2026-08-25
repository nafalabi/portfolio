import { Hono } from "hono";
import { AppContext } from "../../core/env";

export const cvController = new Hono<AppContext>();

cvController.post("/send", async (c) => c.json({ success: true }));
