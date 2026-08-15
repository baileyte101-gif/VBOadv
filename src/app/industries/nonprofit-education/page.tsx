import type { Metadata } from 'next'
import ContentPage from '@/components/site/ContentPage'
import { nonprofitPage } from '@/content/pages/industries-nonprofit-education'
import { metadataFor } from '@/lib/page-metadata'

export const metadata: Metadata = metadataFor(nonprofitPage)

export default function Page() {
  return <ContentPage page={nonprofitPage} />
}
