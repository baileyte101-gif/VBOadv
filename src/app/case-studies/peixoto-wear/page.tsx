import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import ClosingBlock from '@/components/ClosingBlock'
import SiteFooter from '@/components/SiteFooter'
import { SHARE_IMAGE } from '@/lib/share'
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
  PEIXOTO_WORK_IMAGES,
  PEIXOTO_CONTACT_WORK,
  PEIXOTO_ADS,
  PEIXOTO_RESULTS,
  PEIXOTO_QUOTE,
  PEIXOTO_NEXT,
  peixotoArticleSchema,
  peixotoBreadcrumbSchema,
  WORK_INDEX_NAME,
  WORK_INDEX_PATH,
} from '@/lib/work'
import '../work.css'

// The Peixoto Wear case study, on the IPPE template (../ippe-soccer-tours)
// with the Sir Galloway rework's machinery (hero photograph, contact prompts,
// phased results) and no Social section: VBO never ran Peixoto's organic
// social, so the page does not pretend otherwise.
//
// PREVIEW ONLY until Mauricio and Brunela approve the page and Tim gives the
// publish go. The switch is src/lib/indexable.ts: until
// "case-studies/peixoto-wear" is in it, this page is noindex and out of the
// sitemap, and a production build serves this URL as a 404 (PEIXOTO_SHOWN in
// src/lib/work.ts). Previews and local builds render it, noindex, for review.
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
  // The share image is the bee and VBO lockup (src/lib/share.ts), as on the
  // IPPE page: a page that sets its own openGraph replaces the root layout's
  // whole object, so without this line the page would share with no picture.
  openGraph: {
    title: PEIXOTO_TITLE,
    description: PEIXOTO_DESCRIPTION,
    type: 'article',
    siteName: 'VBO Advertising',
    url: PEIXOTO_URL,
    images: [SHARE_IMAGE],
  },
}

const img = PEIXOTO_WORK_IMAGES

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
                  src={img.hero.src}
                  alt={img.hero.alt}
                  width={img.hero.width}
                  height={img.hero.height}
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
            five): the setup, the tracking, the ads, the partnership. No CSS
            change. */}
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
          </div>
        </section>

        {/* 03 THE WORK: smoke / granite. Two frames in a pair (Jules's B2),
            lifestyle beside studio: Peixoto's own photography, nothing else.
            The studio frame renders one step smaller (.vw-work-sm) until the
            client's full-resolution master is pulled (Jules's manifest,
            resolution note). The second ask closes the section. */}
        <section className="vw-sec ground-smoke seam-in-out">
          <div className="vw-ghost" aria-hidden>
            03
          </div>
          <div className="vw-wrap">
            <h2 className="vw-label">The Work</h2>
            <div className="vw-accent" aria-hidden />
            <div className="vw-work-pair vw-work-pair-only">
              <figure>
                <div className="vw-shadowed">
                  <Image
                    src={img.cabana.src}
                    alt={img.cabana.alt}
                    width={img.cabana.width}
                    height={img.cabana.height}
                    sizes="(min-width: 1024px) 460px, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
                <figcaption className="vw-cap">
                  <b>01</b>
                  {img.cabana.caption}
                </figcaption>
              </figure>
              <figure className="vw-work-sm">
                <div className="vw-shadowed">
                  <Image
                    src={img.studio.src}
                    alt={img.studio.alt}
                    width={img.studio.width}
                    height={img.studio.height}
                    sizes="367px"
                  />
                </div>
                <figcaption className="vw-cap">
                  <b>02</b>
                  {img.studio.caption}
                </figcaption>
              </figure>
            </div>
            <Ask id="CONTACT_WORK" ask={PEIXOTO_CONTACT_WORK} />
          </div>
        </section>

        {/* THE ADS: three of the ads that ran, on the same granite ground as
            The Work. Labels only, no figures. */}
        <section className="vw-sec ground-smoke seam-in-out quiet-panel" aria-labelledby="vw-ads-title">
          <div className="vw-wrap">
            <p className="vw-label">{PEIXOTO_ADS.label}</p>
            <div className="vw-accent" aria-hidden />
            <h2 id="vw-ads-title">{PEIXOTO_ADS.heading}</h2>
            <p className="vw-ads-note">{PEIXOTO_ADS.note}</p>
            <div className="vw-ads-row vw-ads-row-3">
              {PEIXOTO_ADS.items.map((ad) => (
                <figure key={ad.src}>
                  <div className="vw-ad">
                    <Image
                      src={ad.src}
                      alt={ad.alt}
                      width={864}
                      height={1080}
                      sizes="(min-width: 1024px) 390px, (min-width: 480px) 45vw, 90vw"
                    />
                  </div>
                  <figcaption className="vw-ad-cap">
                    <b>{ad.title}</b>
                    {ad.meta}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* THE RESULTS: the retro stat band as three phases (Jules's B7).
            September is the lead: a full row from 768px, the largest outlined
            figure and the gold bar. No coda: the engagement is complete and
            the quote follows the phases directly. */}
        <section className="vw-stats-band" aria-labelledby="vw-results-title">
          <div className="retro-strip" aria-hidden />
          <div className="vw-inner">
            <div className="vw-wrap">
              <p className="vw-label">{PEIXOTO_RESULTS.label}</p>
              <div className="vw-accent" aria-hidden />
              <h2 id="vw-results-title">{PEIXOTO_RESULTS.heading}</h2>
              <ol className="vw-phases">
                {PEIXOTO_RESULTS.phases.map((ph) => (
                  <li key={ph.label} className={`vw-phase${ph.kind === 'lead' ? ' vw-phase-lead' : ''}`}>
                    <p className="vw-phase-label">{ph.label}</p>
                    <span className="vw-num">{ph.num}</span>
                    <p className="vw-lbl">{ph.lbl}</p>
                    {ph.note && <p className="vw-phase-note">{ph.note}</p>}
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className="retro-strip" aria-hidden />
        </section>

        {/* THE QUOTE: plain HTML, no review markup. Mauricio's three
            sentences, verbatim, one paragraph. */}
        <section className="vw-sec ground-plain">
          <div className="vw-wrap">
            <figure className="vw-quote">
              <blockquote>
                <p>&ldquo;{PEIXOTO_QUOTE.text}&rdquo;</p>
              </blockquote>
              <div className="vw-rule" aria-hidden />
              <figcaption className="vw-credit">
                <cite>
                  <b>{PEIXOTO_QUOTE.name},</b> {PEIXOTO_QUOTE.role}
                </cite>
              </figcaption>
            </figure>
          </div>
        </section>
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
