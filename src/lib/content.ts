import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { whitepaperSchema, jobSchema } from "./schemas";
import type { Whitepaper, Job } from "./schemas";

const DATA_DIR = path.join(process.cwd(), "src", "data");

export function getWhitepapers(): Whitepaper[] {
  const dir = path.join(DATA_DIR, "whitepapers");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));

  return files.map((file) => {
    const raw = fs.readFileSync(path.join(dir, file), "utf-8");
    const data = whitepaperSchema.parse(JSON.parse(raw));
    const slug = file.replace(/\.json$/, "");
    return { ...data, slug };
  });
}

export function getJobs(): Job[] {
  const dir = path.join(DATA_DIR, "jobs");

  if (!fs.existsSync(dir)) return [];

  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));

  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data: frontmatter, content } = matter(raw);
      const parsed = jobSchema.parse(frontmatter);
      const slug = file.replace(/\.(md|mdx)$/, "");
      return { ...parsed, slug, content };
    })
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}
