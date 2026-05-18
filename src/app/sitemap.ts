import type { MetadataRoute } from "next";
import { getWhitepapers } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.xeontek.com";
  const lastModified = new Date("2026-05-18");
  const whitepapers = getWhitepapers();

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/research`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/security`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    ...whitepapers.map((whitepaper) => ({
      url: `${baseUrl}/research/${whitepaper.slug}`,
      lastModified: whitepaper.publishedDate
        ? new Date(whitepaper.publishedDate)
        : lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
