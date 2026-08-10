'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import ParticleField from '@/components/ParticleField'

const words = ['Strategy.', 'Creative.', 'Performance.']

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const [marble, setMarble] = useState(false)

  return (
    <section
      ref={heroRef}
      className={`relative flex bg-[#0D0D0D] pt-16 min-h-screen overflow-hidden ${
        marble ? 'marble-on' : ''
      }`}
    >
      {/* Marble ground, revealed by the toggle. Starts hidden. */}
      <div className="hero-bg-layer ground-smoke" aria-hidden />

      {/* The VBO wordmark as a large particle field behind the hero copy.
          Decorative: aria-hidden, never a heading, no crawlable "VBO" text. */}
      <ParticleField
        variant="wordmark"
        eventTargetRef={heroRef}
        className="hero-wordmark-wrap"
        fallbackClassName="hero-wordmark-fallback"
        boost={marble}
        fallback={
          <Image
            src="/images/logo-transparent.png"
            alt=""
            width={834}
            height={222}
            aria-hidden
          />
        }
      />

      {/* Left panel — text content */}
      <div className="flex-1 flex flex-col justify-center px-8 md:px-12 lg:px-20 xl:px-24 py-20 min-w-0 relative z-[3]">
        {/* Legibility scrim: thins the particles where the headline sits.
            If the particles fight the type, reduce the particles, never the type. */}
        <div className="hero-scrim" aria-hidden />

        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-mono text-[#6B6F73] text-[11px] tracking-[0.3em] uppercase mb-8 md:mb-10"
        >
          Marketing Consultant &amp; Studio
        </motion.p>

        {/* Headline — first word is the single H1 for SEO. The other two
            words share identical visual treatment via the same className but
            render as <p> so the page has exactly one H1. */}
        <div className="mb-8 md:mb-10">
          {words.map((word, i) =>
            i === 0 ? (
              <motion.h1
                key={word}
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.65, delay: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
                className="font-headline font-black text-[#F2EDE4] uppercase leading-[0.92] text-[clamp(4rem,9vw,7.5rem)]"
              >
                {word}
              </motion.h1>
            ) : (
              <motion.p
                key={word}
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.65, delay: 0.28 + i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                className="font-headline font-black text-[#F2EDE4] uppercase leading-[0.92] text-[clamp(4rem,9vw,7.5rem)]"
              >
                {word}
              </motion.p>
            )
          )}
        </div>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="text-[#6B6F73] text-base md:text-lg mb-4 font-body leading-relaxed max-w-sm"
        >
          Fully integrated marketing. Human, built on experience and modern efficiency.
        </motion.p>

        {/* Geo intro — SEO signal: Coconut Grove, Miami + consultancy/studio self-label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.72 }}
          className="text-[#6B6F73]/70 text-sm font-body leading-relaxed max-w-sm mb-10"
        >
          Based in Coconut Grove, Miami, we&apos;re a founder-led marketing consultancy and studio serving small and mid-size businesses across South Florida.
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

        {/* Ground toggle — black on the left, marble on the right. Real button,
            so keyboard reach, focus ring and aria-pressed come for free. */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.94 }}
          className="mb-5"
        >
          <button
            type="button"
            onClick={() => setMarble((v) => !v)}
            aria-pressed={marble}
            aria-label="Switch the hero background between black and marble"
            className="hero-bg-toggle"
          >
            <span className="pill" aria-hidden />
            <span className="opt opt-black">Black</span>
            <span className="opt opt-marble">Marble</span>
          </button>
        </motion.div>

        {/* Mono tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="font-mono text-[#6B6F73]/60 text-[10px] tracking-[0.25em] uppercase"
        >
          Miami, FL&nbsp;/&nbsp;Founder-Led&nbsp;/&nbsp;Studio&nbsp;/&nbsp;Consultant
        </motion.p>
      </div>

      {/* Gold vertical divider — desktop only */}
      <motion.div
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="hidden lg:block w-[1px] bg-[#B8962E] self-stretch flex-shrink-0 origin-top relative z-[2]"
      />

      {/* Right panel — city image, regraded to the house grade — desktop only.
          Below lg the wordmark field is the hero's ground, so no photo competes
          with it, matching the approved mockup. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="hidden lg:block relative flex-shrink-0 z-[2]"
        style={{ width: '40%' }}
      >
        <Image
          src="/images/miami-city-graded.jpg"
          alt="Miami skyline. VBO Advertising is a marketing consultancy and studio based in Coconut Grove, Miami, Florida"
          fill
          className="object-cover object-center"
          priority
          /* The 1px slot below lg keeps the preload from pulling a full-size
             image on phones, where this panel is not rendered at all. */
          sizes="(max-width: 1023px) 1px, 40vw"
        />
        {/* Vignette — soft dark bleed on all edges, heavier on left to blend into divider */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            boxShadow: 'inset 60px 0 80px -10px #0D0D0D, inset -40px 0 60px -10px #0D0D0D, inset 0 60px 80px -10px #0D0D0D, inset 0 -60px 80px -10px #0D0D0D',
          }}
        />
      </motion.div>
    </section>
  )
}
