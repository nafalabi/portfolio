import { UpstreamError } from "../../core/errors";
import { buildCvEmail } from "./cv.email";

export interface MailgunClientConfig {
  domain: string;
  apiKey: string;
  from: string;
  driveUrl: string;
}

export class MailgunClient {
  private fetcher: typeof fetch;
  constructor(private cfg: MailgunClientConfig, fetcher: typeof fetch = fetch) {
    this.fetcher = (input, init) => fetcher(input, init);
  }
  async sendCvEmail(to: string): Promise<void> {
    if (!this.cfg.domain || !this.cfg.apiKey || !this.cfg.from || !this.cfg.driveUrl) {
      throw new UpstreamError("mailgun not configured");
    }
    const { subject, text, html } = buildCvEmail(to, this.cfg.driveUrl);
    const form = new FormData();
    form.set("from", this.cfg.from);
    form.set("to", to);
    form.set("subject", subject);
    form.set("text", text);
    form.set("html", html);
    const url = `https://api.mailgun.net/v3/${this.cfg.domain}/messages`;
    const auth = `Basic ${btoa(`api:${this.cfg.apiKey}`)}`;
    const resp = await this.fetcher(url, {
      method: "POST",
      headers: { Authorization: auth },
      body: form,
    });
    if (!resp.ok) {
      throw new UpstreamError(`mailgun responded with ${resp.status}`);
    }
  }
}
