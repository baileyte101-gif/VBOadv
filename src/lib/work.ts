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
// /case-studies/sir-galloway
//
// PREVIEW ONLY until Morgan Mills approves the page (its figures, images,
// quote and credit) and Tim gives the publish go. Tim told Morgan on 10/1:
// "Nothing goes live until you're happy with it!"
//
// Copy is Mary's (clients/vbo/case-studies/sir-galloway/copy.md, 2026-10-06,
// section 1), field for field and word for word; Mack checked every figure
// the same day. Revised that evening with Tim's preview edits: percentages
// instead of small counts, no calendar dates beyond "April 2026" and "1984",
// nothing phone-specific about the listings, and the Pinecrest hero. Images,
// captions, alt text and the layout deltas are Jules's (Jules/designs/vbo/
// website/2026-10-06-case-study-sir-galloway/exports/manifest.md). Same
// template as IPPE above.
//
// The publish switch is src/lib/indexable.ts. Until "case-studies/sir-galloway"
// is in INDEXABLE_PAGES, this page is noindex and out of the sitemap, and a
// PRODUCTION build serves its URL as a 404 and leaves its card off
// /case-studies, so a merge cannot publish it early. Previews and local
// builds show both, for review. At the publish go: set SG_PUBLISHED, add the
// slug to INDEXABLE_PAGES, and add the llms.txt line.
//
// Reworked 2026-10-13 (rework brief clients/vbo/case-studies/sir-galloway/
// 2026-10-13-rework-brief.md; Mary's copy.md reworked the same day, Jules's
// manifest and layout B5 to B7): three contact prompts, a fifth What We Did
// step, the Social Media section (the owner's words and three before-and-after
// pairs from the feed, no links on the posts) and the results as three phases.
//
// Second preview 2026-10-13 (step 17b; Tim's review of the first, Mary's
// copy.md step 17a): the subhead names the brand book, the website, the
// listings and social before the ads; the Challenge carries his two points;
// What We Did 01 reads "An updated brand book"; the results are two phases
// (the "Not counted" phase is gone, the about 50% leads); pairs B and C
// "after" play the posts themselves as muted, looping video (PostVideo.tsx).
// ---------------------------------------------------------------------------

export const SG_SLUG = `${WORK_INDEX_SLUG}/sir-galloway`
export const SG_PATH = `/${SG_SLUG}`
export const SG_URL = `${WORK_HOST}${SG_PATH}`

/** True once Tim's publish go has flipped the page in src/lib/indexable.ts. */
export const SG_APPROVED = INDEXABLE_PAGES.has(SG_SLUG)

/** Previews and local builds always show it; production only once approved. */
export const SG_SHOWN = SG_APPROVED || process.env.VERCEL_ENV !== 'production'

/**
 * The day the page goes public. Null until the publish go, so the preview's
 * Article schema states no date. The page refuses to build as indexable
 * without it.
 */
export const SG_PUBLISHED: string | null = null

export const SG_TITLE = "Sir Galloway Case Study: Website, Listings, Social & Ads | VBO"
export const SG_DESCRIPTION =
  "How VBO rebuilt Sir Galloway's website and Google listings and relaunched its social media before the ads, and how more new customers came through the site."

export const SG_CLIENT = 'Sir Galloway'

export const SG_H1 = 'How we got Sir Galloway more new customers from its website'

export const SG_SUBHEAD =
  "We updated the brand book, built a fresh and modern website with the new brand and brought all six Google listings in line with it. We relaunched social media in keeping with the brand and made sure every inquiry gets counted. Only then did we start the ads."

export const SG_CARD_LINE =
  'A new website and six rebuilt Google listings first, then the ads, and more new customers.'

// Same cells as IPPE's: "Family owned since" and "Stores" sit where IPPE has
// "Founder" and "Touring since".
export const SG_SNAPSHOT: (typeof IPPE_SNAPSHOT)[number][] = [
  { k: 'Client', v: 'Sir Galloway', wideSm: true },
  {
    k: 'What they do',
    v: 'Dry cleaning, couture care and Lady Galloway gown preservation, with free pickup and delivery across Greater Miami',
    wide: true,
  },
  { k: 'Family owned since', v: '1984' },
  { k: 'Stores', v: 'Six, across Miami' },
  { k: 'With VBO since', v: 'April 2026' },
  { k: 'What we did', v: 'Brand, website, Google listings, content, paid ads' },
  {
    k: 'The site',
    v: 'sirgalloway.com',
    // Full row on phones, as IPPE's, so it is not stranded beside an empty cell.
    wideSm: true,
    // Tim: "When we name our clients, we should link to their websites as well."
    links: [{ anchor: 'sirgalloway.com', href: 'https://sirgalloway.com', external: true }],
  },
]

export const SG_CHALLENGE = {
  label: 'The Challenge',
  heading: "No real tracking, and a disconnect in the brand.",
  body: [
    "Sir Galloway is a Miami staple, but its old website had no way to count calls or visits, or to show what brought people there. In the old site's last full month, 21% of the messages sent through its forms were bots or sales pitches. And the old website and social media didn't show the brand the owners wanted.",
  ],
}

/*
 * The contact prompts (new 10/13), built from Tim's own lines (Mary, copy.md
 * section 1): one plain line each, the address or "Let's talk" as its only
 * link, no button (Next keeps the page's only one). Each sits under what it
 * follows: the Challenge body, the last work image, the last social pair.
 */
export const SG_CONTACT_CHALLENGE = {
  text: "If you run an established business in Miami or Fort Lauderdale and this is you, reach out at hello@vboadv.com.",
  link: { anchor: "hello@vboadv.com", href: "mailto:hello@vboadv.com" } as InlineLinkSpec,
}

export const SG_DID = {
  label: "What We Did",
  heading: "We built the foundation first.",
  steps: [
    {
      n: "01",
      title: "Brand",
      text: "An updated brand book for the logos, colors, type and voice.",
      links: [] as InlineLinkSpec[],
    },
    {
      n: "02",
      title: "Website",
      text: "A new sirgalloway.com, where customers sign up for pickup and delivery. We count visits, taps to call and inquiries, and every inquiry lands in a shared spreadsheet. In the first full month, not one was spam.",
      links: [] as InlineLinkSpec[],
    },
    {
      n: "03",
      title: "Google listings",
      // Tim's own framing (10/6): unified branded messaging, nothing phone-specific.
      text: "We created unified branded messaging across all six listings to match the new website and social presence. Each now points to its own store page.",
      links: [] as InlineLinkSpec[],
    },
    {
      n: "04",
      title: "Social media",
      // New 10/13: the relaunch, after the new website went live.
      text: "Sir Galloway's social media, relaunched after the new website went live.",
      links: [] as InlineLinkSpec[],
    },
    {
      n: "05",
      title: "Ads",
      // As IPPE's ads step: links to the homepage's services. Was 04 until 10/13.
      text: "We run Sir Galloway's paid ads on Google, Facebook and Instagram.",
      links: [{ anchor: "paid ads", href: "/#industries" }] as InlineLinkSpec[],
    },
  ],
}

/*
 * The hero is new for this page: the Pinecrest storefront image from
 * sirgalloway.com's own Pinecrest store page (Tim, 10/6), a 3:4 crop, in the
 * column where IPPE carries its homepage in a phone; the homepage moves down
 * into The Work. No caption, as IPPE's hero, and nothing on the page says it
 * was photographed. Numbering 01 to 05 is Jules's, from the layout. There is
 * no "listing before" slot: nothing phone-specific about the listings (Tim,
 * 10/6).
 */
export const SG_WORK_IMAGES = {
  hero: {
    src: '/images/work/sir-galloway/sir-galloway-hero-pinecrest-storefront.jpg',
    width: 810,
    height: 1080,
    alt: 'The Sir Galloway storefront in Pinecrest: SIR GALLOWAY in dark letters above a dark metal roof, a wedding gown in the window and 10539 on the glass',
  },
  brandBook: {
    src: '/images/work/sir-galloway/sir-galloway-brand-book-color.png',
    width: 1600,
    height: 900,
    alt: 'A spread from the Sir Galloway brand book: Sir Galloway purple and the colors that go with it',
    caption: 'The brand book behind the website and the ads.',
  },
  homepage: {
    src: '/images/work/sir-galloway/sir-galloway-homepage-phone.jpg',
    width: 645,
    height: 1398,
    alt: 'The Sir Galloway homepage on a phone: "South Florida\'s Luxury Fabric and Garment Care House." with the Schedule Your Personal Needs button',
    caption: 'The homepage: “South Florida’s Luxury Fabric and Garment Care House.”',
  },
  pickupPage: {
    src: '/images/work/sir-galloway/sir-galloway-pickup-page.jpg',
    width: 1440,
    height: 900,
    alt: 'The top of the Sir Galloway pickup and delivery page on desktop: "garment care, at your door," beside a purple and white Sir Galloway van marked Free Pick Up and Delivery, with the Schedule Your Personal Needs button in the header',
    caption: 'Pickup and delivery, where most new customers sign up.',
  },
  listing: {
    src: '/images/work/sir-galloway/sir-galloway-google-listing.png',
    width: 1080,
    height: 1350,
    alt: "Sir Galloway's Google listing for its Sunset store as it reads now, with the address, the opening hours and a link to sirgalloway.com",
    caption: 'One of the six Google listings, now matching the new website.',
  },
  storefront: {
    src: '/images/work/sir-galloway/sir-galloway-storefront-palmetto-bay.jpg',
    width: 1080,
    height: 1350,
    alt: 'The Sir Galloway store in Palmetto Bay: its crest sign under a metal roof, above a glass front and a low hedge',
    caption: 'The Palmetto Bay store.',
  },
}

export const SG_CONTACT_WEBSITE = {
  text: "Need a website built, or know someone who could use a refresh? hello@vboadv.com",
  link: { anchor: "hello@vboadv.com", href: "mailto:hello@vboadv.com" } as InlineLinkSpec,
}

/*
 * Social Media (new 10/13): what the owner wanted, in her own words from the
 * 4/20 brand workshop, and three pairs from the feed (the line on how the
 * posts are planned and published came off on Tim's 10/13 edit, step 17e),
 * each matched on one subject (Noa 3c), before on the left (on top on a
 * phone). Images are Jules's: the before posts are the post image only, as
 * Instagram shows it; the after frames come from the review-page copies.
 * Crop, size and re-encode only. NO LINKS on any post: not to Instagram (its
 * comment threads can carry customers' names) and never to the client-private
 * review page. "Before the relaunch", never "before VBO". No numbers.
 */
/*
 * A post is a still (alt) or, since 10/13 step 17b, the post itself as video
 * (label = the video's accessible name, Mary's alt column for that row). The
 * video files are cut from the review-page copies by
 * Bob/scripts/encode_sg_social_videos.py: crop, trim, size and re-encode only,
 * no audio. The poster is the first frame that plays.
 */
export type SgPostImage = { kind: 'image'; src: string; width: number; height: number; caption: string; alt: string }
export type SgPostVideo = { kind: 'video'; src: string; poster: string; width: number; height: number; caption: string; label: string }
export type SgPost = SgPostImage | SgPostVideo

export const SG_SOCIAL = {
  label: "Social Media",
  heading: "We started with the owner.",
  intro: "At our brand workshop, we asked Mary Mills, Sir Galloway's owner, for the one thing she wants to get across to people.",
  // Mrs. Mills at the workshop; the ellipsis marks one trimmed false start.
  // Plain HTML, no review markup.
  quote: { text: "I want people to understand that we are... the elite dry cleaner of the state of Florida.", name: "Mary Mills", role: "Sir Galloway" },
  beforeLabel: "Before the relaunch",
  afterLabel: "After the relaunch",
  pairs: [
    {
      id: "A",
      before: {
        kind: "image",
        src: "/images/work/sir-galloway/social/sir-galloway-social-a-before-wardrobe-pressed.jpg",
        width: 1080,
        height: 1080,
        caption: "A post on pressing: “Your wardrobe, perfectly pressed.”",
        alt: "A Sir Galloway Instagram post from before the relaunch: shirts and jackets on a rack, with the words YOUR WARDROBE, PERFECTLY PRESSED",
      },
      after: {
        kind: "image",
        src: "/images/work/sir-galloway/social/sir-galloway-social-a-after-mary-mills-reel.jpg",
        width: 1080,
        height: 1080,
        caption: "The first post of the relaunch: Mary Mills, the owner, telling Sir Galloway's story.",
        alt: "A still from a Sir Galloway Instagram reel: Mary Mills, the owner, speaking on camera",
      },
    },
    {
      id: "B",
      before: {
        kind: "image",
        src: "/images/work/sir-galloway/social/sir-galloway-social-b-before-freshness.jpg",
        width: 1080,
        height: 1080,
        caption: "A post on the details: “Freshness you can feel.”",
        alt: "A Sir Galloway Instagram post from before the relaunch: a model in a white shirt, with the words FRESHNESS YOU CAN FEEL",
      },
      // The 10/9 carousel's clip 1, the whole 7.1 s: a slow pan across the
      // front of a store. Square crop from the top, so the crest and the sign
      // stay in frame (the street number on the glass falls below the crop).
      after: {
        kind: "video",
        src: "/images/work/sir-galloway/social/sir-galloway-social-b-after-store-pan.mp4",
        poster: "/images/work/sir-galloway/social/sir-galloway-social-b-after-store-pan-poster.jpg",
        width: 720,
        height: 720,
        caption: "A post on the details, opening on one of the stores.",
        label: "A video from a Sir Galloway Instagram carousel: a slow pan across the front of one of its stores, with the crest and sign above the windows",
      },
    },
    {
      id: "C",
      before: {
        kind: "image",
        src: "/images/work/sir-galloway/social/sir-galloway-social-c-before-reminder.jpg",
        width: 1080,
        height: 1080,
        caption: "A reminder post: “Time to refresh your seasonal wardrobe.”",
        alt: "A Sir Galloway Instagram post from before the relaunch: a purple REMINDER card over a closet rack, reading TIME TO REFRESH YOUR SEASONAL WARDROBE",
      },
      // The 10/11 reel from 5.8 s (frame 174, the first with the website fully
      // on screen) to its last frame at 9.7 s. The typed search before it is
      // cut (Tim's 9/04 name ruling). The square crop keeps the end card's
      // sirgalloway.com in frame, so the label keeps its full ending.
      after: {
        kind: "video",
        src: "/images/work/sir-galloway/social/sir-galloway-social-c-after-website-reel.mp4",
        poster: "/images/work/sir-galloway/social/sir-galloway-social-c-after-website-reel-poster.jpg",
        width: 720,
        height: 720,
        caption: "A reel of the new website.",
        label: "A video from a Sir Galloway Instagram reel: the new website scrolling on a phone, then an end card with the Sir Galloway logo and sirgalloway.com",
      },
    },
  ] as { id: string; before: SgPost; after: SgPost }[],
}

export const SG_CONTACT_SOCIAL = {
  text: "Looking for support managing your social media? Let's talk.",
  link: { anchor: "Let's talk", href: "mailto:hello@vboadv.com" } as InlineLinkSpec,
}

/*
 * "The Ads": four of the ads that ran on Facebook and Instagram from
 * September 28, 2026, in Mack's order (10/6). Labels only, no figures: no
 * paid-ads result appears anywhere on this page. Artwork is the real ad from
 * the launch suite, resized from 1080x1350 to 864x1080 and re-encoded, nothing
 * recomposed or recoloured. The Range and The Arrival are deliberately out:
 * their artwork types out the long form of the client's name, and the name is
 * "Sir Galloway" (Tim, 9/04). No line says where any image or film came from.
 */
export const SG_ADS = {
  label: 'The Ads',
  heading: 'Then the ads.',
  // Tim, 10/13 (step 17e): the note names the Google ads first, then Facebook
  // and Instagram. The strip below is the Facebook and Instagram ones.
  note: 'On Google, the ads show when people search for dry cleaning nearby, for wedding gown care or for Sir Galloway by name. They also run on Facebook and Instagram for the neighborhoods Sir Galloway delivers to and for Lady Galloway gowns.',
  items: [
    {
      src: '/images/work/sir-galloway/ads/sir-galloway-ad-the-standing-pickup.jpg',
      title: 'The Standing Pickup',
      meta: 'Delivery neighborhoods · still · door to door',
      alt: 'Ad still: purple Sir Galloway garment bags hanging in a walk-in closet, line Dry cleaning in Miami since 1984, headline From Your Door, and Back Again.',
    },
    {
      src: '/images/work/sir-galloway/ads/sir-galloway-ad-the-doorstep.jpg',
      title: 'The Doorstep',
      meta: 'Delivery neighborhoods · still · preferences on file',
      alt: 'Ad still: a man in a purple Sir Galloway polo holding two garment bags at a front door, line The first visit, and every visit after, headline Your Garment Preferences on the Record.',
    },
    {
      src: '/images/work/sir-galloway/ads/sir-galloway-ad-the-keepsake.jpg',
      title: 'The Keepsake',
      meta: 'Lady Galloway gowns · still · preservation',
      alt: 'Ad still: hands tying a plum ribbon on a cream keepsake box beside a framed wedding picture, line For the most meaningful gowns, headline Museum-Quality Preservation.',
    },
    {
      src: '/images/work/sir-galloway/ads/sir-galloway-ad-the-room.jpg',
      title: 'The Room',
      meta: 'Delivery neighborhoods · still · one standard',
      alt: 'Ad still: white shirts and dark jackets on a brass rail in a white marble room, line From dry cleaning to couture care, headline One Enduring Standard, Across Everything We Touch.',
    },
  ],
}

/*
 * The Results, reworked 10/13 as phases (Mary's order; Mercury's numbers
 * file of 10/13, every figure's source and period in copy.md's claims
 * ledger). Two phases since Tim's review of the first preview (step 17b): the
 * "Before the new website / Not counted" phase is gone, so the page goes
 * straight to the 64%. The about 50% is the lead figure ("lead": the gold bar
 * and the largest figure, as phase 3 had). The note under it is required
 * copy: it says which calls are counted. "words" stays in the type for
 * Jules's system; no phase uses it now.
 */
export type SgPhase = { label: string; num: string; lbl: string; note: string | null; kind: 'words' | 'figure' | 'lead' }

export const SG_RESULTS = {
  label: "The Results",
  heading: "More new customers, then more people reaching out.",
  phases: [
    {
      label: "The new website",
      num: "64% more",
      lbl: "new customers from the website in its first full month, against last year's monthly average.",
      note: "None came from an ad.",
      kind: "figure",
    },
    {
      label: "The new website with ads",
      num: "About 50% more",
      lbl: "calls and form fills in the first two weeks of ads, against the new website's first weeks.",
      note: "The calls counted are taps to call on the website and calls from the Google ads.",
      kind: "lead",
    },
  ] as SgPhase[],
  coda: "More to come as we grow our partnership further.",
}

/*
 * Morgan's email of September 30, 2026, 9:09 PM, word for word, in her three
 * paragraphs, with her curly apostrophes. ONE change awaits her OK: in
 * paragraph 2 her spaced hyphen after "media strategies" is set as a comma
 * (", transforming"). Every word is hers. Her sign-off is replaced by the
 * credit, as on IPPE. Plain HTML: no Review, Rating or AggregateRating.
 */
export const SG_QUOTE = {
  text: [
    'The VBO team has proven to be an instrumental partner from day one, delivering meaningful business results in just six months of working together. They are organized, communicative, responsive, and flexible, but what has stood out most is their ability to operate as true consultative partners. They bring strategic thinking, thoughtful recommendations, and solutions that extend well beyond execution.',
    'Their lean, nimble team allows us to move quickly and efficiently without sacrificing quality. In a short period of time, we’ve completed a full website rebuild, developed an extensive library of new content, and launched both paid and organic media strategies, transforming and elevating Sir Galloway’s digital presence across every touchpoint.',
    'VBO has become a true full-service digital partner and an extension of our team. I’m incredibly excited to continue building on the momentum we’ve created together in 2027 and beyond, leaning on VBO as both a digital powerhouse and a meaningful growth engine for Sir Galloway.',
  ],
  name: 'Morgan Mills',
  role: 'Sir Galloway',
}

export const SG_NEXT = {
  label: "Next",
  heading: "If your website and Google listings haven't kept up with your business, let's talk.",
  // The lead's ending is Tim's own (8/17), changed 10/13.
  lead: "We take on a few clients at a time, on purpose. Tell us what isn't working for you right now. VBO can be your solution.",
  cta: "Let's Connect",
  href: "mailto:hello@vboadv.com",
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

// ---------------------------------------------------------------------------
// /case-studies/peixoto-wear
//
// PUBLISHED 2026-10-21. Mauricio Esquenazi approved the page on 10/21 ("All
// good! Thanks") with no edits, on the round-2 preview (dpl_AY9eULJKGnRcUdtsumaEGybUg3Pc),
// and Tim gave the publish go the same day. Every string is as he reviewed it.
//
// Copy is Mary's (clients/vbo/case-studies/peixoto/copy.md, revised in place
// 2026-10-14 evening for Tim's edit round 1), field for field and word for
// word; every figure traces to Mercury's verified file
// (2026-10-14-mercury-numbers.md plus its 10/14 Addendum) via the copy's
// claims ledger. The hero alt is Mary's display-words.md; every other item
// in that file is RETIRED with its section and never renders.
// Same template as IPPE above, with the Sir Galloway rework's machinery
// (hero photograph, contact prompts, phased results) and the revision's
// shape: no Social section (VBO never ran Peixoto's organic social), no Work
// images section and no Ads strip (Tim, 10/14: "We didn't make them"; the
// hero stays), a four-step What We Did, five result phases (4 and 5 are
// Tim's 10/14 additions and sit lighter), and a one-string quote. The two
// lines Tim is still deciding (the phase 2 dollar line, the phase 5 external
// comparison) render as normal copy with their chat-level decision markers
// stripped: the page never shows a bracket marker.
//
// The engagement is complete: the page tells a six-month story in neutral
// past tense, never says the engagement ended, never implies it continues.
// No coda after the phases.
//
// The publish switch is src/lib/indexable.ts: "case-studies/peixoto-wear" is
// in INDEXABLE_PAGES, so the page is indexable with a canonical, in the
// sitemap and the index's CollectionPage, and its card shows on /case-studies.
// Taking it down again is that one line out of indexable.ts.
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
export const PEIXOTO_PUBLISHED: string | null = '2026-10-21'

export const PEIXOTO_TITLE = 'Peixoto Wear Case Study: Paid Ads & Partnership | VBO'
export const PEIXOTO_DESCRIPTION =
  "How VBO set up Peixoto Wear's tracking, ran one ad program across Facebook, Instagram and Google, and helped the store grow sales year over year."

export const PEIXOTO_CLIENT = 'Peixoto Wear'

export const PEIXOTO_H1 = 'How we helped Peixoto Wear grow sales year over year'

export const PEIXOTO_SUBHEAD =
  'The first thirty days went to the foundation: the accounts audited, the tracking cleaned up, every ad tagged before it ran. Then we ran one paid program: ads on Facebook and Instagram, plus listings on Google when people searched or shopped there.'

export const PEIXOTO_CARD_LINE =
  'The tracking set up first, then one ad program across Facebook, Instagram and Google, and a store selling ahead of last year, year over year.'

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
    v: 'Tracking and setup, paid ads on Facebook, Instagram and Google',
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
  heading: 'Ads nobody could trace, and a sharp drop-off when summer ends.',
  body: [
    "Peixoto was already running ads when we met them. In the September before we started, not one of the month's orders could be traced to an ad, and the spend kept going out anyway. The second problem comes around every year: swim and resort wear drops off hard when summer ends. That September, sales fell to less than half of what August did, and they kept falling into the winter.",
  ],
}

/*
 * The two contact prompts share the Sir Galloway treatment: one plain line in
 * body type inside the page column, the link in VBO gold, no button, no box,
 * no icon. Next keeps the page's only button. Each sits directly under what
 * it follows: the Challenge body, the What We Did steps (the Work images
 * section CONTACT_WORK used to follow is off the page, Tim 10/14).
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
 * 3:4 in the Sir Galloway hero slot (.vw-hero-photo), no caption, alt from
 * display-words.md (the one line of that file still live). It is the page's
 * only client image: the Work images section and the Ads strip are off the
 * page (Tim, 10/14), their files dropped from this branch, their words
 * retired in display-words.md. No line says where the image came from.
 */
export const PEIXOTO_HERO = {
  src: '/images/work/peixoto-wear/peixoto-wear-hero-seaside.jpg',
  width: 810,
  height: 1080,
  alt: "A model in Peixoto's pink striped knit set seated on a weathered wooden table by the sea, coconuts beside her and a low stone wall behind",
}

export const PEIXOTO_CONTACT_WORK = {
  text: "Looking for support with your paid ads? Let's talk.",
  link: { anchor: "Let's talk", href: 'mailto:hello@vboadv.com' } as InlineLinkSpec,
}

/*
 * The Results, as five phases (Mary's order; every figure's source and
 * period in copy.md's claims ledger, from Mercury's verified file and its
 * 10/14 Addendum). September, phase 3, is the lead figure and carries the
 * layout weight: full row from 768px, the largest outlined figure, the gold
 * bar (Jules's B7, as Sir Galloway's lead phase). Phases 4 and 5 are Tim's
 * 10/14 additions and sit lighter (the B7 quiet hairline, a smaller outlined
 * figure). Phase 2's first note is the dollar line and phase 5's note
 * carries the one external comparison: both are Tim's open calls, rendered
 * as normal copy with their [TIM...] markers stripped (chat-level decisions,
 * never on a page). Notes are required copy, not small print. No coda: the
 * engagement is complete and the quote follows the phases directly.
 */
export type PeixotoPhase = {
  label: string
  num: string
  lbl: string
  notes: string[]
  kind: 'figure' | 'lead' | 'quiet'
}

export const PEIXOTO_RESULTS = {
  label: 'The Results',
  heading: 'The year turned once the ads began.',
  phases: [
    {
      label: 'Before the ads',
      num: '15.7% behind',
      lbl: 'the same months last year, year over year, on what customers ordered.',
      notes: [],
      kind: 'figure',
    },
    {
      label: 'With the ads',
      num: '49.6% ahead',
      lbl: 'of the same months last year on what customers ordered.',
      notes: [
        'That is almost $28,000 more than the same months last year, year over year.',
        'After discounts and returns as the store books them, the same months ran 34% ahead.',
      ],
      kind: 'figure',
    },
    {
      label: 'September',
      num: '3.4x',
      lbl: "last September's sales.",
      notes: [
        "It held August's pace to within 1%, where the September the year before fell 61%. More than half of its orders arrived on an ad click, against none a year earlier.",
      ],
      kind: 'lead',
    },
    {
      label: 'The traffic',
      num: '28% more',
      lbl: 'visits in June through September than the same months the year before, year over year.',
      notes: [
        'About 55,000 visits against about 43,000. The growth came from the ads: visits arriving from an ad ran at more than three and a half times the year before, while every other source combined was flat to slightly down. September alone had 85% more visits than the September before.',
      ],
      kind: 'quiet',
    },
    {
      label: 'The efficiency',
      num: 'Less than half',
      lbl: 'what it cost the year before to get a shopper to the cart, on the same Facebook and Instagram account.',
      notes: [
        'Same account, same season: less spent than the year before, and almost twice the work from the same dollars. In the closing two months, every advertising dollar on Google traced back just over three dollars in sales, above the published medians of about $2.60 to $2.90 for this kind of shopping campaign (Rule1, 2025 data; Focus Digital, 2025).',
      ],
      kind: 'quiet',
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
  image: [`${WORK_HOST}${PEIXOTO_HERO.src}`],
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

// Sir Galloway: the same two blocks as IPPE. Morgan's quote stays plain HTML
// (no Review, Rating or AggregateRating). No dates until SG_PUBLISHED is set.
export const sgArticleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: SG_H1,
  description: SG_DESCRIPTION,
  about: { '@type': 'Organization', name: SG_CLIENT, url: 'https://sirgalloway.com' },
  author: { '@id': `${WORK_HOST}/#organization` },
  publisher: { '@id': `${WORK_HOST}/#organization` },
  ...(SG_PUBLISHED ? { datePublished: SG_PUBLISHED, dateModified: SG_PUBLISHED } : {}),
  image: [
    `${WORK_HOST}${SG_WORK_IMAGES.hero.src}`,
    `${WORK_HOST}${SG_WORK_IMAGES.brandBook.src}`,
    `${WORK_HOST}${SG_WORK_IMAGES.homepage.src}`,
    `${WORK_HOST}${SG_WORK_IMAGES.pickupPage.src}`,
  ],
  mainEntityOfPage: SG_URL,
}

export const sgBreadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: WORK_HOST },
    { '@type': 'ListItem', position: 2, name: WORK_INDEX_NAME, item: WORK_INDEX_URL },
    { '@type': 'ListItem', position: 3, name: SG_CLIENT, item: SG_URL },
  ],
}

// /case-studies (the index): its CollectionPage and breadcrumb.
export const workIndexSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: WORK_INDEX_NAME,
  url: WORK_INDEX_URL,
  description: WORK_INDEX_DESCRIPTION,
  isPartOf: { '@id': `${WORK_HOST}/#website` },
  // Lists only published case studies: each joins at its publish go. Defined
  // after the Peixoto and Sir Galloway sections so it can read
  // PEIXOTO_APPROVED and SG_APPROVED.
  hasPart: [
    { '@type': 'Article', headline: IPPE_H1, url: IPPE_URL },
    ...(PEIXOTO_APPROVED ? [{ '@type': 'Article', headline: PEIXOTO_H1, url: PEIXOTO_URL }] : []),
    ...(SG_APPROVED ? [{ '@type': 'Article', headline: SG_H1, url: SG_URL }] : []),
  ],
}

export const workIndexBreadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: WORK_HOST },
    { '@type': 'ListItem', position: 2, name: WORK_INDEX_NAME, item: WORK_INDEX_URL },
  ],
}
