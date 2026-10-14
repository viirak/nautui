// @ts-check

import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import { defineConfig } from "astro/config";

export default defineConfig({
  integrations: [mdx()],

  vite: {
    css: {
      transformer: "lightningcss",
    },
  },

  adapter: cloudflare(),
  markdown: {
    shikiConfig: {
      themes: {
        light: "catppuccin-latte",
        dark: "dracula",
      },
    },
  },
});
