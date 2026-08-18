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
  /** Named client proof, for the hub lists. */
  proof?: string
}

export const SERVICES: NavItem[] = [
  { href: '/web-development', label: 'Web Development' },
  { href: '/marketing-consultant', label: 'Marketing Consultant' },
  { href: '/fractional-cmo', label: 'Fractional CMO' },
  { href: '/ecommerce-marketing', label: 'E-commerce & Shopify' },
  { href: '/ai-seo-agency', label: 'AI SEO & Visibility' },
  { href: '/ai-enabled-marketing', label: 'AI-Enabled Marketing' },
  { href: '/paid-media', label: 'Paid Media' },
]

/** The six new industry pages, built in this release. */
export const INDUSTRIES_NEW: NavItem[] = [
  { href: '/industries/fashion-apparel', label: 'Fashion & Apparel' },
  { href: '/industries/jewelry-luxury-retail', label: 'Jewelry & Luxury' },
  { href: '/industries/food-beverage', label: 'Food & Beverage' },
  { href: '/industries/sports-travel', label: 'Sports & Travel' },
  { href: '/industries/local-service-businesses', label: 'Local Service Businesses' },
  { href: '/industries/nonprofit-education', label: 'Nonprofit & Education' },
]

/** The four existing pages. Addresses unchanged, deliberately. */
export const INDUSTRIES_EXISTING: NavItem[] = [
  { href: '/professional-services/law-firms', label: 'Law Firms' },
  { href: '/professional-services/med-spas', label: 'Med Spas' },
  { href: '/professional-services/dental-practices', label: 'Dental Practices' },
  { href: '/professional-services/financial-advisors', label: 'Financial Advisors' },
]

export const INDUSTRIES: NavItem[] = [...INDUSTRIES_NEW, ...INDUSTRIES_EXISTING]
