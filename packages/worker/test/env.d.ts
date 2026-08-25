import type { Env } from "../src/core/env";

declare module "cloudflare:test" {
  interface ProvidedEnv extends Env {}
}
