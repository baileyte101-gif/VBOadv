import { Fragment, type ReactNode } from 'react'
import Link from 'next/link'
import Nav from '@/components/Nav'
import ClosingBlock from '@/components/ClosingBlock'
import CTASection from '@/components/CTASection'
import SiteFooter from '@/components/SiteFooter'
import { Inline, Paragraphs } from '@/components/site/RichText'
import ImageBand from '@/components/site/ImageBand'
import { PAGE_IMAGES } from '@/content/page-images'
import { pageSchemas } from '@/lib/page-schema'
import type { PageContent, Block } from '@/content/types'

/**
 * The shared shell for the fifteen content pages.
 *
 * Design system, per clients/vbo/design/vbo-design-direction-v1.md:
 *   Black #0D0D0D and gold #B8962E only. Gold appears as hairline, rule and
 *   trim, never as a large fill. No third colour in the interface. Grounds
 *   alternate so no two adjacent sections share one, using the existing ground
 *   classes rather than a second system invented for these pages.
 *
 * Performance: every string is server rendered at full opacity. The entrance is
 * transform-only CSS, the same treatment applied to the hero, so no element on
 * these pages can become an unpainted LCP candidate.
 */

function BlockRenderer({ block }: { block: Block }) {
  if (block.kind === 'ordered') {
    return (
      <ol className="prose-steps">
        {block.items.map((item, i) => (
          <li key={i}>
            <Inline text={item} />
          </li>
        ))}
      </ol>
    )
  }

  if (block.kind === 'unordered') {
    return (
      <ul className="prose-bullets">
        {block.items.map((item, i) => (
          <li key={i}>
            <Inline text={item} />
          </li>
        ))}
      </ul>
    )
  }

  if (block.kind === 'lines') {
    return (
      <p className="prose-body">
        {block.items.map((item, i) => (
          <span key={i} className="block">
            <Inline text={item} />
          </span>
        ))}
      </p>
    )
  }

  return <Paragraphs items={block.items} />
}

/**
 * Ground rotation, revised 2026-08-18 per Jules's design QA return
 * (clients/vbo/2026-08-17-JULES-to-BOB-design-round-return.md, section 2).
 *
 * The prior `GROUNDS[i % 4]` put plain at exactly 25% and the treated grounds
 * at 75%, inverting the rule that plain is the resting state. It also meant
 * the two three-section hub pages (/services, /industries) never reached
 * index 3, so ground-smoke (marble) never rendered on either.
 *
 * Fix: plain sits at every even index (50% of the time, never adjacent to
 * itself since the odd indices always separate it), and the odd indices cycle
 * through the three treated grounds in order. Even/odd alternation makes
 * "no two adjacent sections share a ground" true by construction, for any
 * section count, with no period/wraparound edge case to get wrong.
 *
 * On marble: #F2EDE4 on the marble base measures 7.7:1 (Jules re-measured at
 * 8.4:1), comfortably past AA and AAA, and the texture's mottling is darker
 * than the base rather than lighter, so it only ever increases contrast. It
 * gets a quiet-panel like the patterned grounds do, on the same principle:
 * thin the ground, never the type.
 */
const TREATED_GROUNDS = ['ground-gold', 'ground-smoke', 'ground-harbour'] as const

function groundFor(index: number) {
  if (index % 2 === 0) return 'ground-plain'
  return TREATED_GROUNDS[Math.floor(index / 2) % TREATED_GROUNDS.length]
}

/** The grounds that need a quiet zone behind copy. */
function needsQuietPanel(ground: string) {
  return ground === 'ground-gold' || ground === 'ground-smoke'
}

/**
 * Visible breadcrumb trail, shown only where there is a real parent to climb
 * to. It mirrors the BreadcrumbList schema, so the structured data describes
 * something a reader can actually see and click.
 */
function Breadcrumbs({ page }: { page: PageContent }) {
  if (page.breadcrumb.length < 3) return null
  const trail = page.breadcrumb.slice(0, -1)
  const current = page.breadcrumb[page.breadcrumb.length - 1]
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase text-[#8A8E92]">
        {trail.map((crumb) => (
          <li key={crumb.item} className="flex items-center gap-2">
            <Link
              href={crumb.item.replace('https://www.vboadv.com', '') || '/'}
              className="hover:text-[#F2EDE4] transition-colors duration-200"
            >
              {crumb.name}
            </Link>
            <span aria-hidden className="text-[#B8962E]">
              /
            </span>
          </li>
        ))}
        <li aria-current="page" className="text-[#F2EDE4]/70">
          {current.name}
        </li>
      </ol>
    </nav>
  )
}

export default function ContentPage({
  page,
  sectionSlots,
  directory,
}: {
  page: PageContent
  /**
   * Extra content rendered inside a named section, after its copy. Keyed by
   * the section's exact heading. /contact uses it to put the real form under
   * Mary's "The Form" heading rather than appending it after the whole page,
   * which is where a generic children slot would have put it.
   */
  sectionSlots?: Record<string, ReactNode>
  /**
   * A full section rendered between the hero and the first body section.
   * /services and /industries use it for HubDirectory (Tim's 2026-08-18
   * round 2 review, R2-3). Not part of `page.sections`, so it does not enter
   * the ground rotation below; it carries its own fixed ground instead. The
   * header above it and `page.sections[0]` below it are both always plain
   * (groundFor(0) is deterministic), so a fixed treated ground here can never
   * land adjacent to a matching one without touching the rotation that the
   * other thirteen pages depend on.
   */
  directory?: ReactNode
}) {
  const schemas = pageSchemas(page)
  const image = PAGE_IMAGES[page.path]

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <Nav />

      <main id="main" className="pt-16">
        {/* Page hero. Plain ground, gold hairline, copy painted on first render. */}
        <header className="content-section ground-plain border-b border-[#1C1C1C]">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 py-20 md:py-28">
            <div className="max-w-4xl">
              <Breadcrumbs page={page} />
              <p className="section-label reveal">{page.eyebrow}</p>
              <h1
                className="reveal font-headline font-black text-[#F2EDE4] uppercase leading-[0.95] text-[clamp(2.5rem,6vw,4.75rem)] mb-8"
                style={{ '--reveal-delay': '0.06s' } as React.CSSProperties}
              >
                {page.h1}
              </h1>
              <div className="section-accent" />
              <div
                className="reveal"
                style={{ '--reveal-delay': '0.12s' } as React.CSSProperties}
              >
                <Paragraphs items={page.intro} className="text-[1.0625rem] md:text-lg" />
              </div>
            </div>
          </div>
        </header>

        {directory}

        {/* Body sections, with the image band dropped in after its section.
            groundIndex is a single running counter across sections AND bands,
            so a band takes its own place in the ground rotation instead of
            sitting on a hardcoded ground the rotation can't see (Jules's
            2026-08-17 QA, section 2 item d). That also fixes /contact's
            three-plain-in-a-row opening, since the band there now lands on a
            treated ground instead of silently repeating plain. */}
        {(() => {
          let groundIndex = 0
          return page.sections.map((section, i) => {
            const ground = groundFor(groundIndex++)
            const quiet = needsQuietPanel(ground)
            const showBand = image && image.after === i
            const bandGround = showBand ? groundFor(groundIndex++) : undefined
            return (
              <Fragment key={section.heading}>
                <section
                  className={`content-section ${ground} border-b border-[#1C1C1C]`}
                >
                  <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 py-16 md:py-20">
                    <div className={`max-w-4xl reveal ${quiet ? 'quiet-panel' : ''}`}>
                      <div className="relative z-[1]">
                        <h2 className="font-headline font-bold text-[#F2EDE4] uppercase text-[clamp(1.5rem,3vw,2.25rem)] leading-tight mb-5">
                          {section.heading}
                        </h2>
                        <div className="section-hairline" />
                        {section.blocks.map((block, j) => (
                          <BlockRenderer key={j} block={block} />
                        ))}
                        {sectionSlots?.[section.heading]}
                      </div>
                    </div>
                  </div>
                </section>
                {showBand && image && <ImageBand image={image} ground={bandGround!} />}
              </Fragment>
            )
          })
        })()}

        {/* The retro gold bar: the jersey chest-band vocabulary as a beat before
            the questions. Bar only, no display text, because inventing a line of
            copy per page is not mine to do. Off /contact: that page has no FAQ
            and no close section, so the bar was the last child of <main> with
            nothing after it (Jules's QA, section 2, "on /contact it does
            nothing at all"). */}
        {page.path !== '/contact' && <div className="retro-divider-strip" aria-hidden />}

        {/* FAQ. Same strings as the FAQPage schema, by construction. Rendered
            as accordions (Tim, 2026-08-18): native <details>/<summary>, so the
            answer text is always present in the DOM (collapsed just means not
            displayed, never absent), which is what keeps this block from ever
            drifting from the FAQPage schema below. */}
        {page.faq.length > 0 && (
          <section className="content-section ground-plain border-b border-[#1C1C1C]">
            <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 py-16 md:py-20">
              <div className="max-w-4xl reveal">
                <h2 className="font-headline font-bold text-[#F2EDE4] uppercase text-[clamp(1.5rem,3vw,2.25rem)] leading-tight mb-5">
                  {page.faqHeading}
                </h2>
                <div className="section-hairline" />
                <div className="faq-accordion-list mt-10">
                  {page.faq.map((entry) => (
                    <details key={entry.question} className="faq-accordion-item">
                      <summary className="faq-accordion-q">
                        <span>{entry.question}</span>
                        <span className="faq-accordion-icon" aria-hidden="true" />
                      </summary>
                      <p className="faq-accordion-a">
                        <Inline text={entry.answer} />
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Close. Harbour, not plain: Common Questions above it is already
            plain, and plain-then-plain was the longest unbroken stretch of
            black on every page, at the very bottom (Jules's QA, section 2
            item c, "every page ends on two plains"). */}
        {page.close && (
          <section className="content-section ground-harbour">
            <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 py-16 md:py-20">
              <div className="max-w-4xl reveal">
                <h2 className="font-headline font-bold text-[#F2EDE4] uppercase text-[clamp(1.5rem,3vw,2.25rem)] leading-tight mb-8">
                  {page.close.heading}
                </h2>
                <div className="close-panel">
                  {page.close.blocks.map((block, j) => (
                    <BlockRenderer key={j} block={block} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <ClosingBlock>
        <CTASection />
        <SiteFooter />
      </ClosingBlock>
    </>
  )
}
