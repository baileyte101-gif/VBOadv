import type { Metadata } from 'next'
import ContentPage from '@/components/site/ContentPage'
import { jewelryPage } from '@/content/pages/industries-jewelry-luxury-retail'
import { metadataFor } from '@/lib/page-metadata'

export const metadata: Metadata = metadataFor(jewelryPage)

export default function Page() {
  return <ContentPage page={jewelryPage} />
}
