/**
 * One section's copy of the flying bee, in its lane between the section's
 * ground and its words. Each homepage section the bee flies in carries one
 * of these as its first child; the section clips it. Moved by
 * beeFlightEngine.ts, hidden until then (and for good with reduced motion or
 * no JavaScript). No hooks, so client section components can render it.
 */
export default function BeeLane() {
  return (
    <div className="vbo-lane" aria-hidden="true">
      <div className="vbo-bee">
        <div className="vbo-bee-bob">
          <svg className="vbo-w-l" viewBox="0 0 512 512" focusable="false">
            <use href="#vbo-bee-wl" />
          </svg>
          <svg className="vbo-w-r" viewBox="0 0 512 512" focusable="false">
            <use href="#vbo-bee-wr" />
          </svg>
          <svg viewBox="0 0 512 512" focusable="false">
            <use href="#vbo-bee-body" />
          </svg>
        </div>
      </div>
    </div>
  )
}
