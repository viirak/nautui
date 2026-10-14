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
  },
});
