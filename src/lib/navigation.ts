/**
 * The site's information architecture, in one place.
 *
 * Used by the header nav, the industries hub and the services hub, so the three
 * cannot disagree about what exists. Order is the approved order from
 * clients/vbo/2026-08-14-big-build-master-plan.md section 3.
 *
 * ★ No URL migrations. /fractional-cmo, /ai-enabled-marketing and the four
 * /professional-services/* pages keep their exact current addresses. They are
 * indexed and carrying impressions. Hierarchy on this site comes from internal
 * links and BreadcrumbList, never from URL nesting, which is why the four older
 * industry pages sit under a different path from the six new ones and that is
 * correct rather than untidy.
 */

export type NavItem = {
  href: string
  label: string
  /** Shown in the hub lists, not in the header dropdown. */
  blurb?: string
  /**
   * Named client proof, for the hub lists. Inline markdown, the same small
   * dialect RichText's `Inline` renders elsewhere (`[Name](https://url)` for
   * a verified site, plain text for a named client with no verified URL).
   * Populated 2026-08-18 (Tim's round 2 review, R2-3) from the client mapping
   * table in clients/vbo/2026-08-18-TIM-review-round-big-build.md. Omitted
   * entirely where there is no named client: an honest gap, never a filler
   * line. Caricap, Collective XI and Coerver are named clients with no
   * verified URL, so they render as plain text inside the string rather than
   * a link. Never invent a domain for them.
   */
  proof?: string
}

export const SERVICES: NavItem[] = [
  {
    href: '/web-development',
    label: 'Web Development',
    proof:
      '[IPPE Soccer Tours](https://ippesoccertours.com), [The Fudge Pie Co.](https://www.thefudgepie.com), [Sir Galloway](https://sirgalloway.com)',
  },
  {
    href: '/marketing-consultant',
    label: 'Marketing Consultant',
    proof: '[Sir Galloway](https://sirgalloway.com), Caricap',
  },
  { href: '/fractional-cmo', label: 'Fractional CMO' },
  {
    href: '/ecommerce-marketing',
    label: 'E-commerce & Shopify',
    proof:
      '[Peixoto](https://peixotowear.com), [The Fudge Pie Co.](https://www.thefudgepie.com), [Hayley Style](https://hayleystyle.com)',
  },
  {
    href: '/ai-seo-agency',
    label: 'AI SEO & Visibility',
    proof: '[Peixoto](https://peixotowear.com)',
  },
  { href: '/ai-enabled-marketing', label: 'AI-Enabled Marketing' },
  {
    href: '/paid-media',
    label: 'Paid Media',
    proof:
      '[Peixoto](https://peixotowear.com), [Hayley Style](https://hayleystyle.com), [IPPE Soccer Tours](https://ippesoccertours.com)',
  },
]

/** The six new industry pages, built in this release. */
export const INDUSTRIES_NEW: NavItem[] = [
  {
    href: '/industries/fashion-apparel',
    label: 'Fashion & Apparel',
    proof: '[Peixoto](https://peixotowear.com), Collective XI',
  },
  {
    href: '/industries/jewelry-luxury-retail',
    label: 'Jewelry & Luxury',
    proof: '[Hayley Style](https://hayleystyle.com)',
  },
  {
    href: '/industries/food-beverage',
    label: 'Food & Beverage',
    proof: '[The Fudge Pie Co.](https://www.thefudgepie.com)',
  },
  {
    href: '/industries/sports-travel',
    label: 'Sports & Travel',
    proof: '[IPPE Soccer Tours](https://ippesoccertours.com), Coerver',
  },
  {
    href: '/industries/local-service-businesses',
    label: 'Local Service Businesses',
    proof: '[Sir Galloway](https://sirgalloway.com)',
  },
  {
    href: '/industries/nonprofit-education',
    label: 'Nonprofit & Education',
    proof: '[CARE Elementary](https://careelementary.org)',
  },
]

/** The four existing pages. Addresses unchanged, deliberately. */
export const INDUSTRIES_EXISTING: NavItem[] = [
  { href: '/professional-services/law-firms', label: 'Law Firms' },
  { href: '/professional-services/med-spas', label: 'Med Spas' },
  { href: '/professional-services/dental-practices', label: 'Dental Practices' },
  { href: '/professional-services/financial-advisors', label: 'Financial Advisors' },
]

export const INDUSTRIES: NavItem[] = [...INDUSTRIES_NEW, ...INDUSTRIES_EXISTING]
