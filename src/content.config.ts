import { defineCollection, z } from "astro:content";

import { glob } from "astro/loaders";


const whitepapers = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/data/whitepapers" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    readLink: z.string().optional(),
    btnTitle: z.string().optional(),
    btnLink: z.string().optional(),
  }),
});

export const collections = { whitepapers };
