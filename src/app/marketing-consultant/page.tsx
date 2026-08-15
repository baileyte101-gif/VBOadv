import type { Metadata } from 'next'
import ContentPage from '@/components/site/ContentPage'
import { marketingConsultantPage } from '@/content/pages/marketing-consultant'
import { metadataFor } from '@/lib/page-metadata'

export const metadata: Metadata = metadataFor(marketingConsultantPage)

export default function Page() {
  return <ContentPage page={marketingConsultantPage} />
}
