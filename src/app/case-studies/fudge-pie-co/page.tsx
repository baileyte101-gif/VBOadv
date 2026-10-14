import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import ClosingBlock from '@/components/ClosingBlock'
import SiteFooter from '@/components/SiteFooter'
import { SHARE_IMAGE } from '@/lib/share'
import { linkify, type InlineLinkSpec } from '@/lib/linkify'
import {
  FUDGE_PIE_URL,
  FUDGE_PIE_APPROVED,
  FUDGE_PIE_SHOWN,
  FUDGE_PIE_PUBLISHED,
  FUDGE_PIE_TITLE,
  FUDGE_PIE_DESCRIPTION,
  FUDGE_PIE_CLIENT,
  FUDGE_PIE_H1,
  FUDGE_PIE_SUBHEAD,
  FUDGE_PIE_SNAPSHOT,
  FUDGE_PIE_CHALLENGE,
  FUDGE_PIE_CONTACT_CHALLENGE,
  FUDGE_PIE_DID,
  FUDGE_PIE_WORK_IMAGES,
  FUDGE_PIE_CONTACT_WORK,
  FUDGE_PIE_RESULTS,
  FUDGE_PIE_QUOTE,
  FUDGE_PIE_NEXT,
  fudgePieArticleSchema,
  fudgePieBreadcrumbSchema,
  WORK_INDEX_NAME,
  WORK_INDEX_PATH,
} from '@/lib/work'
import '../work.css'

// The Fudge Pie Co case study, on the IPPE template (../ippe-soccer-tours)
// with the Sir Galloway rework's machinery (hero photograph, contact prompts)
// and this page's own differences: NO Ads strip and NO Social section (VBO
// never ran paid media or managed social for Fudge Pie, so the page claims
// neither), and a QUALITATIVE results band: label, heading, a two-sentence
// note and a coda, no phases and no figures (copy.md; Dash A).
//
// Stacey's testimonial renders VERBATIM, "VRO" included: it becomes "VBO"
// only with her explicit OK (Tim's standing instruction, 10/13). Do not
// correct it here or anywhere.
//
// PREVIEW ONLY until Stacey approves the page and Tim gives the publish go.
// The switch is src/lib/indexable.ts: until "case-studies/fudge-pie-co" is in
// it, this page is noindex and out of the sitemap, and a production build
// serves this URL as a 404 (FUDGE_PIE_SHOWN in src/lib/work.ts). Previews and
// local builds render it, noindex, for review.
const IS_INDEXABLE = FUDGE_PIE_APPROVED

// The publish commit must also set the go-live date. Refuse to build an
// indexable page that would ship without one.
if (IS_INDEXABLE && !FUDGE_PIE_PUBLISHED) {
  throw new Error(
    'Fudge Pie Co case study: set FUDGE_PIE_PUBLISHED in src/lib/work.ts to the go-live date before making the page indexable.'
  )
}

export const metadata: Metadata = {
  title: FUDGE_PIE_TITLE,
  description: FUDGE_PIE_DESCRIPTION,
  robots: IS_INDEXABLE ? { index: true, follow: true } : { index: false, follow: false },
  ...(IS_INDEXABLE && { alternates: { canonical: FUDGE_PIE_URL } }),
  // The share image is the bee and VBO lockup (src/lib/share.ts), as on the
  // IPPE page: a page that sets its own openGraph replaces the root layout's
  // whole object, so without this line the page would share with no picture.
  openGraph: {
    title: FUDGE_PIE_TITLE,
    description: FUDGE_PIE_DESCRIPTION,
    type: 'article',
    siteName: 'VBO Advertising',
    url: FUDGE_PIE_URL,
    images: [SHARE_IMAGE],
  },
}

const img = FUDGE_PIE_WORK_IMAGES

// A contact prompt (Jules's B5): one plain line in body type, its only link
// the address or "Let's talk". No button: Next keeps the page's only one.
function Ask({ id, ask }: { id: string; ask: { text: string; link: InlineLinkSpec } }) {
  return (
    <p className="vw-ask" data-ask={id}>
      {linkify(ask.text, [ask.link])}
    </p>
  )
}

export default function FudgePieCaseStudyPage() {
  if (!FUDGE_PIE_SHOWN) notFound()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(fudgePieArticleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(fudgePieBreadcrumbSchema) }}
      />

      <Nav />

      <main className="vw pt-16">
        {/* HERO: plain ground, headline first. Stacey's own pecan pie
            photograph (Jules's pick), 3:4 in the Sir Galloway hero slot
            (.vw-hero-photo). Its own width and height set the ratio. No
            caption, as the other heroes. */}
        <section className="vw-sec vw-hero ground-plain">
          <div className="vw-wrap vw-hero-grid">
            <div>
              <p className="vw-label">
                <a href={WORK_INDEX_PATH}>{WORK_INDEX_NAME}</a> / {FUDGE_PIE_CLIENT}
              </p>
              <div className="vw-accent" aria-hidden />
              <h1>{FUDGE_PIE_H1}</h1>
              <p className="vw-dek">{FUDGE_PIE_SUBHEAD}</p>
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
              {FUDGE_PIE_SNAPSHOT.map((c) => (
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
            <p className="vw-label">{FUDGE_PIE_CHALLENGE.label}</p>
            <div className="vw-accent" aria-hidden />
            <h2 style={{ marginBottom: 40 }}>{FUDGE_PIE_CHALLENGE.heading}</h2>
            <div className="vw-body">
              {FUDGE_PIE_CHALLENGE.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <Ask id="CONTACT_CHALLENGE" ask={FUDGE_PIE_CONTACT_CHALLENGE} />
          </div>
        </section>

        {/* Retro divider band, carrying the client's name */}
        <div className="vw-divider" aria-hidden>
          <div className="vw-divider-name">
            <span className="retro-outline">{FUDGE_PIE_CLIENT}</span>
          </div>
          <div className="retro-divider-strip" />
        </div>

        {/* 02 WHAT WE DID: harbour. Four steps (the website, the move, one
            place to run it, security and peace of mind), link on step 01.
            No CSS change. */}
        <section className="vw-sec ground-harbour">
          <div className="vw-ghost" aria-hidden>
            02
          </div>
          <div className="vw-wrap">
            <p className="vw-label">{FUDGE_PIE_DID.label}</p>
            <div className="vw-accent" aria-hidden />
            <h2>{FUDGE_PIE_DID.heading}</h2>
            <div className="vw-steps">
              {FUDGE_PIE_DID.steps.map((s) => (
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

        {/* 03 THE WORK: smoke / granite. Three slots in copy.md order: the
            live homepage in the phone frame (01, the standing IPPE geometry),
            the Classic Chocolate pie page in the browser frame (02), and her
            radial pecan photograph (03) at the Sir Galloway pair scale.
            Screens are the logged-out storefront only. The second ask closes
            the section. */}
        <section className="vw-sec ground-smoke seam-in-out">
          <div className="vw-ghost" aria-hidden>
            03
          </div>
          <div className="vw-wrap">
            <h2 className="vw-label">The Work</h2>
            <div className="vw-accent" aria-hidden />
            <div className="vw-work-stack">
              <div className="vw-work-row2">
                <figure className="vw-phone-cell">
                  <div className="vw-phone vw-phone-sm">
                    <div className="vw-scr">
                      <Image
                        src={img.homePhone.src}
                        alt={img.homePhone.alt}
                        width={img.homePhone.width}
                        height={img.homePhone.height}
                        sizes="250px"
                      />
                    </div>
                  </div>
                  <figcaption className="vw-cap">
                    <b>01</b>
                    {img.homePhone.caption}
                  </figcaption>
                </figure>
                <figure>
                  <div className="vw-browser">
                    <div className="vw-bar" aria-hidden>
                      <i />
                      <i />
                      <i />
                      <span>thefudgepie.com</span>
                    </div>
                    <Image
                      src={img.piePage.src}
                      alt={img.piePage.alt}
                      width={img.piePage.width}
                      height={img.piePage.height}
                      sizes="(min-width: 1024px) 720px, 100vw"
                    />
                  </div>
                  <figcaption className="vw-cap">
                    <b>02</b>
                    {img.piePage.caption}
                  </figcaption>
                </figure>
              </div>
              <figure className="vw-work-one">
                <div className="vw-shadowed">
                  <Image
                    src={img.radial.src}
                    alt={img.radial.alt}
                    width={img.radial.width}
                    height={img.radial.height}
                    sizes="(min-width: 508px) 460px, 100vw"
                  />
                </div>
                <figcaption className="vw-cap">
                  <b>03</b>
                  {img.radial.caption}
                </figcaption>
              </figure>
            </div>
            <Ask id="CONTACT_WORK" ask={FUDGE_PIE_CONTACT_WORK} />
          </div>
        </section>

        {/* THE RESULTS: the retro stat band, QUALITATIVE (copy.md; Dash A).
            Label, heading, the two-sentence note, then the coda. No phases,
            no figures, nothing numeric: the season's first pie has not
            shipped, by design, and her quote below carries the proof. */}
        <section className="vw-stats-band" aria-labelledby="vw-results-title">
          <div className="retro-strip" aria-hidden />
          <div className="vw-inner">
            <div className="vw-wrap">
              <p className="vw-label">{FUDGE_PIE_RESULTS.label}</p>
              <div className="vw-accent" aria-hidden />
              <h2 id="vw-results-title">{FUDGE_PIE_RESULTS.heading}</h2>
              <p className="vw-results-note">{FUDGE_PIE_RESULTS.note}</p>
              <p className="vw-coda">{FUDGE_PIE_RESULTS.coda}</p>
            </div>
          </div>
          <div className="retro-strip" aria-hidden />
        </section>

        {/* THE QUOTE: plain HTML, no review markup. Stacey's six sentences,
            verbatim, one paragraph. "VRO" stays as she wrote it until her OK
            (Tim's standing instruction, 10/13): do not correct it. */}
        <section className="vw-sec ground-plain">
          <div className="vw-wrap">
            <figure className="vw-quote">
              <blockquote>
                <p>&ldquo;{FUDGE_PIE_QUOTE.text}&rdquo;</p>
              </blockquote>
              <div className="vw-rule" aria-hidden />
              <figcaption className="vw-credit">
                <cite>
                  <b>{FUDGE_PIE_QUOTE.name},</b> {FUDGE_PIE_QUOTE.role}
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
            <p className="vw-label">{FUDGE_PIE_NEXT.label}</p>
            <h2 id="vw-next-title">{FUDGE_PIE_NEXT.heading}</h2>
            <p className="vw-lead">{FUDGE_PIE_NEXT.lead}</p>
            <a href={FUDGE_PIE_NEXT.href} className="btn-gold inline-flex items-center gap-3 text-xs py-4 px-10">
              {FUDGE_PIE_NEXT.cta}
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
