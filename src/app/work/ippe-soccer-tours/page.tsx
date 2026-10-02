import type { Metadata } from 'next'
import Image from 'next/image'
import Nav from '@/components/Nav'
import ClosingBlock from '@/components/ClosingBlock'
import SiteFooter from '@/components/SiteFooter'
import { INDEXABLE_PAGES } from '@/lib/indexable'
import { linkify } from '@/lib/linkify'
import {
  IPPE_SLUG,
  IPPE_URL,
  IPPE_TITLE,
  IPPE_DESCRIPTION,
  IPPE_CLIENT,
  IPPE_H1,
  IPPE_SUBHEAD,
  IPPE_SNAPSHOT,
  IPPE_CHALLENGE,
  IPPE_DID,
  IPPE_WORK_IMAGES,
  IPPE_ADS,
  IPPE_RESULTS,
  IPPE_QUOTE,
  IPPE_NEXT,
  ippeArticleSchema,
  ippeBreadcrumbSchema,
} from '@/lib/work'
import '../work.css'

// Indexing follows src/lib/indexable.ts, the site's single switch: this page
// stays noindex (and out of the sitemap) until its slug is added there in the
// go-live commit, after Chris has approved the page, the figures and photos.
const IS_INDEXABLE = INDEXABLE_PAGES.has(IPPE_SLUG)

export const metadata: Metadata = {
  title: IPPE_TITLE,
  description: IPPE_DESCRIPTION,
  robots: IS_INDEXABLE ? { index: true, follow: true } : { index: false, follow: false },
  ...(IS_INDEXABLE && { alternates: { canonical: IPPE_URL } }),
  openGraph: {
    title: IPPE_TITLE,
    description: IPPE_DESCRIPTION,
    type: 'article',
    siteName: 'VBO Advertising',
    url: IPPE_URL,
  },
}

const img = IPPE_WORK_IMAGES

export default function IppeCaseStudyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ippeArticleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ippeBreadcrumbSchema) }}
      />

      <Nav />

      <main className="vw pt-16">
        {/* HERO: plain ground, headline first, the client's homepage on a phone */}
        <section className="vw-sec vw-hero ground-plain">
          <div className="vw-wrap vw-hero-grid">
            <div>
              <p className="vw-label">
                <a href="/work">Work</a> / {IPPE_CLIENT}
              </p>
              <div className="vw-accent" aria-hidden />
              <h1>{IPPE_H1}</h1>
              <p className="vw-dek">{IPPE_SUBHEAD}</p>
            </div>
            <div className="vw-phonewrap">
              <div className="vw-phone">
                <div className="vw-scr">
                  <Image
                    src={img.homepage.src}
                    alt={img.homepage.alt}
                    width={img.homepage.width}
                    height={img.homepage.height}
                    sizes="300px"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SNAPSHOT: step-up ground, the client in seven facts */}
        <section className="vw-snap ground-plain step-up" aria-labelledby="vw-snap-title">
          <div className="vw-wrap">
            <h2 className="vw-label" id="vw-snap-title">
              Client Snapshot
            </h2>
            <div className="vw-accent" aria-hidden />
            <dl className="vw-snap-grid">
              {IPPE_SNAPSHOT.map((c) => (
                <div key={c.k} className={`vw-cell ${c.wide ? 'vw-wide' : ''} ${c.wideSm ? 'vw-wide-sm' : ''}`}>
                  <dt>{c.k}</dt>
                  <dd>{linkify(c.v, c.links)}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* 01 THE CHALLENGE: gold linework */}
        <section className="vw-sec ground-gold seam-in quiet-panel">
          <div className="vw-ghost" aria-hidden>
            01
          </div>
          <div className="vw-wrap">
            <p className="vw-label">{IPPE_CHALLENGE.label}</p>
            <div className="vw-accent" aria-hidden />
            <h2 style={{ marginBottom: 40 }}>{IPPE_CHALLENGE.heading}</h2>
            <div className="vw-body">
              {IPPE_CHALLENGE.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* Retro divider band, carrying the client's name */}
        <div className="vw-divider" aria-hidden>
          <div className="vw-divider-name">
            <span className="retro-outline">{IPPE_CLIENT}</span>
          </div>
          <div className="retro-divider-strip" />
        </div>

        {/* 02 WHAT WE DID: harbour */}
        <section className="vw-sec ground-harbour">
          <div className="vw-ghost" aria-hidden>
            02
          </div>
          <div className="vw-wrap">
            <p className="vw-label">{IPPE_DID.label}</p>
            <div className="vw-accent" aria-hidden />
            <h2>{IPPE_DID.heading}</h2>
            <div className="vw-steps">
              {IPPE_DID.steps.map((s) => (
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

        {/* 03 THE WORK: smoke / granite. Live-site captures only: no club
            crests, no recognisable children. */}
        <section className="vw-sec ground-smoke seam-in-out">
          <div className="vw-ghost" aria-hidden>
            03
          </div>
          <div className="vw-wrap">
            <h2 className="vw-label">The Work</h2>
            <div className="vw-accent" aria-hidden />
            <div className="vw-work-grid">
              <figure>
                <div className="vw-shadowed">
                  <Image
                    src={img.brandBoard.src}
                    alt={img.brandBoard.alt}
                    width={img.brandBoard.width}
                    height={img.brandBoard.height}
                    sizes="(min-width: 1024px) 740px, 100vw"
                  />
                </div>
                <figcaption className="vw-cap">
                  <b>01</b>
                  {img.brandBoard.caption}
                </figcaption>
              </figure>
              <figure>
                <div className="vw-browser">
                  <div className="vw-bar" aria-hidden>
                    <i />
                    <i />
                    <i />
                    <span>ippesoccertours.com</span>
                  </div>
                  <Image
                    src={img.tripPage.src}
                    alt={img.tripPage.alt}
                    width={img.tripPage.width}
                    height={img.tripPage.height}
                    sizes="(min-width: 1024px) 480px, 100vw"
                  />
                </div>
                <figcaption className="vw-cap">
                  <b>03</b>
                  {img.tripPage.caption}
                </figcaption>
              </figure>
              <div className="vw-full vw-work-row2">
                <figure className="vw-phone-cell">
                  <div className="vw-phone vw-phone-sm">
                    <div className="vw-scr">
                      <Image
                        src={img.homepage.src}
                        alt={img.homepage.alt}
                        width={img.homepage.width}
                        height={img.homepage.height}
                        sizes="250px"
                      />
                    </div>
                  </div>
                  <figcaption className="vw-cap">
                    <b>02</b>
                    {img.homepage.caption}
                  </figcaption>
                </figure>
                <figure>
                  <div className="vw-strip" tabIndex={0} role="region" aria-label="Testimonial carousel, scrolls sideways on small screens">
                    <Image
                      src={img.carousel.src}
                      alt={img.carousel.alt}
                      width={img.carousel.width}
                      height={img.carousel.height}
                      sizes="(min-width: 1024px) 860px, 900px"
                    />
                  </div>
                  <figcaption className="vw-cap">
                    <b>04</b>
                    {img.carousel.caption}
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </section>

        {/* THE ADS: the four ads that were running the day this page went
            live. Jules's "Look 1: Evidence Row" (2026-09-30), on the same
            granite ground as The Work above it so the two read as one stretch
            of evidence. Labels only: no figures here without Chris's
            written OK, which is a separate ask from the page approval. */}
        <section className="vw-sec ground-smoke seam-in-out quiet-panel" aria-labelledby="vw-ads-title">
          <div className="vw-wrap">
            <p className="vw-label">{IPPE_ADS.label}</p>
            <div className="vw-accent" aria-hidden />
            <h2 id="vw-ads-title">{IPPE_ADS.heading}</h2>
            <p className="vw-ads-note">{IPPE_ADS.note}</p>
            <div className="vw-ads-row">
              {IPPE_ADS.items.map((ad) => (
                <figure key={ad.src}>
                  <div className="vw-ad">
                    <Image
                      src={ad.src}
                      alt={ad.alt}
                      width={864}
                      height={1080}
                      sizes="(min-width: 1024px) 300px, (min-width: 480px) 45vw, 90vw"
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

        {/* 04 THE RESULTS: the retro stat band, for a client's numbers.
            The whole section needs Chris's written OK. If he says no to the
            figures, cut both stats and keep the heading and the last line. */}
        <section className="vw-stats-band" aria-labelledby="vw-results-title">
          <div className="retro-strip" aria-hidden />
          <div className="vw-inner">
            <div className="vw-wrap">
              <p className="vw-label">{IPPE_RESULTS.label}</p>
              <div className="vw-accent" aria-hidden />
              <h2 id="vw-results-title">{IPPE_RESULTS.heading}</h2>
              <div className="vw-stats">
                {IPPE_RESULTS.stats.map((s) => (
                  <div key={s.num}>
                    <span className="vw-num">{s.num}</span>
                    <p className="vw-lbl">{s.lbl}</p>
                  </div>
                ))}
              </div>
              <p className="vw-coda">{IPPE_RESULTS.coda}</p>
            </div>
          </div>
          <div className="retro-strip" aria-hidden />
        </section>

        {/* THE QUOTE: plain HTML, no review markup (Vega) */}
        <section className="vw-sec ground-plain">
          <div className="vw-wrap">
            <figure className="vw-quote">
              <blockquote>
                <p>&ldquo;{IPPE_QUOTE.text}&rdquo;</p>
              </blockquote>
              <div className="vw-rule" aria-hidden />
              <figcaption className="vw-credit">
                <cite>
                  <b>{IPPE_QUOTE.name},</b> {IPPE_QUOTE.role}
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
            <p className="vw-label">{IPPE_NEXT.label}</p>
            <h2 id="vw-next-title">{IPPE_NEXT.heading}</h2>
            <p className="vw-lead">{IPPE_NEXT.lead}</p>
            <a href={IPPE_NEXT.href} className="btn-gold inline-flex items-center gap-3 text-xs py-4 px-10">
              {IPPE_NEXT.cta}
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
