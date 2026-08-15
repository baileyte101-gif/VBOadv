import type { Metadata } from 'next'
import ContentPage from '@/components/site/ContentPage'
import { servicesPage } from '@/content/pages/services'
import { metadataFor } from '@/lib/page-metadata'

export const metadata: Metadata = metadataFor(servicesPage)

export default function Page() {
  return <ContentPage page={servicesPage} />
}
