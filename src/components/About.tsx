'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import SocialIcons from '@/components/SocialIcons'

const largeBrands = ['McDonalds', 'Formula E', 'Royal Caribbean Cruise Lines', 'Park West Gallery', 'Bilzin Sumberg']
const smallBrands = ['Caricap', 'Plant Athletic', 'Purple Patch Fitness', 'Beckham Financial']

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="about"
      className="bg-[#0D0D0D] py-24 md:py-32 lg:py-40 px-8 md:px-12 lg:px-20 xl:px-24 relative overflow-hidden"
    >
      {/* Ghost section number */}
      <div
        className="absolute right-4 top-0 font-headline font-black leading-none select-none pointer-events-none text-[#1C1C1C] text-[160px] md:text-[220px] lg:text-[280px]"
        aria-hidden
      >
        06
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

      <div className="relative z-10" ref={ref}>
        {/* Label + Headline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-16 md:mb-20"
        >
          <p className="section-label">About</p>
          <div className="section-accent" />
          <h2 className="font-headline font-black text-[#F2EDE4] uppercase leading-none text-[clamp(2.5rem,6vw,5rem)] max-w-[860px]">
            Strategy. Creative. Performance. Your Marketing Success.
          </h2>
        </motion.div>

        {/* Two-column: text + headshot */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 xl:gap-24 items-start">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="space-y-5"
          >
            <p className="text-[#6B6F73] text-base md:text-lg font-body leading-relaxed">
              VBO is a founder-led marketing consultancy &amp; studio built on
              experience and efficiency. Our clients are our priority, we are
              not a high-volume agency. We are not a trend-driven shop.
            </p>
            <p className="text-[#6B6F73] text-base md:text-lg font-body leading-relaxed">
              We operate with structure, using the best modern tools that drive
              efficient performance for your business.
            </p>

            {/* Standout quote */}
            <p className="font-headline font-black text-[#F2EDE4] uppercase leading-tight text-xl md:text-2xl lg:text-3xl pt-2">
              We are serious about outcomes.<br />Not serious about ego.
            </p>

            {/* Social icons */}
            <SocialIcons size={18} className="pt-1" />

            {/* Divider */}
            <div className="border-t border-[#1C1C1C] pt-8 mt-4">
              <p className="section-label mb-6">The Founder</p>

              <p className="text-[#6B6F73] text-base md:text-lg font-body leading-relaxed mb-4">
                Tim Bailey, founder of VBO, is a passionate marketer with over
                10+ years helping some of the largest brands in the world
                achieve their goals. He specializes in simplifying complex
                marketing goals into clear, revenue-driving strategies and
                systems.
              </p>

              <p className="text-[#6B6F73] text-base md:text-lg font-body leading-relaxed">
                Tim has had the pleasure of working with large and small
                businesses during his career. Clients range from large brands
                like{' '}
                {largeBrands.map((name, i) => (
                  <span key={name}>
                    <span className="text-[#F2EDE4]">{name}</span>
                    {i < largeBrands.length - 2
                      ? ', '
                      : i === largeBrands.length - 2
                      ? ' and '
                      : ''}
                  </span>
                ))}
                , to small businesses like{' '}
                {smallBrands.map((name, i) => (
                  <span key={name}>
                    <span className="text-[#F2EDE4]">{name}</span>
                    {i < smallBrands.length - 2
                      ? ', '
                      : i === smallBrands.length - 2
                      ? ' and '
                      : ''}
                  </span>
                ))}
                . An avid runner and guitar player, Tim is based in Coconut
                Grove with his young family.
              </p>
            </div>
          </motion.div>

          {/* Headshot */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col items-start"
          >
            {/* Image container with gold accent */}
            <div className="relative w-full max-w-[340px]">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src="/images/headshot.jpg"
                  alt="Tim Bailey, Founder of VBO"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 80vw, 340px"
                />
              </div>
              {/* Gold corner accent */}
              <div className="absolute -bottom-3 -right-3 w-full h-full border border-[#B8962E]/25 pointer-events-none" />
            </div>

            {/* Name + title + contact */}
            <div className="mt-8 pl-0">
              <p className="font-headline font-black text-[#F2EDE4] uppercase text-2xl md:text-3xl tracking-wide leading-none">
                Tim Bailey
              </p>
              <p className="font-mono text-[#B8962E] text-[10px] tracking-[0.25em] uppercase mt-2">
                Founder, VBO
              </p>
              <div className="mt-4 flex flex-col gap-1.5">
                <a
                  href="mailto:tim@vboadv.com"
                  className="font-mono text-[#6B6F73] text-[10px] tracking-[0.18em] hover:text-[#B8962E] transition-colors duration-200"
                >
                  tim@vboadv.com
                </a>
                <a
                  href="tel:8646406558"
                  className="font-mono text-[#6B6F73] text-[10px] tracking-[0.18em] hover:text-[#B8962E] transition-colors duration-200"
                >
                  864-640-6558
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
