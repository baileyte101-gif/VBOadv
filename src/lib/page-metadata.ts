import type { Metadata } from 'next'
import type { PageContent } from '@/content/types'
import { SITE } from '@/lib/page-schema'

/**
 * Page metadata from the approved title tag and meta description, with the
 * canonical derived from the route so it cannot disagree with where the page
 * actually lives.
 *
 * All fifteen new pages are indexable. Nothing here overrides robots; the
 * existing noindex rule for /professional-services/accounting-firms is handled
 * where it already lives, in src/lib/indexable.ts.
 */
export function metadataFor(page: PageContent): Metadata {
  const url = `${SITE}${page.path}`
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: page.path },
    openGraph: {
      title: page.title,
      description: page.description,
      type: 'website',
      siteName: 'VBO Advertising',
      url,
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
    },
  }
}
