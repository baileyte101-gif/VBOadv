import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import ClosingBlock from '@/components/ClosingBlock'
import SiteFooter from '@/components/SiteFooter'
import { linkify, type InlineLinkSpec } from '@/lib/linkify'
import {
  SG_URL,
  SG_APPROVED,
  SG_SHOWN,
  SG_PUBLISHED,
  SG_TITLE,
  SG_DESCRIPTION,
  SG_CLIENT,
  SG_H1,
  SG_SUBHEAD,
  SG_SNAPSHOT,
  SG_CHALLENGE,
  SG_CONTACT_CHALLENGE,
  SG_DID,
  SG_WORK_IMAGES,
  SG_CONTACT_WEBSITE,
  SG_SOCIAL,
  SG_CONTACT_SOCIAL,
  SG_ADS,
  SG_RESULTS,
  SG_QUOTE,
  SG_NEXT,
  SG_SHARE_IMAGE,
  SG_RELATED_READING,
  sgArticleSchema,
  sgBreadcrumbSchema,
  WORK_INDEX_NAME,
  WORK_INDEX_PATH,
} from '@/lib/work'
import PostVideo from './PostVideo'
import RelatedReading from '../RelatedReading'
import '../work.css'

// The Sir Galloway case study, on the IPPE template (../ippe-soccer-tours).
//
// PREVIEW ONLY until Morgan approves the page and Tim gives the publish go.
// The switch is src/lib/indexable.ts: until "case-studies/sir-galloway" is in
// it, this page is noindex and out of the sitemap, and a production build
// serves this URL as a 404 (SG_SHOWN in src/lib/work.ts). Previews and local
// builds render it, noindex, for review.
const IS_INDEXABLE = SG_APPROVED

// The publish commit must also set the go-live date. Refuse to build an
// indexable page that would ship without one.
if (IS_INDEXABLE && !SG_PUBLISHED) {
  throw new Error(
    'Sir Galloway case study: set SG_PUBLISHED in src/lib/work.ts to the go-live date before making the page indexable.'
  )
}

export const metadata: Metadata = {
  title: SG_TITLE,
  description: SG_DESCRIPTION,
  robots: IS_INDEXABLE ? { index: true, follow: true } : { index: false, follow: false },
  ...(IS_INDEXABLE && { alternates: { canonical: SG_URL } }),
  // The share picture is this case study's own (its card picture at
  // 1200 x 630, Vega 2026-10-22), not the bee card. A page that sets its own
  // openGraph replaces the root layout's whole object, so it is listed here.
  openGraph: {
    title: SG_TITLE,
    description: SG_DESCRIPTION,
    type: 'article',
    siteName: 'VBO Advertising',
    url: SG_URL,
    images: [SG_SHARE_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    images: [{ url: SG_SHARE_IMAGE.url, alt: SG_SHARE_IMAGE.alt }],
  },
}

const img = SG_WORK_IMAGES

// A contact prompt (Jules's B5): one plain line in body type, its only link
// the address or "Let's talk". No button: Next keeps the page's only one.
function Ask({ id, ask }: { id: string; ask: { text: string; link: InlineLinkSpec } }) {
  return (
    <p className="vw-ask" data-ask={id}>
      {linkify(ask.text, [ask.link])}
    </p>
  )
}

export default function SirGallowayCaseStudyPage() {
  if (!SG_SHOWN) notFound()

  const lastPara = SG_QUOTE.text.length - 1

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sgArticleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sgBreadcrumbSchema) }}
      />

      <Nav />

      <main className="vw pt-16">
        {/* HERO: plain ground, headline first. The Pinecrest storefront image
            (Tim, 10/6), 3:4, where IPPE has its homepage in a phone. Its own
            width and height set the ratio; no CSS change. Jules's B1. */}
        <section className="vw-sec vw-hero ground-plain">
          <div className="vw-wrap vw-hero-grid">
            <div>
              <p className="vw-label">
                <a href={WORK_INDEX_PATH}>{WORK_INDEX_NAME}</a> / {SG_CLIENT}
              </p>
              <div className="vw-accent" aria-hidden />
              <h1>{SG_H1}</h1>
              <p className="vw-dek">{SG_SUBHEAD}</p>
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

        {/* SNAPSHOT: step-up ground, the client in seven facts */}
        <section className="vw-snap ground-plain step-up" aria-labelledby="vw-snap-title">
          <div className="vw-wrap">
            <h2 className="vw-label" id="vw-snap-title">
              Client Snapshot
            </h2>
            <div className="vw-accent" aria-hidden />
            <dl className="vw-snap-grid">
              {SG_SNAPSHOT.map((c) => (
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
            <p className="vw-label">{SG_CHALLENGE.label}</p>
            <div className="vw-accent" aria-hidden />
            <h2 style={{ marginBottom: 40 }}>{SG_CHALLENGE.heading}</h2>
            <div className="vw-body">
              {SG_CHALLENGE.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <Ask id="CONTACT_CHALLENGE" ask={SG_CONTACT_CHALLENGE} />
          </div>
        </section>

        {/* Retro divider band, carrying the client's name */}
        <div className="vw-divider" aria-hidden>
          <div className="vw-divider-name">
            <span className="retro-outline">{SG_CLIENT}</span>
          </div>
          <div className="retro-divider-strip" />
        </div>

        {/* 02 WHAT WE DID: harbour. Five steps (IPPE has three): 04 Social
            media is new on 10/13 and Ads moves to 05. No CSS change. */}
        <section className="vw-sec ground-harbour">
          <div className="vw-ghost" aria-hidden>
            02
          </div>
          <div className="vw-wrap">
            <p className="vw-label">{SG_DID.label}</p>
            <div className="vw-accent" aria-hidden />
            <h2>{SG_DID.heading}</h2>
            <div className="vw-steps">
              {SG_DID.steps.map((s) => (
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

        {/* 03 THE WORK: smoke / granite. Live captures and real photography.
            Five images: row 2 pairs the Google listing (04) and the Palmetto
            Bay storefront (05) where IPPE has its carousel strip (Jules's B2). */}
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
                    src={img.brandBook.src}
                    alt={img.brandBook.alt}
                    width={img.brandBook.width}
                    height={img.brandBook.height}
                    sizes="(min-width: 1024px) 740px, 100vw"
                  />
                </div>
                <figcaption className="vw-cap">
                  <b>01</b>
                  {img.brandBook.caption}
                </figcaption>
              </figure>
              <figure>
                <div className="vw-browser">
                  <div className="vw-bar" aria-hidden>
                    <i />
                    <i />
                    <i />
                    <span>sirgalloway.com</span>
                  </div>
                  <Image
                    src={img.pickupPage.src}
                    alt={img.pickupPage.alt}
                    width={img.pickupPage.width}
                    height={img.pickupPage.height}
                    sizes="(min-width: 1024px) 480px, 100vw"
                  />
                </div>
                <figcaption className="vw-cap">
                  <b>03</b>
                  {img.pickupPage.caption}
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
                <div className="vw-work-pair">
                  <figure>
                    <div className="vw-shadowed">
                      <Image
                        src={img.listing.src}
                        alt={img.listing.alt}
                        width={img.listing.width}
                        height={img.listing.height}
                        sizes="(min-width: 1024px) 460px, (min-width: 640px) 50vw, 100vw"
                      />
                    </div>
                    <figcaption className="vw-cap">
                      <b>04</b>
                      {img.listing.caption}
                    </figcaption>
                  </figure>
                  <figure>
                    <div className="vw-shadowed">
                      <Image
                        src={img.storefront.src}
                        alt={img.storefront.alt}
                        width={img.storefront.width}
                        height={img.storefront.height}
                        sizes="(min-width: 1024px) 460px, (min-width: 640px) 50vw, 100vw"
                      />
                    </div>
                    <figcaption className="vw-cap">
                      <b>05</b>
                      {img.storefront.caption}
                    </figcaption>
                  </figure>
                </div>
              </div>
            </div>
            <Ask id="CONTACT_WEBSITE" ask={SG_CONTACT_WEBSITE} />
          </div>
        </section>

        {/* 04 SOCIAL MEDIA (new 10/13, Jules's B6): plain ground. The owner's
            words, then three pairs from the feed, before the relaunch on the
            left (on top on a phone), after on the right. Post images only: no
            comments, handles or profile chrome, and NO LINKS on any post (not
            to Instagram, never to the client-private review page). Mrs. Mills's
            quote is plain HTML, no review markup. CONTACT_SOCIAL under the last
            pair. Since 10/13 (step 17b) pairs B and C "after" are the posts
            themselves as muted, looping video (PostVideo: plays only on screen,
            never on its own under reduced motion, a Pause and Play button). */}
        <section className="vw-sec ground-plain vw-social" aria-labelledby="vw-social-title">
          <div className="vw-ghost" aria-hidden>
            04
          </div>
          <div className="vw-wrap vw-social-grid">
            <div className="vw-social-text">
              <p className="vw-label">{SG_SOCIAL.label}</p>
              <div className="vw-accent" aria-hidden />
              <h2 id="vw-social-title">{SG_SOCIAL.heading}</h2>
              <div className="vw-body">
                <p>{SG_SOCIAL.intro}</p>
              </div>
              <figure className="vw-owner-quote">
                <blockquote>
                  <p>{`“${SG_SOCIAL.quote.text}”`}</p>
                </blockquote>
                <figcaption className="vw-credit">
                  <cite>
                    <b>{SG_SOCIAL.quote.name},</b> {SG_SOCIAL.quote.role}
                  </cite>
                </figcaption>
              </figure>
            </div>
            <div className="vw-pairs">
              {SG_SOCIAL.pairs.map((pair) => (
                <div key={pair.id} className="vw-pair" data-pair={pair.id}>
                  {(['before', 'after'] as const).map((side) => {
                    const post = pair[side]
                    return (
                      <figure key={side} className={side === 'before' ? 'vw-before' : 'vw-after'}>
                        <p className="vw-pair-label">
                          {side === 'before' ? SG_SOCIAL.beforeLabel : SG_SOCIAL.afterLabel}
                        </p>
                        <div className={`vw-post${post.kind === 'video' ? ' vw-post-video' : ''}`}>
                          {post.kind === 'video' ? (
                            <PostVideo
                              src={post.src}
                              poster={post.poster}
                              width={post.width}
                              height={post.height}
                              label={post.label}
                            />
                          ) : (
                            <Image
                              src={post.src}
                              alt={post.alt}
                              width={post.width}
                              height={post.height}
                              sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 78vw"
                            />
                          )}
                        </div>
                        <figcaption className="vw-cap vw-post-cap">{post.caption}</figcaption>
                      </figure>
                    )
                  })}
                </div>
              ))}
              <Ask id="CONTACT_SOCIAL" ask={SG_CONTACT_SOCIAL} />
            </div>
          </div>
        </section>

        {/* THE ADS: four of the ads that ran from September 28, 2026, on the
            same granite ground as The Work. Labels only, no figures. */}
        <section className="vw-sec ground-smoke seam-in-out quiet-panel" aria-labelledby="vw-ads-title">
          <div className="vw-wrap">
            <p className="vw-label">{SG_ADS.label}</p>
            <div className="vw-accent" aria-hidden />
            <h2 id="vw-ads-title">{SG_ADS.heading}</h2>
            <p className="vw-ads-note">{SG_ADS.note}</p>
            <div className="vw-ads-row">
              {SG_ADS.items.map((ad) => (
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

        {/* THE RESULTS: the retro stat band, in Mary's order (Jules's B7,
            reworked 10/13). Two phases since step 17b: the 64%, then the about
            50%, which leads: a full row, the largest outlined figure and the
            gold bar, as phase 3 had. */}
        <section className="vw-stats-band" aria-labelledby="vw-results-title">
          <div className="retro-strip" aria-hidden />
          <div className="vw-inner">
            <div className="vw-wrap">
              <p className="vw-label">{SG_RESULTS.label}</p>
              <div className="vw-accent" aria-hidden />
              <h2 id="vw-results-title">{SG_RESULTS.heading}</h2>
              <ol className="vw-phases">
                {SG_RESULTS.phases.map((ph) => (
                  <li
                    key={ph.label}
                    className={`vw-phase${ph.kind === 'words' ? ' vw-phase-quiet' : ''}${ph.kind === 'lead' ? ' vw-phase-lead' : ''}`}
                  >
                    <p className="vw-phase-label">{ph.label}</p>
                    <span className={`vw-num${ph.kind === 'words' ? ' vw-num-words' : ''}`}>{ph.num}</span>
                    <p className="vw-lbl">{ph.lbl}</p>
                    {ph.note && <p className="vw-phase-note">{ph.note}</p>}
                  </li>
                ))}
              </ol>
              <p className="vw-coda">{SG_RESULTS.coda}</p>
            </div>
          </div>
          <div className="retro-strip" aria-hidden />
        </section>

        {/* THE QUOTE: plain HTML, no review markup. Morgan's three paragraphs,
            kept as she wrote them: opening mark on the first, closing mark on
            the last (Jules's B4 sets the gap between them). */}
        <section className="vw-sec ground-plain">
          <div className="vw-wrap">
            <figure className="vw-quote">
              <blockquote>
                {SG_QUOTE.text.map((p, i) => (
                  <p key={i}>{`${i === 0 ? '“' : ''}${p}${i === lastPara ? '”' : ''}`}</p>
                ))}
              </blockquote>
              <div className="vw-rule" aria-hidden />
              <figcaption className="vw-credit">
                <cite>
                  <b>{SG_QUOTE.name},</b> {SG_QUOTE.role}
                </cite>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* RELATED READING (Vega, 2026-10-22): the posts this page proves. */}
        <RelatedReading slugs={SG_RELATED_READING} />
      </main>

      {/* NEXT: the live closing block, this page's own ask */}
      <div className="vw">
        <ClosingBlock>
          <section className="vw-cta" aria-labelledby="vw-next-title">
            <p className="vw-label">{SG_NEXT.label}</p>
            <h2 id="vw-next-title">{SG_NEXT.heading}</h2>
            <p className="vw-lead">{SG_NEXT.lead}</p>
            <a href={SG_NEXT.href} className="btn-gold inline-flex items-center gap-3 text-xs py-4 px-10">
              {SG_NEXT.cta}
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
