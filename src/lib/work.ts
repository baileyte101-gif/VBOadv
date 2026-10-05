import type { InlineLinkSpec } from '@/lib/linkify'

/*
 * The "Case Studies" section: the /case-studies index and the IPPE Soccer
 * Tours case study. Renamed from "Work" (/work) on 2026-10-05 at Tim's
 * request; next.config.js sends every /work URL here permanently.
 *
 * Copy is Mary's case study (2026-09-25 PM, section 3), with her recommended
 * number-free headline (option 1), verbatim. URL, titles, descriptions,
 * links and schema are Vega's SEO brief of the same date. Layout is Jules's
 * "Layout 1: Section System", which Tim picked on 2026-09-25.
 *
 * Gates, as they stand at go-live (2026-10-02): Chris approved the page, the
 * figures and the photos on 2026-09-29, and Tim confirmed on 10/1 that the
 * approval covers the "ads we ran" strip too. Chris's quote stays verbatim,
 * including the "work ethic in drive" typo, until he approves the fix. No
 * bookings and no revenue claimed, here or in the strip.
 *
 * The earlier "no club names or crests anywhere" line is dropped: the ads in
 * the strip are the finished ads that actually ran, and club crests, kits and
 * stadiums in IPPE's finished advertising were cleared by Tim on 2026-07-30.
 * The two marks that stay banned in copy, "Premier League" and "World Cup",
 * appear nowhere on this page or in the strip artwork.
 */

export const WORK_HOST = 'https://www.vboadv.com'

/**
 * Real lastmod for the sitemap. Went live 2026-10-02; both pages changed on
 * 2026-10-05 when the section moved to /case-studies.
 */
export const WORK_UPDATED = '2026-10-05'

// ---------------------------------------------------------------------------
// /case-studies index
// ---------------------------------------------------------------------------

export const WORK_INDEX_NAME = 'Case Studies'
export const WORK_INDEX_SLUG = 'case-studies'
export const WORK_INDEX_PATH = `/${WORK_INDEX_SLUG}`
export const WORK_INDEX_URL = `${WORK_HOST}${WORK_INDEX_PATH}`
export const WORK_INDEX_TITLE = 'Case Studies | VBO Advertising'
export const WORK_INDEX_DESCRIPTION =
  'Real client case studies told in partnership with our clients: what the business needed, what we built, and what changed.'

// Tim's copy, 2026-10-05, verbatim. The second paragraph is removed at his
// request.
export const WORK_INDEX_INTRO = [
  'These are real client case studies told in partnership with our clients. Each case study highlights what the business needed, what we built, and what changed and what resulted.',
]

// ---------------------------------------------------------------------------
// /case-studies/ippe-soccer-tours
// ---------------------------------------------------------------------------

export const IPPE_SLUG = `${WORK_INDEX_SLUG}/ippe-soccer-tours`
export const IPPE_PATH = `/${IPPE_SLUG}`
export const IPPE_URL = `${WORK_HOST}${IPPE_PATH}`

/** The day the page actually went public. The carousel still posts 10/8. */
export const IPPE_PUBLISHED = '2026-10-02'

export const IPPE_TITLE = 'IPPE Soccer Tours Case Study: Brand, Website & Ads | VBO'
export const IPPE_DESCRIPTION =
  "How VBO rebuilt IPPE Soccer Tours' brand and website and runs the ads that bring families in, driving more responses and opportunities."

export const IPPE_CLIENT = 'IPPE Soccer Tours'

// Mary's option 1. Tim approved the page as shown on 2026-09-27.
export const IPPE_H1 = "How we raised IPPE Soccer Tours' responses and opportunities"

export const IPPE_SUBHEAD =
  "We rebuilt the brand and the website and we run the ads, all aimed at one thing: more families asking to talk. IPPE's founder Chris Castell calls it “major increases in responses and opportunities.”"

export const IPPE_CARD_LINE =
  'A new brand and website, the ads to match, and more families asking to talk.'

export const IPPE_SNAPSHOT: {
  k: string
  v: string
  wide?: boolean
  /** Full row on phones only. */
  wideSm?: boolean
  links?: InlineLinkSpec[]
}[] = [
  { k: 'Client', v: 'IPPE Soccer Tours', wideSm: true },
  {
    k: 'What they do',
    v: 'Week-long trips that take American players inside English football, with their families along for the week',
    wide: true,
  },
  { k: 'Founder', v: 'Chris Castell' },
  { k: 'Touring since', v: '2016' },
  { k: 'With VBO since', v: 'May 2026' },
  { k: 'What we did', v: 'Brand, website, paid ads' },
  {
    k: 'The site',
    v: 'ippesoccertours.com, live since June 30, 2026',
    wideSm: true,
    links: [{ anchor: 'ippesoccertours.com', href: 'https://ippesoccertours.com', external: true }],
  },
]

export const IPPE_CHALLENGE = {
  label: 'The Challenge',
  heading: "Parents had to trust Chris before they'd ever met him.",
  body: [
    "IPPE's trips started with Chris's own players. Now they're open to any family, which means reaching parents who have never met him.",
    'For those families, saying yes means bringing a child across an ocean for a week. Before anything else, the brand, the site, and the ads had to earn one small yes: a request for a call.',
  ],
}

export const IPPE_DID = {
  label: 'What We Did',
  heading: 'We rebuilt the brand and the site, then went looking for the families.',
  steps: [
    {
      n: '01',
      title: 'Brand',
      text: 'New logo, new colors, new fonts, and a brand book, so IPPE looks like itself everywhere Chris uses it.',
      links: [] as InlineLinkSpec[],
    },
    {
      n: '02',
      title: 'Website',
      text: 'Every page of ippesoccertours.com, rebuilt and live since June 30, 2026. Each trip has its own page with the dates, the price, and the week laid out day by day. A request for a call is one tap away on every page.',
      links: [] as InlineLinkSpec[],
    },
    {
      n: '03',
      title: 'Ads',
      text: "We run IPPE's paid ads and keep improving the pages they send families to.",
      // Vega: the "What we did" block links to the homepage's services.
      links: [{ anchor: 'paid ads', href: '/#industries' }] as InlineLinkSpec[],
    },
  ],
}

export const IPPE_WORK_IMAGES = {
  brandBoard: {
    src: '/images/work/ippe-soccer-tours/ippe-soccer-tours-brand-board.png',
    width: 1600,
    height: 1000,
    alt: 'IPPE Soccer Tours brand board: the new crest, the colors and the type',
    caption: 'The new crest and the red that runs through everything.',
  },
  homepage: {
    src: '/images/work/ippe-soccer-tours/ippe-soccer-tours-homepage-phone.jpg',
    width: 645,
    height: 1398,
    alt: 'The IPPE Soccer Tours homepage on a phone: "Experience English football from within." with Request a Call and See Upcoming Trips buttons',
    caption: 'The homepage: “Experience English football from within.”',
  },
  tripPage: {
    src: '/images/work/ippe-soccer-tours/ippe-soccer-tours-trip-page.jpg',
    width: 1440,
    height: 900,
    alt: 'The top of an IPPE Soccer Tours trip page on desktop: "Manchester Soccer Tour, December 2026." with Request a Call and Register buttons',
    caption: 'A trip page: the dates, the price, and the week, day by day.',
  },
  carousel: {
    src: '/images/work/ippe-soccer-tours/ippe-soccer-tours-testimonial-carousel.jpg',
    width: 2970,
    height: 440,
    alt: "Chris Castell's testimonial set across the nine slides of an Instagram carousel",
    // Jules's working caption from Layout 1; Mary to confirm.
    caption: 'Chris’s words, carried across one swipe.',
  },
}

/*
 * "The Ads": the four ads that were running when this page went live.
 *
 * Jules's "Look 1: Evidence Row" (built 2026-09-30, Tim approved the option),
 * ported from Jules/designs/ippe-soccer-tours/paid-media/drafts/
 * new-round-2026-09-30/cards/strip-look1-evidence-row.html. Ad picks are
 * Mercury's, section 4 of the 2026-09-30 lane requirements: the founder ad
 * runs on its live Tour Together picture, and "Let's Plan It Together" is out.
 *
 * Labels only. There are no numbers in this section and none go in without
 * Chris's written OK, which is a separate ask from the page approval.
 *
 * Artwork is the real ad creative, resized to 864x1080 and re-encoded for the
 * web from the 1080x1350 masters. Nothing is recomposed or recoloured.
 */
export const IPPE_ADS = {
  label: 'The Ads',
  heading: 'The ads that bring families to the site.',
  note: "Cut from the founder's own footage of real tour weeks. No stock, no studio.",
  items: [
    {
      src: '/images/work/ippe-soccer-tours/ads/tour-film-15s.jpg',
      title: 'Tour Film \u00b7 15 seconds',
      meta: "New families \u00b7 film, cut from the founder's footage",
      alt: 'Cover frame of the 15 second tour film: young players at a club press table under the Bolton Wanderers backdrop, with the words Stadium Tours across the bottom.',
    },
    {
      src: '/images/work/ippe-soccer-tours/ads/tour-film-family-week.jpg',
      title: 'Tour Film \u00b7 Family Week',
      meta: 'Deciding families \u00b7 film \u00b7 parents travel on this one',
      alt: 'Cover frame of the family week film: a tour family photographed together outside their hotel, with the words Parents enjoy the tour with their player across the bottom.',
    },
    {
      src: '/images/work/ippe-soccer-tours/ads/founder-tour-together.jpg',
      title: 'The founder runs every tour',
      meta: 'Returning visitors \u00b7 still',
      alt: 'Ad still: a tour group standing pitchside in an empty English stadium, headline Tour Together, line Experience the English game as a family, and a Request a Call button.',
    },
    {
      src: '/images/work/ippe-soccer-tours/ads/train-inside.jpg',
      title: 'Train Inside the English Game',
      meta: 'New families \u00b7 still \u00b7 the long-running opener',
      alt: 'Ad still: a coach running a session with young players on a grass training pitch, headline Train inside the English game, line Living the English game, not watching it from the stands, and a Request a Call button.',
    },
  ],
}

export const IPPE_RESULTS = {
  label: 'The Results',
  heading: 'More families asking, for less.',
  stats: [
    {
      num: '0 to 6',
      lbl: 'families asking to talk, from the report before to the report for August 11 to September 15, 2026.',
    },
    {
      num: 'Half',
      lbl: 'what each one was costing to bring in by the end of that period, compared with the start.',
    },
  ],
  coda: 'Each of the six is a family asking for a call about a trip. Chris takes it from there.',
}

// Verbatim, including "work ethic in drive", until Chris approves the fix.
export const IPPE_QUOTE = {
  text: 'After knowing Tim Bailey for over a decade, it was great to work with him in a professional setting once more. His work ethic in drive has given us a platform to be truly successful in our industry. Over the past few months, we have seen major increases in responses and opportunities for our business as we continue to grow. I am looking forward to the next few months to see how VBO can elevate us further ahead of our competitors!',
  name: 'Chris Castell',
  role: 'Executive Director, Coerver Coaching Carolinas / EPL Soccer LLC',
}

export const IPPE_NEXT = {
  label: 'Next',
  heading: "If your customers have to trust you before they buy, let's talk.",
  lead: "We take on a few clients at a time, on purpose. Tell us what you sell and who has to trust you first, and we'll tell you where we'd start.",
  cta: "Let's Connect",
  href: 'mailto:hello@vboadv.com',
}

// ---------------------------------------------------------------------------
// Structured data (Vega). The root Organization renders sitewide from
// src/app/layout.tsx and is referenced by @id. Chris's quote is plain HTML:
// no Review, Rating or AggregateRating anywhere, because Google treats
// reviews a business hosts about itself as ineligible for review stars.
// ---------------------------------------------------------------------------

export const ippeArticleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: IPPE_H1,
  description: IPPE_DESCRIPTION,
  about: { '@type': 'Organization', name: IPPE_CLIENT, url: 'https://ippesoccertours.com' },
  author: { '@id': `${WORK_HOST}/#organization` },
  publisher: { '@id': `${WORK_HOST}/#organization` },
  datePublished: IPPE_PUBLISHED,
  dateModified: WORK_UPDATED,
  image: [
    `${WORK_HOST}${IPPE_WORK_IMAGES.brandBoard.src}`,
    `${WORK_HOST}${IPPE_WORK_IMAGES.homepage.src}`,
    `${WORK_HOST}${IPPE_WORK_IMAGES.tripPage.src}`,
  ],
  mainEntityOfPage: IPPE_URL,
}

export const ippeBreadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: WORK_HOST },
    { '@type': 'ListItem', position: 2, name: WORK_INDEX_NAME, item: WORK_INDEX_URL },
    { '@type': 'ListItem', position: 3, name: IPPE_CLIENT, item: IPPE_URL },
  ],
}

export const workIndexSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: WORK_INDEX_NAME,
  url: WORK_INDEX_URL,
  description: WORK_INDEX_DESCRIPTION,
  isPartOf: { '@id': `${WORK_HOST}/#website` },
  hasPart: [{ '@type': 'Article', headline: IPPE_H1, url: IPPE_URL }],
}

export const workIndexBreadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: WORK_HOST },
    { '@type': 'ListItem', position: 2, name: WORK_INDEX_NAME, item: WORK_INDEX_URL },
  ],
}
