// The picture shown when someone shares a vboadv.com link: the bee and VBO
// lockup on black, from the 2026-10-08 logo pack
// (social/vbo-share-image-1200x630-2026-10-08.png, deployed as /og-image.png).
//
// Absolute on purpose: some platforms do not resolve a relative image against
// the page, and the large card then renders blank.
//
// Why every page lists it: Next.js replaces a parent's whole openGraph object
// when a page sets its own (checked in next 14.2.35, resolve-metadata.js), so
// an image set only in the root layout is dropped on every page that has its
// own openGraph. Pages with a picture of their own (a blog post's hero) keep
// it and fall back to this one.
export const SHARE_IMAGE = {
  url: 'https://www.vboadv.com/og-image.png',
  width: 1200,
  height: 630,
  alt: 'VBO',
}

// The logo search engines show for VBO (Organization, LocalBusiness and the
// blog's publisher schema): the bee on its black tile, logo pack
// bee/vbo-bee-tile-512-2026-10-08.png, deployed byte for byte.
export const BRAND_LOGO = 'https://www.vboadv.com/images/brand/vbo-bee-tile-512.png'
