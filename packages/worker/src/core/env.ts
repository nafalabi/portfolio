export interface Env {
  CORS_ALLOWED_ORIGINS: string;
  MAILGUN_API_KEY: string;
  MAILGUN_DOMAIN: string;
  MAILGUN_FROM_EMAIL: string;
  CV_DRIVE_URL: string;
  CV_BLOCKED_DOMAINS: string;
  CV_RATE_LIMIT_MAX: string;
  CV_RATE_LIMIT_WINDOW_SECONDS: string;
  CV_RATE_LIMIT_KV: KVNamespace;
}

export type AppContext = {
  Bindings: Env;
};
