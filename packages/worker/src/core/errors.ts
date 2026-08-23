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
