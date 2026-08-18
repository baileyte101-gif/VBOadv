'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const services = [
  'paid media',
  'social media',
  'SEO',
  'CRM & Email Marketing',
  'brand strategy and development',
  'websites',
  'performance analytics',
  'creative',
]

const steps = [
  {
    number: '01',
    title: 'Strategy',
    lead: 'We are your fractional CMO.',
    leadHref: '/fractional-cmo',
    leadLinkText: 'fractional CMO',
    body: 'We define priorities for your business, clarify positioning, establish channel focus and set measurable benchmarks.',
    emphasis: 'We set full alignment before action.',
  },
  {
    number: '02',
    title: 'Integration',
    body: 'We help integrate creative, data, vendors, and internal teams to move in coordination.',
    emphasis: 'No silos. No duplicated effort. No guesswork. We help set it up.',
  },
  {
    number: '03',
    title: 'Our Services',
    body: null, // handled separately
    emphasis: 'We oversee growth with precision and we cut out the noise.',
  },
]

// Renders step.lead as plain text, or with leadLinkText wrapped in a link to
// leadHref when both are present. The sentence itself never changes.
function renderLead(step: (typeof steps)[number]) {
  if (!('lead' in step) || !step.lead) return null
  if ('leadHref' in step && step.leadHref && 'leadLinkText' in step && step.leadLinkText) {
    const [before, after] = step.lead.split(step.leadLinkText)
    return (
      <>
        {before}
        <a
          href={step.leadHref}
          className="underline underline-offset-4 decoration-current/40 hover:text-[#F2EDE4] transition-colors"
        >
          {step.leadLinkText}
        </a>
        {after}
      </>
    )
  }
  return step.lead
}

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
          <p className="section-label">What We Do</p>
          <div className="section-accent" />
          <h2 className="font-headline font-black text-[#F2EDE4] uppercase leading-none text-[clamp(2.5rem,6vw,5rem)] max-w-[600px]">
            How marketing actually works in Miami and why most of it doesn&apos;t.
          </h2>
        </motion.div>

        {/* Steps */}
        <div>
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ y: 28 }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.12 }}
              /* Hairline reads as a hairline on the navy ground, where the old
                 #1C1C1C rule would have disappeared into it. */
              className="border-t border-white/[0.08] py-12 md:py-14 grid grid-cols-1 md:grid-cols-[160px_1fr] gap-6 md:gap-12 lg:gap-16"
            >
              {/* Number + Title */}
              <div>
                <span className="block font-mono text-[#B8962E] text-xs tracking-[0.2em] mb-2">
                  {step.number}
                </span>
                <h3 className="font-headline font-black text-[#F2EDE4] uppercase leading-none text-[clamp(1.8rem,3.5vw,2.75rem)]">
                  {step.title}
                </h3>
              </div>

              {/* Body text */}
              <div className="space-y-4">
                {step.number === '03' ? (
                  <p className="text-[#8A8E92] text-base md:text-lg font-body leading-relaxed">
                    We launch campaigns with structure and strategy. Performance
                    is tracked with real data and is optimized intentionally.
                    Whether you need{' '}
                    {services.map((s, j) => (
                      <span key={s}>
                        <span className="text-[#B8962E]">{s}</span>
                        {j < services.length - 1 ? ', ' : ', '}
                      </span>
                    ))}
                    we can execute.
                  </p>
                ) : (
                  <>
                    {'lead' in step && step.lead && (
                      <p className="text-[#B8962E] font-medium text-base md:text-lg leading-relaxed">
                        {renderLead(step)}
                      </p>
                    )}
                    <p className="text-[#8A8E92] text-base md:text-lg font-body leading-relaxed">
                      {step.body}
                    </p>
                  </>
                )}
                <p className="text-[#F2EDE4] font-medium text-base md:text-lg leading-relaxed">
                  {step.emphasis}
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
