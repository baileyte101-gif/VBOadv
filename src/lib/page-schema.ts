import type { PageContent } from '@/content/types'
import { SERVICE_SCHEMAS } from '@/content/service-schema'

export const SITE = 'https://www.vboadv.com'

/**
 * Stable @ids for the three entities the root layout already emits sitewide
 * (src/app/layout.tsx): Organization, Person (Tim) and LocalBusiness.
 *
 * Every page therefore already carries the full stack. Page-level schema
 * REFERENCES these by @id and never redeclares them. Inlining a second
 * Organization is the bug that made Google report "Organization: 2 valid items"
 * on the homepage; it splits the entity graph and is not repeated here.
 */
export const ORG_ID = `${SITE}/#organization`
export const PERSON_ID = `${SITE}/#tim-bailey`
export const LOCAL_BUSINESS_ID = `${SITE}/#localbusiness`

const AREA_SERVED = [
  { '@type': 'City', name: 'Coconut Grove' },
  { '@type': 'City', name: 'Miami' },
  { '@type': 'City', name: 'Fort Lauderdale' },
  { '@type': 'City', name: 'West Palm Beach' },
]

export function breadcrumbSchema(page: PageContent) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: page.breadcrumb.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: crumb.item,
    })),
  }
}

export function serviceSchema(page: PageContent) {
  const service = page.service ?? SERVICE_SCHEMAS[page.path]
  if (!service) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    // Reference, never inline. See ORG_ID above.
    provider: { '@id': ORG_ID },
    serviceType: service.serviceType,
    areaServed: AREA_SERVED,
  }
}

/**
 * FAQPage built from the same strings the page renders, so the schema cannot
 * drift from the visible text. Vega validates them as matching; this makes it
 * impossible for them not to.
 */
export function faqSchema(page: PageContent) {
  if (page.faq.length === 0) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faq.map((entry) => ({
      '@type': 'Question',
      name: entry.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: entry.answer,
      },
    })),
  }
}

/**
 * WebPage node tying the page to the entities the root layout emits. This is
 * how each page carries Person and Organization without redeclaring either.
 */
export function webPageSchema(page: PageContent) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE}${page.path}#webpage`,
    url: `${SITE}${page.path}`,
    name: page.title,
    description: page.description,
    isPartOf: { '@id': `${SITE}/#website` },
    about: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    provider: { '@id': LOCAL_BUSINESS_ID },
    author: { '@id': PERSON_ID },
  }
}

export function pageSchemas(page: PageContent) {
  return [
    webPageSchema(page),
    breadcrumbSchema(page),
    serviceSchema(page),
    faqSchema(page),
  ].filter(Boolean) as Record<string, unknown>[]
}
