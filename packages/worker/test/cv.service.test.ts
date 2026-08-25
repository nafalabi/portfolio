import { env } from "cloudflare:test";
import { afterEach, describe, expect, it } from "vitest";
import { RateLimitError } from "../src/core/errors";
import { CvService } from "../src/modules/cv/cv.service";

const CONFIG = {
  driveUrl: "https://drive.google.com/file/d/XYZ/view",
  blockedDomainsRaw: "",
  rateLimitMax: 2,
  rateLimitWindowSeconds: 60,
  store: env.CV_RATE_LIMIT_KV,
};
function makeMailer(calls: string[] = []) {
  return { sendCvEmail: async (to: string) => { calls.push(to); } };
}
afterEach(async () => {
  const list = await env.CV_RATE_LIMIT_KV.list({ prefix: "cv:" });
  await Promise.all(list.keys.map((k: { name: string }) => env.CV_RATE_LIMIT_KV.delete(k.name)));
});
describe("CvService.sendCv", () => {
  it("sends to normalized email", async () => {
    const calls: string[] = [];
    const svc = new CvService(makeMailer(calls) as any, CONFIG);
    const res = await svc.sendCv(" USER@Example.COM ", "1.1.1.1");
    expect(res).toEqual({ success: true });
    expect(calls).toEqual(["user@example.com"]);
  });
  it("rejects malformed without calling mailer", async () => {
    const calls: string[] = [];
    const svc = new CvService(makeMailer(calls) as any, CONFIG);
    await expect(svc.sendCv("not-an-email", "1.1.1.2")).rejects.toMatchObject({ statusCode: 400, code: "invalid_email" });
    expect(calls).toEqual([]);
  });
  it("rejects disposable", async () => {
    const svc = new CvService(makeMailer() as any, CONFIG);
    await expect(svc.sendCv("user@mailinator.com", "1.1.1.3")).rejects.toMatchObject({ statusCode: 400, code: "disposable_not_allowed" });
  });
  it("rate-limits per ip before mailer", async () => {
    const calls: string[] = [];
    const svc = new CvService(makeMailer(calls) as any, CONFIG);
    await svc.sendCv("one@gmail.com", "9.9.9.9");
    await svc.sendCv("two@gmail.com", "9.9.9.9");
    await expect(svc.sendCv("three@gmail.com", "9.9.9.9")).rejects.toBeInstanceOf(RateLimitError);
    expect(calls).toHaveLength(2);
    await svc.sendCv("four@gmail.com", "8.8.8.8");
    expect(calls).toHaveLength(3);
  });
  it("propagates mailer upstream error", async () => {
    const svc = new CvService({ sendCvEmail: async () => { throw new (await import("../src/core/errors")).UpstreamError("boom"); } } as any, CONFIG);
    await expect(svc.sendCv("ok@gmail.com", "7.7.7.7")).rejects.toMatchObject({ statusCode: 502 });
  });
});
