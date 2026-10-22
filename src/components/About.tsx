'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SocialIcons from '@/components/SocialIcons'
import BeeLane from '@/components/bee/BeeLane'

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="about"
      /* Ground 06: smoke / marble. Receives the gold fade from Industries above
         (the stat band that used to buffer that edge is gone) and fades out to
         the skyline below. Job: the human close before the ask. */
      className="ground-smoke seam-in-out quiet-panel py-24 md:py-32 lg:py-40 px-8 md:px-12 lg:px-20 xl:px-24 relative isolate overflow-hidden"
      /* 2026-10-08, bee brand evolution: the bee flies here, in a lane
         between the ground and the words; `isolate` keeps that layering
         inside the section. */
      data-bee="fly"
      data-bee-fly="about"
      data-bee-sec="about"
    >
      <BeeLane />

      {/* Ghost section number. Was 06; renumbered to 05, 2026-08-11, when
          WhoWeWorkWith (03) came out of the page. */}
      <div
        className="absolute right-4 top-0 font-headline font-black leading-none select-none pointer-events-none text-[160px] md:text-[220px] lg:text-[280px]"
        style={{ color: 'rgb(111 87 40 / 0.12)' }}
        aria-hidden
      >
        05
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

      <div className="relative z-10" ref={ref} data-bee-content>
        {/* Label + Headline */}
        <motion.div
          initial={{ y: 16 }}
          animate={isInView ? { y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-16 md:mb-20"
        >
          <p className="section-label">About</p>
          <div className="section-accent" />
          <h2 className="font-headline font-black text-[#F2EDE4] uppercase leading-none text-[clamp(2.5rem,6vw,5rem)] max-w-[860px]">
            Strategy. Creative. Performance. Your Marketing Success.
          </h2>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ y: 28 }}
          animate={isInView ? { y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="space-y-5 max-w-[640px]"
        >
          <p className="text-[#8A8E92] text-base md:text-lg font-body leading-relaxed">
            VBO is a marketing consultancy built on experience and efficiency.
            Our clients are our priority, we are not a high-volume practice. We
            are not a trend-driven shop.
          </p>
          <p className="text-[#8A8E92] text-base md:text-lg font-body leading-relaxed">
            We operate with structure, using the best modern tools that drive
            efficient performance for your business.
          </p>

          {/* Standout quote */}
          <p className="font-headline font-black text-[#F2EDE4] uppercase leading-tight text-xl md:text-2xl lg:text-3xl pt-2">
            We are serious about outcomes.<br />Not serious about ego.
          </p>

          {/* Social icons */}
          <SocialIcons size={18} className="pt-1" />
        </motion.div>
      </div>
    </section>
  )
}
