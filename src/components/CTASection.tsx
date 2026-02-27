'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function CTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="bg-[#0D0D0D] relative overflow-hidden py-28 md:py-40 lg:py-48 px-8 md:px-12">
      {/* Top gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-[#B8962E]" />

      <div ref={ref} className="text-center">

        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="section-label mb-10 md:mb-12"
        >
          Let&apos;s Begin
        </motion.p>

        {/* Massive headline */}
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-headline font-black text-[#F2EDE4] uppercase leading-none text-[clamp(3.5rem,10.5vw,9.5rem)] mb-10 md:mb-12"
        >
          Start Your Marketing Strategy.
        </motion.h2>

        {/* Phase line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-mono text-[#6B6F73] text-[11px] tracking-[0.3em] uppercase mb-14 md:mb-16"
        >
          Strategy&nbsp;&nbsp;—&nbsp;&nbsp;Integration&nbsp;&nbsp;—&nbsp;&nbsp;Execution
        </motion.p>

        {/* CTA button — same outlined gold style as nav + hero */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <a
            href="mailto:hello@vboadv.com"
            className="btn-gold inline-flex items-center gap-3 text-xs py-4 px-10"
          >
            Book a Strategy Call
            <span className="text-base leading-none">→</span>
          </a>
        </motion.div>

      </div>
    </section>
  )
}
