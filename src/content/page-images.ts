/**
 * One in-body image per new page.
 *
 * These are NOT hero headers. They sit inside the page as a band, the same
 * pattern the /fractional-cmo page already uses, so the image punctuates the
 * reading rather than sitting above it.
 *
 * Every entry doubles as the brief for Jules. While `src` is null the page
 * renders a labelled placeholder frame at the exact final size and position, so
 * Tim can judge placement now and Jules knows what to make. When a file lands
 * in /public/images/pages/, set `src` here and the placeholder becomes the
 * image. Nothing else changes.
 *
 * House style, per clients/vbo/design/vbo-design-direction-v1.md section 6:
 * black and white, urban, Miami, alive rather than empty, business and
 * lifestyle overlap, no stock-photo gloss and no sports photography. Solo
 * subjects wear the modern tech-founder uniform (good plain t-shirt, tailored
 * joggers, quality minimal sneakers) and read as at ease, not grinding. Crowds
 * and street scenes take no wardrobe or mood direction at all. Climate-correct
 * clothing in every frame: Miami has no winter. At most one image in four may
 * carry a single selective colour pop, and it must already exist in the scene.
 *
 * `after` is the zero-based index of the section the band follows.
 */

export type PageImage = {
  /** Set when the asset lands. Null renders the placeholder frame. */
  src: string | null
  /** Descriptive alt text. Written for a screen reader, not for keywords. */
  alt: string
  /** The brief for Jules. Also printed inside the placeholder frame. */
  brief: string
  /** Render the band after this section index. */
  after: number
  /** Band proportion. Wider for hubs, squarer for single subjects. */
  aspect: 'wide' | 'standard'
}

export const PAGE_IMAGES: Record<string, PageImage> = {
  '/services': {
    src: '/images/pages/services-band.jpg',
    alt: 'An elevated view down a palm-lined Brickell avenue in Miami, glass towers on both sides, two people crossing together at a marked crosswalk',
    brief:
      'Brickell at street level, mid morning. Density and movement, people mid stride between buildings. Reads as a working city rather than a skyline postcard. No single hero subject: this is the hub, so it should feel like the whole operating environment.',
    after: 1,
    aspect: 'wide',
  },
  '/web-development': {
    src: '/images/pages/web-development-band.jpg',
    alt: 'A laptop open on a cafe table in Coconut Grove with a phone beside it, hands resting, no screen content visible',
    brief:
      'A laptop and a phone on a cafe table in Coconut Grove, hands present but relaxed, coffee in frame. Shot from a slight angle so no screen content is legible. The point is the craft being unhurried, not code on a screen. Avoid the glowing-monitor-in-the-dark cliche entirely.',
    after: 2,
    aspect: 'standard',
  },
  '/marketing-consultant': {
    src: '/images/pages/marketing-consultant-band.jpg',
    alt: 'Two people talking across a small table in a Miami cafe, one gesturing while the other listens',
    brief:
      'Two people in conversation across a small table, one mid gesture, the other listening. Cafe or a quiet corner, Coconut Grove or Design District. This page is about someone senior giving you a straight answer, so the frame is a conversation between equals, not a presentation to a room.',
    after: 2,
    aspect: 'standard',
  },
  '/ecommerce-marketing': {
    src: '/images/pages/ecommerce-marketing-band.jpg',
    alt: 'Unbranded cardboard boxes taped shut and stacked on a wooden packing bench, a tape gun and a crumpled ball of packing paper beside them, shelving behind',
    brief:
      'Packed parcels on a counter in a small studio or back room, ready to go out. Tape, labels, a stack rather than a warehouse. Ecommerce as a real physical operation a founder is still close to. One selective colour pop is allowed here if a brand tape or label carries it naturally.',
    after: 2,
    aspect: 'standard',
  },
  '/ai-seo-agency': {
    src: '/images/pages/ai-seo-agency-band.jpg',
    alt: 'A person on a Miami street looking at their phone, relaxed, city moving around them',
    brief:
      'One person on the street looking at their phone, relaxed, half smile, city moving behind them. This is the moment someone asks an assistant a question instead of searching. Read section 6.1.0 before shooting this one: the subject must look like their work is handled, never heads-down and stressed.',
    after: 2,
    aspect: 'standard',
  },
  '/paid-media': {
    src: '/images/pages/paid-media-band.jpg',
    alt: 'A man seen from behind and the side at a small cafe table on a quiet Coconut Grove sidewalk, checking his phone with a coffee cup beside him, mature trees and a modern storefront softly out of focus behind him',
    brief:
      'One man alone at a small cafe table on a quiet Coconut Grove sidewalk, seen from behind and the side, checking his phone with a coffee cup on the table beside him. Mature shade trees and a calm modern storefront sit softly out of focus behind him, no one else in frame. Deliberately plain: one clear subject, one clear action, nothing to decode. Monochrome throughout, no colour pop on this one.',
    after: 2,
    aspect: 'wide',
  },
  '/industries': {
    src: '/images/pages/industries-band.jpg',
    alt: 'A busy Miami crossing with people moving in several directions',
    brief:
      'A busy crossing, people moving in several directions, shot wide. Breadth without listing anything. Crowds take no wardrobe or mood direction: whatever expression people carry is the right one. Climate-correct clothing, no coats.',
    after: 1,
    aspect: 'wide',
  },
  '/industries/fashion-apparel': {
    src: '/images/pages/fashion-apparel-band.jpg',
    alt: 'A rail of garments in a small Miami studio, hands adjusting one piece',
    brief:
      'A garment rail in a small studio, hands adjusting a piece. Texture of fabric, not a runway and not a shop floor. The season being prepared rather than sold.',
    after: 1,
    aspect: 'standard',
  },
  '/industries/jewelry-luxury-retail': {
    src: '/images/pages/jewelry-luxury-retail-band.jpg',
    alt: 'A close view of hands holding a small piece of jewelry under a warm work light',
    brief:
      'Hands holding a small piece under a work light, shot close. Patience and consideration, matching a long buying cycle. Warm light is welcome as the one colour pop, since it is gold-adjacent and joins the brand system.',
    after: 2,
    aspect: 'standard',
  },
  '/industries/food-beverage': {
    src: '/images/pages/food-beverage-band.jpg',
    alt: 'A commercial kitchen counter in Miami with something being finished by hand',
    brief:
      'A kitchen counter, something being finished by hand. Flour, a tray, real work in progress. The page is about a brand built by the person who makes the product, so the maker is the subject and the food is the evidence.',
    after: 1,
    aspect: 'standard',
  },
  '/industries/sports-travel': {
    src: '/images/pages/sports-travel-band.jpg',
    alt: 'A modern soccer stadium under an overcast sky, a passenger plane climbing overhead, rows of rooftops in the foreground',
    brief:
      'A modern soccer stadium under an overcast sky, a passenger plane climbing overhead, rows of rooftops in the foreground. The plane mid climb carries the anticipation, the stadium grounds it in why the trip happens. ★ This is a deliberate exception to the section 6.2 no-stadiums rule: Tim asked for the stadium directly and approved this image. Monochrome, no colour pop.',
    after: 1,
    aspect: 'wide',
  },
  '/industries/local-service-businesses': {
    src: '/images/pages/local-service-businesses-band.jpg',
    alt: "Three Sir Galloway Cleaners delivery vans parked outside the company's Miami facility",
    brief:
      'A shopfront on a real street, open, someone visible inside. Coconut Grove or Little Havana for character. A business that sells within a few miles, shot as part of its street rather than isolated.',
    after: 1,
    aspect: 'standard',
  },
  '/industries/nonprofit-education': {
    src: '/images/pages/nonprofit-education-band.jpg',
    alt: 'A community room in Miami with people setting up for a session',
    brief:
      'A community room being set up, chairs and tables, a couple of people working. Overtown or a similar neighbourhood. Warm and ordinary. ★ No identifiable children: this page names CARE Elementary and the imagery must not put minors in frame.',
    after: 1,
    aspect: 'standard',
  },
  '/about': {
    src: '/images/pages/about-band.jpg',
    alt: 'Tim Bailey seen from behind, walking down a tree-lined Coconut Grove street and checking his phone, approaching a storefront with an awning',
    brief:
      'Tim, outdoors in Coconut Grove. ★ Real photograph of Tim, not generated. Section 6.1.1 wardrobe applies: good plain t-shirt, tailored joggers or similar, quality minimal sneakers, nothing branded. At ease, half smile, looking like the work is handled. This is the E-E-A-T page, so the face has to be genuinely his.',
    after: 1,
    aspect: 'standard',
  },
  '/contact': {
    src: '/images/pages/contact-band.jpg',
    alt: 'A quiet Coconut Grove street corner in the morning',
    brief:
      'A quiet Coconut Grove corner in morning light. Calm, low key, no people needed. This page is a conversation opener, so the image should settle rather than sell.',
    after: 0,
    aspect: 'wide',
  },
}
