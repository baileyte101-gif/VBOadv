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
 * ★ On the marks. They are drawn from the jersey vocabulary the site already
 * uses (clients/vbo/design/vbo-design-direction-v1.md section 5.3), not from an
 * icon set. Services takes the nested chevron, which is the same geometry as
 * the gold linework ground. Industries takes the stacked hoop, the horizontal
 * band device. Two reasons that matters: a generic thin-line icon is named on
 * the never list as an AI tell, and a mark that is already the brand's own
 * geometry does a job rather than decorating a heading.
 *
 * These are Bob's first pass for Jules to take or replace. The brief is in
 * clients/vbo/2026-08-17-BOB-to-JULES-design-round.md.
 */

function ChevronMark() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full" fill="none" aria-hidden>
      <g stroke="currentColor" strokeWidth="1.6" opacity="0.9">
        <path d="M60 8 L104 34 L104 86 L60 112 L16 86 L16 34 Z" />
        <path d="M60 26 L88 42 L88 78 L60 94 L32 78 L32 42 Z" />
        <path d="M60 44 L72 51 L72 69 L60 76 L48 69 L48 51 Z" />
      </g>
    </svg>
  )
}

function HoopMark() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full" fill="none" aria-hidden>
      <g stroke="currentColor" strokeWidth="1.6" opacity="0.9">
        <rect x="10" y="22" width="100" height="14" />
        <rect x="10" y="53" width="100" height="14" />
        <rect x="10" y="84" width="100" height="14" />
        <path d="M10 44 H110" strokeWidth="1" opacity="0.55" />
        <path d="M10 75 H110" strokeWidth="1" opacity="0.55" />
      </g>
    </svg>
  )
}

export type SectionTileProps = {
  href: string
  /** Short label, e.g. "Services". */
  label: string
  /** One line naming what is behind the tile. */
  summary: string
  mark: 'chevron' | 'hoop'
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
          {mark === 'chevron' ? <ChevronMark /> : <HoopMark />}
        </div>

        <span className="font-headline font-black text-[#F2EDE4] uppercase leading-none text-[clamp(1.5rem,3vw,2.25rem)] tracking-wide">
          {label}
        </span>

        <span className="font-body text-[#6B6F73] group-hover:text-[#F2EDE4]/70 transition-colors duration-500 text-sm leading-relaxed max-w-[34ch]">
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
