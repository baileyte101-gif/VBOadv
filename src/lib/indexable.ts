// Single source of truth for which routes are approved for organic indexing.
// Imported by:
//   src/app/professional-services/[vertical]/page.tsx  (robots + canonical)
//   src/app/fractional-cmo/page.tsx                    (robots + canonical)
//   src/app/sitemap.ts                                 (sitemap membership)
// Flipping a page indexable is a one-line edit HERE and nowhere else.

export const INDEXABLE_VERTICALS = new Set<string>([
  "law-firms",
  "med-spas",
  "dental-practices",
]);

// Top-level static pages.
export const INDEXABLE_PAGES = new Set<string>(["fractional-cmo"]);
