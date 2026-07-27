// @ts-check
import mdx from "@astrojs/mdx";
import { defineConfig } from "astro/config";

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  integrations: [mdx()],

  vite: {
    css: {
      transformer: "lightningcss",
    },
  },

  adapter: cloudflare(),
});