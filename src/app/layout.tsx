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
      { url: '/favicon-dark.png', media: '(prefers-color-scheme: dark)' },
      { url: '/favicon-light.png', media: '(prefers-color-scheme: light)' },
    ],
    apple: [
      { url: '/favicon-dark.png', media: '(prefers-color-scheme: dark)' },
      { url: '/favicon-light.png', media: '(prefers-color-scheme: light)' },
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
      <body className="bg-[#0D0D0D] font-body antialiased">{children}</body>
    </html>
  )
}
