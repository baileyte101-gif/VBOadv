'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Ticker from './Ticker'
import SectionTile from './SectionTile'

/**
 * Industries and Services, light version 2026-08-21.
 *
 * The two tiles were routing tiles to the /services and /industries hubs.
 * Tim reversed the fifteen-page build and specified this instead: click a
 * tile and its list pops up in place. No links out, no child pages. The two
 * panels below carry the whole service and industry inventory now.
 *
 * List copy is Mary's, verbatim, from
 * clients/vbo/2026-08-21-what-we-do-rewrite-and-tile-lists.md sections 2 and
 * 3 (Tim approved). Names bold as the visual anchor, body after, no links,
 * per her structure notes. Do not edit copy here; changes route through Mary.
 *
 * ★ Both panels are server-rendered into the page source on every load and
 * are shown or hidden with styling only (see .tile-panel in globals.css).
 * That is the standing Atlas/SEO build rule that makes these lists exist for
 * search and AI crawlers at all. Never replace this with content that mounts
 * on click.
 *
 * Two entries are in pending-Tim state (Mary's open items 3 and 4), built in
 * so he can see them on the preview and cut them with one line each:
 * - the services lead-in line ("Seven services, built to run together...")
 * - the "Professional services" industry entry (the only one without a named
 *   client; it rides the experience claim already live on the homepage). If
 *   it comes out, change the industries tile summary count to "Six
 *   industries." in the same pass.
 */

const services = [
  {
    name: 'Web development.',
    body: 'Custom sites, redesigns and Shopify stores, built to be found and fast on a phone. We built and launched the IPPE Soccer Tours site. Builds for The Fudge Pie Co. and Sir Galloway are finished and launching shortly.',
  },
  {
    name: 'Marketing consulting.',
    body: "For when you want an answer, not a retainer. Someone senior looks at what's running, tells you what to keep and what to stop, and hands you a plan you can act on, with us or without us. Scoped, with an end date.",
  },
  {
    name: 'Fractional CMO.',
    body: 'A senior marketing head, part of the time. Same seat, same responsibility for the direction and the results, on a share of the hours. The one to ask about if real money goes out every month and nobody senior owns where it goes.',
  },
  {
    name: 'Ecommerce and Shopify.',
    body: 'Paid media and search run together on the same store, by the same people. Collection pages, product feeds and catalog structure: the parts of Shopify where money quietly leaks. For Peixoto Wear in swimwear, we run both. For Hayley Style in fine jewelry, the paid side.',
  },
  {
    name: 'AI SEO and visibility.',
    body: "Making your business readable and quotable for ChatGPT, Perplexity and Google's AI answers. Schema, crawler access, an llms.txt file, and pages written so a machine can lift a clean answer. We run all of it on this site first. You're welcome to check.",
  },
  {
    name: 'Paid media.',
    body: "Meta, Google Search, Google Shopping and Performance Max. A small number of accounts, senior hands on every one of them, which is most of the difference. If you email about yesterday, you're emailing the person who did it.",
  },
  {
    name: 'AI-enabled marketing.',
    body: 'How the work gets done rather than something we sell you. Modern tools handle the repetitive parts so the senior thinking gets your attention. A person still decides.',
  },
]

const industriesList = [
  {
    name: 'Fashion and apparel.',
    body: 'Apparel runs on a calendar. The spend moves with the season. The search work collects the demand that never stops. We run paid media and search for Peixoto Wear, a swimwear brand, where the season decides almost everything.',
  },
  {
    name: 'Jewelry and luxury retail.',
    body: "Nobody buys fine jewelry on impulse. The work is built for a buyer who takes weeks to decide and needs to trust you before they'll spend. We run paid media for Hayley Style, Miami fine jewelry, signed in August 2026.",
  },
  {
    name: 'Food and beverage.',
    body: "For a small food brand, the maker is the one thing a bigger company can't copy. We designed, wrote and built The Fudge Pie Co.'s ten-page site around Chef Stacey and what she makes. It launches shortly.",
  },
  {
    name: 'Sports and travel.',
    body: 'The buyer is a parent, not the player, and trust comes before price. We built and launched the IPPE Soccer Tours site: every program on its own page, inquiries measured instead of guessed at.',
  },
  {
    name: 'Local service businesses.',
    body: 'When your market lives within a few miles, the map listing is your storefront and the repeat customer is the business. For Sir Galloway, dry cleaning and garment care in Miami, we rebuilt the website and advised on staying visible locally. The new site launches shortly.',
  },
  {
    name: 'Non-profit and education.',
    body: "A non-profit markets to families and to funders at once, two messages that can't contradict each other. We've done research and advisory work with CARE Elementary, a non-profit school in Overtown, Miami.",
  },
  {
    name: 'Professional services.',
    body: "Law firms, med spas, dental practices and financial advisors. Selling judgment is its own marketing problem: the buyer can't inspect the work before committing, so trust does the closing. We have deep experience with professional services firms in South Florida.",
  },
]

/*
 * The ticker's contents, corrected 2026-08-17 and still the real list: the six
 * industry categories from the panel above plus the four professional-services
 * verticals its last entry names. The ticker and the panel cannot drift apart
 * as long as both trace to Mary's industries list.
 */
const industries = [
  'Fashion & Apparel',
  'Jewelry & Luxury',
  'Food & Beverage',
  'Sports & Travel',
  'Local Service Businesses',
  'Nonprofit & Education',
  'Law Firms',
  'Med Spas',
  'Dental Practices',
  'Financial Advisors',
]

type PanelKey = 'services' | 'industries'

function TileListPanel({
  panelKey,
  open,
  leadIn,
  entries,
}: {
  panelKey: PanelKey
  open: boolean
  leadIn?: string
  entries: { name: string; body: string }[]
}) {
  return (
    <div
      id={`tile-panel-${panelKey}`}
      role="region"
      aria-labelledby={`tile-${panelKey}`}
      className={`tile-panel scroll-mt-20 ${open ? 'tile-panel-open' : ''}`}
    >
      <div className="tile-panel-clip">
        <div className="mt-5 md:mt-8 rounded-2xl border border-white/10 bg-black/25 px-6 py-8 md:px-10 md:py-10">
          {leadIn && (
            <p className="text-[#F2EDE4] font-medium text-base md:text-lg leading-relaxed mb-8">
              {leadIn}
            </p>
          )}
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 list-none">
            {entries.map((entry, i) => (
              <li key={entry.name}>
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="font-mono text-[#B8962E] text-xs tracking-[0.2em]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-headline font-black text-[#F2EDE4] uppercase leading-none text-xl md:text-2xl">
                    {entry.name}
                  </h3>
                </div>
                <p className="text-[#8A8E92] text-sm md:text-base font-body leading-relaxed">
                  {entry.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default function Industries() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [openPanel, setOpenPanel] = useState<PanelKey | null>(null)

  const toggle = (key: PanelKey) =>
    setOpenPanel((current) => (current === key ? null : key))

  /* On phones the tiles stack, so the Services panel opens a full tile below
     the tile that was tapped and can start offscreen. Bring the opening
     panel's top edge into view; on desktop both tiles sit directly above the
     panels and 'nearest' makes this a no-op. */
  useEffect(() => {
    if (!openPanel) return
    const el = document.getElementById(`tile-panel-${openPanel}`)
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const id = window.setTimeout(() => {
      el.scrollIntoView({
        block: 'nearest',
        behavior: reduced ? 'auto' : 'smooth',
      })
    }, 120)
    return () => window.clearTimeout(id)
  }, [openPanel])

  return (
    <section
      id="industries"
      /* Ground 05: gold linework, feathering into About's marble below. The
         stone stat band that used to buffer that edge is gone, so this edge now
         gets the same seam the Approach/Proof edge already had.
         Job: breadth reads as confidence once depth has already landed. */
      className="ground-gold seam-out quiet-panel pt-24 md:pt-32 lg:pt-40 pb-0 relative overflow-hidden"
      onKeyDown={(e) => {
        if (e.key === 'Escape') setOpenPanel(null)
      }}
    >
      {/* Ghost section number. Was 05; renumbered to 04, 2026-08-11, when
          WhoWeWorkWith (03) came out of the page. */}
      <div
        className="absolute right-4 top-0 font-headline font-black leading-none select-none pointer-events-none text-[160px] md:text-[220px] lg:text-[280px]"
        style={{ color: 'rgb(111 87 40 / 0.16)' }}
        aria-hidden
      >
        04
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

      {/* Content */}
      <div
        className="px-8 md:px-12 lg:px-20 xl:px-24 relative z-10 mb-14 md:mb-16"
        ref={ref}
      >
        {/* Label */}
        <motion.div
          initial={{ y: 16 }}
          animate={isInView ? { y: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          {/* Label. Tim, 2026-08-18: "Industries and Services", not "Industries"
              alone, now that the two tiles below cover both. */}
          <p className="section-label">Industries and Services</p>
          <div className="section-accent" />
        </motion.div>

        {/* Section headline. Tim-confirmed 2026-08-18, verbatim: "different
            industries, same services, same way of thinking." Supersedes the
            2026-08-11 Mary option 3 line below, which this replaces. */}
        <motion.h2
          initial={{ y: 28 }}
          animate={isInView ? { y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-headline font-black text-[#F2EDE4] uppercase leading-none text-[clamp(2rem,4.5vw,3.5rem)] max-w-[860px] mb-8"
        >
          Different Industries, Same Services, Same Way of Thinking.
        </motion.h2>

        {/* Two tiles, Tim's 2026-08-21 spec: click one and its list pops up in
            place below the row. Tile styling is the client tile's, on Tim's
            direction. */}
        <motion.div
          initial={{ y: 20 }}
          animate={isInView ? { y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8"
        >
          <SectionTile
            id="tile-services"
            panelId="tile-panel-services"
            label="Services"
            summary="Web development, consulting, fractional CMO, ecommerce, AI SEO, paid media, and more."
            mark="services"
            open={openPanel === 'services'}
            onToggle={() => toggle('services')}
          />
          <SectionTile
            id="tile-industries"
            panelId="tile-panel-industries"
            label="Industries"
            summary="Seven industries."
            mark="industries"
            open={openPanel === 'industries'}
            onToggle={() => toggle('industries')}
          />
        </motion.div>

        {/* Both list panels are always in the DOM, in this order, whether or
            not they are open. See the header comment before changing this. */}
        <TileListPanel
          panelKey="services"
          open={openPanel === 'services'}
          leadIn="Seven services, built to run together. Most clients use two or three."
          entries={services}
        />
        <TileListPanel
          panelKey="industries"
          open={openPanel === 'industries'}
          entries={industriesList}
        />

        {/* Closing line. Tim's 2026-08-18 review round: the "Based in Miami"
            intro line and the founders/leaders paragraph (with the law-firms
            link inside it) are both cut. The Insights paragraph is the only
            survivor, kept as is on his explicit instruction. */}
        <motion.div
          initial={{ y: 8 }}
          animate={isInView ? { y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 space-y-3"
        >
          <p className="text-[#8A8E92] text-sm font-body">
            Read our take on strategy, creative, and performance in the{' '}
            <a
              href="/insights"
              className="text-[#B8962E] hover:text-[#F2EDE4] transition-colors duration-200"
            >
              VBO Insights blog
            </a>
            .
          </p>
        </motion.div>
      </div>

      {/* Industries ticker. flush to bottom, no extra padding */}
      {/* Transparent so the gold linework ground carries straight through it.
          Positioned above the quiet-panel scrim, same as the content above. */}
      <div className="relative z-10">
        <Ticker
          items={industries}
          textColorClass="text-[#F2EDE4]/30"
          bgClass="bg-transparent"
          speed={35}
          separator="/"
        />
      </div>
    </section>
  )
}
