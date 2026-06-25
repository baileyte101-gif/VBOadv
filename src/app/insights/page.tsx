import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Nav from '@/components/Nav'
import CTASection from '@/components/CTASection'
import { getAllPosts, getFeaturedPost } from '@/lib/blog'
import InsightsIndex from '@/components/blog/InsightsIndex'

export const metadata: Metadata = {
  title: 'Insights — VBO | Marketing Strategy & Perspective',
  description:
    'Straight talk on strategy, creative, and performance marketing from Tim Bailey and the VBO team. No fluff. No filler.',
  openGraph: {
    title: 'VBO Insights — Strategy, Creative, Performance',
    description:
      'Straight talk on marketing strategy and execution from VBO, a founder-led consultancy based in Miami.',
    type: 'website',
    url: 'https://vboadv.com/insights',
  },
  alternates: {
    canonical: 'https://vboadv.com/insights',
  },
}

// JSON-LD for the index page
function BlogSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'VBO Insights',
    description:
      'Straight talk on strategy, creative, and performance marketing from VBO.',
    url: 'https://vboadv.com/insights',
    publisher: {
      '@type': 'Organization',
      name: 'VBO Advertising',
      url: 'https://vboadv.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://vboadv.com/images/logo-transparent.png',
      },
    },
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default function InsightsPage() {
  const posts = getAllPosts()
  const featured = getFeaturedPost()

  return (
    <>
      <BlogSchema />
      <Nav />

      {/* Page Hero */}
      <section className="pt-32 pb-20 px-6 md:px-10 lg:px-24 bg-[#0D0D0D]">
        <div className="max-w-[1400px] mx-auto">
          <span className="section-label">VBO Insights</span>
          <h1 className="font-headline font-black text-[72px] md:text-[96px] leading-[0.92] uppercase text-[#F2EDE4] mb-7 max-w-[700px]">
            Thinking Out Loud.
          </h1>
          <p className="font-body text-[18px] leading-[28px] text-[#6B6F73] max-w-[500px]">
            Straight talk on strategy, creative, and performance. From Tim Bailey and the VBO team.
          </p>
        </div>
      </section>

      {/* Dynamic content (filtering is client-side) */}
      <InsightsIndex posts={posts} featured={featured} />

      {/* CTA */}
      <CTASection />
    </>
  )
}
