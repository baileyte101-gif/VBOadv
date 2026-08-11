import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Ticker from '@/components/Ticker'
import WhatWeRun from '@/components/WhatWeRun'
import TheApproach from '@/components/TheApproach'
import HowWeWork from '@/components/HowWeWork'
import Industries from '@/components/Industries'
import About from '@/components/About'
import CTASection from '@/components/CTASection'
import ClosingBlock from '@/components/ClosingBlock'
import Life from '@/components/Life'
import RetroDivider from '@/components/RetroDivider'
import SocialIcons from '@/components/SocialIcons'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

// Phase 1.1 — Service schema: homepage service descriptor for AI-citation lift and Google Rich Results.
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Integrated Marketing Services',
  description:
    'VBO Advertising provides integrated marketing services for small and mid-size businesses in Miami and South Florida, including marketing strategy, paid media, social media, SEO, brand strategy, and creative production.',
  // Reference the root Organization by @id rather than inlining a duplicate.
  // Inlining published a second, unlinked company record; Google's Rich Results
  // Test reported "Organization: 2 valid items". Matches the WebSite block below
  // and the pattern already enforced on the vertical pages. Vega 2026-08-10.
  provider: { '@id': 'https://www.vboadv.com/#organization' },
  areaServed: [
    'Coconut Grove, FL',
    'Miami, FL',
    'South Florida',
    'Miami-Dade County',
    'Broward County',
    'Palm Beach County',
  ],
  serviceType: [
    'Marketing Strategy',
    'Paid Media',
    'Social Media Marketing',
    'Search Engine Optimization',
    'Brand Strategy',
    'Creative Production',
    'Marketing Consulting',
  ],
  url: 'https://www.vboadv.com/',
}

// Phase 1.1 — FAQPage schema: Q&As tied to common searches for AI Overview and citation lift.
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What does VBO Advertising do?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'VBO Advertising is a founder-led marketing consultancy and studio based in Miami, Florida. We set the marketing strategy first, then run disciplined execution across paid media, social, SEO, brand, and creative, all in one connected system for small and mid-size businesses.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where is VBO Advertising located?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'VBO Advertising is based in Coconut Grove, Miami, Florida. We work with clients across South Florida (Miami-Dade, Broward, and Palm Beach counties) and serve select clients nationally.',
      },
    },
    {
      '@type': 'Question',
      name: 'What kinds of businesses does VBO Advertising work with?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'VBO works with founder-led and owner-operator businesses, small to mid-size companies that want senior-level marketing strategy and disciplined execution without the overhead of a large agency. We have experience with professional services firms, hospitality brands, and consumer businesses across South Florida.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is integrated marketing?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Integrated marketing means your brand, budget, channels, creative, and measurement all work together as one system, not as five disconnected vendors. VBO builds and runs that system for small and mid-size businesses so every part of your marketing pulls in the same direction.',
      },
    },
  ],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://www.vboadv.com/#website',
  url: 'https://www.vboadv.com',
  name: 'VBO Advertising',
  publisher: { '@id': 'https://www.vboadv.com/#organization' },
}

const homeBreadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://www.vboadv.com',
    },
  ],
}

const heroTickerItems = [
  'EFFICIENCY',
  'ALIGNMENT',
  'GROWTH',
  'CLARITY',
  'STRATEGY',
  'PERFORMANCE',
  'STRUCTURE',
  'DIRECTION',
  'PRECISION',
  'EXECUTION',
  'HUMAN',
]

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeBreadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Nav />
      <Hero />
      <Ticker
        items={heroTickerItems}
        textColorClass="text-[#6B6F73]"
        bgClass="bg-[#0D0D0D]"
        speed={30}
      />
      {/* Section order, redesign 2026-08-11: section 01 rebuilt as "What We
          Run" (was the problem statement). WhoWeWorkWith came out entirely
          on Tim's call, 2026-08-11. Its two jobs (client logos, "the brands
          we build with" title/subhead) both moved up into section 01's
          marble strip, so the standalone section no longer had a job of its
          own. The page runs one section shorter as a result. RetroDivider,
          which used to mark the beat between WhoWeWorkWith and How We Work,
          now sits directly after The Approach; its "Behind the work." beat
          still reads correctly there; it was never written to depend on
          WhoWeWorkWith specifically; see Bob's change log for the full
          reasoning. Ghost numbers below were renumbered to close the gap
          (04 to 03, 05 to 04, 06 to 05); section 01 stays 01. */}
      <WhatWeRun />
      {/* Gold bar marking the step out of the plain ground and into the gold
          linework. Same device as the divider further down the page. */}
      <div className="retro-divider-strip" aria-hidden />
      <TheApproach />
      <RetroDivider />
      <HowWeWork />
      <Life />
      <Industries />
      <About />

      {/* CTA and footer share one continuous skyline ground */}
      <ClosingBlock>
        <CTASection />

        {/* Footer */}
        <footer className="relative z-[1] border-t border-[#B8962E]/20 py-8 px-8 md:px-12 lg:px-20">
          {/* Thins the skyline's densest window texture under the footer copy */}
          <div className="footer-scrim" aria-hidden />
          <div className="max-w-[1400px] mx-auto flex flex-col gap-6">
            {/* Money-page nav — server-rendered internal links for money-page discovery */}
            <nav
              aria-label="Footer"
              className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2"
            >
              <a
                href="/ai-enabled-marketing"
                className="font-mono text-[#6B6F73] hover:text-[#B8962E] text-xs tracking-wider transition-colors duration-200"
              >
                AI-Enabled Marketing
              </a>
              <a
                href="/fractional-cmo"
                className="font-mono text-[#6B6F73] hover:text-[#B8962E] text-xs tracking-wider transition-colors duration-200"
              >
                Fractional CMO
              </a>
              <a
                href="/professional-services/law-firms"
                className="font-mono text-[#6B6F73] hover:text-[#B8962E] text-xs tracking-wider transition-colors duration-200"
              >
                Marketing for Law Firms
              </a>
              <a
                href="/professional-services/med-spas"
                className="font-mono text-[#6B6F73] hover:text-[#B8962E] text-xs tracking-wider transition-colors duration-200"
              >
                Marketing for Med Spas
              </a>
              <a
                href="/insights"
                className="font-mono text-[#6B6F73] hover:text-[#B8962E] text-xs tracking-wider transition-colors duration-200"
              >
                VBO Insights
              </a>
            </nav>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Logo */}
              <Image
                src="/images/logo-transparent.png"
                alt="VBO"
                width={834}
                height={222}
                className="h-8 w-auto"
              />

              <p className="font-mono text-[#6B6F73] text-[10px] tracking-[0.2em] uppercase text-center">
                © 2026 VBO Advertising. Miami, FL. All rights reserved.
              </p>

              <div className="flex items-center gap-6">
                <SocialIcons size={15} />
                <a
                  href="mailto:hello@vboadv.com"
                  className="font-mono text-[#6B6F73] hover:text-[#B8962E] text-xs tracking-wider transition-colors duration-200"
                >
                  hello@vboadv.com
                </a>
              </div>
            </div>
          </div>
        </footer>
      </ClosingBlock>
    </main>
  )
}
