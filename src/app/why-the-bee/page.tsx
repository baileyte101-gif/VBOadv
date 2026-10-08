import type { Metadata } from 'next'
import Image from 'next/image'
import Nav from '@/components/Nav'
import ClosingBlock from '@/components/ClosingBlock'
import SiteFooter from '@/components/SiteFooter'
import BeeLockup from '@/components/bee/BeeLockup'
import { INDEXABLE_PAGES } from '@/lib/indexable'
import { SHARE_IMAGE } from '@/lib/share'
import {
  WHY_PAGE_LABEL,
  WHY_H1,
  WHY_INTRO,
  WHY_S1_HEADING,
  WHY_NOTE,
  WHY_NOTE_SIGN,
  WHY_PULL_QUOTE,
  WHY_PULL_CITE,
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
 * Indexing: noindex and out of the sitemap until 'why-the-bee' is added to
 * src/lib/indexable.ts in the go-live commit, after Vega has checked the
 * title and description below. Both reuse approved words (Mary's title plus
 * the site's suffix; her homepage line as the description); neither is new
 * copy, and either can change on Mary's or Vega's word.
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

const PHOTOS = {
  piccadilly: {
    src: '/images/why-the-bee/manchester-piccadilly-1927.jpg',
    width: 960,
    height: 1200,
    alt: 'Piccadilly, Manchester, 1927: trams, motor vans and crowds crossing the square.',
  },
  docks: {
    src: '/images/why-the-bee/manchester-ship-canal-docks-1928.jpg',
    width: 960,
    height: 1200,
    alt: 'The Manchester Ship Canal at Manchester, 1928: a dockside warehouse, moored boats and a swing bridge reflected in still water.',
  },
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
        {/* Title and intro */}
        <section className="vb-sec vb-hero ground-plain" aria-labelledby="vb-title">
          <div className="vb-wrap">
            <p className="vb-label">{WHY_PAGE_LABEL}</p>
            <div className="vb-accent" aria-hidden />
            <h1 id="vb-title">{WHY_H1}</h1>
            <p className="vb-intro">{WHY_INTRO}</p>
          </div>
        </section>

        {/* From Tim: his note, two photographs, the pull quote */}
        <section className="vb-sec vb-egg" aria-labelledby="vb-from-tim">
          <div className="vb-wrap">
            <h2 id="vb-from-tim" className="vb-label">
              {WHY_S1_HEADING}
            </h2>
            <div className="vb-story">
              {WHY_NOTE.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <p className="vb-sign">{WHY_NOTE_SIGN}</p>
            </div>
            <div className="vb-photos-2">
              <figure className="vb-ph vb-ph--tall">
                <Image
                  src={PHOTOS.piccadilly.src}
                  width={PHOTOS.piccadilly.width}
                  height={PHOTOS.piccadilly.height}
                  alt={PHOTOS.piccadilly.alt}
                  sizes="(min-width: 800px) 373px, 50vw"
                />
              </figure>
              <figure className="vb-ph vb-ph--tall">
                <Image
                  src={PHOTOS.docks.src}
                  width={PHOTOS.docks.width}
                  height={PHOTOS.docks.height}
                  alt={PHOTOS.docks.alt}
                  sizes="(min-width: 800px) 373px, 50vw"
                />
              </figure>
            </div>
            <blockquote className="vb-pull">
              <p className="vb-pull-q">{WHY_PULL_QUOTE}</p>
              <p className="vb-pull-cite">{WHY_PULL_CITE}</p>
            </blockquote>
          </div>
        </section>

        {/* The mark: the bee on its own, then the lockup. Kept well away from
            the page title, so the word Manchester is never set with it. */}
        <section className="vb-sec ground-plain" aria-labelledby="vb-mark">
          <div className="vb-wrap">
            <h2 id="vb-mark" className="vb-label">
              The mark
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
        <section className="vb-sec ground-harbour" aria-labelledby="vb-how">
          <div className="vb-wrap">
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
        <section className="vb-close" aria-label="Get in touch">
          <div className="vb-wrap">
            <p className="vb-close-text">{WHY_CLOSE}</p>
            <a href="mailto:hello@vboadv.com" className="btn-gold inline-flex items-center gap-3 vb-close-btn">
              Let&apos;s Connect
              <span className="text-base leading-none" aria-hidden="true">
                &rarr;
              </span>
            </a>
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
              <a href="https://www.loc.gov/item/2019639929/" rel="noopener" target="_blank">
                Piccadilly, Manchester
              </a>
              , 1927;{' '}
              <a href="https://www.loc.gov/item/2019639927/" rel="noopener" target="_blank">
                Manchester Ship Canal
              </a>
              , 1928;{' '}
              <a href="https://www.loc.gov/item/2019639930/" rel="noopener" target="_blank">
                Manchester Ship Canal traffic
              </a>
              , 1927: Keystone View Company, public domain in the United States (Library of Congress).
            </p>
          </div>
        </section>
        <SiteFooter />
      </ClosingBlock>
    </>
  )
}
