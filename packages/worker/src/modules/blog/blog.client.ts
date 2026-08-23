import { UpstreamError } from "../../core/errors";
import { BLOG_CONSTANTS } from "./blog.types";

export class MediumClient {
  constructor(
    private feedUrl: string = BLOG_CONSTANTS.FEED_URL,
    private fetcher: typeof fetch = fetch
  ) {}

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
      throw new UpstreamError(`feed responded with status ${response.status}`);
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
