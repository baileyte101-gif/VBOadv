import type { Metadata } from 'next'
import { Barlow_Condensed, Inter, Space_Mono } from 'next/font/google'
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
    'Fully integrated marketing. Defined by direction. VBO brings structure to growth — aligning brand, budget, channels, and measurement into one disciplined system.',
  keywords: [
    'marketing consultant',
    'marketing strategy',
    'brand strategy',
    'Miami marketing',
    'performance marketing',
    'VBO',
  ],
  openGraph: {
    title: 'VBO | Marketing Consultant & Studio',
    description: 'Fully integrated marketing. Defined by direction.',
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
      <body className="bg-[#0D0D0D] font-body antialiased">{children}</body>
    </html>
  )
}
