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
// "case-studies/peixoto-wear" went in on 2026-10-21, after Mauricio approved
// the case study on 10/21 ("All good! Thanks") and Tim gave the publish go.
// "case-studies/sir-galloway" went in on 2026-10-22: Morgan Mills approved the
// case study on 10/14 ("LOVE the case study"), her numbers, posts and quote;
// Tim gave the publish go 10/22 with her mother's quote still unconfirmed
// ("it's a small risk but I think we'll be okay").
// Still held: "studio" (VBO Studio, after Tim approves the page and the
// "Locked." film exists).
export const INDEXABLE_PAGES = new Set<string>([
  "fractional-cmo",
  "case-studies",
  "case-studies/ippe-soccer-tours",
  "case-studies/peixoto-wear",
  "case-studies/sir-galloway",
  "why-the-bee",
]);
