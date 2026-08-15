import type { Metadata } from 'next'
import ContentPage from '@/components/site/ContentPage'
import { aiSeoPage } from '@/content/pages/ai-seo-agency'
import { metadataFor } from '@/lib/page-metadata'

export const metadata: Metadata = metadataFor(aiSeoPage)

export default function Page() {
  return <ContentPage page={aiSeoPage} />
}
