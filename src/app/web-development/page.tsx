import type { Metadata } from 'next'
import ContentPage from '@/components/site/ContentPage'
import { webDevelopmentPage } from '@/content/pages/web-development'
import { metadataFor } from '@/lib/page-metadata'

export const metadata: Metadata = metadataFor(webDevelopmentPage)

export default function Page() {
  return <ContentPage page={webDevelopmentPage} />
}
