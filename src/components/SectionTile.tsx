/**
 * The two big tiles in the homepage's Industries and Services section.
 *
 * Light version, 2026-08-21: these were routing tiles linking to the /services
 * and /industries hubs. Tim reversed the fifteen-page build and specified the
 * replacement himself: click a tile and its list pops up in place, no links
 * out, no child pages. So the tile is now a disclosure button owning a panel
 * that Industries.tsx renders below the tile row. Visual spec is unchanged and
 * is ClientGlassTile's, on Tim's direction: same frosted glass, same border,
 * same hover lift, gold glow and shimmer sweep.
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
 *
 * The link-era "→" affordance became a "+" that stays visible (the old
 * reveal-on-hover treatment never shows on touch, and phones are where the
 * tap-to-open pattern matters most) and rotates to a "×" while the panel is
 * open.
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
  /** id for the button, referenced by the panel's aria-labelledby. */
  id: string
  /** id of the list panel this tile owns. */
  panelId: string
  /** Short label, e.g. "Services". */
  label: string
  /** One line naming what is behind the tile. */
  summary: string
  mark: 'services' | 'industries'
  open: boolean
  onToggle: () => void
}

export default function SectionTile({
  id,
  panelId,
  label,
  summary,
  mark,
  open,
  onToggle,
}: SectionTileProps) {
  return (
    <button
      type="button"
      id={id}
      aria-expanded={open}
      aria-controls={panelId}
      onClick={onToggle}
      /* min-h, not fixed h: with the fixed 220px the Services tile's taller
         stack (mark + three-line summary + affordance) overflowed on a 375px
         viewport, clipping the mark's top and the "+" entirely. min-h keeps
         the 220/300 rhythm and lets content size the tile past it; the md
         grid row stretches both tiles to match heights. */
      className={`client-glass group relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border transition-all duration-500 ease-out hover:border-[#B8962E]/50 hover:-translate-y-1 min-h-[220px] md:min-h-[300px] px-8 py-8 text-center cursor-pointer ${
        open ? 'border-[#B8962E]/50' : 'border-white/10'
      }`}
      style={{
        background:
          'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <span
        aria-hidden
        className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${
          open ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}
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
          className={`font-mono text-base leading-none transition-all duration-500 ${
            open
              ? 'text-[#B8962E] rotate-45'
              : 'text-[#B8962E]/40 group-hover:text-[#B8962E]/70'
          }`}
        >
          +
        </span>
      </div>
    </button>
  )
}
