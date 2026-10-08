import {
  BEE_WING_RIGHT,
  BEE_WING_LEFT,
  BEE_THORAX,
  BEE_HEAD,
  BEE_ANTENNAE,
  BEE_ABDOMEN,
  WORDMARK_LETTERS,
  WORDMARK_BAR,
  LOCKUP_BEE_TRANSFORM,
  LOCKUP_WORDMARK_TRANSFORM,
} from './paths'

/**
 * The bee and the wordmark, defined once per page and drawn everywhere else
 * with <use>: the header and footer lockups, the opening screen, the flying
 * bee and the bee at rest. Server-rendered, so it costs HTML only, never
 * JavaScript, and nothing has to load before a logo can paint.
 *
 * Every path is the logo pack's own (see ./paths). Parts are filled with
 * currentColor so each placement sets its colour in CSS (gold on dark, black
 * on Egg); the bar is always brand gold #B8962E.
 *
 * Hidden by clipping rather than display:none, which some browsers refuse to
 * resolve <use> references into.
 */
export default function BeeSprite() {
  return (
    <svg className="vbo-sprite" aria-hidden="true" focusable="false" width="0" height="0">
      <defs>
        <g id="vbo-bee-wr">
          <path fill="currentColor" d={BEE_WING_RIGHT} />
        </g>
        <g id="vbo-bee-wl">
          <path fill="currentColor" d={BEE_WING_LEFT} />
        </g>
        <g id="vbo-bee-body">
          <path fill="currentColor" d={BEE_THORAX} />
          <path fill="currentColor" d={BEE_HEAD} />
          <path fill="currentColor" d={BEE_ANTENNAE} />
          <path fill="currentColor" d={BEE_ABDOMEN} />
        </g>
        {/* Wings first, then the body: the pack's own paint order. */}
        <g id="vbo-bee">
          <use href="#vbo-bee-wr" />
          <use href="#vbo-bee-wl" />
          <use href="#vbo-bee-body" />
        </g>
        <g id="vbo-wm-letters">
          {WORDMARK_LETTERS.map((d, i) => (
            <path key={i} fill="currentColor" d={d} />
          ))}
        </g>
        <path id="vbo-wm-bar" fill="#B8962E" d={WORDMARK_BAR} />
        {/* The lockup's two halves, placed by the pack's own transforms. */}
        <g id="vbo-lk-bee" transform={LOCKUP_BEE_TRANSFORM}>
          <use href="#vbo-bee" />
        </g>
        <g id="vbo-lk-wm" transform={LOCKUP_WORDMARK_TRANSFORM}>
          <use href="#vbo-wm-letters" />
          <use href="#vbo-wm-bar" />
        </g>
      </defs>
    </svg>
  )
}
