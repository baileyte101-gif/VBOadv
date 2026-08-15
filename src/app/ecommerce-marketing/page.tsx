import type { Metadata } from 'next'
import ContentPage from '@/components/site/ContentPage'
import { ecommercePage } from '@/content/pages/ecommerce-marketing'
import { metadataFor } from '@/lib/page-metadata'

export const metadata: Metadata = metadataFor(ecommercePage)

export default function Page() {
  return <ContentPage page={ecommercePage} />
}
