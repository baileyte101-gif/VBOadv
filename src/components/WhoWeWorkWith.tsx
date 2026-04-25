'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

type Client = {
  name: string
  href: string
  logo: string
  variant: 'image' | 'peixoto-lockup'
}

const clients: Client[] = [
  {
    name: 'Sir Galloway Dry Cleaners',
    href: 'https://sirgalloway.com',
    logo: '/images/clients/sir-galloway-white.png',
    variant: 'image',
  },
  {
    name: 'Peixoto',
    href: 'https://peixotowear.com',
    logo: '/images/clients/peixoto-white.svg',
    variant: 'peixoto-lockup',
  },
]

export default function WhoWeWorkWith() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="who-we-work-with"
      className="bg-[#0D0D0D] pt-12 md:pt-16 lg:pt-20 pb-16 md:pb-20 lg:pb-24 px-8 md:px-12 lg:px-20 xl:px-24 relative overflow-hidden"
    >
      {/* Ambient gold backdrop glow — gives the glass blur something to refract */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 40%, rgba(184,150,46,0.08) 0%, rgba(184,150,46,0) 70%)',
        }}
      />

      {/* Ghost section number */}
      <div
        className="absolute right-4 top-0 font-headline font-black leading-none select-none pointer-events-none text-[#1C1C1C] text-[160px] md:text-[220px] lg:text-[280px]"
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
          background:
            'linear-gradient(to bottom, rgba(184,150,46,0.22) 0%, rgba(184,150,46,0.12) 50%, rgba(184,150,46,0) 82%)',
        }}
        aria-hidden
      />

      {/* Content */}
      <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          <p className="section-label">Who We Work With</p>
          <div className="section-accent" />
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-headline font-black text-[#F2EDE4] uppercase leading-none text-[clamp(2.5rem,6vw,5rem)] mb-4"
        >
          The brands we build with.
        </motion.h2>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.18 }}
          className="text-[#6B6F73] text-base md:text-lg font-body leading-relaxed max-w-2xl mb-12 md:mb-16"
        >
          Our growing roster of brands we&apos;re partnered with.
        </motion.p>

        {/* Logo grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.28 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-5xl"
        >
          {clients.map((client) => (
            <a
              key={client.name}
              href={client.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${client.name}`}
              className="client-glass group relative flex items-center justify-center overflow-hidden rounded-2xl border border-white/10 h-[180px] md:h-[220px] transition-all duration-500 ease-out hover:border-[#B8962E]/50 hover:-translate-y-1"
              style={{
                background:
                  'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
            >
              {/* Gold glow that fades in on hover */}
              <span
                aria-hidden
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle at 50% 50%, rgba(184,150,46,0.22) 0%, rgba(184,150,46,0) 65%)',
                }}
              />

              {/* Diagonal shimmer sweep on hover */}
              <span
                aria-hidden
                className="client-shimmer pointer-events-none absolute inset-y-0 -left-1/2 w-1/2"
                style={{
                  background:
                    'linear-gradient(75deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)',
                }}
              />

              {/* Logo */}
              <div className="relative flex items-center justify-center w-full h-full px-8 md:px-10">
                {client.variant === 'image' && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={client.logo}
                    alt={`${client.name} logo`}
                    className="opacity-70 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-500 ease-out"
                    style={{
                      maxWidth: '70%',
                      maxHeight: '70%',
                      width: 'auto',
                      height: 'auto',
                      objectFit: 'contain',
                    }}
                  />
                )}

                {client.variant === 'peixoto-lockup' && (
                  <div className="flex flex-col items-center justify-center gap-2.5 md:gap-3 opacity-70 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-500 ease-out">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={client.logo}
                      alt=""
                      aria-hidden
                      className="w-auto h-[78px] md:h-[96px]"
                    />
                    <span className="font-headline font-black text-[#F2EDE4] uppercase leading-none text-[14px] md:text-[16px] tracking-[0.32em] md:tracking-[0.36em]">
                      Peixoto
                    </span>
                  </div>
                )}
              </div>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
