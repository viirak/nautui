import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const article = defineCollection({
  loader: glob({ base: "./src/contents", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    description: z.string(),
    title: z.string(),
  }),
});

export const collections = { article };
