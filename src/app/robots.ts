import type { MetadataRoute } from "next";

// AI crawler allow-list and block-list per Vega Phase 0 (2026-05-13).
// Revisit quarterly. Tim approved this baseline.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // /_next/ holds optimised images and JS/CSS bundles, nothing private.
      // Blocking it by default cost us image indexing on every engine except
      // Google (which got its own group in bbd7f97). Opened to all crawlers
      // 2026-08-10 per Vega validation. /tim/ and /api/ stay closed.
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/tim/", "/api/"],
      },
      // Googlebot gets its own group so it does NOT fall through to "*" above,
      // which blocks /_next/ (every Next.js optimized image). A crawler obeys
      // only its most specific matching group, so this restates the disallows
      // we still want (Tim's /tim/ business card stays hidden) and opens
      // /_next/ so site images can reach Google Images. Fixed 2026-08-09.
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/tim/", "/api/"],
      },
      {
        userAgent: "Googlebot-Image",
        allow: "/",
        disallow: ["/tim/", "/api/"],
      },
      // Allow-list: engines whose citations help VBO.
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-Web", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      // Block-list: training crawlers with no citation upside for VBO.
      { userAgent: "Bytespider", disallow: "/" },
      { userAgent: "CCBot", disallow: "/" },
    ],
    sitemap: "https://www.vboadv.com/sitemap.xml",
    host: "https://www.vboadv.com",
  };
}
