import type { Metadata } from 'next'
import { Barlow_Condensed, Inter, Space_Mono } from 'next/font/google'
import Script from 'next/script'
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
  title: 'VBO | Marketing Consultant & Studio',
  description:
    'Fully integrated marketing. Human, built on experience and efficiency. VBO brings structure to growth — aligning brand, budget, channels, and measurement into one creative and disciplined system.',
  keywords: [
    'marketing consultant',
    'marketing strategy',
    'brand strategy',
    'Miami marketing',
    'performance marketing',
    'VBO',
  ],
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
    title: 'VBO | Marketing Consultant & Studio',
    description: 'Fully integrated marketing. Human, built on experience and efficiency.',
    type: 'website',
  },
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
        {children}
      </body>
    </html>
  )
}
