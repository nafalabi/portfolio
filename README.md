# Portfolio

My portfolio source code.

To view the page visit <https://nafalabi.github.io>

## Setup

Prerequisites: Node v24 (see `.nvmrc`) and Yarn.

### Site

1. `yarn install`
2. **Configure environment variables before running** — copy the template and
   fill in the value:

   ```bash
   cp .env.example .env.local
   ```

   Set `VITE_WORKER_API_URL` to the deployed worker URL (see Worker below).
   Without it the `/blog` page shows an error state.

3. `yarn dev` — site at http://localhost:5173
4. `yarn build && yarn preview` — production build check.

### Worker (`portfolio-api`)

The blog data comes from a Cloudflare Worker that lives in `worker/`.

```bash
cd worker
yarn install
yarn test     # vitest suite
yarn dev      # wrangler dev on http://localhost:8787
yarn deploy   # requires `npx wrangler login`; prints the URL for .env.local
```

For local end-to-end development set `VITE_WORKER_API_URL=http://localhost:8787`.
No secrets are required today: the Medium feed is public and CORS origins are
configured in `worker/wrangler.jsonc`. Future secrets belong in Cloudflare's
secret store only (`wrangler secret put NAME`) — never in the frontend.
