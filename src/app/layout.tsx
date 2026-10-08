import type { Metadata } from 'next'
import { Barlow_Condensed, Inter, Space_Mono } from 'next/font/google'
import Script from 'next/script'
import MotionProvider from '@/components/MotionProvider'
import BeeSprite from '@/components/bee/BeeSprite'
import { BRAND_LOGO, SHARE_IMAGE } from '@/lib/share'
import './globals.css'
import '@/components/bee/bee-brand.css'

const barlow = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-barlow',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.vboadv.com'),
  // 2026-10-08, Tim: "Marketing Consultant & Studio" replaces "Marketing
  // Consultant Who Does the Work" in the browser tab and on Google (bee brand
  // evolution, step 07). Title only; the descriptions are unchanged and any
  // copy change to them goes through Mary.
  title: 'Marketing Consultant & Studio | VBO Advertising',
  description:
    'Marketing consultant and studio in Miami. Strategy first, disciplined execution across paid, social, SEO, brand, and creative. You work with me.',
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
    title: 'Marketing Consultant & Studio | VBO Advertising',
    description:
      'Founder-led marketing consultancy and studio in Miami. Strategy first, disciplined execution across paid, social, SEO, brand, and creative.',
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
    'Founder-led marketing consultancy and studio in Miami, serving small to mid-size businesses across South Florida.',
  founder: { '@id': 'https://www.vboadv.com/#tim-bailey' },
  sameAs: [
    'https://www.linkedin.com/company/vbo-advertising/',
    'https://www.instagram.com/vboadv/',
    'https://www.facebook.com/profile.php?id=61585825346910',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-864-640-6558',
    email: 'tim@vboadv.com',
    contactType: 'Customer Service',
    areaServed: 'US-FL',
  },
}

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://www.vboadv.com/#tim-bailey',
  name: 'Tim Bailey',
  jobTitle: 'Founder',
  worksFor: { '@id': 'https://www.vboadv.com/#organization' },
  url: 'https://www.vboadv.com/tim',
  image: 'https://www.vboadv.com/images/headshot.jpg',
  sameAs: ['https://www.linkedin.com/in/timothybailey1'],
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://www.vboadv.com/#localbusiness',
  name: 'VBO Advertising',
  image: BRAND_LOGO,
  url: 'https://www.vboadv.com',
  telephone: '+1-864-640-6558',
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
      className={`${barlow.variable} ${inter.variable} ${spaceMono.variable}`}
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
        {/* JSON-LD: Organization, Person, LocalBusiness. Sitewide via root layout. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
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
