// Static build for GitHub Pages. Used only by .github/workflows/pages.yml
// (vite build --config vite.config.pages.ts). Lovable keeps using vite.config.ts.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // GitHub Pages serves project sites from /<repo>/. The workflow sets PAGES_BASE.
  vite: { base: process.env.PAGES_BASE ?? "/" },
  nitro: false,
  tanstackStart: {
    server: { entry: "server" },
    prerender: { enabled: true, crawlLinks: true, autoSubfolderIndex: true },
  },
});
