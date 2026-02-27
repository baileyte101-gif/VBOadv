'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const words = ['Clarity.', 'Strategy.', 'Performance.']

export default function Hero() {
  return (
    <section className="relative flex bg-[#0D0D0D] pt-16 min-h-screen">
      {/* Left panel — text content */}
      <div className="flex-1 flex flex-col justify-center px-8 md:px-12 lg:px-20 xl:px-24 py-20 min-w-0">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-mono text-[#6B6F73] text-[11px] tracking-[0.3em] uppercase mb-8 md:mb-10"
        >
          Marketing Consultant &amp; Studio
        </motion.p>

        {/* Headline */}
        <div className="mb-8 md:mb-10">
          {words.map((word, i) => (
            <motion.h1
              key={word}
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.28 + i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className="font-headline font-black text-[#F2EDE4] uppercase leading-[0.92] text-[clamp(4rem,9vw,7.5rem)]"
            >
              {word}
            </motion.h1>
          ))}
        </div>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="text-[#6B6F73] text-base md:text-lg mb-10 font-body leading-relaxed max-w-sm"
        >
          Fully integrated marketing. Defined by direction.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mb-6"
        >
          <a
            href="mailto:hello@vboadv.com"
            className="btn-gold inline-flex items-center gap-3"
          >
            Let&apos;s Connect
            <span className="text-base leading-none">→</span>
          </a>
        </motion.div>

        {/* Email */}
        <motion.a
          href="mailto:hello@vboadv.com"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.88 }}
          className="font-mono text-[#6B6F73]/70 text-[10px] tracking-[0.2em] hover:text-[#B8962E] transition-colors duration-200 mb-5 block"
        >
          hello@vboadv.com
        </motion.a>

        {/* Mono tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="font-mono text-[#6B6F73]/60 text-[10px] tracking-[0.25em] uppercase"
        >
          Miami&nbsp;/&nbsp;Founder-Led&nbsp;/&nbsp;Studio&nbsp;/&nbsp;Consultant
        </motion.p>
      </div>

      {/* Gold vertical divider — desktop only */}
      <motion.div
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="hidden lg:block w-[1px] bg-[#B8962E] self-stretch flex-shrink-0 origin-top"
      />

      {/* Right panel — city image — desktop only */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="hidden lg:block relative flex-shrink-0"
        style={{ width: '40%' }}
      >
        <Image
          src="/images/miami-city.jpg"
          alt="Miami skyline"
          fill
          className="object-cover object-center"
          style={{ filter: 'grayscale(15%) brightness(0.85)' }}
          priority
          sizes="40vw"
        />
        {/* Vignette — soft dark bleed on all edges, heavier on left to blend into divider */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            boxShadow: 'inset 60px 0 80px -10px #0D0D0D, inset -40px 0 60px -10px #0D0D0D, inset 0 60px 80px -10px #0D0D0D, inset 0 -60px 80px -10px #0D0D0D',
          }}
        />
      </motion.div>

      {/* Mobile: city image below */}
      <div className="absolute inset-0 lg:hidden -z-10">
        <Image
          src="/images/miami-city.jpg"
          alt="Miami skyline"
          fill
          className="object-cover object-center"
          style={{ filter: 'grayscale(30%) brightness(0.35)' }}
          priority
          sizes="100vw"
        />
      </div>
    </section>
  )
}
