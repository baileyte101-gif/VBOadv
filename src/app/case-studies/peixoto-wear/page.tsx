import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import ClosingBlock from '@/components/ClosingBlock'
import SiteFooter from '@/components/SiteFooter'
import { linkify, type InlineLinkSpec } from '@/lib/linkify'
import {
  PEIXOTO_URL,
  PEIXOTO_APPROVED,
  PEIXOTO_SHOWN,
  PEIXOTO_PUBLISHED,
  PEIXOTO_TITLE,
  PEIXOTO_DESCRIPTION,
  PEIXOTO_CLIENT,
  PEIXOTO_H1,
  PEIXOTO_SUBHEAD,
  PEIXOTO_SNAPSHOT,
  PEIXOTO_CHALLENGE,
  PEIXOTO_CONTACT_CHALLENGE,
  PEIXOTO_DID,
  PEIXOTO_HERO,
  PEIXOTO_CONTACT_WORK,
  PEIXOTO_RESULTS,
  PEIXOTO_NEXT,
  PEIXOTO_SHARE_IMAGE,
  PEIXOTO_RELATED_READING,
  peixotoArticleSchema,
  peixotoBreadcrumbSchema,
  WORK_INDEX_NAME,
  WORK_INDEX_PATH,
} from '@/lib/work'
import RelatedReading from '../RelatedReading'
import '../work.css'

// The Peixoto Wear case study, on the IPPE template (../ippe-soccer-tours)
// with the Sir Galloway rework's machinery (hero photograph, contact prompts,
// phased results), rebuilt 10/14 evening to Mary's revised copy.md (Tim's
// edit round 1): no Social section (VBO never ran Peixoto's organic social),
// no Work images section and no Ads strip (Tim, 10/14; the hero stays), the
// second contact ask directly after What We Did, and five result phases with
// September as the lead.
//
// PUBLISHED 2026-10-21 (Mauricio approved 10/21; Tim's go the same day). The
// switch is src/lib/indexable.ts: with "case-studies/peixoto-wear" in it the
// page is indexable with a canonical; out of it, the page goes noindex, leaves
// the sitemap, and a production build serves this URL as a 404 (PEIXOTO_SHOWN
// in src/lib/work.ts).
const IS_INDEXABLE = PEIXOTO_APPROVED

// The publish commit must also set the go-live date. Refuse to build an
// indexable page that would ship without one.
if (IS_INDEXABLE && !PEIXOTO_PUBLISHED) {
  throw new Error(
    'Peixoto Wear case study: set PEIXOTO_PUBLISHED in src/lib/work.ts to the go-live date before making the page indexable.'
  )
}

export const metadata: Metadata = {
  title: PEIXOTO_TITLE,
  description: PEIXOTO_DESCRIPTION,
  robots: IS_INDEXABLE ? { index: true, follow: true } : { index: false, follow: false },
  ...(IS_INDEXABLE && { alternates: { canonical: PEIXOTO_URL } }),
  // The share picture is this case study's own (its card picture at
  // 1200 x 630, Vega 2026-10-22), not the bee card. A page that sets its own
  // openGraph replaces the root layout's whole object, so it is listed here.
  openGraph: {
    title: PEIXOTO_TITLE,
    description: PEIXOTO_DESCRIPTION,
    type: 'article',
    siteName: 'VBO Advertising',
    url: PEIXOTO_URL,
    images: [PEIXOTO_SHARE_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    images: [{ url: PEIXOTO_SHARE_IMAGE.url, alt: PEIXOTO_SHARE_IMAGE.alt }],
  },
}

// A contact prompt (Jules's B5): one plain line in body type, its only link
// the address or "Let's talk". No button: Next keeps the page's only one.
function Ask({ id, ask }: { id: string; ask: { text: string; link: InlineLinkSpec } }) {
  return (
    <p className="vw-ask" data-ask={id}>
      {linkify(ask.text, [ask.link])}
    </p>
  )
}

export default function PeixotoCaseStudyPage() {
  if (!PEIXOTO_SHOWN) notFound()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(peixotoArticleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(peixotoBreadcrumbSchema) }}
      />

      <Nav />

      <main className="vw pt-16">
        {/* HERO: plain ground, headline first. Peixoto's own seaside
            photograph (Jules's pick), 3:4 in the Sir Galloway hero slot
            (.vw-hero-photo). Its own width and height set the ratio. No
            caption, as the IPPE and Sir Galloway heroes. */}
        <section className="vw-sec vw-hero ground-plain">
          <div className="vw-wrap vw-hero-grid">
            <div>
              <p className="vw-label">
                <a href={WORK_INDEX_PATH}>{WORK_INDEX_NAME}</a> / {PEIXOTO_CLIENT}
              </p>
              <div className="vw-accent" aria-hidden />
              <h1>{PEIXOTO_H1}</h1>
              <p className="vw-dek">{PEIXOTO_SUBHEAD}</p>
            </div>
            <figure className="vw-hero-photo">
              <div className="vw-shadowed">
                <Image
                  src={PEIXOTO_HERO.src}
                  alt={PEIXOTO_HERO.alt}
                  width={PEIXOTO_HERO.width}
                  height={PEIXOTO_HERO.height}
                  sizes="(min-width: 1024px) 460px, (min-width: 488px) 440px, 100vw"
                  priority
                />
              </div>
            </figure>
          </div>
        </section>

        {/* SNAPSHOT: step-up ground, the client in five facts */}
        <section className="vw-snap ground-plain step-up" aria-labelledby="vw-snap-title">
          <div className="vw-wrap">
            <h2 className="vw-label" id="vw-snap-title">
              Client Snapshot
            </h2>
            <div className="vw-accent" aria-hidden />
            <dl className="vw-snap-grid">
              {PEIXOTO_SNAPSHOT.map((c) => (
                <div key={c.k} className={`vw-cell ${c.wide ? 'vw-wide' : ''} ${c.wideSm ? 'vw-wide-sm' : ''}`}>
                  <dt>{c.k}</dt>
                  <dd>{linkify(c.v, c.links)}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* 01 THE CHALLENGE: gold linework, then the first ask */}
        <section className="vw-sec ground-gold seam-in quiet-panel">
          <div className="vw-ghost" aria-hidden>
            01
          </div>
          <div className="vw-wrap">
            <p className="vw-label">{PEIXOTO_CHALLENGE.label}</p>
            <div className="vw-accent" aria-hidden />
            <h2 style={{ marginBottom: 40 }}>{PEIXOTO_CHALLENGE.heading}</h2>
            <div className="vw-body">
              {PEIXOTO_CHALLENGE.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <Ask id="CONTACT_CHALLENGE" ask={PEIXOTO_CONTACT_CHALLENGE} />
          </div>
        </section>

        {/* Retro divider band, carrying the client's name */}
        <div className="vw-divider" aria-hidden>
          <div className="vw-divider-name">
            <span className="retro-outline">{PEIXOTO_CLIENT}</span>
          </div>
          <div className="retro-divider-strip" />
        </div>

        {/* 02 WHAT WE DID: harbour. Four steps (IPPE has three, Sir Galloway
            five): the setup, the tracking, the ads, the partnership. The
            second ask closes the section (copy.md: CONTACT_WORK sits after
            What We Did, before The Results; the Work images section it used
            to follow is off the page, Tim 10/14). No CSS change. */}
        <section className="vw-sec ground-harbour">
          <div className="vw-ghost" aria-hidden>
            02
          </div>
          <div className="vw-wrap">
            <p className="vw-label">{PEIXOTO_DID.label}</p>
            <div className="vw-accent" aria-hidden />
            <h2>{PEIXOTO_DID.heading}</h2>
            <div className="vw-steps">
              {PEIXOTO_DID.steps.map((s) => (
                <div key={s.n} className="vw-step">
                  <div>
                    <span className="vw-n">{s.n}</span>
                    <h3>{s.title}</h3>
                  </div>
                  <p>{linkify(s.text, s.links)}</p>
                </div>
              ))}
            </div>
            <Ask id="CONTACT_WORK" ask={PEIXOTO_CONTACT_WORK} />
          </div>
        </section>

        {/* THE RESULTS: the retro stat band as five phases (Jules's B7).
            September, phase 3, is the lead: a full row from 768px, the
            largest outlined figure and the gold bar; phases 1 and 2 sit
            above it, and phases 4 and 5 (Tim's 10/14 additions) sit lighter
            below it on the B7 quiet hairline with a smaller figure. Notes
            render as their own paragraphs, in copy.md order. No coda: the
            engagement is complete. */}
        <section className="vw-stats-band" aria-labelledby="vw-results-title">
          <div className="retro-strip" aria-hidden />
          <div className="vw-inner">
            <div className="vw-wrap">
              <p className="vw-label">{PEIXOTO_RESULTS.label}</p>
              <div className="vw-accent" aria-hidden />
              <h2 id="vw-results-title">{PEIXOTO_RESULTS.heading}</h2>
              <ol className="vw-phases">
                {PEIXOTO_RESULTS.phases.map((ph) => (
                  <li
                    key={ph.label}
                    className={`vw-phase${ph.kind === 'lead' ? ' vw-phase-lead' : ''}${
                      ph.kind === 'quiet' ? ' vw-phase-quiet' : ''
                    }`}
                  >
                    <p className="vw-phase-label">{ph.label}</p>
                    <span className="vw-num">{ph.num}</span>
                    <p className="vw-lbl">{ph.lbl}</p>
                    {ph.notes.map((n) => (
                      <p key={n} className="vw-phase-note">
                        {n}
                      </p>
                    ))}
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className="retro-strip" aria-hidden />
        </section>

        {/* RELATED READING (Vega, 2026-10-22): the posts this page proves. */}
        <RelatedReading slugs={PEIXOTO_RELATED_READING} />
      </main>

      {/* NEXT: the live closing block, this page's own ask */}
      <div className="vw">
        <ClosingBlock>
          <section className="vw-cta" aria-labelledby="vw-next-title">
            <p className="vw-label">{PEIXOTO_NEXT.label}</p>
            <h2 id="vw-next-title">{PEIXOTO_NEXT.heading}</h2>
            <p className="vw-lead">{PEIXOTO_NEXT.lead}</p>
            <a href={PEIXOTO_NEXT.href} className="btn-gold inline-flex items-center gap-3 text-xs py-4 px-10">
              {PEIXOTO_NEXT.cta}
              <span className="text-base leading-none" aria-hidden>
                &rarr;
              </span>
            </a>
          </section>
          <SiteFooter />
        </ClosingBlock>
      </div>
    </>
  )
}
