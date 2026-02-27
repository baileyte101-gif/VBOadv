'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function TheApproach() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="the-approach"
      className="bg-[#1C1C1C] py-24 md:py-32 lg:py-40 px-8 md:px-12 lg:px-20 xl:px-24 relative overflow-hidden"
    >
      {/* Ghost section number */}
      <div
        className="absolute right-4 top-0 font-headline font-black leading-none select-none pointer-events-none text-[#222222] text-[160px] md:text-[220px] lg:text-[280px]"
        aria-hidden
      >
        02
      </div>

      {/* Gold vertical connector line — desktop only */}
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
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          <p className="section-label">The Approach</p>
          <div className="section-accent" />
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-headline font-black text-[#F2EDE4] uppercase leading-none text-[clamp(2.5rem,6vw,5rem)] mb-12"
        >
          VBO brings structure to growth.
        </motion.h2>

        {/* Body */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.2 }}
          className="space-y-5"
        >
          <p className="text-[#6B6F73] text-base md:text-lg font-body leading-relaxed">
            We align brand, budget, channels, and measurement into one
            disciplined system. No scattered tactics. No reactive spending. No
            fragmented execution.
          </p>
          <p className="text-[#6B6F73] text-base md:text-lg font-body leading-relaxed">
            Direction is defined first. Execution follows.
          </p>
          <p className="text-[#F2EDE4] font-medium text-base md:text-lg leading-relaxed">
            Performance becomes creative, measurable and controlled.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
