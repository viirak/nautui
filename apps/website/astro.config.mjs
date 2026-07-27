// @ts-check
import mdx from "@astrojs/mdx";
import { defineConfig } from "astro/config";

export default defineConfig({
  integrations: [mdx()],
  vite: {
    css: {
      transformer: "lightningcss",
    },
  },
});
