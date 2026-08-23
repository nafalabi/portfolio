export interface Env {
  CORS_ALLOWED_ORIGINS: string;
}

export type AppContext = {
  Bindings: Env;
};
