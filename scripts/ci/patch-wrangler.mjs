#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const WRANGLER_PATH = path.resolve("packages/worker/wrangler.jsonc");
const raw = fs.readFileSync(WRANGLER_PATH, "utf8");
let cfg;
try {
  cfg = JSON.parse(raw);
} catch {
  // fallback for JSONC (strip // comments outside strings naive — only if needed)
  const stripped = raw
    .split("\n")
    .map((line) => {
      // naive: if line has // and no " before //, treat as comment
      const idx = line.indexOf("//");
      if (idx !== -1) {
        const before = line.slice(0, idx);
        // count quotes before //
        const quotes = (before.match(/"/g) || []).length;
        if (quotes % 2 === 0) return before;
      }
      return line;
    })
    .join("\n")
    .replace(/\/\*[\s\S]*?\*\//g, "");
  cfg = JSON.parse(stripped);
}

const patchedKeys = [];

function patchVar(key, envName) {
  const val = process.env[envName];
  if (val !== undefined && val !== "") {
    cfg.vars = cfg.vars || {};
    cfg.vars[key] = val;
    patchedKeys.push(key);
  }
}

const kvId = process.env.WORKER_KV_NAMESPACE_ID;
if (kvId) {
  cfg.kv_namespaces = cfg.kv_namespaces || [{ binding: "CV_RATE_LIMIT_KV", id: "" }];
  if (cfg.kv_namespaces[0]) {
    cfg.kv_namespaces[0].id = kvId;
    patchedKeys.push("kv_namespaces[0].id");
  }
}

patchVar("CORS_ALLOWED_ORIGINS", "CORS_ALLOWED_ORIGINS");
patchVar("MAILGUN_DOMAIN", "MAILGUN_DOMAIN");
patchVar("MAILGUN_FROM_EMAIL", "MAILGUN_FROM_EMAIL");
patchVar("CV_DRIVE_URL", "CV_DRIVE_URL");
patchVar("CV_BLOCKED_DOMAINS", "CV_BLOCKED_DOMAINS");
patchVar("CV_RATE_LIMIT_MAX", "CV_RATE_LIMIT_MAX");
patchVar("CV_RATE_LIMIT_WINDOW_SECONDS", "CV_RATE_LIMIT_WINDOW_SECONDS");

fs.writeFileSync(WRANGLER_PATH, JSON.stringify(cfg, null, 2) + "\n", "utf8");

const summary = patchedKeys.length ? `Patched wrangler.jsonc keys: ${patchedKeys.join(", ")}` : "No wrangler.jsonc keys patched (no env overrides)";
console.log(summary);
if (process.env.GITHUB_STEP_SUMMARY) {
  fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, `- ${summary}\n`);
}
