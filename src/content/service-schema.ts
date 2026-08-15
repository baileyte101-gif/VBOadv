import type { ServiceSchema } from '@/content/types'

/**
 * Service schema, keyed by route.
 *
 * Kept out of src/content/pages/* deliberately: those files are generated from
 * Mary's copy and get overwritten when the copy changes. This is authored
 * structured data, so it lives where a regeneration cannot silently drop it.
 *
 * serviceType uses plain service names only, per the brief standard. No
 * keyword stuffing, no invented offerings: every entry names something VBO
 * actually sells and the page actually describes.
 *
 * /about and /contact have no Service entry. Neither is a service, and
 * declaring one would describe the site inaccurately.
 */
export const SERVICE_SCHEMAS: Record<string, ServiceSchema> = {
  '/services': {
    name: 'Marketing Services for Small and Mid-Size Businesses',
    description:
      'Strategy, web development, paid media, search and creative for small and mid-size businesses, from a founder-led marketing consultancy and studio in Miami.',
    serviceType: [
      'Marketing Consulting',
      'Web Development',
      'Paid Media',
      'Search Engine Optimization',
      'Fractional CMO',
    ],
  },
  '/web-development': {
    name: 'Web Development for Small and Mid-Size Businesses',
    description:
      'Custom website builds, redesigns and Shopify stores for small and mid-size businesses, structured for search and measured from launch.',
    serviceType: [
      'Web Development',
      'Web Design',
      'Website Redesign',
      'Shopify Development',
    ],
  },
  '/marketing-consultant': {
    name: 'Marketing Consulting for Small and Mid-Size Businesses',
    description:
      'Scoped marketing consulting for owners who want a senior read on what is running, what to stop, and what to do next.',
    serviceType: [
      'Marketing Consulting',
      'Marketing Strategy',
      'Small Business Marketing Consulting',
    ],
  },
  '/ecommerce-marketing': {
    name: 'Ecommerce and Shopify Marketing',
    description:
      'Paid media and search run together for Shopify and ecommerce brands, including product feeds, collection pages and catalog structure.',
    serviceType: [
      'Ecommerce Marketing',
      'Shopify Marketing',
      'Product Feed Management',
      'Ecommerce SEO',
    ],
  },
  '/ai-seo-agency': {
    name: 'AI SEO and AI Visibility',
    description:
      'Making a website readable and quotable by AI assistants and search engines through structure, schema markup and crawler access.',
    serviceType: [
      'AI SEO',
      'Search Engine Optimization',
      'Structured Data Markup',
      'AI Visibility',
    ],
  },
  '/paid-media': {
    name: 'Paid Media Management',
    description:
      'Meta, Google Search, Google Shopping and Performance Max campaigns managed by the people doing the work.',
    serviceType: [
      'Paid Media',
      'Meta Ads Management',
      'Google Ads Management',
      'Paid Search',
      'Paid Social',
    ],
  },
  '/industries': {
    name: 'Marketing for Professional Services and Consumer Brands',
    description:
      'Marketing for the twelve industries VBO works in, from swimwear and fine jewelry to dry cleaning, youth sports travel, food and non-profit education.',
    serviceType: ['Marketing Consulting', 'Marketing Strategy', 'Paid Media'],
  },
  '/industries/fashion-apparel': {
    name: 'Fashion and Apparel Marketing',
    description:
      'Marketing for apparel and fashion brands across the season, from the run-up to a drop through to the long tail.',
    serviceType: ['Fashion Marketing', 'Apparel Marketing', 'Ecommerce Marketing'],
  },
  '/industries/jewelry-luxury-retail': {
    name: 'Jewelry and Luxury Retail Marketing',
    description:
      'Marketing for fine jewelry and luxury retail, built around a long considered purchase rather than an impulse one.',
    serviceType: ['Jewelry Marketing', 'Luxury Retail Marketing', 'Ecommerce Marketing'],
  },
  '/industries/food-beverage': {
    name: 'Food and Beverage Marketing',
    description:
      'Marketing for food, beverage and CPG brands, including the shipping, packaging and storage constraints that change what can be sold online.',
    serviceType: ['Food and Beverage Marketing', 'CPG Marketing', 'Ecommerce Marketing'],
  },
  '/industries/sports-travel': {
    name: 'Youth Sports and Travel Marketing',
    description:
      'Marketing for youth sports programs, clubs and travel tour operators, built around trust and a long booking window.',
    serviceType: ['Youth Sports Marketing', 'Travel Marketing', 'Web Development'],
  },
  '/industries/local-service-businesses': {
    name: 'Local Service Business Marketing',
    description:
      'Marketing for businesses that sell within a few miles, covering local visibility, repeat custom and the basics that decide both.',
    serviceType: [
      'Local Marketing',
      'Local SEO',
      'Local Service Business Marketing',
      'Dry Cleaning Marketing',
    ],
  },
  '/industries/nonprofit-education': {
    name: 'Non-Profit and Education Marketing',
    description:
      'Marketing for non-profits and schools speaking to the families they serve and the funders who pay for it, on a real budget.',
    serviceType: [
      'Non-Profit Marketing',
      'Education Marketing',
      'Fundraising Marketing',
    ],
  },
}
