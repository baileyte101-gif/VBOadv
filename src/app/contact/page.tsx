import type { Metadata } from 'next'
import ContentPage from '@/components/site/ContentPage'
import ContactForm from '@/components/site/ContactForm'
import { contactPage } from '@/content/pages/contact'
import { metadataFor } from '@/lib/page-metadata'
import { ORG_ID, SITE } from '@/lib/page-schema'

export const metadata: Metadata = metadataFor(contactPage)

/**
 * ContactPage schema. The contact details are NOT redeclared here: the
 * Organization node in the root layout already carries a contactPoint with the
 * phone number, email and area served, so this references it by @id. Declaring
 * a second set is how a knowledge graph ends up with two versions of the same
 * business disagreeing about how to reach it.
 */
const contactPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  '@id': `${SITE}/contact#contactpage`,
  url: `${SITE}/contact`,
  name: contactPage.title,
  description: contactPage.description,
  isPartOf: { '@id': `${SITE}/#website` },
  about: { '@id': ORG_ID },
  mainEntity: { '@id': ORG_ID },
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <ContentPage
        page={contactPage}
        sectionSlots={
          contactPage.form
            ? {
                // Rendered under Mary's own "The Form" heading, which is where
                // the page is written to put it.
                'The Form': (
                  <div className="mt-8">
                    <ContactForm spec={contactPage.form} />
                  </div>
                ),
              }
            : undefined
        }
      />
    </>
  )
}
