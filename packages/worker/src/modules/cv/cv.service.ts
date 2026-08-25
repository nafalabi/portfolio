import { AppError, ValidationError } from "../../core/errors";
import { enforceRateLimit } from "../../core/rateLimit";
import { MailgunClient } from "./cv.mailer";
import { isDisposableEmail, isValidEmailShape, normalizeEmail, parseBlockedDomains } from "./cv.validation";

export interface CvServiceConfig {
  driveUrl: string;
  blockedDomainsRaw: string;
  rateLimitMax: number;
  rateLimitWindowSeconds: number;
  store: KVNamespace;
}

export class CvService {
  constructor(private mailer: Pick<MailgunClient, "sendCvEmail">, private config: CvServiceConfig) {}
  async sendCv(rawEmail: unknown, ip: string): Promise<{ success: true }> {
    const email = normalizeEmail(rawEmail);
    if (!isValidEmailShape(email)) {
      throw new ValidationError("email is not a valid address", "invalid_email");
    }
    const blocked = parseBlockedDomains(this.config.blockedDomainsRaw ?? "");
    if (isDisposableEmail(email, blocked)) {
      throw new ValidationError("disposable emails not allowed", "disposable_not_allowed");
    }
    await enforceRateLimit({
      store: this.config.store,
      keyPrefix: "cv",
      identifier: ip,
      max: this.config.rateLimitMax,
      windowSeconds: this.config.rateLimitWindowSeconds,
    });
    if (!this.config.driveUrl) {
      throw new AppError("cv drive url not configured", 500, "internal_error");
    }
    await this.mailer.sendCvEmail(email);
    return { success: true };
  }
}
