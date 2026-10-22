import type { Metadata } from 'next'
import Image from 'next/image'
import Nav from '@/components/Nav'
import ClosingBlock from '@/components/ClosingBlock'
import SiteFooter from '@/components/SiteFooter'
import BeeLockup from '@/components/bee/BeeLockup'
import BeeLane from '@/components/bee/BeeLane'
import BeeFlight from '@/components/bee/BeeFlight'
import WhyHero from '@/components/bee/WhyHero'
import { INDEXABLE_PAGES } from '@/lib/indexable'
import { SHARE_IMAGE } from '@/lib/share'
import {
  WHY_H1,
  WHY_S2_HEADING,
  WHY_S2_BEFORE,
  WHY_S2_LATIN,
  WHY_S2_AFTER,
  WHY_S3_HEADLINE,
  WHY_S3_BODY,
  WHY_CLOSE,
  WHY_CLOSE_EMAIL,
  HOME_WHY_BODY,
} from '@/lib/bee-copy'
import '@/components/bee/bee-home.css'
import './why-the-bee.css'

/*
 * /why-the-bee: the story behind VBO's bee (bee brand evolution, step 07,
 * 2026-10-08). Layout: Jules's approved concept (Why the bee page mock in
 * Mack/artifacts/2026-10-bee-website/the-bee-on-vboadv.html). Words: Mary's
 * v2.1, option 1 in every slot (src/lib/bee-copy.ts). Photos: four archival,
 * public-domain photographs, records in Jules's notes, section 7.
 *
 * Guardrail kept by layout: the bee mark never sits with the word Manchester
 * (the title carries it; the big bee lives in its own section further down).
 *
 * Indexing: indexable and in the sitemap from the soft web launch
 * (2026-10-08), via 'why-the-bee' in src/lib/indexable.ts. The title and
 * description reuse approved words (Mary's title plus the site's suffix; her
 * homepage line as the description); neither is new copy, and either can
 * change on Mary's or Vega's word.
 *
 * The flying bee (2026-10-15, Tim 10/14: it must float here "exactly like it
 * does on the homepage"): the homepage's own bee and engine on this page's
 * route (beeFlightEngine.ts, STORY_ROUTE). It flies in How we work and the
 * close (data-bee="fly", one BeeLane each), waits behind the title, passes
 * under Our icon, and lands beside Let's Connect. The data-bee-sec marks are
 * the route's anchors; none of them styles anything.
 */

const SLUG = 'why-the-bee'
const CANONICAL = `https://www.vboadv.com/${SLUG}`
const IS_INDEXABLE = INDEXABLE_PAGES.has(SLUG)
const TITLE = `${WHY_H1} | VBO Advertising`
const DESCRIPTION = HOME_WHY_BODY

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  robots: IS_INDEXABLE ? { index: true, follow: true } : { index: false, follow: false },
  ...(IS_INDEXABLE && { alternates: { canonical: CANONICAL } }),
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: 'website',
    siteName: 'VBO Advertising',
    url: CANONICAL,
    images: [SHARE_IMAGE],
  },
}

// Alt text: Mary's v2.2 (section 1h), two rewritten and two kept as built.
const PHOTOS = {
  traffic: {
    src: '/images/why-the-bee/manchester-ship-canal-traffic-1927.jpg',
    width: 1600,
    height: 900,
    alt: 'Traffic on the Manchester Ship Canal, 1927: a steam tug and barges pass a dockside warehouse, with steamers beyond.',
  },
}

export default function WhyTheBeePage() {
  return (
    <>
      <Nav />

      <main className="vb pt-16">
        {/* Title and intro, with the homepage hero's pixel field (the bee)
            and black / marble toggle (2026-10-15) */}
        <WhyHero />

        {/* Our icon: the bee on its own, then the lockup. Kept well away from
            the page title, so the word Manchester is never set with it. */}
        {/* Our icon lands directly on the title's plain ground, so it takes the
            stepped plain ground (globals.css: no two adjacent sections share one). */}
        <section className="vb-sec ground-plain step-up" aria-labelledby="vb-mark" data-bee-sec="icon">
          <div className="vb-wrap">
            <h2 id="vb-mark" className="vb-label">
              Our icon
            </h2>
            <div className="vb-mark-grid">
              <svg
                className="vb-bigbee"
                viewBox="49.697 32 412.605 448"
                role="img"
                aria-label="The VBO bee"
                focusable="false"
              >
                <use href="#vbo-bee" />
              </svg>
              <BeeLockup className="vbo-lk-mark" />
            </div>
          </div>
        </section>

        {/* How we work, the photograph between principle and proof, then the
            big headline and the Friday-night story */}
        <section
          className="vb-sec ground-harbour"
          aria-labelledby="vb-how"
          data-bee="fly"
          data-bee-fly="how"
          data-bee-sec="how"
        >
          <BeeLane />
          <div className="vb-wrap" data-bee-content>
            <h2 id="vb-how" className="vb-label">
              {WHY_S2_HEADING}
            </h2>
            <div className="vb-story vb-story--dark">
              <p>
                {WHY_S2_BEFORE}
                <i>{WHY_S2_LATIN}</i>
                {WHY_S2_AFTER}
              </p>
            </div>
            <figure className="vb-ph vb-ph--wide">
              <Image
                src={PHOTOS.traffic.src}
                width={PHOTOS.traffic.width}
                height={PHOTOS.traffic.height}
                alt={PHOTOS.traffic.alt}
                sizes="(min-width: 800px) 760px, 100vw"
              />
            </figure>
            <h2 className="vb-headline">{WHY_S3_HEADLINE}</h2>
            <div className="vb-story vb-story--dark">
              {WHY_S3_BODY.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* The close, on the site's skyline ground with the footer */}
      <ClosingBlock>
        <section
          className="vb-close"
          aria-label="Get in touch"
          data-bee="fly"
          data-bee-fly="close"
          data-bee-sec="close"
        >
          <BeeLane />
          <div className="vb-wrap" data-bee-content>
            <p className="vb-close-text">{WHY_CLOSE}</p>
            <div className="vb-close-cta">
              <a href="mailto:hello@vboadv.com" className="btn-gold inline-flex items-center gap-3">
                Let&apos;s Connect
                <span className="text-base leading-none" aria-hidden="true">
                  &rarr;
                </span>
              </a>
              {/* The bee at rest: the flight's landing spot and the still bee. */}
              <svg
                className="vbo-bee-rest"
                data-bee-sec="rest"
                viewBox="0 0 512 512"
                aria-hidden="true"
                focusable="false"
              >
                <use href="#vbo-bee" />
              </svg>
            </div>
            <p className="vb-close-email">
              <a href="mailto:hello@vboadv.com">{WHY_CLOSE_EMAIL}</a>
            </p>
            {/* Photo credits, from Jules's records (notes, section 7). The
                first photograph appears in the homepage's Why the bee section. */}
            <p className="vb-credits">
              Photo credits:{' '}
              <a href="https://commons.wikimedia.org/wiki/File:Grammar_School_MIlls,_Manchester,_c.1908.jpg" rel="noopener" target="_blank">
                Grammar School Mills, Manchester
              </a>
              , published 1908, photographer unknown, public domain (Wikimedia Commons).{' '}
              <a href="https://www.loc.gov/item/2019639930/" rel="noopener" target="_blank">
                Manchester Ship Canal traffic
              </a>
              , 1927: Keystone View Company, public domain in the United States (Library of Congress).
            </p>
          </div>
        </section>
        <SiteFooter />
      </ClosingBlock>

      {/* Starts the flying bee once the page is idle (its own small chunk). */}
      <BeeFlight route="story" />
    </>
  )
}
