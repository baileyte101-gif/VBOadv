import type { Metadata } from 'next'
import ContentPage from '@/components/site/ContentPage'
import { paidMediaPage } from '@/content/pages/paid-media'
import { metadataFor } from '@/lib/page-metadata'

export const metadata: Metadata = metadataFor(paidMediaPage)

export default function Page() {
  return <ContentPage page={paidMediaPage} />
}
