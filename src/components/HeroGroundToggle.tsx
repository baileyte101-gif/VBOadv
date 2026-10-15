/**
 * The hero's ground toggle: black on the left, marble on the right. Real
 * button, so keyboard reach, focus ring and aria-pressed come for free. Styles
 * are .hero-bg-toggle in globals.css; the pill slides when an ancestor has
 * .marble-on. Used by the homepage hero and the /why-the-bee title section
 * (Tim, 2026-10-15: the same toggle on the bee page).
 */
export default function HeroGroundToggle({ marble, onToggle }: { marble: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={marble}
      aria-label="Switch the hero background between black and marble"
      className="hero-bg-toggle"
    >
      <span className="pill" aria-hidden />
      <span className="opt opt-black">Black</span>
      <span className="opt opt-marble">Marble</span>
    </button>
  )
}
