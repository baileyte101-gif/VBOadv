'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Ticker from './Ticker'

/**
 * Industries and Services: the floating field. Tim's direction, 2026-08-21
 * evening rounds, replacing the tile tabbers he specified that morning.
 *
 * The section is one full-width field with the hero's pill toggle relabelled
 * Services / Industries. The active list's items float slowly around the
 * field, all visible at all times, easing away from the pointer in the hero
 * wordmark's register. Clicking an item freezes the field and opens a
 * description box in the item's place, with an X; closing it (X, Escape, or
 * toggling) resumes the float. Reference Tim gave: metacci.com's hero, which
 * draws its floating words on canvas; ours are real DOM text, deliberately,
 * so the names stay crawlable.
 *
 * Copy is Mary's floating-field v3, verbatim
 * (clients/vbo/2026-08-21-floating-field-copy-v3.md, supersedes v1/v2 as the
 * build source). Her recommended picks are built where Tim has toggles open
 * (app category name, Sidefoot named, law firms standalone, paid media and
 * ecommerce line choices). Do not edit copy here; changes route through Mary.
 *
 * ★ Every name and every description line renders into the page source on
 * every load, EXACTLY ONCE: the items are server-rendered buttons, and each
 * item's description is server-rendered inside its own disclosure box,
 * hidden with the `hidden` attribute until its item is clicked. This is
 * Vega's P1-1 architecture (vega-bob-handoff-2026-08-22): content a user
 * can reveal is indexed; a permanently-hidden crawler-only mirror is the
 * hidden-text spam pattern and was removed. Never reintroduce a duplicate
 * hidden copy, and never replace this with content that mounts on click.
 *
 * Performance stance, per the ParticleField precedent: one rAF loop,
 * transform-only writes, paused when the section is offscreen and while a
 * description box is open; pointer ease-away reads are one layout read per
 * frame; drift amplitudes scale down with viewport width; reduced-motion
 * gets a still, evenly-placed field where clicking still works.
 */

type FieldItem = {
  name: string
  text: string
  /** Visual depth only. All tiers render and crawl identically. */
  tier: 1 | 2 | 3
}

const services: FieldItem[] = [
  {
    name: 'Web development',
    text: 'Custom sites, redesigns and Shopify stores, built to be found and fast on a phone. We built and launched the site for IPPE Soccer Tours.',
    tier: 1,
  },
  {
    name: 'Marketing consulting',
    text: "For when you want an answer, not a retainer. Someone senior reviews what's running and hands you a plan you can act on. Scoped, with an end date.",
    tier: 2,
  },
  {
    name: 'Fractional CMO',
    text: 'A senior marketing head, part of the time. Same seat and the same responsibility for where the money goes, on a share of the hours.',
    tier: 1,
  },
  {
    name: 'Ecommerce and Shopify',
    text: 'Paid media and search run together on the same store. Collection pages, product feeds and catalog structure, where Shopify money quietly leaks.',
    tier: 2,
  },
  {
    name: 'AI SEO and visibility',
    text: "Making your business readable and quotable for ChatGPT, Perplexity and Google's AI answers. We run all of it on this site first. You're welcome to check.",
    tier: 1,
  },
  {
    name: 'Paid media',
    text: 'Meta, Google Search, Google Shopping and Performance Max. A small number of accounts with senior hands on all of them, which is most of the difference.',
    tier: 1,
  },
  {
    name: 'AI-enabled marketing',
    text: 'How the work gets done, not something we sell you. Modern tools handle the repetitive parts so the senior thinking gets your attention. A person still decides.',
    tier: 3,
  },
  {
    name: 'Analytics and reporting',
    text: 'Tracking installed before the first dollar goes out, so results get counted instead of guessed at. Then a short written update you can read in two minutes.',
    tier: 3,
  },
  {
    name: 'Creative',
    text: 'Brand and campaign work: identity, design, ad creative, photography for social. We rebuilt the IPPE Soccer Tours brand alongside their site.',
    tier: 2,
  },
  {
    name: 'Social media',
    text: 'The calendar, the copy, the design and the shooting, planned as one feed. Run with everything else, so the posts match what the ads and the site are saying.',
    tier: 3,
  },
]

const industriesList: FieldItem[] = [
  {
    name: 'Fashion and apparel',
    text: 'Apparel sells in seasons and the marketing has to move on the same calendar. Spend hard in the weeks that matter, then collect the demand that never stops.',
    tier: 2,
  },
  {
    name: 'Jewelry and luxury retail',
    text: 'A considered purchase is a different job. For a buyer who takes weeks to decide: a site that holds up to scrutiny and advertising paced for the wait.',
    tier: 1,
  },
  {
    name: 'Food and beverage',
    text: 'For a small food brand, the maker is the brand. The site and the story get built around the person, and the advertising is sized to what the kitchen can serve.',
    tier: 2,
  },
  {
    name: 'Sports and travel',
    text: 'When a parent is the buyer, trust comes before price. Real detail on every program you run, and tracking that shows which trips turn into inquiries.',
    tier: 1,
  },
  {
    name: 'Local service businesses',
    text: 'Your whole market lives within a few miles, so the job changes. Getting picked on the map, looking as established as you are, and earning the fortieth visit.',
    tier: 2,
  },
  {
    name: 'Law firms',
    text: 'Nobody hires a law firm off an ad alone. The site answers what people are nervous to ask, and search keeps you visible on the narrow terms that matter.',
    tier: 1,
  },
  {
    name: 'Professional services',
    text: "Med spas, dental practices, financial advisors. Selling judgment the buyer can't inspect first, so the work is making the expertise visible and easy to trust.",
    tier: 3,
  },
  {
    name: 'Non-profit and education',
    text: "Non-profits market to families and to funders at once, in two messages that can't contradict each other. Spend gets weighed against the mission it came from.",
    tier: 3,
  },
  {
    name: 'Apps and digital products',
    text: 'The development, the landing site, the store listing, and the marketing that gets it downloaded. We shipped our own app, Sidefoot, to the App Store.',
    tier: 2,
  },
]

/*
 * The ticker's contents: the industry categories from the field above plus
 * the professional-services verticals its entry names. Kept pending Tim's
 * keep-or-retire call on the ticker under the new field (asked 2026-08-21,
 * unanswered; status quo held).
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
  'Apps & Digital Products',
]

type SetKey = 's' | 'i'

/**
 * Deterministic per-item motion parameters. Must produce identical values on
 * server and client (positions are server-rendered), so no Math.random: a
 * small LCG seeded by index.
 */
function itemParams(setKey: SetKey, index: number, count: number, cols: number) {
  let seed = (setKey === 's' ? 7 : 13) + index * 31
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280
    return seed / 233280
  }
  const col = index % cols
  const row = Math.floor(index / cols)
  const rows = Math.ceil(count / cols)
  // jittered grid, staggered on alternate rows, kept off the edges
  const bx = (col + 0.5 + (row % 2 ? 0.16 : -0.16) + (rand() - 0.5) * 0.1) / cols
  const by = 0.14 + (0.72 * (row + 0.5 + (rand() - 0.5) * 0.24)) / rows
  return {
    bx: Math.min(0.88, Math.max(0.12, bx)),
    by: Math.min(0.88, Math.max(0.12, by)),
    axBase: 34 + rand() * 66,
    ayBase: 22 + rand() * 40,
    px: 16 + rand() * 18,
    py: 19 + rand() * 17,
    ph: rand() * Math.PI * 2,
  }
}

const tierClass: Record<1 | 2 | 3, string> = {
  1: 'field-item-t1',
  2: 'field-item-t2',
  3: 'field-item-t3',
}

export default function Industries() {
  const headerRef = useRef(null)
  const isInView = useInView(headerRef, { once: true, margin: '-80px' })

  const [activeSet, setActiveSet] = useState<SetKey>('s')
  const [openKey, setOpenKey] = useState<string | null>(null)

  const fieldRef = useRef<HTMLDivElement>(null)
  const itemEls = useRef<Map<string, HTMLButtonElement>>(new Map())
  const boxEls = useRef<Map<string, HTMLDivElement>>(new Map())
  const lastOpened = useRef<HTMLButtonElement | null>(null)

  // Mutable motion state, outside React renders.
  const motionState = useRef<{
    items: Map<
      string,
      ReturnType<typeof itemParams> & { x0: number; y0: number; rx: number; ry: number; fx: number; fy: number }
    >
    paused: boolean
    running: boolean
    pointer: { x: number; y: number }
  }>({ items: new Map(), paused: false, running: true, pointer: { x: -1e5, y: -1e5 } })

  const allItems = useCallback(
    () =>
      ([
        ['s', services],
        ['i', industriesList],
      ] as [SetKey, FieldItem[]][]).flatMap(([k, list]) =>
        list.map((item, i) => ({ key: `${k}-${i}`, setKey: k, index: i, count: list.length, item }))
      ),
    []
  )

  /* Layout: measure and clamp each item's base position into the field in px,
     with margin for its own drift amplitude, so no word ever leaves the box.
     Runs after mount and on resize; before it runs, the server-rendered
     percent positions carry the static layout. */
  const layout = useCallback(() => {
    const field = fieldRef.current
    if (!field) return
    const w = field.clientWidth
    const h = field.clientHeight
    const scale = Math.min(1, w / 980)
    const ms = motionState.current
    allItems().forEach(({ key, setKey, index, count }) => {
      const el = itemEls.current.get(key)
      if (!el) return
      const cols = w < 640 ? 2 : 3
      const p = itemParams(setKey, index, count, cols)
      const ax = p.axBase * scale
      const ay = p.ayBase * Math.min(1, h / 460)
      const r = el.getBoundingClientRect()
      const mX = ax + 12
      const mY = ay + 8
      const x0 = Math.min(Math.max(p.bx * w - r.width / 2, mX), Math.max(mX, w - r.width - mX))
      const y0 = Math.min(Math.max(p.by * h - r.height / 2, mY), Math.max(mY, h - r.height - mY))
      const prev = ms.items.get(key)
      ms.items.set(key, {
        ...p,
        axBase: ax / scale,
        ayBase: p.ayBase,
        x0,
        y0,
        rx: prev?.rx ?? 0,
        ry: prev?.ry ?? 0,
        fx: prev?.fx ?? 0,
        fy: prev?.fy ?? 0,
      })
      // switch from the SSR percent base to the clamped px base
      el.style.left = '0px'
      el.style.top = '0px'
      el.style.transform = `translate3d(${x0}px, ${y0}px, 0)`
    })
  }, [allItems])

  useEffect(() => {
    layout()
    window.addEventListener('resize', layout)
    return () => window.removeEventListener('resize', layout)
  }, [layout])

  /* The drift loop. Transform-only writes; one layout read per frame for the
     pointer; skipped entirely under reduced motion, offscreen, or while a
     description box is open. */
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const field = fieldRef.current
    if (!field) return
    const ms = motionState.current

    const onMove = (e: PointerEvent) => {
      ms.pointer.x = e.clientX
      ms.pointer.y = e.clientY
    }
    const onLeave = () => {
      ms.pointer.x = -1e5
      ms.pointer.y = -1e5
    }
    field.addEventListener('pointermove', onMove, { passive: true })
    field.addEventListener('pointerleave', onLeave)

    const io = new IntersectionObserver((en) => {
      ms.running = en[0].isIntersecting
    })
    io.observe(field)

    let raf = 0
    const t0 = performance.now()
    const scaleFor = () => Math.min(1, field.clientWidth / 980)
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame)
      if (!ms.running || ms.paused) return
      const t = (now - t0) / 1000
      const fr = field.getBoundingClientRect()
      const scale = scaleFor()
      ms.items.forEach((it, key) => {
        const el = itemEls.current.get(key)
        if (!el) return
        const ax = it.axBase * scale
        const ay = it.ayBase * Math.min(1, fr.height / 460)
        const dx = ax * Math.sin((2 * Math.PI * t) / it.px + it.ph)
        const dy = ay * Math.cos((2 * Math.PI * t) / it.py + it.ph)
        let tx = 0
        let ty = 0
        const ix = fr.left + it.x0 + dx
        const iy = fr.top + it.y0 + dy
        const vx = ix - ms.pointer.x
        const vy = iy - ms.pointer.y
        const dist = Math.sqrt(vx * vx + vy * vy)
        if (dist < 150 && dist > 0.01) {
          const push = ((150 - dist) / 150) * 22
          tx = (vx / dist) * push
          ty = (vy / dist) * push
        }
        it.rx += (tx - it.rx) * 0.07
        it.ry += (ty - it.ry) * 0.07
        it.fx = dx + it.rx
        it.fy = dy + it.ry
        el.style.transform = `translate3d(${it.x0 + it.fx}px, ${it.y0 + it.fy}px, 0)`
      })
    }
    raf = requestAnimationFrame(frame)
    return () => {
      cancelAnimationFrame(raf)
      field.removeEventListener('pointermove', onMove)
      field.removeEventListener('pointerleave', onLeave)
      io.disconnect()
    }
  }, [])

  /* Open a description box in the clicked item's place; freeze the field.
     openKeyRef mirrors openKey so close() can no-op when nothing is open
     (repeat Escape presses must not yank focus back to the last word). */
  const openKeyRef = useRef<string | null>(null)
  const open = (key: string) => {
    const el = itemEls.current.get(key)
    if (!el || !fieldRef.current) return
    lastOpened.current = el
    motionState.current.paused = true
    openKeyRef.current = key
    setOpenKey(key)
  }

  const close = useCallback(() => {
    if (!openKeyRef.current) return
    openKeyRef.current = null
    setOpenKey(null)
    motionState.current.paused = false
    lastOpened.current?.focus({ preventScroll: true })
  }, [])

  /* Place the open item's own box at the item's frozen position once the
     render has removed its `hidden` attribute, then apply the show class a
     frame later so the entrance transition runs (class-with-hidden in one
     paint would skip it). */
  useEffect(() => {
    if (!openKey) return
    const field = fieldRef.current
    const box = boxEls.current.get(openKey)
    const it = motionState.current.items.get(openKey)
    if (!field || !box || !it) return
    box.classList.remove('field-box-show')
    const w = field.clientWidth
    const h = field.clientHeight
    /* Reading offsetWidth here does double duty: it measures the box for
       clamping AND forces a reflow that commits the closed state, so adding
       the show class next paints as a transition rather than a jump. Done
       synchronously rather than in a rAF callback, so the box can never be
       left unhidden-but-transparent if that callback does not run. */
    const bw = box.offsetWidth
    const bh = box.offsetHeight
    const x = Math.min(Math.max(it.x0 + it.fx - 20, 12), Math.max(12, w - bw - 12))
    const y = Math.min(Math.max(it.y0 + it.fy - 14, 12), Math.max(12, h - bh - 12))
    box.style.left = `${x}px`
    box.style.top = `${y}px`
    box.classList.add('field-box-show')
    box.querySelector<HTMLButtonElement>('.field-box-x')?.focus({ preventScroll: true })
  }, [openKey])

  const switchSet = (next: SetKey) => {
    if (openKey) close()
    setActiveSet(next)
  }

  return (
    <section
      id="industries"
      /* Ground 05: gold linework, feathering into About's marble below. The
         stone stat band that used to buffer that edge is gone, so this edge now
         gets the same seam the Approach/Proof edge already had.
         Job: breadth reads as confidence once depth has already landed. */
      className="ground-gold seam-out quiet-panel pt-24 md:pt-28 pb-0 relative overflow-hidden"
      onKeyDown={(e) => {
        if (e.key === 'Escape') close()
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

      {/* Content */}
      <div className="px-8 md:px-12 lg:px-20 xl:px-24 relative z-10 text-center" ref={headerRef}>
        {/* Label. Tim, 2026-08-18: "Industries and Services", not "Industries"
            alone. */}
        <motion.div
          initial={{ y: 16 }}
          animate={isInView ? { y: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          <p className="section-label">Industries and Services</p>
          <div className="section-accent mx-auto" />
        </motion.div>

        {/* Section headline. Tim-confirmed 2026-08-18, verbatim. */}
        <motion.h2
          initial={{ y: 28 }}
          animate={isInView ? { y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-headline font-black text-[#F2EDE4] uppercase leading-none text-[clamp(2rem,4.5vw,3.5rem)] max-w-[860px] mx-auto mb-7"
        >
          Different Industries, Same Services, Same Way of Thinking.
        </motion.h2>

        {/* The toggle: the hero's ground-toggle device, relabelled. Real
            button, so keyboard reach, focus ring and aria-pressed for free. */}
        <motion.div
          initial={{ y: 12 }}
          animate={isInView ? { y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <button
            type="button"
            className="field-toggle"
            aria-pressed={activeSet === 'i'}
            onClick={() => switchSet(activeSet === 's' ? 'i' : 's')}
            aria-label="Switch between the services list and the industries list"
          >
            <span className="pill" aria-hidden />
            <span className="opt opt-services">Services</span>
            <span className="opt opt-industries">Industries</span>
          </button>
        </motion.div>
      </div>

      {/* The floating field. Full width, boxed by the section. Height kept
          deliberately tight: Tim, round 4, "not so long vertically so the
          words don't look so spaced out." */}
      <div
        ref={fieldRef}
        className="field-stage relative z-10 h-[380px] md:h-[420px] mt-2"
      >
        {([
          ['s', services, 'Services'],
          ['i', industriesList, 'Industries'],
        ] as [SetKey, FieldItem[], string][]).map(([key, list, label]) => (
          <div
            key={key}
            /* role=group, not list: each item's dialog now lives beside its
               button inside this container, and role=list permits only
               listitem children (axe aria-required-children fired with a box
               open). A labeled group communicates the collection without
               constraining children. */
            role="group"
            aria-label={label}
            className={`absolute inset-0 field-set ${activeSet === key ? '' : 'field-set-off'}`}
          >
            {list.map((item, i) => {
              const cols3 = itemParams(key, i, list.length, 3)
              const itemKey = `${key}-${i}`
              return (
                <div key={itemKey} style={{ display: 'contents' }}>
                  <button
                    ref={(el) => {
                      if (el) itemEls.current.set(itemKey, el)
                      else itemEls.current.delete(itemKey)
                    }}
                    type="button"
                    aria-expanded={openKey === itemKey}
                    aria-controls={`field-box-${itemKey}`}
                    onClick={() => (openKey === itemKey ? close() : open(itemKey))}
                    className={`field-item ${tierClass[item.tier]} ${
                      openKey === itemKey ? 'field-item-hidden' : ''
                    }`}
                    /* SSR base: percent position, centered. layout() replaces
                       this with a clamped px transform after mount. */
                    style={{
                      left: `${cols3.bx * 100}%`,
                      top: `${cols3.by * 100}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    {item.name}
                  </button>

                  {/* The item's own disclosure box: the ONE server-rendered
                      copy of its description, hidden until the item is
                      clicked (Vega P1-1). `hidden` keeps it out of paint and
                      out of the accessibility tree while the copy stays in
                      the page source, the same hidden-until-interaction
                      pattern as the site's FAQ accordions. The show class is
                      applied a frame after the render unhides it, so the
                      entrance transition still runs. */}
                  <div
                    ref={(el) => {
                      if (el) boxEls.current.set(itemKey, el)
                      else boxEls.current.delete(itemKey)
                    }}
                    id={`field-box-${itemKey}`}
                    role="dialog"
                    aria-modal="false"
                    aria-labelledby={`field-box-name-${itemKey}`}
                    hidden={openKey !== itemKey}
                    className="field-box"
                  >
                    <button
                      type="button"
                      className="field-box-x"
                      aria-label="Close description"
                      onClick={close}
                    >
                      ×
                    </button>
                    <span id={`field-box-name-${itemKey}`} className="field-box-name">
                      {item.name}
                    </span>
                    <p className="field-box-text">{item.text}</p>
                  </div>
                </div>
              )
            })}
          </div>
        ))}
      </div>

      {/* Closing line. Tim's 2026-08-18 review round: the Insights paragraph
          is the only survivor of the old closing block, kept as is on his
          explicit instruction. */}
      <div className="px-8 md:px-12 lg:px-20 xl:px-24 relative z-10 text-center mt-4 mb-12">
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
      </div>

      {/* Industries ticker. flush to bottom, no extra padding. Kept pending
          Tim's keep-or-retire call under the new field. */}
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
