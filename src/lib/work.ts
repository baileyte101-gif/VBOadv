import type { InlineLinkSpec } from '@/lib/linkify'
import { INDEXABLE_PAGES } from '@/lib/indexable'

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

// Percentages, not counts, since 2026-10-13 (Tim's go that day): the count
// overstated, one of the six inquiries was a youth club. Mary's option 2,
// verbatim; figures from Dash's lift sheet, IPPE ids I-H and I-2.
export const IPPE_RESULTS = {
  label: 'The Results',
  heading: 'More families asking, for less.',
  stats: [
    {
      num: '4% to 44%',
      lbl: 'of visitors from the ads stayed and read, from the report before to the report for August 11 to September 15, 2026.',
    },
    {
      num: '67%',
      lbl: 'less spent on ads for each inquiry in September 2026 than in August.',
    },
  ],
  coda: 'Once each ad landed on a page built to match it, far more people stayed to read. Families started asking to talk through the new site, and Chris takes it from there.',
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

// ---------------------------------------------------------------------------
// /case-studies/peixoto-wear
//
// PREVIEW ONLY until Mauricio Esquenazi and Brunela approve the page (its
// figures, the testimonial and credit, the hacker story naming Peixoto, and
// their imagery) and Tim gives the publish go. Nothing is sent or live, and
// the clients have not seen any version of this page.
//
// Copy is Mary's (clients/vbo/case-studies/peixoto/copy.md, 2026-10-14,
// section 1), field for field and word for word; every figure traces to
// Mercury's verified file (2026-10-14-mercury-numbers.md) via the copy's
// claims ledger. Image words (captions, display titles, meta lines, alts) are
// Mary's display-words.md of the same day, written from Jules's final picks
// (Jules/designs/vbo/website/2026-10-14-case-study-peixoto/final/manifest.md).
// Same template as IPPE above, with the Sir Galloway rework's machinery
// (hero photograph, contact prompts, phased results) and three deliberate
// differences: no Social section (VBO never ran Peixoto's organic social),
// a four-step What We Did, and a one-string quote.
//
// The engagement is complete: the page tells a six-month story in neutral
// past tense, never says the engagement ended, never implies it continues.
// No coda after the phases.
//
// The publish switch is src/lib/indexable.ts. Until "case-studies/peixoto-wear"
// is in INDEXABLE_PAGES, this page is noindex and out of the sitemap, and a
// PRODUCTION build serves its URL as a 404 and keeps its card off
// /case-studies (the card is added to /case-studies/page.tsx in the publish
// commit; this branch leaves the index untouched). At the publish go: set
// PEIXOTO_PUBLISHED, add the slug to INDEXABLE_PAGES, add the card and the
// llms.txt line.
// ---------------------------------------------------------------------------

export const PEIXOTO_SLUG = `${WORK_INDEX_SLUG}/peixoto-wear`
export const PEIXOTO_PATH = `/${PEIXOTO_SLUG}`
export const PEIXOTO_URL = `${WORK_HOST}${PEIXOTO_PATH}`

/** True once Tim's publish go has flipped the page in src/lib/indexable.ts. */
export const PEIXOTO_APPROVED = INDEXABLE_PAGES.has(PEIXOTO_SLUG)

/** Previews and local builds always show it; production only once approved. */
export const PEIXOTO_SHOWN = PEIXOTO_APPROVED || process.env.VERCEL_ENV !== 'production'

/**
 * The day the page goes public. Null until the publish go, so the preview's
 * Article schema states no date. The page refuses to build as indexable
 * without it.
 */
export const PEIXOTO_PUBLISHED: string | null = null

export const PEIXOTO_TITLE = 'Peixoto Wear Case Study: Paid Ads & Partnership | VBO'
export const PEIXOTO_DESCRIPTION =
  "How VBO set up Peixoto Wear's tracking, ran one ad program across Facebook, Instagram and Google, and helped the month that fell hardest last year hold its summer pace."

export const PEIXOTO_CLIENT = 'Peixoto Wear'

export const PEIXOTO_H1 = 'How we helped Peixoto Wear hold September at summer pace'

export const PEIXOTO_SUBHEAD =
  'The first thirty days went to the foundation: the accounts audited, the tracking cleaned up, every ad tagged before it ran. Then we ran one paid program: ads on Facebook and Instagram, plus listings on Google when people searched or shopped there, including for Peixoto by name. We handled the search work early on.'

export const PEIXOTO_CARD_LINE =
  'The tracking set up first, then one ad program across Facebook, Instagram and Google, and a September that held its summer pace.'

/*
 * Five cells (IPPE and Sir Galloway carry seven). Desktop rows fill the
 * four-column grid 1+2+1 then 2+2; on phones every cell takes the full row
 * (wide spans two at every width, wideSm on phones only), so nothing sits
 * beside an empty cell. Layout flags only; the words are Mary's.
 */
export const PEIXOTO_SNAPSHOT: (typeof IPPE_SNAPSHOT)[number][] = [
  { k: 'Client', v: 'Peixoto Wear', wideSm: true },
  {
    k: 'What they do',
    v: 'Swim and resort wear with deep Colombian roots, sold nationwide from their own online store',
    wide: true,
  },
  { k: 'With VBO since', v: 'April 2026', wideSm: true },
  {
    k: 'What we did',
    v: 'Tracking and setup, paid ads on Facebook, Instagram and Google, early search work',
    wide: true,
  },
  {
    k: 'The store',
    v: 'peixotowear.com',
    wide: true,
    // Tim: "When we name our clients, we should link to their websites as well."
    links: [{ anchor: 'peixotowear.com', href: 'https://peixotowear.com', external: true }],
  },
]

export const PEIXOTO_CHALLENGE = {
  label: 'The Challenge',
  heading: 'Ads nobody could trace, and a September that fell hard.',
  body: [
    "Peixoto was already running ads when we met them. In the September before we started, not one of the month's orders could be traced to an ad, and the spend kept going out anyway. The month fell by more than half from August's pace, and the months after it fell further.",
  ],
}

/*
 * The two contact prompts share the Sir Galloway treatment: one plain line in
 * body type inside the page column, the link in VBO gold, no button, no box,
 * no icon. Next keeps the page's only button. Each sits directly under what
 * it follows: the Challenge body, the last work image.
 */
export const PEIXOTO_CONTACT_CHALLENGE = {
  text: 'If you run an established online store and this is you, reach out at hello@vboadv.com.',
  link: { anchor: 'hello@vboadv.com', href: 'mailto:hello@vboadv.com' } as InlineLinkSpec,
}

export const PEIXOTO_DID = {
  label: 'What We Did',
  heading: 'We set up before we spent.',
  steps: [
    {
      n: '01',
      title: 'The setup',
      text: 'Thirty days from signing to live ads, with the audit and the build in between.',
      links: [] as InlineLinkSpec[],
    },
    {
      n: '02',
      title: 'The tracking',
      text: "Every ad tagged before it ran, so the store's own records could show which orders arrived on an ad click.",
      links: [] as InlineLinkSpec[],
    },
    {
      n: '03',
      title: 'The ads',
      text: 'Paid ads on Facebook, Instagram and Google, to reach new customers or remind others to purchase again.',
      // As IPPE's and Sir Galloway's ads step: links to the homepage's services.
      links: [{ anchor: 'Paid ads', href: '/#industries' }] as InlineLinkSpec[],
    },
    {
      n: '04',
      title: 'The partnership',
      text: "One evening a hacker got into the ad account and set a rogue ad running, with its budget raised to thousands a day. We caught it 46 minutes after the ad began running and shut it down the same evening, the rogue ad's budget cut to a dollar a day and the evidence preserved. We disputed the fraudulent charges with Facebook, and none of them reached what Peixoto paid us.",
      links: [] as InlineLinkSpec[],
    },
  ],
}

/*
 * The hero is Peixoto's own brand photography (the seaside lifestyle frame),
 * 3:4 in the Sir Galloway hero slot (.vw-hero-photo), no caption. The two
 * work slots are a pair (lifestyle beside studio), like Sir Galloway's
 * .vw-work-pair. Work slot 2's only local source is a 734px preview (the
 * full-resolution master is with the client until pulled): it renders capped
 * at 367 css px (.vw-work-sm) so it never drops under 2x density. Every
 * caption and alt is Mary's, written from the chosen frames
 * (display-words.md). No line says where any image came from.
 */
export const PEIXOTO_WORK_IMAGES = {
  hero: {
    src: '/images/work/peixoto-wear/peixoto-wear-hero-seaside.jpg',
    width: 810,
    height: 1080,
    alt: "A model in Peixoto's pink striped knit set seated on a weathered wooden table by the sea, coconuts beside her and a low stone wall behind",
  },
  cabana: {
    src: '/images/work/peixoto-wear/work/peixoto-wear-work-cabana-seated.jpg',
    width: 1080,
    height: 1350,
    alt: "A model in a navy and white knit polo set seated on a cabana's cushioned bench, woven screens behind her",
    caption: "The store's own photography carried the ads.",
  },
  studio: {
    src: '/images/work/peixoto-wear/work/peixoto-wear-work-studio-comporta.jpg',
    width: 734,
    height: 918,
    alt: 'A model in a pink striped knit two-piece against a plain white studio background',
    caption: 'The listings on Google ran on photography like this.',
  },
}

export const PEIXOTO_CONTACT_WORK = {
  text: "Looking for support with your paid ads? Let's talk.",
  link: { anchor: "Let's talk", href: 'mailto:hello@vboadv.com' } as InlineLinkSpec,
}

/*
 * "The Ads": three of the ads that ran, in Jules's manifest order. Labels
 * only, no figures anywhere in the strip. Artwork is the real ad units as
 * exported to Meta, resized whole from 1080x1350 to 864x1080 and re-encoded,
 * nothing recomposed or recoloured. Titles, meta lines and alts are Mary's
 * (display-words.md): audience in searcher terms, never campaign names, and
 * the build names never reach the page. Nothing from the 8/28 intrusion.
 */
export const PEIXOTO_ADS = {
  label: 'The Ads',
  heading: 'Then the ads.',
  note: 'They ran on Facebook and Instagram, and as listings on Google when people searched or shopped there, including when they searched for Peixoto by name. Peixoto sells nationwide, so the ads ran nationwide.',
  items: [
    {
      src: '/images/work/peixoto-wear/ads/peixoto-wear-ad-audrey.jpg',
      title: 'The Mint Dress',
      meta: 'New customers · still · clothing',
      alt: 'Ad still: a model in a long mint green dress with fabric flowers at the shoulders, on a plain studio background',
    },
    {
      src: '/images/work/peixoto-wear/ads/peixoto-wear-ad-chateau-bleu-cabana.jpg',
      title: 'The Cabana',
      meta: 'New customers · still · swim',
      alt: 'Ad still: a model in sunglasses and a navy and white knit polo set standing in a cabana, the sea behind her',
    },
    {
      src: '/images/work/peixoto-wear/ads/peixoto-wear-ad-chateau-bleu-bikini.jpg',
      title: 'The Bikini',
      meta: 'New customers · product card · swim',
      alt: 'Ad still: a model in a white knit bikini with navy trim on a plain white background',
    },
  ],
}

/*
 * The Results, as three phases (Mary's order; every figure's source and
 * period in copy.md's claims ledger, from Mercury's verified file).
 * September is the lead figure and carries the layout weight: full row from
 * 768px, the largest outlined figure, the gold bar (Jules's B7, as Sir
 * Galloway's lead phase). The phase 2 note is required copy (the net guard),
 * not small print. No coda: the engagement is complete and the quote follows
 * the phases directly.
 */
export type PeixotoPhase = {
  label: string
  num: string
  lbl: string
  note: string | null
  kind: 'figure' | 'lead'
}

export const PEIXOTO_RESULTS = {
  label: 'The Results',
  heading: 'The year turned once the ads began.',
  phases: [
    {
      label: 'Before the ads',
      num: '15.7% behind',
      lbl: 'the same months last year, on what customers ordered.',
      note: null,
      kind: 'figure',
    },
    {
      label: 'With the ads',
      num: '49.6% ahead',
      lbl: 'of the same months last year, on what customers ordered.',
      note: 'After discounts and returns as the store books them, the same months ran 34% ahead.',
      kind: 'figure',
    },
    {
      label: 'September',
      num: '3.4x',
      lbl: "last September's sales.",
      note: "It held August's pace to within 1%, where the September before fell 61%. More than half of its orders arrived on an ad click, against none a year earlier.",
      kind: 'lead',
    },
  ] as PeixotoPhase[],
}

/*
 * Verbatim from Mauricio's email of October 6, 2026 (read by Mercury 10/14).
 * Three sentences, no edits, no punctuation changes. His sign-off is replaced
 * by the credit, as on IPPE and Sir Galloway; the company word in the credit
 * is ours and needs his OK. "Before any damage was done" is his sentence and
 * stays inside his quote marks; nothing in VBO's prose repeats or restates
 * it. Plain HTML: no Review, Rating or AggregateRating.
 */
export const PEIXOTO_QUOTE = {
  text: 'Tim at VBO is professional, responsible, and extremely knowledgeable. He got us set up quickly and even caught a hacker trying to access our account before any damage was done. We trust him completely.',
  name: 'Mauricio Esquenazi',
  role: 'Peixoto Wear',
}

export const PEIXOTO_NEXT = {
  label: 'Next',
  heading: "If you're spending on ads and can't see what they bring back, let's talk.",
  // The lead is Tim's own lines (8/21 and 8/17), as on the Sir Galloway page.
  lead: "We take on a few clients at a time, on purpose. Tell us what isn't working for you right now. VBO can be your solution.",
  cta: "Let's Connect",
  href: 'mailto:hello@vboadv.com',
}

// Peixoto Wear: the same two blocks as IPPE. Mauricio's quote stays plain
// HTML (no Review, Rating or AggregateRating). No dates until
// PEIXOTO_PUBLISHED is set.
export const peixotoArticleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: PEIXOTO_H1,
  description: PEIXOTO_DESCRIPTION,
  about: { '@type': 'Organization', name: PEIXOTO_CLIENT, url: 'https://peixotowear.com' },
  author: { '@id': `${WORK_HOST}/#organization` },
  publisher: { '@id': `${WORK_HOST}/#organization` },
  ...(PEIXOTO_PUBLISHED ? { datePublished: PEIXOTO_PUBLISHED, dateModified: PEIXOTO_PUBLISHED } : {}),
  image: [
    `${WORK_HOST}${PEIXOTO_WORK_IMAGES.hero.src}`,
    `${WORK_HOST}${PEIXOTO_WORK_IMAGES.cabana.src}`,
    `${WORK_HOST}${PEIXOTO_WORK_IMAGES.studio.src}`,
  ],
  mainEntityOfPage: PEIXOTO_URL,
}

export const peixotoBreadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: WORK_HOST },
    { '@type': 'ListItem', position: 2, name: WORK_INDEX_NAME, item: WORK_INDEX_URL },
    { '@type': 'ListItem', position: 3, name: PEIXOTO_CLIENT, item: PEIXOTO_URL },
  ],
}
