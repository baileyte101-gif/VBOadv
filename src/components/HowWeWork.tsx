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

export default function HowWeWork() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="how-we-work"
      className="bg-[#0D0D0D] pt-24 md:pt-32 lg:pt-40 pb-12 md:pb-16 lg:pb-20 px-8 md:px-12 lg:px-20 xl:px-24 relative overflow-hidden"
    >
      {/* Ghost section number */}
      <div
        className="absolute right-4 top-0 font-headline font-black leading-none select-none pointer-events-none text-[#1C1C1C] text-[160px] md:text-[220px] lg:text-[280px]"
        aria-hidden
      >
        03
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
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-16 md:mb-20"
        >
          <p className="section-label">What We Do</p>
          <div className="section-accent" />
          <h2 className="font-headline font-black text-[#F2EDE4] uppercase leading-none text-[clamp(2.5rem,6vw,5rem)] max-w-[600px]">
            Three Phases. Integrated Services.
          </h2>
        </motion.div>

        {/* Steps */}
        <div>
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.12 }}
              className="border-t border-[#1C1C1C] py-12 md:py-14 grid grid-cols-1 md:grid-cols-[160px_1fr] gap-6 md:gap-12 lg:gap-16"
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
                  <p className="text-[#6B6F73] text-base md:text-lg font-body leading-relaxed">
                    We launch campaigns with structure and strategy. Performance
                    is tracked with real data and is optimized intentionally.
                    Whether you need{' '}
                    {services.map((s, j) => (
                      <span key={s}>
                        <span className="text-[#B8962E]">{s}</span>
                        {j < services.length - 1 ? ', ' : ' '}
                      </span>
                    ))}
                    — we can execute.
                  </p>
                ) : (
                  <>
                    {'lead' in step && step.lead && (
                      <p className="text-[#B8962E] font-medium text-base md:text-lg leading-relaxed">
                        {step.lead}
                      </p>
                    )}
                    <p className="text-[#6B6F73] text-base md:text-lg font-body leading-relaxed">
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
          <div className="border-t border-[#1C1C1C]" />
        </div>
      </div>
    </section>
  )
}
