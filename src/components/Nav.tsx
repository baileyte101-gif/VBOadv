'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SERVICES, INDUSTRIES_NEW, INDUSTRIES_EXISTING, type NavItem } from '@/lib/navigation'

/**
 * Site header.
 *
 * Rebuilt for the 2026-08 build, which took the site from 12 URLs to 27. The
 * old header was a list of homepage anchors; it had nowhere to put twelve
 * industry pages and seven service pages.
 *
 * Two menus (Services, Industries) plus three flat links. The menus are real
 * disclosure widgets: a button with aria-expanded owning a list, opening on
 * hover for pointers and on click or Enter for keyboard, closing on Escape and
 * on focus leaving the group. Every destination is a plain anchor in the DOM
 * whether or not the menu is open, so the internal linking that half this build
 * exists for does not depend on JavaScript running.
 */

type MenuKey = 'services' | 'industries'

const linkClass =
  'text-[#8A8E92] hover:text-[#F2EDE4] text-xs tracking-[0.1em] uppercase transition-colors duration-200 font-body relative group whitespace-nowrap'

function Underline() {
  return (
    <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-[#B8962E] transition-all duration-300 group-hover:w-full" />
  )
}

function DesktopMenu({
  id,
  label,
  href,
  groups,
  open,
  onOpen,
  onClose,
}: {
  id: MenuKey
  label: string
  href: string
  groups: { heading?: string; items: NavItem[] }[]
  open: boolean
  onOpen: () => void
  onClose: () => void
}) {
  const wrapRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      onBlur={(e) => {
        if (!wrapRef.current?.contains(e.relatedTarget as Node)) onClose()
      }}
    >
      {/* Clicking the label opens the menu rather than navigating. The hub page
          is still reachable: it is the first item inside, labelled "All ...".
          That way one click always reveals the section instead of committing
          the visitor to a page before they have seen what is under it. */}
      <button
        type="button"
        aria-expanded={open}
        aria-controls={`${id}-menu`}
        onClick={() => (open ? onClose() : onOpen())}
        className={`${linkClass} flex items-center gap-1.5`}
      >
        {label}
        <svg
          width="9"
          height="6"
          viewBox="0 0 14 9"
          fill="none"
          aria-hidden
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          <path
            d="M1 1L7 7L13 1"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <Underline />
      </button>

      <div
        id={`${id}-menu`}
        hidden={!open}
        className="absolute left-0 top-full pt-4 z-50"
      >
        <div className="min-w-[260px] bg-[#0D0D0D] border border-[#B8962E]/25 py-3">
          {groups.map((group, gi) => (
            <div key={gi} className={gi > 0 ? 'mt-2 pt-2 border-t border-[#1C1C1C]' : ''}>
              {group.heading && (
                <p className="px-5 py-1.5 font-mono text-[9px] tracking-[0.25em] uppercase text-[#B8962E]/70">
                  {group.heading}
                </p>
              )}
              {group.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-5 py-2 text-[#8A8E92] hover:text-[#F2EDE4] hover:bg-[#1C1C1C] text-xs tracking-[0.08em] uppercase transition-colors duration-150 font-body"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState<MenuKey | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Escape closes whichever menu is open. Expected of any disclosure widget.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenMenu(null)
        setMobileOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Close everything on navigation.
  useEffect(() => {
    setOpenMenu(null)
    setMobileOpen(false)
  }, [pathname])

  // Lock body scroll behind the open mobile menu. Without this, document.body
  // keeps overflow: visible while the panel is open, so a phone scroll swipe
  // moves the article underneath it (Jules's 2026-08-17 QA, section 4 item C).
  useEffect(() => {
    if (!mobileOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [mobileOpen])

  const mobileGroups: { key: MenuKey; heading: string; href: string; hubLabel: string; items: NavItem[] }[] = [
    {
      key: 'services',
      heading: 'Services',
      href: '/services',
      hubLabel: 'All Services',
      items: SERVICES,
    },
    {
      key: 'industries',
      heading: 'Industries',
      href: '/industries',
      hubLabel: 'All Industries',
      items: [...INDUSTRIES_NEW, ...INDUSTRIES_EXISTING],
    },
  ]

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
          {/* The logo is a wide mark (834x222), so at h-12 it is 180px. With the
              chevron and the CTA beside it that overflows a 360px phone and the
              page picks up a horizontal scrollbar. It steps down below sm
              instead of letting the row overflow. */}
          <Link href="/" className="flex items-center shrink-0" aria-label="VBO Home">
            <Image
              src="/images/logo-transparent.png"
              alt="VBO"
              width={834}
              height={222}
              className="h-9 sm:h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            <DesktopMenu
              id="services"
              label="Services"
              href="/services"
              groups={[
                { items: [{ href: '/services', label: 'All Services' }, ...SERVICES] },
              ]}
              open={openMenu === 'services'}
              onOpen={() => setOpenMenu('services')}
              onClose={() => setOpenMenu(null)}
            />
            <DesktopMenu
              id="industries"
              label="Industries"
              href="/industries"
              groups={[
                { items: [{ href: '/industries', label: 'All Industries' }, ...INDUSTRIES_NEW] },
                { heading: 'Professional Services', items: INDUSTRIES_EXISTING },
              ]}
              open={openMenu === 'industries'}
              onOpen={() => setOpenMenu('industries')}
              onClose={() => setOpenMenu(null)}
            />
            <Link href="/insights" className={linkClass}>
              Insights
              <Underline />
            </Link>
            <Link href="/about" className={linkClass}>
              About
              <Underline />
            </Link>
            <Link href="/contact" className={linkClass}>
              Contact
              <Underline />
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <button
              className="lg:hidden flex items-center justify-center text-[#8A8E92] hover:text-[#F2EDE4] transition-colors duration-200 min-w-[44px] min-h-[44px] -mr-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-panel"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              <svg
                width="14"
                height="9"
                viewBox="0 0 14 9"
                fill="none"
                aria-hidden
                className={`transition-transform duration-300 ${mobileOpen ? 'rotate-180' : ''}`}
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

            <Link
              href="/contact"
              className="btn-gold text-[10px] py-2 px-4 md:py-2.5 md:px-5 whitespace-nowrap"
            >
              Let&apos;s Connect
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden bg-[#0D0D0D] border-t border-[#1C1C1C] overflow-hidden max-h-[75vh] overflow-y-auto"
          >
            <div className="px-6 py-5 flex flex-col">
              {/* Same rule as desktop: tapping the section opens it rather than
                  navigating. The hub is the first item inside. */}
              {mobileGroups.map((group) => {
                const expanded = openMenu === group.key
                return (
                  <div key={group.href} className="border-b border-[#1C1C1C]">
                    <button
                      type="button"
                      aria-expanded={expanded}
                      aria-controls={`m-${group.key}`}
                      onClick={() => setOpenMenu(expanded ? null : group.key)}
                      className="w-full flex items-center justify-between text-left text-[#F2EDE4] text-sm tracking-[0.12em] uppercase font-body py-3.5"
                    >
                      {group.heading}
                      <svg
                        width="12"
                        height="8"
                        viewBox="0 0 14 9"
                        fill="none"
                        aria-hidden
                        className={`text-[#B8962E] transition-transform duration-200 ${
                          expanded ? 'rotate-180' : ''
                        }`}
                      >
                        <path
                          d="M1 1L7 7L13 1"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    <div id={`m-${group.key}`} hidden={!expanded} className="pb-2">
                      {[{ href: group.href, label: group.hubLabel }, ...group.items].map(
                        (item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block text-[#8A8E92] hover:text-[#F2EDE4] text-sm tracking-[0.1em] uppercase transition-colors duration-200 font-body py-2.5 pl-4 border-l border-[#B8962E]/25 ml-1"
                          >
                            {item.label}
                          </Link>
                        )
                      )}
                    </div>
                  </div>
                )
              })}

              {/* Same colour as the Services/Industries buttons above, not the
                  muted secondary tone: all five are peers in this menu, and
                  the two-tier colour made the bottom three read as disabled
                  (Jules's 2026-08-17 QA, section 4 item B). */}
              {[
                { href: '/insights', label: 'Insights' },
                { href: '/about', label: 'About' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-left text-[#F2EDE4] hover:text-[#F2EDE4]/80 text-sm tracking-[0.12em] uppercase transition-colors duration-200 font-body py-3 border-b border-[#1C1C1C] last:border-0"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
