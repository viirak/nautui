// @ts-check

import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import { defineConfig } from "astro/config";

export default defineConfig({
  adapter: cloudflare(),
  integrations: [mdx()],
  markdown: {
    shikiConfig: {
      themes: {
        dark: "dracula",
        light: "catppuccin-latte",
      },
    },
  },

  vite: {
    css: {
      transformer: "lightningcss",
    },
    // @nautui/core and @nautui/blocks are symlinked workspace packages. Vite's
    // watcher does not follow a symlinked dependency by default, so edits to
    // packages/*/src do not invalidate the dev server -- it keeps serving the
    // last build of a component and the two drift apart silently. Negative
    // patterns re-include them.
    server: {
      watch: {
        ignored: ["!**/packages/*/src/**"],
      },
    },
  },
});
