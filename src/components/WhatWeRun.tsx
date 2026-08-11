'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import ClientGlassTile from '@/components/ClientGlassTile'
import { clients } from '@/lib/clients'

/* Icon set: one shared viewBox (0 0 32 32), one stroke weight (1.6), square
   caps, no fills, lifted as-is from Jules's approved build
   (Jules/designs/vbo/website/section-01-2026-08/treatment-04-tim/index.html).
   Each represents the noun at the front of its line (the area of work), not
   the payoff clause after the comma. See rationale.md for the full reasoning
   per icon, including the honest flag that icon 1 is the softest of the four
   on its own and needs its neighbor line to fully land. */

function IconReach() {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full block">
      <path d="M16 3 L29 16 L16 29 L3 16 Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="miter" />
      <path d="M16 9 L23 16 L16 23 L9 16 Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="miter" />
      <circle cx="27" cy="6" r="1.8" stroke="currentColor" strokeWidth="1.6" />
      <line x1="25.2" y1="7.7" x2="19" y2="12.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
    </svg>
  )
}

function IconSearch() {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full block">
      <circle cx="13.5" cy="13.5" r="8.5" stroke="currentColor" strokeWidth="1.6" />
      <line x1="19.6" y1="19.6" x2="27.5" y2="27.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
    </svg>
  )
}

function IconSite() {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full block">
      <rect x="4.5" y="5.5" width="23" height="21" stroke="currentColor" strokeWidth="1.6" />
      <line x1="4.5" y1="11.5" x2="27.5" y2="11.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M13 15 L16 21 L19 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" strokeLinejoin="miter" />
    </svg>
  )
}

function IconReport() {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full block">
      <rect x="6.5" y="3.5" width="19" height="25" stroke="currentColor" strokeWidth="1.6" />
      <line x1="10" y1="9.5" x2="22" y2="9.5" stroke="currentColor" strokeWidth="1.6" />
      <line x1="10.5" y1="23.5" x2="10.5" y2="19.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
      <line x1="15.5" y1="23.5" x2="15.5" y2="16.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
      <line x1="20.5" y1="23.5" x2="20.5" y2="13.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
    </svg>
  )
}

// Copy locked 2026-08-11 ("REVISION 2026-08-11: THE SHIPPING SET" +
// addenda in clients/vbo/2026-08-10-homepage-section-01-copy-options.md).
// Strings copied from Jules's approved build, not retyped from the doc.
const supportingLines: { icon: JSX.Element; text: string }[] = [
  { icon: <IconReach />, text: "Paid ads on Google and Meta, in front of people who don't know you yet." },
  { icon: <IconSearch />, text: 'Search work, so you get found without paying for every click.' },
  { icon: <IconSite />, text: 'A website people land on, with brand and creative to match.' },
  { icon: <IconReport />, text: 'Reporting that tells you what each of those actually did.' },
]

export default function WhatWeRun() {
  const shouldReduceMotion = useReducedMotion()

  const topRef = useRef(null)
  const topInView = useInView(topRef, { once: true, margin: '-80px' })
  const marbleRef = useRef(null)
  const marbleInView = useInView(marbleRef, { once: true, margin: '-80px' })
  const bottomRef = useRef(null)
  const bottomInView = useInView(bottomRef, { once: true, margin: '-80px' })

  // Respect prefers-reduced-motion: no vertical travel, a near-instant fade
  // instead of the normal rise, still gated on scroll-into-view so content
  // doesn't pop in above the fold on load.
  const fadeProps = (distance: number, duration: number, delay = 0) => ({
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : distance },
    transition: {
      duration: shouldReduceMotion ? 0.2 : duration,
      delay: shouldReduceMotion ? 0 : delay,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  })

  return (
    // Section 01. Was "the-problem" (problem statement); now the plain
    // answer to what VBO runs, who for, and who already trusts it. Three
    // bands replace the old single ground: blue, a marble strip carrying
    // the client logos, blue again. Structure and copy per Tim's own
    // direction, 2026-08-11 (Jules/designs/vbo/website/section-01-2026-08/
    // treatment-04-tim/index.html + rationale.md addenda).
    <section id="what-we-run" className="relative overflow-hidden">
      {/* Ghost section number. Section 01 stays 01. */}
      <div
        className="absolute right-4 top-0 font-headline font-black leading-none select-none pointer-events-none text-[160px] md:text-[220px] lg:text-[280px]"
        style={{ color: 'rgb(111 87 40 / 0.12)' }}
        aria-hidden
      >
        01
      </div>

      {/* Gold vertical connector line — desktop only, spans behind all three
          bands, same as Jules's approved build and the site's own single
          instance of this device elsewhere on the page. */}
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

      {/* ── Band 1: blue top — label, headline, four-line grid ────────────── */}
      <div className="ground-plain step-up pt-24 md:pt-32 lg:pt-40 px-8 md:px-12 lg:px-20 xl:px-24 pb-16 md:pb-[72px] lg:pb-20">
        <div className="max-w-[1120px] relative z-10" ref={topRef}>
          <motion.div {...fadeProps(16, 0.55)} animate={topInView ? { opacity: 1, y: 0 } : {}}>
            <p className="section-label">What we run</p>
            <div className="section-accent" />
          </motion.div>

          <motion.h2
            {...fadeProps(28, 0.7, 0.1)}
            animate={topInView ? { opacity: 1, y: 0 } : {}}
            className="font-headline font-black text-[#F2EDE4] uppercase leading-[0.98] text-[40px] sm:text-[56px] lg:text-[72px] mb-14"
          >
            Senior level taste and strategy, done at enterprise speed and accuracy.
          </motion.h2>

          <motion.div
            {...fadeProps(20, 0.65, 0.2)}
            animate={topInView ? { opacity: 1, y: 0 } : {}}
            className="pt-8 border-t border-[#F2EDE4]/[0.12] grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-7 lg:gap-y-9"
          >
            {supportingLines.map((line) => (
              <div key={line.text} className="flex items-start gap-3.5 lg:gap-4">
                <span
                  aria-hidden
                  className="flex-none w-6 h-6 lg:w-7 lg:h-7 text-[#B8962E] opacity-[0.86] mt-[3px] lg:mt-1"
                >
                  {line.icon}
                </span>
                <p className="font-body text-[#F2EDE4] font-medium text-[18px] lg:text-[19px] leading-[1.5] w-[288px] lg:w-[466px]">
                  {line.text}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Gold bar marking the step from the blue ground into the marble
          strip. Same element the site already uses at every ground change
          (see the divider between this section and The Approach below). */}
      <div className="retro-divider-strip" aria-hidden />

      {/* ── Band 2: marble strip — title, subhead, four client tiles ──────── */}
      <div
        className="relative py-10 md:py-12 lg:py-[52px] px-8 md:px-12 lg:px-20 xl:px-24"
        style={{
          // Deliberately not the shared `.ground-smoke` class, which
          // defaults to `background-size: cover` — the exact setting that
          // blows this same pattern into soft blotches on a TALL section.
          // A short, wide strip like this one sits close to the pattern's
          // own native proportions, so cover reads as tight grain here, not
          // enlarged blotches (checked against the approved renders). The
          // rule is written explicitly rather than inherited so a future
          // height change to this strip gets re-checked, not silently
          // inherited from whatever `.ground-smoke` happens to be then.
          backgroundColor: 'var(--marble)',
          backgroundImage: 'var(--ground-smoke-pattern)',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      >
        {/* Ambient gold backdrop glow, same device WhoWeWorkWith used to
            give the glass tiles something to refract. */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(60% 60% at 50% 45%, rgba(184,150,46,0.09) 0%, rgba(184,150,46,0) 70%)',
          }}
        />

        <div className="max-w-[1120px] relative z-10" ref={marbleRef}>
          {/* Title + subhead ported up from WhoWeWorkWith.tsx (removed
              2026-08-11) at Tim's direction, using that section's own
              treatment scaled down for a strip rather than a full section:
              headline face, gold accent rule, supporting line. No new
              mono-gold micro-label added on top of it; that would be
              inventing a fourth line of copy nobody asked for. */}
          <motion.div {...fadeProps(16, 0.55)} animate={marbleInView ? { opacity: 1, y: 0 } : {}}>
            <p className="font-headline font-black text-[#F2EDE4] uppercase leading-[1.05] text-[26px] sm:text-[32px] lg:text-[38px] mb-3 lg:mb-4">
              The Brands We Build With
            </p>
            <div className="w-8 h-[2px] bg-[#B8962E] mb-3 lg:mb-4" aria-hidden />
            <p className="font-body text-[#6B6F73] text-sm lg:text-base leading-relaxed max-w-xl mb-6 lg:mb-8">
              Our growing roster of brands we&apos;re partnered with
            </p>
          </motion.div>

          <motion.div
            {...fadeProps(24, 0.6, 0.15)}
            animate={marbleInView ? { opacity: 1, y: 0 } : {}}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 lg:gap-5"
          >
            {clients.map((client) => (
              <ClientGlassTile key={client.name} client={client} size="compact" />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Gold bar, marble's exit edge. Two transitions inside this section,
          two bars — see rationale.md for why one bar on only one edge would
          have read as unfinished rather than restrained. */}
      <div className="retro-divider-strip" aria-hidden />

      {/* ── Band 3: blue bottom — the closing claim ────────────────────────── */}
      <div className="ground-plain step-up pt-16 md:pt-[72px] lg:pt-20 px-8 md:px-12 lg:px-20 xl:px-24 pb-24 md:pb-28 lg:pb-32">
        <div className="max-w-[1120px] relative z-10" ref={bottomRef}>
          <motion.p
            {...fadeProps(20, 0.65)}
            animate={bottomInView ? { opacity: 1, y: 0 } : {}}
            className="font-body text-[#F2EDE4] font-extrabold text-[28px] sm:text-[38px] lg:text-[48px] leading-[1.15]"
          >
            Each client getting the attention it deserves. <span className="whitespace-nowrap">No Riff Raff</span>.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
