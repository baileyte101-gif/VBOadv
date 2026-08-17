'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Ticker from './Ticker'
import SectionTile from './SectionTile'

/**
 * The ticker's contents, corrected 2026-08-17.
 *
 * These were eight invented category names that matched nothing on the site.
 * That mismatch is the disconnect Tim flagged: the homepage was advertising
 * industries VBO had no page for, while the six it does have pages for went
 * unnamed. This is now the real list, in the order the industries hub uses,
 * so the two cannot drift apart again.
 *
 * The ticker itself is untouched. It is on the sacred list in the design
 * direction; only what it says has changed.
 */
const industries = [
  'Fashion & Apparel',
  'Jewelry & Luxury Retail',
  'Food & Beverage',
  'Sports & Travel',
  'Local Service Businesses',
  'Nonprofit & Education',
  'Law Firms',
  'Med Spas',
  'Dental Practices',
  'Financial Advisors',
]

export default function Industries() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="industries"
      /* Ground 05: gold linework, feathering into About's marble below. The
         stone stat band that used to buffer that edge is gone, so this edge now
         gets the same seam the Approach/Proof edge already had.
         Job: breadth reads as confidence once depth has already landed. */
      className="ground-gold seam-out quiet-panel pt-24 md:pt-32 lg:pt-40 pb-0 relative overflow-hidden"
    >
      {/* Ghost section number. Was 05; renumbered to 04, 2026-08-11, when
          WhoWeWorkWith (03) came out of the page. */}
      <div
        className="absolute right-4 top-0 font-headline font-black leading-none select-none pointer-events-none text-[160px] md:text-[220px] lg:text-[280px]"
        style={{ color: 'rgb(111 87 40 / 0.16)' }}
        aria-hidden
      >
        04
      </div>

      {/* Gold vertical connector line. desktop only */}
      <div
        className="hidden lg:block absolute right-5 pointer-events-none"
        style={{
          top: '300px',
          bottom: 0,
          width: '1px',
          background: 'linear-gradient(to bottom, rgba(184,150,46,0.22) 0%, rgba(184,150,46,0.12) 50%, rgba(184,150,46,0) 82%)',
        }}
        aria-hidden
      />

      {/* Content */}
      <div
        className="px-8 md:px-12 lg:px-20 xl:px-24 relative z-10 mb-14 md:mb-16"
        ref={ref}
      >
        {/* Label */}
        <motion.div
          initial={{ y: 16 }}
          animate={isInView ? { y: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          <p className="section-label">Industries</p>
          <div className="section-accent" />
        </motion.div>

        {/* Section headline. Tim-approved 2026-08-11 (Mary option 3).
            Scaled below the About/HowWeWork h2 clamp since Industries is a
            denser grid section; structure and slot per Vega's Wave 1 ticket. */}
        <motion.h2
          initial={{ y: 28 }}
          animate={isInView ? { y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-headline font-black text-[#F2EDE4] uppercase leading-none text-[clamp(2rem,4.5vw,3.5rem)] max-w-[860px] mb-8"
        >
          Different industries. The same way of working.
        </motion.h2>

        {/* Intro */}
        <motion.p
          initial={{ y: 20 }}
          animate={isInView ? { y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-[#6B6F73] text-base md:text-lg font-body mb-12"
        >
          Based in Miami. Partnering with ambitious operators across:
        </motion.p>

        {/* Two routing tiles. Tim, 2026-08-17: the homepage list had drifted
            from the industries the site actually has pages for, so the section
            now routes to the two hubs instead of duplicating their lists. The
            hubs carry the real, current lists, which is the only place they can
            stay correct. Tile styling is the client tile's, on Tim's direction. */}
        <motion.div
          initial={{ y: 20 }}
          animate={isInView ? { y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8"
        >
          <SectionTile
            href="/services"
            label="Services"
            summary="Web development, consulting, fractional CMO, ecommerce, AI SEO, paid media."
            mark="chevron"
          />
          <SectionTile
            href="/industries"
            label="Industries"
            summary="Twelve industries, with the named client behind each one."
            mark="hoop"
          />
        </motion.div>

        {/* Closing line */}
        <motion.div
          initial={{ y: 8 }}
          animate={isInView ? { y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 space-y-3"
        >
          <p className="text-[#6B6F73] text-base md:text-lg font-body">
            We work best with founders and leaders who value clarity and are
            looking to simplify chaos. We have deep experience working with{' '}
            <a
              href="/professional-services/law-firms"
              className="text-[#B8962E] hover:text-[#F2EDE4] transition-colors duration-200"
            >
              professional services firms in South Florida
            </a>
            .
          </p>
          <p className="text-[#6B6F73] text-sm font-body">
            Read our take on strategy, creative, and performance in the{' '}
            <a
              href="/insights"
              className="text-[#B8962E] hover:text-[#F2EDE4] transition-colors duration-200"
            >
              VBO Insights blog
            </a>
            .
          </p>
        </motion.div>
      </div>

      {/* Industries ticker. flush to bottom, no extra padding */}
      {/* Transparent so the gold linework ground carries straight through it.
          Positioned above the quiet-panel scrim, same as the content above. */}
      <div className="relative z-10">
        <Ticker
          items={industries}
          textColorClass="text-[#F2EDE4]/30"
          bgClass="bg-transparent"
          speed={35}
          separator="/"
        />
      </div>
    </section>
  )
}
