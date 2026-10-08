import { LOCKUP_VIEWBOX } from './paths'

type Props = {
  /** dark: gold bee, white letters (black and dark grounds). light: black bee and letters (Egg, white). The bar is gold either way. */
  tone?: 'dark' | 'light'
  /** Sizing class: vbo-lk-nav (header), vbo-lk-foot (footer), vbo-lk-mark (Why the bee page). */
  className?: string
  /** Accessible name when the lockup stands alone. */
  label?: string
  /** Inside a link that already carries its own name: hide the drawing from assistive tech. */
  decorative?: boolean
  /** The header lockup: the opening screen's bee lands on this one. */
  target?: boolean
}

/**
 * The bee and VBO side by side, built from the pack's lockup file
 * (vbo-lockup-gold-white-2026-10-08.svg): the bee 1.2 V tall, centred on the
 * letters, half a V before the bar. The two halves are separate <use>
 * elements so the header's bee can wait while the opening's bee flies in and
 * lands on it. No hooks, so it renders in server and client components alike.
 */
export default function BeeLockup({
  tone = 'dark',
  className = '',
  label = 'VBO',
  decorative = false,
  target = false,
}: Props) {
  const a11y = decorative
    ? { 'aria-hidden': true as const }
    : { role: 'img', 'aria-label': label }

  return (
    <svg
      viewBox={LOCKUP_VIEWBOX}
      className={`vbo-lk vbo-lk--${tone}${className ? ` ${className}` : ''}`}
      focusable="false"
      {...a11y}
      {...(target ? { 'data-bee-target': '' } : {})}
    >
      <use className="vbo-lk-b" href="#vbo-lk-bee" />
      <use className="vbo-lk-w" href="#vbo-lk-wm" />
    </svg>
  )
}
