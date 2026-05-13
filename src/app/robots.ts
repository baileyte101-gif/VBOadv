import type { MetadataRoute } from "next";

// AI crawler allow-list and block-list per Vega Phase 0 (2026-05-13).
// Revisit quarterly. Tim approved this baseline.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/tim/", "/api/", "/_next/"],
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
