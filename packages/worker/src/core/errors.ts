export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code: string = "internal_error"
  ) {
    super(message);
    this.name = "AppError";
  }
}

export class UpstreamError extends AppError {
  constructor(message: string) {
    super(message, 502, "upstream_unavailable");
    this.name = "UpstreamError";
  }
}

export class ValidationError extends AppError {
  constructor(message: string, code: "invalid_email" | "domain_not_allowed" | "disposable_not_allowed") {
    super(message, 400, code);
    this.name = "ValidationError";
  }
}

export class RateLimitError extends AppError {
  constructor(message: string) {
    super(message, 429, "rate_limited");
    this.name = "RateLimitError";
  }
}
