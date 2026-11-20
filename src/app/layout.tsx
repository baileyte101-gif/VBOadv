import type { Metadata } from 'next'
import localFont from 'next/font/local'
import Script from 'next/script'
import MotionProvider from '@/components/MotionProvider'
import BeeSprite from '@/components/bee/BeeSprite'
import { BRAND_LOGO, SHARE_IMAGE } from '@/lib/share'
import './fonts/fallbacks.css'
import './globals.css'
import '@/components/bee/bee-brand.css'

/* The three brand fonts come from the site's own files (src/app/fonts/), so a
   build never fetches anything from Google. Switched 2026-11-20, the day a
   production build paired a fresh Google font fetch with a cached stylesheet
   and the whole site fell back to system fonts.
   - The files are Google's latin files, byte for byte the ones the live site
     served that day (fonts/SOURCES.txt), each with Google's latin
     unicode-range, as before.
   - The consts are named like the Google imports they replace: next/font/local
     names a family after its variable, so the pages keep their
     __Barlow_Condensed_*, __Inter_* and __Space_Mono_* family names.
   - adjustFontFallback is off because fonts/fallbacks.css holds the exact
     Arial fallback faces the Google setup made; next/font/local would work out
     slightly different ones.
   Next/font only accepts written-out values here, so the range repeats. */
const Barlow_Condensed = localFont({
  src: [
    { path: './fonts/barlow-condensed/barlow-condensed-latin-400.woff2', weight: '400', style: 'normal' },
    { path: './fonts/barlow-condensed/barlow-condensed-latin-500.woff2', weight: '500', style: 'normal' },
    { path: './fonts/barlow-condensed/barlow-condensed-latin-600.woff2', weight: '600', style: 'normal' },
    { path: './fonts/barlow-condensed/barlow-condensed-latin-700.woff2', weight: '700', style: 'normal' },
    { path: './fonts/barlow-condensed/barlow-condensed-latin-800.woff2', weight: '800', style: 'normal' },
    { path: './fonts/barlow-condensed/barlow-condensed-latin-900.woff2', weight: '900', style: 'normal' },
  ],
  declarations: [
    {
      prop: 'unicode-range',
      value:
        'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
    },
  ],
  variable: '--font-barlow',
  display: 'swap',
  preload: true,
  adjustFontFallback: false,
  fallback: ["'Barlow Condensed Fallback'"],
})

const Inter = localFont({
  src: [{ path: './fonts/inter/inter-latin-100-900.woff2', weight: '100 900', style: 'normal' }],
  declarations: [
    {
      prop: 'unicode-range',
      value:
        'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
    },
  ],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  adjustFontFallback: false,
  fallback: ["'Inter Fallback'"],
})

const Space_Mono = localFont({
  src: [
    { path: './fonts/space-mono/space-mono-latin-400.woff2', weight: '400', style: 'normal' },
    { path: './fonts/space-mono/space-mono-latin-700.woff2', weight: '700', style: 'normal' },
  ],
  declarations: [
    {
      prop: 'unicode-range',
      value:
        'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
    },
  ],
  variable: '--font-space-mono',
  display: 'swap',
  preload: true,
  adjustFontFallback: false,
  fallback: ["'Space Mono Fallback'"],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.vboadv.com'),
  // Title and descriptions are Mary's lines (2026-10-22). Any copy change to
  // them goes through Mary.
  title: 'Small Business Marketing Consulting | VBO Advertising',
  description:
    'Miami marketing consulting for small businesses across South Florida. Strategy first, then hands-on help with ads, search, websites, brand, and social.',
  // The bee replaces the V (2026-10-08 logo pack, web-icons/). 16 to 48 px
  // use the pack's small cut on a black tile; the home-screen icon is the full
  // bee on black. /favicon-dark.png and /favicon-light.png are no longer
  // referenced anywhere but hold the bee too, for any old cached link.
  // The 192 PNG is for Google's search results, which want a square icon in a
  // multiple of 48 px (the ICO tops out at 48); Android's icons are in
  // manifest.ts.
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
    ],
    shortcut: '/favicon.ico',
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  openGraph: {
    title: 'Small Business Marketing Consulting | VBO Advertising',
    description:
      'A Miami marketing consultancy for small businesses across South Florida. Strategy first, then hands-on help with ads, search, websites, brand, and social.',
    type: 'website',
    images: [SHARE_IMAGE],
  },
  // Title, description and image fill in from each page's openGraph.
  twitter: { card: 'summary_large_image' },
  // The name under the icon when someone saves the site to a phone's home
  // screen. Set directly: Next's appleWebApp option would also switch on
  // full-screen "web app" mode, which this site does not want.
  other: { 'apple-mobile-web-app-title': 'VBO' },
}

// Phase 0 SEO foundation schema. Renders on every page via the root layout.
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://www.vboadv.com/#organization',
  name: 'VBO Advertising',
  url: 'https://www.vboadv.com',
  // The bee on its black tile (logo pack bee/vbo-bee-tile-512), switched from
  // the old raster wordmark at the soft web launch, 2026-10-08. Square and
  // opaque, so it holds in Google's square and round crops and on white.
  logo: BRAND_LOGO,
  description:
    'Marketing consultancy in Miami, serving small businesses across South Florida.',
  sameAs: [
    'https://www.linkedin.com/company/vbo-advertising/',
    'https://www.instagram.com/vboadv/',
    'https://www.facebook.com/profile.php?id=61585825346910',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'hello@vboadv.com',
    contactType: 'Customer Service',
    areaServed: 'US-FL',
  },
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://www.vboadv.com/#localbusiness',
  name: 'VBO Advertising',
  image: BRAND_LOGO,
  url: 'https://www.vboadv.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Coconut Grove',
    addressRegion: 'FL',
    addressCountry: 'US',
  },
  areaServed: [
    { '@type': 'City', name: 'Coconut Grove' },
    { '@type': 'City', name: 'Miami' },
    { '@type': 'City', name: 'South Florida' },
    { '@type': 'City', name: 'Miami Beach' },
    { '@type': 'City', name: 'Coral Gables' },
    { '@type': 'City', name: 'Brickell' },
    { '@type': 'City', name: 'Wynwood' },
    { '@type': 'City', name: 'Doral' },
    { '@type': 'City', name: 'Hialeah' },
    { '@type': 'City', name: 'Aventura' },
    { '@type': 'City', name: 'Fort Lauderdale' },
    { '@type': 'City', name: 'Hollywood' },
    { '@type': 'City', name: 'Boca Raton' },
    { '@type': 'City', name: 'West Palm Beach' },
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${Barlow_Condensed.variable} ${Inter.variable} ${Space_Mono.variable}`}
      // The homepage's opening-screen gate adds a class to <html> before
      // hydration (see src/components/bee/BeeOpening.tsx). Same pattern as a
      // theme script; this only silences React's dev-mode warning about it.
      suppressHydrationWarning
    >
      {/* Meta Pixel */}
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1232119389031807');
          fbq('track', 'PageView');
        `}
      </Script>

      {/* Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-ZB2FMTJWJ8"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-ZB2FMTJWJ8');
        `}
      </Script>
      <body className="bg-[#0D0D0D] font-body antialiased">
        {/* Meta Pixel noscript fallback */}
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1232119389031807&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* JSON-LD: Organization, LocalBusiness. Sitewide via root layout. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        {/* The bee and the wordmark, once per page, for every logo to draw from. */}
        <BeeSprite />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  )
}
