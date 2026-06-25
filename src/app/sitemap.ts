import type { MetadataRoute } from "next";
import { verticalSlugs } from "@/lib/verticals";
import { getAllPosts } from "@/lib/blog";

// Mirror the INDEXABLE_VERTICALS Set in src/app/professional-services/[vertical]/page.tsx.
// When a vertical flips to indexable there, also add its slug here.
const INDEXABLE_VERTICALS = new Set(["law-firms"]);

const HOST = "https://www.vboadv.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${HOST}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${HOST}/ai-enabled-marketing`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${HOST}/insights`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const verticalPages: MetadataRoute.Sitemap = verticalSlugs
    .filter((slug) => INDEXABLE_VERTICALS.has(slug))
    .map((slug) => ({
      url: `${HOST}/professional-services/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  // Published (non-draft) blog posts. Empty until the first post goes live.
  const postPages: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${HOST}/insights/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...verticalPages, ...postPages];
}
