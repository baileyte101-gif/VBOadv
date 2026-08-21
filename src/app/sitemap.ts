import type { MetadataRoute } from "next";
import { verticalSlugs } from "@/lib/verticals";
import { INDEXABLE_VERTICALS, INDEXABLE_PAGES } from "@/lib/indexable";
import { getAllPosts } from "@/lib/blog";

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
    // Gated on the same flag as the page's own robots meta, so the sitemap and
    // the robots directive can never disagree.
    ...(INDEXABLE_PAGES.has("fractional-cmo")
      ? [
          {
            url: `${HOST}/fractional-cmo`,
            lastModified: now,
            changeFrequency: "monthly" as const,
            priority: 0.9,
          },
        ]
      : []),
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
