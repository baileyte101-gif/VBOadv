'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const navLinks = [
  { label: 'The Problem', href: '#the-problem' },
  { label: 'The Approach', href: '#the-approach' },
  { label: 'How We Work', href: '#how-we-work' },
  { label: 'Industries', href: '#industries' },
  { label: 'About', href: '#about' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0D0D0D]/95 backdrop-blur-sm border-b border-[#1C1C1C]'
          : 'bg-[#0D0D0D]'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="https://vboadv.com"
            className="flex items-center"
            aria-label="VBO Home"
          >
            <Image
              src="/images/logo-transparent.png"
              alt="VBO"
              width={834}
              height={222}
              className="h-12 w-auto"
              priority
            />
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-[#6B6F73] hover:text-[#F2EDE4] text-xs tracking-[0.1em] uppercase transition-colors duration-200 font-body relative group whitespace-nowrap"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-[#B8962E] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* Right side: mobile toggle + CTA */}
          <div className="flex items-center gap-3">
            {/* Mobile dropdown chevron */}
            <button
              className="lg:hidden flex items-center justify-center text-[#6B6F73] hover:text-[#F2EDE4] transition-colors duration-200 p-2 -mr-1"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              <svg
                width="14"
                height="9"
                viewBox="0 0 14 9"
                fill="none"
                className={`transition-transform duration-300 ${
                  mobileOpen ? 'rotate-180' : ''
                }`}
              >
                <path
                  d="M1 1L7 7L13 1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* CTA Button */}
            <a
              href="mailto:hello@vboadv.com"
              className="btn-gold text-[10px] py-2 px-4 md:py-2.5 md:px-5 whitespace-nowrap"
            >
              Let&apos;s Connect
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden bg-[#0D0D0D] border-t border-[#1C1C1C] overflow-hidden"
          >
            <div className="px-6 py-5 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left text-[#6B6F73] hover:text-[#F2EDE4] text-sm tracking-[0.12em] uppercase transition-colors duration-200 font-body py-3 border-b border-[#1C1C1C] last:border-0"
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
