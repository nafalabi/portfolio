# Portfolio

My portfolio source code.

To view the page visit <https://nafalabi.github.io>

## Setup

Prerequisites: Node v24 (see `.nvmrc`) and Yarn.

This is a Yarn workspaces monorepo:

```
packages/web/     # Vite + SSG site (nandaabi.my.id)
packages/worker/  # Cloudflare Worker (worker)
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

### Worker

The blog data comes from a Cloudflare Worker that lives in `packages/worker/`.

```bash
yarn test:worker    # or yarn workspace worker test — vitest suite
yarn dev:worker     # or yarn workspace worker dev — wrangler dev on http://localhost:8787
yarn deploy:worker  # or yarn workspace worker deploy — requires `npx wrangler login`; prints the URL for .env.local
```

Or `cd packages/worker && yarn test/dev/deploy` directly. Root shortcuts (`test:worker`, `dev:worker`, `deploy:worker`) are defined in the workspace root `package.json`.

For local end-to-end development set `VITE_WORKER_API_URL=http://localhost:8787`.
The Medium feed is public and CORS origins are configured in
`packages/worker/wrangler.jsonc` (local overrides in `.dev.vars`). Future secrets belong in
Cloudflare's secret store only (`wrangler secret put NAME`) — never in the frontend.

## CV via email (Mailgun)

The "Download CV" button emails visitors a shareable Google Drive link. Worker validates + rate-limits per IP, then sends via Mailgun.

One-time setup:
1. Create/pick a Drive file, set to "Anyone with the link — Viewer", copy its URL.
2. In Mailgun: verify your domain (`mg.nandaabi.my.id` or `nandaabi.my.id`), copy domain and private API key.
3. `npx wrangler kv namespace create CV_RATE_LIMIT_KV` — put id in `wrangler.jsonc` (if not already).
4. `npx wrangler secret put MAILGUN_API_KEY` (paste key).
5. Set vars in `wrangler.jsonc`: `MAILGUN_DOMAIN`, `MAILGUN_FROM_EMAIL=noreply@nandaabi.my.id`, `CV_DRIVE_URL`.
6. `yarn deploy:worker`.

Local: `cp packages/worker/.dev.vars.example packages/worker/.dev.vars` and fill same values; `.dev.vars` is gitignored.
