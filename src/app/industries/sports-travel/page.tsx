import type { Metadata } from 'next'
import ContentPage from '@/components/site/ContentPage'
import { sportsTravelPage } from '@/content/pages/industries-sports-travel'
import { metadataFor } from '@/lib/page-metadata'

export const metadata: Metadata = metadataFor(sportsTravelPage)

export default function Page() {
  return <ContentPage page={sportsTravelPage} />
}
