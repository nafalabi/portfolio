import { UpstreamError } from "../../core/errors";
import { BLOG_CONSTANTS } from "./blog.types";

export class MediumClient {
  private fetcher: typeof fetch;

  constructor(
    private feedUrl: string = BLOG_CONSTANTS.FEED_URL,
    fetcher: typeof fetch = fetch
  ) {
    this.fetcher = (input, init) =>
      fetcher(input, {
        ...init,
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; portfolio-api/1.0; +https://nandaabi.my.id)",
          Accept: "application/rss+xml, text/xml, */*",
          ...((init as any)?.headers ?? {}),
        },
        cf: { cacheTtl: 0 } as any,
      });
  }

  async fetchRawFeed(): Promise<string> {
    let response: Response;
    try {
      response = await this.fetcher(this.feedUrl);
    } catch (error) {
      throw new UpstreamError(
        `feed request failed: ${error instanceof Error ? error.message : "unknown"}`
      );
    }

    if (!response.ok) {
      const retryAfterHeader = response.headers.get("retry-after");
      let retryAfterSeconds: number | undefined;
      if (retryAfterHeader) {
        const parsed = Number(retryAfterHeader);
        if (!Number.isNaN(parsed) && parsed >= 0) {
          retryAfterSeconds = parsed;
        } else {
          const date = Date.parse(retryAfterHeader);
          if (!Number.isNaN(date)) {
            retryAfterSeconds = Math.max(0, Math.ceil((date - Date.now()) / 1000));
          }
        }
      }
      throw new UpstreamError(
        `feed responded with status ${response.status}`,
        response.status,
        retryAfterSeconds
      );
    }

    try {
      return await response.text();
    } catch (error) {
      throw new UpstreamError(
        `failed to parse feed: ${error instanceof Error ? error.message : "unknown"}`
      );
    }
  }
}
