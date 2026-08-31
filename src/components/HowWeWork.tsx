'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/*
 * Section 03. Card bodies and titles are Tim's own replacement lines,
 * 2026-08-21 preview review round, applied verbatim on his direct
 * instruction ("Rest u can update bc it's from me"). They replace Mary's
 * 2026-08-21 bodies; the white closing sublines are Mary's and stay, per the
 * same instruction ("Keep the subline for all of them"). Do not polish Tim's
 * wording without him; flag, don't fix.
 *
 * Constraints from Mary's claims ledger that the code cannot show:
 * - "there are no juniors" is an absolute. It needs a rewrite the day a
 *   junior is hired.
 * - The section deliberately contains no service list and no three-beat
 *   negation (the page's one is in The Approach above). Do not add either.
 *
 * SECTION_LABEL is pending Tim's call between "What We Do" and "How We Work"
 * (Atlas recommends the rename). If he picks the rename, change the constant
 * here and the nav label in Nav.tsx; the #how-we-work anchor stays either way.
 */
const SECTION_LABEL = 'What We Do'

const cards = [
  {
    number: '01',
    title: 'Senior Level Marketer',
    body: 'Collaborates on strategy, sets your direction, and runs your program.',
    emphasis:
      'Nothing gets handed to a junior after the kickoff call, because there are no juniors.',
  },
  {
    number: '02',
    title: 'One System',
    body: 'A cutting edge system connected end to end. Modern tools carry the busywork of a traditional junior team, allowing senior hours to go into your business. You keep the savings.',
    emphasis:
      "And where a job needs specialist hands, we bring in people we trust rather than pretending we don't need them.",
  },
  {
    number: '03',
    title: 'A Few Clients and a Personal Touch',
    body: 'We take on a few clients at a time on purpose. Small and mid size businesses able to access marketing support that typically is priced out by traditional marketing firms.',
    emphasis: "If the fit isn't there, we'll tell you on the first call.",
  },
]

export default function HowWeWork() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="how-we-work"
      /* Ground 04: Harbour navy. This was the flattest run on the page (the
         divider above and Life's band below are both black-family), and a real
         colour shift breaks it without inventing a sixth ground. Moved down from
         position 5, so it now carries full bottom padding. */
      className="ground-harbour py-24 md:py-32 lg:py-40 px-8 md:px-12 lg:px-20 xl:px-24 relative overflow-hidden"
    >
      {/* Ghost section number. Was 04; renumbered to 03, 2026-08-11, when
          WhoWeWorkWith (03) came out of the page. */}
      <div
        className="absolute right-4 top-0 font-headline font-black leading-none select-none pointer-events-none text-[160px] md:text-[220px] lg:text-[280px]"
        style={{ color: 'rgb(111 87 40 / 0.12)' }}
        aria-hidden
      >
        03
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

      <div className="relative z-10" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ y: 16 }}
          animate={isInView ? { y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-16 md:mb-20"
        >
          <p className="section-label">{SECTION_LABEL}</p>
          <div className="section-accent" />
          <h2 className="font-headline font-black text-[#F2EDE4] uppercase leading-none text-[clamp(2.5rem,6vw,5rem)] max-w-[600px]">
            Who shows up when you hire VBO.
          </h2>
        </motion.div>

        {/* Cards */}
        <div>
          {cards.map((card, i) => (
            <motion.div
              key={card.number}
              initial={{ y: 28 }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.12 }}
              /* Hairline reads as a hairline on the navy ground, where the old
                 #1C1C1C rule would have disappeared into it.
                 Title column 160px -> 240px, 2026-08-21: Tim's replacement
                 titles run to five words ("A Few Clients and a Personal
                 Touch") where the originals were one or two, and 160px set
                 them as a tall stack of single words. */
              className="border-t border-white/[0.08] py-12 md:py-14 grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6 md:gap-12 lg:gap-16"
            >
              {/* Number + Title */}
              <div>
                <span className="block font-mono text-[#B8962E] text-xs tracking-[0.2em] mb-2">
                  {card.number}
                </span>
                <h3 className="font-headline font-black text-[#F2EDE4] uppercase leading-none text-[clamp(1.8rem,3.5vw,2.75rem)]">
                  {card.title}
                </h3>
              </div>

              {/* Body text. The emphasis line is the card's own closing
                  sentence, split out into the section's standing white-line
                  slot; no words added or removed. */}
              <div className="space-y-4">
                <p className="text-[#8A8E92] text-base md:text-lg font-body leading-relaxed">
                  {card.body}
                </p>
                <p className="text-[#F2EDE4] font-medium text-base md:text-lg leading-relaxed">
                  {card.emphasis}
                </p>
              </div>
            </motion.div>
          ))}
          <div className="border-t border-white/[0.08]" />
        </div>
      </div>
    </section>
  )
}
