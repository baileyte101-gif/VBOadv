'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Ticker from './Ticker'

const industries = [
  'Real Estate',
  'Hospitality & Luxury',
  'Health & Wellness',
  'Financial & Legal',
  'E-Commerce',
  'Personal Brands',
  'Sports & Entertainment',
  'Technology & SaaS',
]

export default function Industries() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="industries"
      className="bg-[#1C1C1C] pt-24 md:pt-32 lg:pt-40 pb-0 relative overflow-hidden"
    >
      {/* Ghost section number */}
      <div
        className="absolute right-4 top-0 font-headline font-black leading-none select-none pointer-events-none text-[#222222] text-[160px] md:text-[220px] lg:text-[280px]"
        aria-hidden
      >
        04
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

      {/* Content */}
      <div
        className="px-8 md:px-12 lg:px-20 xl:px-24 relative z-10 mb-14 md:mb-16"
        ref={ref}
      >
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          <p className="section-label">Industries</p>
          <div className="section-accent" />
        </motion.div>

        {/* Intro */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[#6B6F73] text-base md:text-lg font-body mb-12"
        >
          Based in Miami. Partnering with ambitious operators across:
        </motion.p>

        {/* 4×4 Industry grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-[#2A2A2A]">
          {industries.map((industry, i) => (
            <motion.div
              key={industry}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.06 }}
              className="border-r border-b border-[#2A2A2A] p-6 md:p-8 group cursor-default flex flex-col justify-between min-h-[130px] md:min-h-[150px] hover:bg-[#212121] transition-colors duration-300"
            >
              <span className="font-headline font-bold text-[#F2EDE4] uppercase leading-tight tracking-wide text-[clamp(1rem,1.8vw,1.35rem)] group-hover:text-[#B8962E] transition-colors duration-300 block">
                {industry}
              </span>
              <span className="font-mono text-[#B8962E]/0 group-hover:text-[#B8962E]/60 text-xs tracking-[0.2em] transition-colors duration-300 mt-4 block">
                →
              </span>
            </motion.div>
          ))}
        </div>

        {/* Closing line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-[#6B6F73] text-base md:text-lg font-body mt-10"
        >
          We work best with founders and leaders who value clarity and are
          looking to simplify chaos.
        </motion.p>
      </div>

      {/* Industries ticker — flush to bottom, no extra padding */}
      <Ticker
        items={industries}
        textColorClass="text-[#F2EDE4]/30"
        bgClass="bg-[#1C1C1C]"
        speed={35}
        separator="/"
      />
    </section>
  )
}
