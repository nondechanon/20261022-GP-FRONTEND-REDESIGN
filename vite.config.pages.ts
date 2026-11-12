// Static build for GitHub Pages. Used only by .github/workflows/pages.yml
// (vite build --config vite.config.pages.ts). Lovable keeps using vite.config.ts.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  nitro: false,
  tanstackStart: {
    server: { entry: "server" },
    prerender: { enabled: true, crawlLinks: true, autoSubfolderIndex: true },
  },
});
