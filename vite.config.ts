/// <reference types="vite-react-ssg" />
import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { renderStylesToString } from "@emotion/server";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      plugins: [["@swc/plugin-emotion", {}]],
    }),
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
