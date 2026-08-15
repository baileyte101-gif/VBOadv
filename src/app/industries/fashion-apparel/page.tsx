import type { Metadata } from 'next'
import ContentPage from '@/components/site/ContentPage'
import { fashionApparelPage } from '@/content/pages/industries-fashion-apparel'
import { metadataFor } from '@/lib/page-metadata'

export const metadata: Metadata = metadataFor(fashionApparelPage)

export default function Page() {
  return <ContentPage page={fashionApparelPage} />
}
