'use client'

import { useRef, useState, type CSSProperties } from 'react'
import Image from 'next/image'
import ParticleField from '@/components/ParticleField'

const words = ['Strategy.', 'Creative.', 'Performance.']

/* Entrance timing, one call per element, matching the framer-motion delays and
   durations this replaced. See the "Hero entrance" block in globals.css for why
   the copy animates on transform only and never on opacity. */
const enter = (delay: number, duration: number) =>
  ({
    // Rounded because the per-word stagger is computed, and 0.48000000000000004s
    // should not end up in the server HTML.
    '--hero-in-delay': `${Math.round(delay * 100) / 100}s`,
    '--hero-in-dur': `${duration}s`,
  }) as CSSProperties

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

      {/* Left panel. text content */}
      <div className="flex-1 flex flex-col justify-center px-8 md:px-12 lg:px-20 xl:px-24 py-20 min-w-0 relative z-[3]">
        {/* Legibility scrim: thins the particles where the copy sits.
            If the particles fight the type, reduce the particles, never the type. */}
        <div className="hero-scrim hero-scrim-strong" aria-hidden />

        {/* Label */}
        <p
          style={enter(0.15, 0.6)}
          className="hero-in hero-in-up font-mono text-[#6B6F73] text-[11px] tracking-[0.3em] uppercase mb-8 md:mb-10"
        >
          Marketing Consultant &amp; Studio
        </p>

        {/* Headline. first word is the single H1 for SEO. The other two
            words share identical visual treatment via the same className but
            render as <p> so the page has exactly one H1. The aria-label gives
            the H1 its full accessible name (all three words) without touching
            the per-word stagger animation. */}
        <div className="mb-8 md:mb-10">
          {words.map((word, i) =>
            i === 0 ? (
              <h1
                key={word}
                aria-label="Strategy. Creative. Performance."
                style={enter(0.28, 0.65)}
                className="hero-in hero-in-left font-headline font-black text-[#F2EDE4] uppercase leading-[0.92] text-[clamp(4rem,9vw,7.5rem)]"
              >
                {word}
              </h1>
            ) : (
              <p
                key={word}
                style={enter(0.28 + i * 0.1, 0.65)}
                className="hero-in hero-in-left font-headline font-black text-[#F2EDE4] uppercase leading-[0.92] text-[clamp(4rem,9vw,7.5rem)]"
              >
                {word}
              </p>
            )
          )}
        </div>

        {/* Sub-headline */}
        <p
          style={enter(0.65, 0.6)}
          className="hero-in hero-in-lift text-[#F2EDE4]/90 font-medium text-base md:text-lg mb-4 font-body leading-relaxed max-w-sm"
        >
          Fully integrated marketing. Human, built on experience and modern efficiency.
        </p>

        {/* Geo intro. SEO signal: Coconut Grove, Miami + consultancy/studio self-label */}
        <p
          style={enter(0.72, 0.6)}
          className="hero-in hero-in-lift text-[#9fa3a7] text-sm font-body leading-relaxed max-w-sm mb-10"
        >
          Based in Coconut Grove, Miami, we&apos;re a founder-led marketing consultancy and studio serving small and mid-size businesses across South Florida.
        </p>

        {/* CTA */}
        <div style={enter(0.8, 0.5)} className="hero-in hero-in-lift mb-6">
          <a
            href="mailto:hello@vboadv.com"
            className="btn-gold inline-flex items-center gap-3"
          >
            Let&apos;s Connect
            <span className="text-base leading-none">→</span>
          </a>
        </div>

        {/* Email */}
        <a
          href="mailto:hello@vboadv.com"
          style={enter(0.88, 0.5)}
          className="hero-in hero-in-lift font-mono text-[#6B6F73]/70 text-[10px] tracking-[0.2em] hover:text-[#B8962E] transition-colors duration-200 mb-5 block"
        >
          hello@vboadv.com
        </a>

        {/* Ground toggle. black on the left, marble on the right. Real button,
            so keyboard reach, focus ring and aria-pressed come for free. */}
        <div style={enter(0.94, 0.5)} className="hero-in hero-in-lift mb-5">
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
        </div>

        {/* Mono tagline */}
        <p
          style={enter(1.0, 0.5)}
          className="hero-in hero-in-lift font-mono text-[#6B6F73]/60 text-[10px] tracking-[0.25em] uppercase"
        >
          Miami, FL&nbsp;/&nbsp;Founder-Led&nbsp;/&nbsp;Studio&nbsp;/&nbsp;Consultant
        </p>
      </div>

      {/* Gold vertical divider. desktop only */}
      <div
        style={enter(0.4, 0.8)}
        className="hero-in hero-in-rule hidden lg:block w-[1px] bg-[#B8962E] self-stretch flex-shrink-0 origin-top relative z-[2]"
      />

      {/* Right panel. city image, regraded to the house grade. desktop only.
          Below lg the wordmark field is the hero's ground, so no photo competes
          with it, matching the approved mockup. */}
      <div
        style={{ width: '40%', ...enter(0.5, 1) }}
        className="hero-in hero-in-fade hidden lg:block relative flex-shrink-0 z-[2]"
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
        {/* Vignette. soft dark bleed on all edges, heavier on left to blend into divider */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            boxShadow: 'inset 60px 0 80px -10px #0D0D0D, inset -40px 0 60px -10px #0D0D0D, inset 0 60px 80px -10px #0D0D0D, inset 0 -60px 80px -10px #0D0D0D',
          }}
        />
      </div>
    </section>
  )
}
