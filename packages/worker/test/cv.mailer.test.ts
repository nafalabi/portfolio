import { describe, expect, it } from "vitest";
import { UpstreamError } from "../src/core/errors";
import { MailgunClient } from "../src/modules/cv/cv.mailer";

const CFG = {
  domain: "mg.nandaabi.my.id",
  apiKey: "key-test123",
  from: "noreply@nandaabi.my.id",
  driveUrl: "https://drive.google.com/file/d/XYZ/view",
};

describe("MailgunClient", () => {
  it("posts FormData with correct fields and auth", async () => {
    let capturedUrl: string | URL = "";
    let capturedInit: RequestInit | undefined;
    const spyFetch = async (input: RequestInfo | URL, init?: RequestInit) => {
      capturedUrl = input as string;
      capturedInit = init;
      return new Response(JSON.stringify({ id: "<123@mg>", message: "Queued" }), { status: 200, headers: { "Content-Type": "application/json" } });
    };
    const client = new MailgunClient(CFG, spyFetch as unknown as typeof fetch);
    await client.sendCvEmail("user@example.com");

    expect(String(capturedUrl)).toBe(`https://api.mailgun.net/v3/${CFG.domain}/messages`);
    expect(capturedInit?.method).toBe("POST");
    const auth = (capturedInit?.headers as Record<string, string>)?.Authorization;
    expect(auth).toBe(`Basic ${btoa(`api:${CFG.apiKey}`)}`);
    const fd = capturedInit?.body as FormData;
    expect(fd.get("from")).toBe(CFG.from);
    expect(fd.get("to")).toBe("user@example.com");
    expect(fd.get("subject")).toBe("Your requested CV from nandaabi.my.id");
    expect(String(fd.get("text"))).toContain(CFG.driveUrl);
    expect(String(fd.get("html"))).toContain(CFG.driveUrl);
  });

  it("throws UpstreamError on 401", async () => {
    const spyFetch = async () => new Response("Forbidden", { status: 401 });
    const client = new MailgunClient(CFG, spyFetch as unknown as typeof fetch);
    await expect(client.sendCvEmail("a@b.com")).rejects.toBeInstanceOf(UpstreamError);
  });

  it("throws UpstreamError on 500", async () => {
    const spyFetch = async () => new Response("boom", { status: 500 });
    const client = new MailgunClient(CFG, spyFetch as unknown as typeof fetch);
    await expect(client.sendCvEmail("a@b.com")).rejects.toBeInstanceOf(UpstreamError);
  });

  it("throws UpstreamError when config missing", async () => {
    const client = new MailgunClient({ domain: "", apiKey: "", from: "", driveUrl: "" } as any, async () => new Response("", { status: 200 }) as any);
    await expect(client.sendCvEmail("a@b.com")).rejects.toBeInstanceOf(UpstreamError);
  });
});
