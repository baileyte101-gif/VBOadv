import type { Metadata } from "next";

// Single source of truth for social preview (Open Graph) cards.
//
// Every card is exactly 1200x630 and lives in public/images/og/. Cards are
// built by Jules; the generator and the review artifact live in
// Jules/designs/vbo/website/og-cards-2026-07-30/.
//
// Paths here are root-relative ON PURPOSE. metadataBase in src/app/layout.tsx
// is https://www.vboadv.com, so Next resolves these to fully qualified URLs in
// the emitted og:image and twitter:image tags. That matters: LinkedIn,
// Facebook, Slack and iMessage all silently drop a root-relative og:image, and
// the link renders as a bare text box.
//
// The two hand-maintained static pages, public/ai-enabled-marketing/index.html
// and public/tim/index.html, get no help from Next and carry fully qualified
// URLs inline. If a card filename changes here, change it there too.
//
// NOTE ON INHERITANCE: Next.js replaces the openGraph object wholesale rather
// than merging it. A route that declares its own openGraph does NOT inherit
// images from the root layout, so every such route sets its own images entry
// below. Routes that declare no openGraph at all (today: the homepage) fall
// through to the root default and need nothing.

export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

export interface OgCard {
  /** Root-relative path under public/. Resolved to absolute via metadataBase. */
  url: string;
  /** Describes the card itself, not the page. Read aloud by screen readers. */
  alt: string;
}

export const OG_CARDS = {
  home: {
    url: "/images/og/og-home.png",
    alt: "VBO Advertising social preview card. The VBO wordmark with its gold bar on brand black, above the words Strategy. Creative. Performance.",
  },
  fractionalCmo: {
    url: "/images/og/og-fractional-cmo.jpg",
    alt: "VBO Advertising social preview card for fractional CMO services. Headline reads The Role, And What It Costs, over a darkened photograph of hands on a sunlit table of marked-up marketing plans.",
  },
  insights: {
    url: "/images/og/og-insights.png",
    alt: "VBO Advertising social preview card for the Insights section. Headline reads Real Industry Talk in condensed white type on brand black beneath the VBO wordmark.",
  },
} as const satisfies Record<string, OgCard>;

// Per-vertical cards for /professional-services/[vertical].
// Only the two live verticals have cards. The other four slugs in verticals.ts
// are drafted but not indexable; they fall back to the home card rather than
// pointing at a file that does not exist. When one goes live, ask Jules for a
// card and add the entry here.
export const OG_CARDS_BY_VERTICAL: Record<string, OgCard> = {
  "law-firms": {
    url: "/images/og/og-law-firms.jpg",
    alt: "VBO Advertising social preview card for law firm marketing in Miami. Headline reads Marketing For Law Firms In Miami, over a darkened photograph of a modern law office lobby looking out to the city.",
  },
  "med-spas": {
    url: "/images/og/og-med-spas.jpg",
    alt: "VBO Advertising social preview card for medical spa marketing in Miami. Headline reads Medical Spa Marketing In Miami, over a darkened photograph of a calm, modern aesthetic clinic interior.",
  },
};

// Per-post cards for /insights/[slug], keyed by the post's public slug.
//
// These are purpose-built cards, not the post hero reused. The heroes are
// 2560x1429 and carry no wordmark, so in a feed they read as an anonymous
// photograph next to a grey title strip. Declaring a hero as 1200x630 would
// also be a lie that platforms catch and act on.
//
// A published post with no entry here falls back to the Insights section card,
// which is branded and correct, just not specific. That is the free default:
// new posts ship with a valid card and no code change. Ask Jules for a
// purpose-built card when a post is worth one, then add one line here.
export const OG_CARDS_BY_POST_SLUG: Record<string, OgCard> = {
  "how-to-use-ai-in-your-marketing": {
    url: "/images/og/og-insights-how-to-use-ai-in-your-marketing.jpg",
    alt: "VBO Advertising social preview card for the article How To Use AI In Your Marketing, over a darkened photograph of someone working at a laptop outdoors with the Miami skyline behind them.",
  },
  "what-a-marketing-agency-actually-does": {
    url: "/images/og/og-insights-what-a-marketing-agency-actually-does.jpg",
    alt: "VBO Advertising social preview card for the article What Does A Marketing Agency Do, over a darkened photograph of a Miami street at sunset lined with palms and high rises.",
  },
  "your-marketing-feels-busy": {
    url: "/images/og/og-insights-your-marketing-feels-busy.jpg",
    alt: "VBO Advertising social preview card for the article What Integrated Marketing Actually Means, over a darkened photograph of a man walking a palm-lined Miami street.",
  },
};

type OgImages = NonNullable<NonNullable<Metadata["openGraph"]>["images"]>;
type TwitterImages = NonNullable<NonNullable<Metadata["twitter"]>["images"]>;

/**
 * Build the openGraph.images entry for a card, with the dimensions declared.
 * Declaring width and height lets a platform reserve the right box before the
 * image finishes downloading, which is the difference between a card that
 * renders on first scrape and one that renders on the second.
 */
export function ogImages(card: OgCard): OgImages {
  return [
    {
      url: card.url,
      width: OG_IMAGE_WIDTH,
      height: OG_IMAGE_HEIGHT,
      alt: card.alt,
    },
  ];
}

/** Build the twitter.images entry for a card. */
export function twitterImages(card: OgCard): TwitterImages {
  return [{ url: card.url, alt: card.alt }];
}
