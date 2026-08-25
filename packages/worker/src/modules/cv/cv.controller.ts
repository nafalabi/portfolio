import { Hono } from "hono";
import { AppContext } from "../../core/env";
import { ValidationError } from "../../core/errors";
import { MailgunClient } from "./cv.mailer";
import { CvService } from "./cv.service";

export const cvController = new Hono<AppContext>();

cvController.post("/send", async (c) => {
  let email: unknown;
  try {
    const body = (await c.req.json()) as { email?: unknown };
    email = body?.email;
  } catch {
    throw new ValidationError("request body must be JSON", "invalid_email");
  }
  const service = new CvService(
    new MailgunClient({
      domain: c.env.MAILGUN_DOMAIN,
      apiKey: c.env.MAILGUN_API_KEY,
      from: c.env.MAILGUN_FROM_EMAIL,
      driveUrl: c.env.CV_DRIVE_URL,
    }),
    {
      driveUrl: c.env.CV_DRIVE_URL,
      blockedDomainsRaw: c.env.CV_BLOCKED_DOMAINS ?? "",
      rateLimitMax: Number(c.env.CV_RATE_LIMIT_MAX) || 3,
      rateLimitWindowSeconds: Number(c.env.CV_RATE_LIMIT_WINDOW_SECONDS) || 86400,
      store: c.env.CV_RATE_LIMIT_KV,
    }
  );
  const ip = c.req.header("CF-Connecting-IP") ?? "unknown";
  const data = await service.sendCv(email, ip);
  return c.json(data);
});
