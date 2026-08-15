import type { Metadata } from 'next'
import ContentPage from '@/components/site/ContentPage'
import { localServicePage } from '@/content/pages/industries-local-service-businesses'
import { metadataFor } from '@/lib/page-metadata'

export const metadata: Metadata = metadataFor(localServicePage)

export default function Page() {
  return <ContentPage page={localServicePage} />
}
