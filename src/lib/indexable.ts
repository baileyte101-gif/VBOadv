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
  "financial-advisors",
]);

// Top-level static pages.
// Held out until each one's go-live (add the slug here, in the go-live commit,
// and nowhere else). The case study section went in on 2026-10-02, after
// Chris approved the case study, its figures and its photos on 9/29, as "work"
// and "work/ippe-soccer-tours"; renamed to "case-studies" on 2026-10-05.
// "why-the-bee" went in on 2026-10-08 with the bee's soft web launch (Tim:
// "All approved to take it live on the site").
// Still held: "studio" (VBO Studio, after Tim approves the page and the
// "Locked." film exists).
export const INDEXABLE_PAGES = new Set<string>([
  "fractional-cmo",
  "case-studies",
  "case-studies/ippe-soccer-tours",
  "why-the-bee",
]);
