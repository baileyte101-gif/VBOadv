'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function TheApproach() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="the-approach"
      /* Ground 02: gold linework, feathering in from the plain ground above.
         Job: give the thesis statement real surface weight.
         2026-08-11: was seam-both, fading gold into WhoWeWorkWith's marble
         below it. WhoWeWorkWith came out (its job moved into section 01's
         marble strip), and a flat black RetroDivider now follows directly,
         so the bottom fade toward marble-tint would have pointed at nothing.
         Switched to seam-in (top fade only, added to globals.css) rather
         than leaving seam-both's now-orphaned bottom gradient in place. */
      className="ground-gold seam-in quiet-panel py-24 md:py-32 lg:py-40 px-8 md:px-12 lg:px-20 xl:px-24 relative overflow-hidden"
    >
      {/* Ghost section number */}
      <div
        className="absolute right-4 top-0 font-headline font-black leading-none select-none pointer-events-none text-[160px] md:text-[220px] lg:text-[280px]"
        style={{ color: 'rgb(111 87 40 / 0.16)' }}
        aria-hidden
      >
        02
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

      <div className="max-w-[900px] relative z-10" ref={ref}>
        {/* Label */}
        <motion.div
          initial={{ y: 16 }}
          animate={isInView ? { y: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          <p className="section-label">The Approach</p>
          <div className="section-accent" />
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ y: 28 }}
          animate={isInView ? { y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-headline font-black text-[#F2EDE4] uppercase leading-none text-[clamp(2.5rem,6vw,5rem)] mb-12"
        >
          Integrated marketing for small and mid-size businesses in South Florida.
        </motion.h2>

        {/* Body */}
        <motion.div
          initial={{ y: 20 }}
          animate={isInView ? { y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.2 }}
          className="space-y-5"
        >
          <p className="text-[#6B6F73] text-base md:text-lg font-body leading-relaxed">
            We align brand, budget, channels, and measurement into one creative
            and disciplined system. No scattered tactics. No reactive spending.
            No fragmented execution.
          </p>
          <p className="text-[#6B6F73] text-base md:text-lg font-body leading-relaxed">
            Direction is defined first. Execution follows.
          </p>
          <p className="text-[#F2EDE4] font-medium text-base md:text-lg leading-relaxed">
            Your Marketing becomes creative, measurable, and performative.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
