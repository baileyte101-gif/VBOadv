import type { Metadata } from 'next'
import Image from 'next/image'
import Nav from '@/components/Nav'
import ClosingBlock from '@/components/ClosingBlock'
import CTASection from '@/components/CTASection'
import SiteFooter from '@/components/SiteFooter'
import { INDEXABLE_PAGES } from '@/lib/indexable'
import { SHARE_IMAGE } from '@/lib/share'
import {
  WORK_INDEX_NAME,
  WORK_INDEX_SLUG,
  WORK_INDEX_URL,
  WORK_INDEX_TITLE,
  WORK_INDEX_DESCRIPTION,
  WORK_INDEX_INTRO,
  IPPE_PATH,
  IPPE_CLIENT,
  IPPE_CARD_LINE,
  IPPE_WORK_IMAGES,
  PEIXOTO_PATH,
  PEIXOTO_SHOWN,
  PEIXOTO_CLIENT,
  PEIXOTO_CARD_LINE,
  PEIXOTO_HERO,
  SG_PATH,
  SG_SHOWN,
  SG_CLIENT,
  SG_CARD_LINE,
  SG_WORK_IMAGES,
  workIndexSchema,
  workIndexBreadcrumbSchema,
} from '@/lib/work'
import './work.css'

// Noindex and out of the sitemap unless 'case-studies' is in src/lib/indexable.ts.
const IS_INDEXABLE = INDEXABLE_PAGES.has(WORK_INDEX_SLUG)

export const metadata: Metadata = {
  title: WORK_INDEX_TITLE,
  description: WORK_INDEX_DESCRIPTION,
  robots: IS_INDEXABLE ? { index: true, follow: true } : { index: false, follow: false },
  ...(IS_INDEXABLE && { alternates: { canonical: WORK_INDEX_URL } }),
  openGraph: {
    title: WORK_INDEX_TITLE,
    description: WORK_INDEX_DESCRIPTION,
    type: 'website',
    siteName: 'VBO Advertising',
    url: WORK_INDEX_URL,
    images: [SHARE_IMAGE],
  },
}

export default function CaseStudiesIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(workIndexSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(workIndexBreadcrumbSchema) }}
      />

      <Nav />

      <main className="vw pt-16">
        {/* Intro: plain ground, Tim's two sentences above the card (2026-10-05).
            The small "Case Studies" label that sat over the old "Work" heading
            is gone: it would now repeat the heading word for word. */}
        <section className="vw-sec vw-hero ground-plain">
          <div className="vw-wrap">
            <div className="vw-accent" aria-hidden />
            <h1>{WORK_INDEX_NAME}</h1>
            <div className="vw-body">
              {WORK_INDEX_INTRO.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* The cards: step-up ground, one per case study, two-up from 900px. */}
        <section className="vw-snap ground-plain step-up" aria-label="Case studies">
          <div className="vw-wrap">
            <div className="vw-cards">
              <a className="vw-card" href={IPPE_PATH}>
                <div className="vw-card-media">
                  <Image
                    src={IPPE_WORK_IMAGES.tripPage.src}
                    alt=""
                    width={IPPE_WORK_IMAGES.tripPage.width}
                    height={IPPE_WORK_IMAGES.tripPage.height}
                    sizes="(min-width: 900px) 600px, 100vw"
                    priority
                  />
                </div>
                <div className="vw-card-body">
                  <h2>{IPPE_CLIENT}</h2>
                  <p>{IPPE_CARD_LINE}</p>
                  <span className="vw-card-more" aria-hidden>
                    &rarr;
                  </span>
                </div>
              </a>
              {/* Peixoto Wear (published 2026-10-21). Shown wherever the page
                  is (PEIXOTO_SHOWN). The card image is the page's hero, the
                  only Peixoto image on the page; it is a 3:4 photograph in
                  the 16:10 frame, so vw-card-media-photo frames it lower than
                  the screenshot default (her face and the set, not the sky). */}
              {PEIXOTO_SHOWN && (
                <a className="vw-card" href={PEIXOTO_PATH}>
                  <div className="vw-card-media vw-card-media-photo">
                    <Image
                      src={PEIXOTO_HERO.src}
                      alt=""
                      width={PEIXOTO_HERO.width}
                      height={PEIXOTO_HERO.height}
                      sizes="(min-width: 900px) 600px, 100vw"
                    />
                  </div>
                  <div className="vw-card-body">
                    <h2>{PEIXOTO_CLIENT}</h2>
                    <p>{PEIXOTO_CARD_LINE}</p>
                    <span className="vw-card-more" aria-hidden>
                      &rarr;
                    </span>
                  </div>
                </a>
              )}
              {/* Sir Galloway (published 2026-10-22). Shown wherever the page
                  is (SG_SHOWN). The card uses the pickup page capture, 16:10
                  like IPPE's trip page. */}
              {SG_SHOWN && (
                <a className="vw-card" href={SG_PATH}>
                  <div className="vw-card-media">
                    <Image
                      src={SG_WORK_IMAGES.pickupPage.src}
                      alt=""
                      width={SG_WORK_IMAGES.pickupPage.width}
                      height={SG_WORK_IMAGES.pickupPage.height}
                      sizes="(min-width: 900px) 600px, 100vw"
                    />
                  </div>
                  <div className="vw-card-body">
                    <h2>{SG_CLIENT}</h2>
                    <p>{SG_CARD_LINE}</p>
                    <span className="vw-card-more" aria-hidden>
                      &rarr;
                    </span>
                  </div>
                </a>
              )}
            </div>
          </div>
        </section>
      </main>

      <ClosingBlock>
        <CTASection />
        <SiteFooter />
      </ClosingBlock>
    </>
  )
}
