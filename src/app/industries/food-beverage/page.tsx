import type { Metadata } from 'next'
import ContentPage from '@/components/site/ContentPage'
import { foodBeveragePage } from '@/content/pages/industries-food-beverage'
import { metadataFor } from '@/lib/page-metadata'

export const metadata: Metadata = metadataFor(foodBeveragePage)

export default function Page() {
  return <ContentPage page={foodBeveragePage} />
}
