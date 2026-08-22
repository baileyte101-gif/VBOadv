import Image from 'next/image'
import Link from 'next/link'
import SocialIcons from '@/components/SocialIcons'

/**
 * Sitewide footer. Extracted from src/app/page.tsx unchanged in appearance when
 * the 2026-08 build added fifteen pages that all needed the same one.
 *
 * The link row is server-rendered internal linking, not decoration: it is how
 * the money pages stay reachable from every page on the site.
 *
 * Light version, 2026-08-21: the hub and contact pages are gone, so the row
 * carries the money pages directly. All four professional-services verticals
 * are linked as of Vega's P2-6 (vega-bob-handoff-2026-08-22): dental and
 * financial-advisors were indexable with zero sitewide links and zero GSC
 * impressions in 90 days, while the two footer-linked verticals had 189 and
 * 17. Every entry resolves on this branch.
 */

const footerLinks = [
  { href: '/ai-enabled-marketing', label: 'AI-Enabled Marketing' },
  { href: '/fractional-cmo', label: 'Fractional CMO' },
  { href: '/professional-services/law-firms', label: 'Marketing for Law Firms' },
  { href: '/professional-services/med-spas', label: 'Marketing for Med Spas' },
  { href: '/professional-services/dental-practices', label: 'Marketing for Dental Practices' },
  { href: '/professional-services/financial-advisors', label: 'Marketing for Financial Advisors' },
  { href: '/insights', label: 'VBO Insights' },
]

export default function SiteFooter() {
  return (
    <footer className="relative z-[1] border-t border-[#B8962E]/20 py-8 px-8 md:px-12 lg:px-20">
      {/* Thins the skyline's densest window texture under the footer copy */}
      <div className="footer-scrim" aria-hidden />
      <div className="max-w-[1400px] mx-auto flex flex-col gap-6">
        <nav
          aria-label="Footer"
          className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2"
        >
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-mono text-[#8A8E92] hover:text-[#B8962E] text-xs tracking-wider transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Image
            src="/images/logo-transparent.png"
            alt="VBO"
            width={834}
            height={222}
            className="h-8 w-auto"
          />

          <p className="font-mono text-[#8A8E92] text-[10px] tracking-[0.2em] uppercase text-center">
            © 2026 VBO Advertising. Miami, FL. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <SocialIcons size={15} />
            <a
              href="mailto:hello@vboadv.com"
              className="font-mono text-[#8A8E92] hover:text-[#B8962E] text-xs tracking-wider transition-colors duration-200"
            >
              hello@vboadv.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
