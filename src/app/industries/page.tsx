import type { Metadata } from 'next'
import ContentPage from '@/components/site/ContentPage'
import { industriesPage } from '@/content/pages/industries'
import { metadataFor } from '@/lib/page-metadata'

export const metadata: Metadata = metadataFor(industriesPage)

export default function Page() {
  return <ContentPage page={industriesPage} />
}
