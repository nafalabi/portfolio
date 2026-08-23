# Portfolio

My portfolio source code.

To view the page visit <https://nafalabi.github.io>

## Setup

Prerequisites: Node v24 (see `.nvmrc`) and Yarn.

This is a Yarn workspaces monorepo:

```
packages/web/     # Vite + SSG site (nandaabi.my.id)
packages/worker/  # Cloudflare Worker portfolio-api
```

### Site

1. `yarn install` — installs both workspaces from the repo root
2. **Configure environment variables before running** — copy the template and
   fill in the value:

   ```bash
   cp packages/web/.env.example packages/web/.env.local
   # or cp .env.example packages/web/.env.local from root if you keep .env.example at root
   ```

   Set `VITE_WORKER_API_URL` to the deployed worker URL (see Worker below).
   Without it the `/blog` page shows an error state.

3. `yarn workspace web dev` — site at http://localhost:8000 (Vite port per config)
4. `yarn workspace web build && yarn workspace web preview` — production build check.

### Worker (`portfolio-api`)

The blog data comes from a Cloudflare Worker that lives in `packages/worker/`.

```bash
yarn workspace portfolio-api test     # vitest suite
yarn workspace portfolio-api dev      # wrangler dev on http://localhost:8787
# deploy requires `npx wrangler login`; prints the URL for .env.local
yarn workspace portfolio-api deploy
```

Or `cd packages/worker && yarn test/dev/deploy` directly.

For local end-to-end development set `VITE_WORKER_API_URL=http://localhost:8787`.
No secrets are required today: the Medium feed is public and CORS origins are
configured in `packages/worker/wrangler.jsonc`. Future secrets belong in Cloudflare's
secret store only (`wrangler secret put NAME`) — never in the frontend.
