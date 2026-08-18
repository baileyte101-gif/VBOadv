import Link from 'next/link'

/**
 * The two big routing tiles in the homepage's Services and Industries section.
 *
 * Visual spec is ClientGlassTile's, deliberately: Tim asked for these to look
 * like the client tiles. Same frosted glass, same border, same hover lift, gold
 * glow and shimmer sweep. Only the contents differ, since these carry a mark
 * and a label rather than a logo, and they are internal links rather than
 * outbound ones.
 *
 * ★ On the marks, replaced 2026-08-18 per Jules's design QA return (section 3).
 * Bob's first-pass chevron dissolved into the ground (same nested-hexagon
 * figure as --ground-gold-pattern, at close to the same scale, removing
 * figure-ground separation), and the stacked hoop read as a hamburger (three
 * stacked bars in a clickable box is an established "open the navigation"
 * signifier, the opposite of what a homepage routing tile should say).
 *
 * Jules's replacements, same 5.3 vocabulary, structurally opposed so they read
 * as a pair without repeating one idea: Services is linear and directional
 * (a list, right edge forming a chevron; hover advances the rules forward,
 * staggered). Industries is planar and selective (seven unequal panels, one
 * filled; hover travels the fill one panel width along the middle row). Both
 * still carry their meaning with motion off, since the meaning is in the form.
 * Working reference: Jules/designs/vbo/website/tile-marks-2026-08-17/tile-marks.html
 */

function ServicesMark() {
  return (
    <svg className="mark-services w-full h-full" viewBox="0 0 120 120" fill="none" aria-hidden>
      <g stroke="currentColor" strokeWidth="4.2" strokeLinecap="square">
        <path className="r r1" d="M12 24 H70" />
        <path className="r r2" d="M12 42 H88" />
        <path className="r r3" d="M12 60 H104" strokeWidth="6" />
        <path className="r r4" d="M12 78 H88" />
        <path className="r r5" d="M12 96 H70" />
      </g>
    </svg>
  )
}

function IndustriesMark() {
  return (
    <svg className="mark-industries w-full h-full" viewBox="0 0 120 120" fill="none" aria-hidden>
      <g stroke="currentColor" strokeWidth="2.6">
        <rect x="12" y="14" width="46" height="28" />
        <rect x="64" y="14" width="44" height="28" />
        <rect x="12" y="46" width="28" height="28" />
        <rect x="46" y="46" width="28" height="28" />
        <rect x="80" y="46" width="28" height="28" />
        <rect x="12" y="78" width="44" height="28" />
        <rect x="62" y="78" width="46" height="28" />
      </g>
      <rect className="fill" x="46" y="46" width="28" height="28" fill="currentColor" />
    </svg>
  )
}

export type SectionTileProps = {
  href: string
  /** Short label, e.g. "Services". */
  label: string
  /** One line naming what is behind the tile. */
  summary: string
  mark: 'services' | 'industries'
}

export default function SectionTile({ href, label, summary, mark }: SectionTileProps) {
  return (
    <Link
      href={href}
      className="client-glass group relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 transition-all duration-500 ease-out hover:border-[#B8962E]/50 hover:-translate-y-1 h-[220px] md:h-[300px] px-8 text-center"
      style={{
        background:
          'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <span
        aria-hidden
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(184,150,46,0.22) 0%, rgba(184,150,46,0) 65%)',
        }}
      />
      <span
        aria-hidden
        className="client-shimmer pointer-events-none absolute inset-y-0 -left-1/2 w-1/2"
        style={{
          background:
            'linear-gradient(75deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)',
        }}
      />

      <div className="relative flex flex-col items-center gap-5">
        <div className="w-20 h-20 md:w-24 md:h-24 text-[#B8962E]/70 group-hover:text-[#B8962E] transition-colors duration-500">
          {mark === 'services' ? <ServicesMark /> : <IndustriesMark />}
        </div>

        <span className="font-headline font-black text-[#F2EDE4] uppercase leading-none text-[clamp(1.5rem,3vw,2.25rem)] tracking-wide">
          {label}
        </span>

        <span className="font-body text-[#8A8E92] group-hover:text-[#F2EDE4]/70 transition-colors duration-500 text-sm leading-relaxed max-w-[34ch]">
          {summary}
        </span>

        <span
          aria-hidden
          className="font-mono text-[#B8962E]/0 group-hover:text-[#B8962E]/70 text-xs tracking-[0.2em] transition-colors duration-500"
        >
          →
        </span>
      </div>
    </Link>
  )
}
