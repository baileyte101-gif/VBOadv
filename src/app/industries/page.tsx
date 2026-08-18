import type { Metadata } from 'next'
import ContentPage from '@/components/site/ContentPage'
import HubDirectory from '@/components/site/HubDirectory'
import { industriesPage } from '@/content/pages/industries'
import { metadataFor } from '@/lib/page-metadata'
import { INDUSTRIES } from '@/lib/navigation'

export const metadata: Metadata = metadataFor(industriesPage)

export default function Page() {
  return (
    <ContentPage
      page={industriesPage}
      directory={
        <HubDirectory
          heading="All Industries"
          intro="Every industry VBO works in, linked to its page. Where a name appears underneath, that is a real client we work with today; the section below goes deeper on each one."
          items={INDUSTRIES}
        />
      }
    />
  )
}
