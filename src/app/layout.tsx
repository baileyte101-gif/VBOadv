import type { Metadata } from 'next'
import { Barlow_Condensed, Inter, Space_Mono } from 'next/font/google'
import Script from 'next/script'
import MotionProvider from '@/components/MotionProvider'
import './globals.css'

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
  title: 'Marketing Consultancy Miami | VBO Advertising',
  description:
    'Founder-led marketing consultancy and studio in Miami. Strategy first, disciplined execution across paid, social, SEO, brand, and creative.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-dark.png', type: 'image/png', sizes: '256x256', media: '(prefers-color-scheme: dark)' },
      { url: '/favicon-light.png', type: 'image/png', sizes: '256x256', media: '(prefers-color-scheme: light)' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/favicon-dark.png', sizes: '256x256', media: '(prefers-color-scheme: dark)' },
      { url: '/favicon-light.png', sizes: '256x256', media: '(prefers-color-scheme: light)' },
    ],
  },
  openGraph: {
    title: 'Marketing Consultancy Miami | VBO Advertising',
    description:
      'Founder-led marketing consultancy and studio in Miami. Strategy first, disciplined execution across paid, social, SEO, brand, and creative.',
    type: 'website',
  },
}

// Phase 0 SEO foundation schema. Renders on every page via the root layout.
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://www.vboadv.com/#organization',
  name: 'VBO Advertising',
  url: 'https://www.vboadv.com',
  logo: 'https://www.vboadv.com/images/logo-transparent.png',
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
  image: 'https://www.vboadv.com/images/logo-transparent.png',
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
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  )
}
