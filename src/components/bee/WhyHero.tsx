'use client'

import { useRef, useState } from 'react'
import ParticleField from '@/components/ParticleField'
import HeroGroundToggle from '@/components/HeroGroundToggle'
import { WHY_PAGE_LABEL, WHY_H1, WHY_INTRO } from '@/lib/bee-copy'

/**
 * The /why-the-bee title section with the homepage hero's two features (Tim,
 * 2026-10-15: "Exact same feature, exact same work ... just with the B
 * instead"): the bee as a large field of flickering gold dots behind the
 * title that scatters from the pointer and eases back, and the black / marble
 * ground toggle. Same component, dots, legibility scrim and toggle as the
 * homepage hero (ParticleField variant "bee", HeroGroundToggle).
 *
 * Tim approved the bee sitting behind the title, which names Manchester, as
 * an exception to the 10/7 rule that "Manchester" is never set with the mark
 * (2026-10-15: "Approved."). The field is decorative: aria-hidden, and the
 * words are unchanged, server-rendered text.
 *
 * Still a front band for the flying bee (data-bee-sec="hero": it waits behind
 * this section).
 */
export default function WhyHero() {
  const ref = useRef<HTMLElement>(null)
  const [marble, setMarble] = useState(false)

  return (
    <section
      ref={ref}
      className={`vb-sec vb-hero ground-plain ${marble ? 'marble-on' : ''}`}
      aria-labelledby="vb-title"
      data-bee-sec="hero"
    >
      {/* Marble ground, revealed by the toggle. Starts hidden. */}
      <div className="hero-bg-layer ground-smoke" aria-hidden />

      <ParticleField
        variant="bee"
        eventTargetRef={ref}
        className="vb-hero-field"
        fallbackClassName="hero-wordmark-fallback"
        boost={marble}
        fallback={
          <svg className="vb-hero-field-still" viewBox="49.697 32 412.605 448" aria-hidden="true" focusable="false">
            <use href="#vbo-bee" />
          </svg>
        }
      />

      <div className="vb-wrap">
        {/* Legibility scrim, as on the homepage: thins the dots where the words
            sit. If the dots fight the type, reduce the dots, never the type. */}
        <div className="hero-scrim hero-scrim-strong" aria-hidden />
        <p className="vb-label">{WHY_PAGE_LABEL}</p>
        <div className="vb-accent" aria-hidden />
        <h1 id="vb-title">{WHY_H1}</h1>
        <p className="vb-intro">{WHY_INTRO}</p>
        <div className="vb-hero-toggle">
          <HeroGroundToggle marble={marble} onToggle={() => setMarble((v) => !v)} />
        </div>
      </div>
    </section>
  )
}
