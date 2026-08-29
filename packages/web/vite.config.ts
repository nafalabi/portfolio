/// <reference types="vite-react-ssg" />
import path from "path";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import { renderStylesToString } from "@emotion/server";

const FONT_WEIGHTS = [400, 500, 600, 700];
const FONT_ASSET_PATTERN = new RegExp(
  `montserrat-latin-(${FONT_WEIGHTS.join("|")})-normal-.+\\.woff2$`
);

function preloadMontserratFonts(): Plugin {
  let base = "/";

  const FONT_FILES = FONT_WEIGHTS.map(
    (weight) =>
      `@fontsource/montserrat/files/montserrat-latin-${weight}-normal.woff2`
  );

  const preloadTags = (urls: string[]) =>
    urls
      .map(
        (url) =>
          `<link rel="preload" as="font" type="font/woff2" crossorigin href="${url}">`
      )
      .join("\n    ");

  const inject = (html: string, urls: string[]) =>
    urls.length ? html.replace("</head>", `    ${preloadTags(urls)}\n  </head>`) : html;

  return {
    name: "preload-montserrat-fonts",
    configResolved(resolvedConfig) {
      base = resolvedConfig.base;
    },
    async transformIndexHtml(html, ctx) {
      if (ctx.server) {
        const devUrls: string[] = [];
        for (const fontFile of FONT_FILES) {
          const resolved = await ctx.server.pluginContainer.resolveId(fontFile);
          if (resolved) {
            devUrls.push(`${base}@fs${resolved.id.replace(/\\/g, "/")}`);
          }
        }
        return inject(html, devUrls);
      }

      const fontUrls = Object.values(ctx.bundle ?? {})
        .filter(
          (file) =>
            file.type === "asset" && FONT_ASSET_PATTERN.test(file.fileName)
        )
        .map((file) => `${base}${file.fileName}`)
        .sort((a, b) => a.localeCompare(b));

      return inject(html, fontUrls);
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      plugins: [["@swc/plugin-emotion", {}]],
    }),
    preloadMontserratFonts(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 8000,
  },
  ssgOptions: {
    onPageRendered(route, html) {
      return renderStylesToString(html);
    },
  },
});
