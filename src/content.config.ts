import { defineCollection, z } from "astro:content";

import { glob } from "astro/loaders";



const jobs = defineCollection({
  loader: glob({ pattern: ['**/*.md', '**/*.mdx', '**/*.mdoc'], base: "./src/data/jobs" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
  }),
});

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

export const collections = { jobs, whitepapers };
