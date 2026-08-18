import type { Metadata } from 'next'
import ContentPage from '@/components/site/ContentPage'
import HubDirectory from '@/components/site/HubDirectory'
import { servicesPage } from '@/content/pages/services'
import { metadataFor } from '@/lib/page-metadata'
import { SERVICES } from '@/lib/navigation'

export const metadata: Metadata = metadataFor(servicesPage)

export default function Page() {
  return (
    <ContentPage
      page={servicesPage}
      directory={
        <HubDirectory
          heading="All Services"
          intro="Every service VBO offers, linked to its page. Where a name appears underneath, that is a real client we run it for today."
          items={SERVICES}
        />
      }
    />
  )
}
