import Link from 'next/link'
import { Inline } from '@/components/site/RichText'
import type { NavItem } from '@/lib/navigation'

/**
 * The scannable, click-everything list that sits above the copy on /services
 * and /industries.
 *
 * Tim, 2026-08-18 review round, R2-3, verbatim: "it's still really hard to
 * even understand what we offer, so we need a list of all of them, with
 * those that have pages linked out to the right page. Just a clear some sort
 * of interactive list above what we do." Followed immediately by: "And where
 * we have clients today."
 *
 * "Interactive" is his word for clear and clickable, not for animated. This
 * renders every entry at once and is deliberately not an accordion (that
 * pattern is for the FAQs elsewhere on this same round, a different job:
 * seeing everything at a glance beats collapsing it).
 *
 * Driven entirely off SERVICES / INDUSTRIES in src/lib/navigation.ts, so this
 * list cannot drift from the header nav or from what pages actually exist.
 * `proof` is optional per item and renders through the same `Inline` renderer
 * Mary's body copy uses, so a named client with a verified URL becomes a
 * real external link (gold, new tab, noopener) rather than a second link
 * treatment invented for this one spot. Where an item has no proof, nothing
 * renders under it: an honest gap, never a filler line.
 */
export default function HubDirectory({
  heading,
  intro,
  items,
}: {
  heading: string
  /** One short line of new UI copy, not Mary's page copy. Keep it factual. */
  intro: string
  items: NavItem[]
}) {
  return (
    <section className="content-section ground-gold quiet-panel border-b border-[#1C1C1C]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 py-16 md:py-20">
        <div className="relative z-[1] reveal">
          <h2 className="font-headline font-bold text-[#F2EDE4] uppercase text-[clamp(1.5rem,3vw,2.25rem)] leading-tight mb-5">
            {heading}
          </h2>
          <div className="section-hairline" />
          <p className="prose-body max-w-[68ch]">{intro}</p>

          <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 list-none p-0 m-0">
            {items.map((item) => (
              <li
                key={item.href}
                className="border border-white/10 hover:border-[#B8962E]/50 transition-colors duration-300 p-5"
              >
                <Link
                  href={item.href}
                  className="group inline-flex items-start gap-2 py-1 font-headline font-bold text-[#F2EDE4] uppercase text-[1.05rem] leading-tight"
                >
                  <span className="group-hover:text-[#B8962E] transition-colors duration-300">
                    {item.label}
                  </span>
                  <span
                    aria-hidden
                    className="font-mono text-[#B8962E]/50 group-hover:text-[#B8962E] group-hover:translate-x-0.5 transition-all duration-300 shrink-0 mt-0.5"
                  >
                    &rarr;
                  </span>
                </Link>
                {item.proof && (
                  <p className="mt-2 font-body text-[#8A8E92] text-sm leading-snug">
                    <Inline text={item.proof} />
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
