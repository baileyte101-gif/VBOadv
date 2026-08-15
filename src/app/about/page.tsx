import type { Metadata } from 'next'
import ContentPage from '@/components/site/ContentPage'
import { aboutPage } from '@/content/pages/about'
import { metadataFor } from '@/lib/page-metadata'

export const metadata: Metadata = metadataFor(aboutPage)

export default function Page() {
  return <ContentPage page={aboutPage} />
}
