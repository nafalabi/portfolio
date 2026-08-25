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

## CV download backend (Google Drive)

The "Download CV" button on the home and contact pages grants visitors reader
access to a private Google Drive folder containing your CV. The worker
validates + rate-limits each request, then shares the folder with the
visitor's Gmail address via the Drive API (access auto-expires).

One-time setup:

1. Create a GCP project, enable the **Google Drive API**, and create a
   **service account**. Download its JSON key.
2. Put the CV PDF in a folder in your personal Drive.
3. Share that folder with the service account email as **Editor** (once).
4. Copy the folder ID from the folder URL
   (`https://drive.google.com/drive/folders/<FOLDER_ID>`).
5. Create the rate-limit store:
   `npx wrangler kv namespace create CV_RATE_LIMIT_KV` — replace the
   placeholder id in `packages/worker/wrangler.jsonc` with the returned id.
6. Set the secret:
   `npx wrangler secret put GOOGLE_PRIVATE_KEY`
   (paste the `private_key` value from the JSON key).
7. Fill in `DRIVE_FOLDER_ID` and `GSA_CLIENT_EMAIL` vars in
   `packages/worker/wrangler.jsonc`.
8. Deploy the worker: `yarn deploy:worker`.

Local development: copy `packages/worker/.dev.vars.example` to `.dev.vars`
and fill in the same values — `.dev.vars` overrides `wrangler.jsonc` vars and
is gitignored.
