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

  // The fifteen pages added 2026-08-15. Hubs carry a higher priority than the
  // pages beneath them because they are the entry points the internal linking
  // is built around. /contact is a conversion page, not a search target, so it
  // sits low rather than being left out: it still needs to be crawlable.
  const buildPages: MetadataRoute.Sitemap = [
    { path: "/services", priority: 0.9 },
    { path: "/industries", priority: 0.9 },
    { path: "/web-development", priority: 0.9 },
    { path: "/marketing-consultant", priority: 0.9 },
    { path: "/ecommerce-marketing", priority: 0.9 },
    { path: "/ai-seo-agency", priority: 0.9 },
    { path: "/paid-media", priority: 0.9 },
    { path: "/industries/fashion-apparel", priority: 0.8 },
    { path: "/industries/jewelry-luxury-retail", priority: 0.8 },
    { path: "/industries/food-beverage", priority: 0.8 },
    { path: "/industries/sports-travel", priority: 0.8 },
    { path: "/industries/local-service-businesses", priority: 0.8 },
    { path: "/industries/nonprofit-education", priority: 0.8 },
    { path: "/about", priority: 0.7 },
    { path: "/contact", priority: 0.5 },
  ].map(({ path, priority }) => ({
    url: `${HOST}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority,
  }));

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

  return [...staticPages, ...buildPages, ...verticalPages, ...postPages];
}
