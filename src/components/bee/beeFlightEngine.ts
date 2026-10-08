/* =========================================================================
   The flying bee on the homepage (bee brand evolution, step 07, 2026-10-08).

   A port of Jules's reference build (the first script on
   Mack/artifacts/2026-10-bee-website/the-bee-on-vboadv.html), spec in her
   notes, section 3. Loaded after the page is interactive (BeeFlight.tsx), in
   its own chunk, so it adds nothing to the homepage's first load.

   Layering: every section the bee flies in has its own copy in a lane between
   the section's ground and its words (BeeLane.tsx); the section clips its own
   lane, so the bee never draws over text or outside its section. Sections
   without a lane are in front: the bee slips under their edges.

   Choreography: a route of waypoints anchored to real elements. Sync points
   pin a moment to the screen:
     vt: the section's TOP EDGE is at this share of the screen height. Used
         for every coming-out: the bee's nose reaches the section's top edge
         as that edge reaches the middle of the screen (Tim, 2026-10-08).
     vy: the BEE is at this share of the screen height. Going under, landing.
   It moves only with the scroll, catches up over about 0.3 s but never
   trails by more than 3% of the screen, faces where it flies, beats its
   wings while moving and stops them 1.4 s after it slows, and lands upright
   beside the Why the bee link. Transforms only; one animation loop, only
   while catching up.

   Two departures from the concept, both forced by the live layout rather
   than chosen:
   1. Gutters. The mock centred every section at 1120 px; the live sections
      are not (What we run's text is left-aligned at 1120, the others run
      full width). gL and gR are measured per section from its real content
      box: the centre of the space either side of the words.
   2. Paddings. The mock had one top and bottom padding for every section.
      PT and PB here read each anchor element's own computed padding.
   ========================================================================= */

type Box = { x: number; y: number; w: number; h: number; pt: number; pb: number }
type Gutter = { gL: number; gR: number }
type Layout = {
  W: number
  vh: number
  B: number
  secs: Record<string, Box>
  fly: Box[]
  gut: Record<string, Gutter>
}
type Dy = number | ((s: Box, L: Layout) => number)
type Way = {
  s: string
  y: 'top' | 'bottom' | 'mid'
  dy?: Dy
  x: number | 'gL' | 'gR' | 'rest'
  vt?: number
  vy?: number
  r?: number
}
type Pt = { x: number; y: number }

const PT = (f: number): Dy => (s) => s.pt * f
const PB = (f: number): Dy => (s) => -s.pb * f
const NOSE: Dy = (_s, L) => -L.B / 2 // centre one radius above the edge: just hidden

const VT = 0.53 // with the 3% trail limit, the bee shows at about 50% of the screen at any scroll speed

/* Which flying section's content box sets the gutters for a waypoint. */
const GUTTER_OF: Record<string, string> = {
  run: 'run',
  wall: 'run',
  runEnd: 'run',
  wwd: 'wwd',
  about: 'about',
  why: 'why',
  rest: 'why',
}

const ROUTE: Way[] = [
  { s: 'ticker', y: 'top', dy: -70, x: 0.66 }, // waiting behind the hero and the word band
  { s: 'run', y: 'top', dy: NOSE, x: 0.68, vt: VT }, // nose at the band's lower edge as What we run reaches mid-screen
  { s: 'run', y: 'top', dy: 12, x: 0.68 }, // drops out from under the word band
  { s: 'run', y: 'top', dy: PT(0.55), x: 0.82 },
  { s: 'run', y: 'top', dy: PT(1), x: 'gR' }, // into the right gutter
  { s: 'wall', y: 'top', dy: -48, x: 'gR' }, // down beside the heading and list
  { s: 'wall', y: 'top', dy: 34, x: 0.8, vy: 0.6 }, // under the client wall's top edge
  { s: 'wall', y: 'bottom', dy: -34, x: 0.62 }, // behind the client wall
  { s: 'runEnd', y: 'top', dy: 20, x: 0.62, vy: 0.5 }, // out of its bottom edge
  /* Live layout, not in the mock: the closing line here ("Each client getting
     the attention it deserves...") runs almost the full measure, where the
     mock had a short line. So instead of cutting across it, the bee crosses
     the band's top padding into the right gutter, goes down past the line,
     and sweeps left in the bottom padding. Tight corners keep it off the
     line's end on phones. */
  { s: 'runEnd', y: 'top', dy: PT(0.5), x: 'gR', r: 16 }, // across the top padding into the right gutter
  { s: 'runEnd', y: 'bottom', dy: PB(0.5), x: 'gR', r: 16 }, // down the gutter, past the line
  { s: 'runEnd', y: 'bottom', dy: PB(0.35), x: 0.3 }, // sweeps left, under the line of text
  { s: 'approach', y: 'top', dy: 40, x: 0.2, vy: 0.58 }, // under The Approach
  { s: 'band', y: 'bottom', dy: -26, x: 0.26 }, // behind The Approach and the band
  { s: 'wwd', y: 'top', dy: NOSE, x: 0.26, vt: VT }, // nose at the band's edge as What We Do reaches mid-screen
  { s: 'wwd', y: 'top', dy: 12, x: 0.26 }, // out into What We Do
  { s: 'wwd', y: 'top', dy: PT(0.55), x: 'gL', r: 28 }, // into the left gutter, above the label (tight corner)
  { s: 'wwd', y: 'top', dy: PT(1), x: 'gL' },
  { s: 'wwd', y: 'bottom', dy: PB(0.45), x: 'gL', r: 24, vy: 0.62 }, // down the gutter, turning only below the last line
  { s: 'wwd', y: 'bottom', dy: PB(0.38), x: 0.5 }, // sweeps right
  { s: 'wwd', y: 'bottom', dy: PB(0.25), x: 0.8 },
  { s: 'life', y: 'top', dy: 40, x: 0.84, vy: 0.58 }, // under the Miami photo
  { s: 'ind', y: 'bottom', dy: -26, x: 0.86 }, // behind the photo and Industries
  { s: 'about', y: 'top', dy: NOSE, x: 0.86, vt: VT }, // nose at Industries' edge as About reaches mid-screen
  { s: 'about', y: 'top', dy: 12, x: 0.86 }, // out into About
  { s: 'about', y: 'top', dy: PT(1), x: 'gR' }, // into the right gutter
  { s: 'about', y: 'bottom', dy: -30, x: 'gR' }, // down past the founder
  { s: 'why', y: 'top', dy: 0, x: 'gR', vt: VT }, // crosses into Why the bee as it reaches mid-screen (turns black)
  { s: 'why', y: 'top', dy: PT(0.7), x: 'gR' },
  { s: 'rest', y: 'mid', dy: 0, x: 'gR' }, // level with the link
  { s: 'rest', y: 'mid', dy: 0, x: 'rest', vy: 0.4 }, // lands beside the link
]

const REQUIRED = ['ticker', 'run', 'wall', 'runEnd', 'approach', 'band', 'wwd', 'life', 'ind', 'about', 'why', 'rest']

const TAU = 0.3 // seconds for the bee to catch up with the scroll
const MAX_LAG = 0.03 // but it never trails the scroll by more than 3% of the screen
const TURN = 0.22 // seconds to turn toward where it flies
const IDLE_MS = 1400 // wings stop this long after the bee slows to a drift
const MAX_RATIO = 3.2 // the bee never moves more than 3.2 px per px scrolled

export function startBeeFlight(): () => void {
  const root = document.documentElement
  const flySecs = Array.prototype.slice.call(document.querySelectorAll('[data-bee="fly"]')) as HTMLElement[]
  const copies = flySecs.map((s) => s.querySelector('.vbo-bee') as HTMLElement | null)
  if (!flySecs.length || copies.some((c) => !c)) return () => {}
  const bees = copies as HTMLElement[]
  const bobs = bees.map((c) => c.querySelector('.vbo-bee-bob') as HTMLElement | null)
  const whyIdx = flySecs.map((s) => s.getAttribute('data-bee-fly')).indexOf('why')
  const mq = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null
  let motionOn = !(mq && mq.matches)

  let L: Layout | null = null
  let P: Pt[] = []
  let A: number[] = []
  let N = 0
  let SAMP: { x: number; y: number; s: number }[] = []
  let STA: number[] = []
  let Ss: number | null = null
  let prev: Pt | null = null
  let heading = 180
  let landed = false
  let raf = 0
  let lastT = 0
  let idleTimer = 0
  let flying = false
  let paused = false
  const vis: boolean[] = bees.map(() => false)

  function box(el: Element): Box {
    const r = el.getBoundingClientRect()
    const cs = getComputedStyle(el)
    return {
      x: r.left + window.scrollX,
      y: r.top + window.scrollY,
      w: r.width,
      h: r.height,
      pt: parseFloat(cs.paddingTop) || 0,
      pb: parseFloat(cs.paddingBottom) || 0,
    }
  }

  function measure(): boolean {
    const W = root.clientWidth
    const secs: Record<string, Box> = {}
    Array.prototype.forEach.call(document.querySelectorAll('[data-bee-sec]'), (el: Element) => {
      const key = el.getAttribute('data-bee-sec')
      if (key) secs[key] = box(el)
    })
    if (REQUIRED.some((k) => !secs[k])) return false
    const gut: Record<string, Gutter> = {}
    flySecs.forEach((s) => {
      const key = s.getAttribute('data-bee-fly') || ''
      const content = s.querySelector('[data-bee-content]') || s
      const r = content.getBoundingClientRect()
      gut[key] = { gL: Math.max(0, r.left) / 2, gR: (Math.min(W, r.right) + W) / 2 }
    })
    L = {
      W,
      vh: window.innerHeight,
      B: bees[0].offsetWidth || 30,
      secs,
      fly: flySecs.map((s) => box(s)),
      gut,
    }
    build()
    return true
  }

  function resolveX(w: Way): number {
    const lay = L as Layout
    if (typeof w.x === 'number') return w.x * lay.W
    if (w.x === 'rest') {
      const r = lay.secs.rest
      return r.x + r.w / 2
    }
    const g = lay.gut[GUTTER_OF[w.s]]
    if (!g) return lay.W / 2
    return w.x === 'gL' ? g.gL : g.gR
  }
  function resolveY(w: Way): number {
    const lay = L as Layout
    const s = lay.secs[w.s]
    const base = w.y === 'bottom' ? s.y + s.h : w.y === 'mid' ? s.y + s.h / 2 : s.y
    const d = typeof w.dy === 'function' ? w.dy(s, lay) : w.dy || 0
    return base + d
  }

  /* Straight runs between waypoints, each corner rounded with a quadratic
     that stays inside the corner, sampled every 3 px by arc length so speed
     is even along each stretch. STA[i] is the arc length at waypoint i. */
  function buildPath() {
    const corners: { p0: Pt; k: Pt; p1: Pt }[] = []
    let s = 0
    let last: Pt | null = null
    for (let i = 1; i < N - 1; i++) {
      const a = P[i - 1]
      const b = P[i]
      const c = P[i + 1]
      const l1 = Math.hypot(b.x - a.x, b.y - a.y)
      const l2 = Math.hypot(c.x - b.x, c.y - b.y)
      const rr = ROUTE[i].r
      const r = Math.min(rr != null ? rr : 140, 0.45 * l1, 0.45 * l2)
      corners[i] = {
        p0: l1 ? { x: b.x - ((b.x - a.x) / l1) * r, y: b.y - ((b.y - a.y) / l1) * r } : b,
        k: b,
        p1: l2 ? { x: b.x + ((c.x - b.x) / l2) * r, y: b.y + ((c.y - b.y) / l2) * r } : b,
      }
    }
    SAMP = []
    STA = new Array(N)
    const push = (p: Pt) => {
      if (last) s += Math.hypot(p.x - last.x, p.y - last.y)
      SAMP.push({ x: p.x, y: p.y, s })
      last = p
    }
    const line = (p0: Pt, p1: Pt) => {
      const n = Math.max(1, Math.ceil(Math.hypot(p1.x - p0.x, p1.y - p0.y) / 3))
      for (let m = 1; m <= n; m++) {
        const t = m / n
        push({ x: p0.x + (p1.x - p0.x) * t, y: p0.y + (p1.y - p0.y) * t })
      }
    }
    const quad = (p0: Pt, k: Pt, p1: Pt, idx: number) => {
      let n = Math.max(2, Math.ceil((Math.hypot(k.x - p0.x, k.y - p0.y) + Math.hypot(p1.x - k.x, p1.y - k.y)) / 3))
      if (n % 2) n++
      for (let m = 1; m <= n; m++) {
        const t = m / n
        const q = 1 - t
        push({ x: q * q * p0.x + 2 * q * t * k.x + t * t * p1.x, y: q * q * p0.y + 2 * q * t * k.y + t * t * p1.y })
        if (m === n / 2) STA[idx] = s
      }
    }
    push(P[0])
    STA[0] = 0
    let from = P[0]
    for (let i = 1; i < N - 1; i++) {
      line(from, corners[i].p0)
      quad(corners[i].p0, corners[i].k, corners[i].p1, i)
      from = corners[i].p1
    }
    line(from, P[N - 1])
    STA[N - 1] = s
  }

  function build() {
    const lay = L as Layout
    P = ROUTE.map((w) => ({ x: resolveX(w), y: resolveY(w) }))
    N = P.length
    buildPath()
    const len = STA
    A = new Array(N)
    const sync: number[] = []
    ROUTE.forEach((w, n) => {
      if (w.vt != null) {
        A[n] = lay.secs[w.s].y - w.vt * lay.vh
        sync.push(n)
      } else if (w.vy != null) {
        A[n] = P[n].y - w.vy * lay.vh
        sync.push(n)
      }
    })
    if (sync[0] !== 0) {
      A[0] = A[sync[0]] - Math.max(60, (len[sync[0]] - len[0]) / 1.2)
      sync.unshift(0)
    }
    for (let j = 1; j < sync.length; j++) {
      const a = sync[j - 1]
      const b = sync[j]
      const gap = Math.max(60, (len[b] - len[a]) / MAX_RATIO)
      if (A[b] < A[a] + gap) A[b] = A[a] + gap
    }
    for (let j = 1; j < sync.length; j++) {
      const a = sync[j - 1]
      const b = sync[j]
      const span = len[b] - len[a] || 1
      for (let k = a + 1; k < b; k++) A[k] = A[a] + ((A[b] - A[a]) * (len[k] - len[a])) / span
    }
  }

  function pathAt(u: number): Pt {
    if (u <= 0) return { x: P[0].x, y: P[0].y }
    if (u >= N - 1) return { x: P[N - 1].x, y: P[N - 1].y }
    const i = Math.floor(u)
    const want = STA[i] + (STA[i + 1] - STA[i]) * (u - i)
    let lo = 0
    let hi = SAMP.length - 1
    while (hi - lo > 1) {
      const mid = (lo + hi) >> 1
      if (SAMP[mid].s < want) lo = mid
      else hi = mid
    }
    const a = SAMP[lo]
    const b = SAMP[hi]
    const f = b.s - a.s ? (want - a.s) / (b.s - a.s) : 0
    return { x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f }
  }
  function uAt(S: number): number {
    if (S <= A[0]) return 0
    if (S >= A[N - 1]) return N - 1
    let i = 0
    while (i < N - 2 && S >= A[i + 1]) i++
    return i + (S - A[i]) / (A[i + 1] - A[i])
  }
  const angDiff = (a: number, b: number) => (((b - a) % 360) + 540) % 360 - 180
  function headingAt(u: number): number {
    const a = pathAt(Math.max(0, u - 0.02))
    const b = pathAt(Math.min(N - 1, u + 0.02))
    return Math.abs(b.x - a.x) + Math.abs(b.y - a.y) < 0.01 ? 180 : (Math.atan2(b.x - a.x, -(b.y - a.y)) * 180) / Math.PI
  }

  function setPaused(on: boolean) {
    if (on !== paused) {
      paused = on
      root.classList.toggle('bee-paused', on)
    }
  }
  function render(x: number, y: number, h: number) {
    const lay = L as Layout
    const r = lay.B / 2
    for (let i = 0; i < bees.length; i++) {
      const R = lay.fly[i]
      const c = bees[i]
      const on = y + r > R.y && y - r < R.y + R.h
      if (on) {
        c.style.transform =
          'translate3d(' + (x - R.x - r).toFixed(1) + 'px,' + (y - R.y - r).toFixed(1) + 'px,0) rotate(' + h.toFixed(1) + 'deg)'
        if (!vis[i]) {
          c.style.visibility = 'visible'
          vis[i] = true
        }
      } else if (vis[i]) {
        c.style.visibility = 'hidden'
        vis[i] = false
      }
    }
    /* Off screen, its wings stop drawing. */
    const sy = window.scrollY
    setPaused(!(y + r > sy && y - r < sy + lay.vh))
  }
  function hideAll() {
    bees.forEach((c, i) => {
      c.style.visibility = 'hidden'
      vis[i] = false
    })
  }
  function setFlying(on: boolean) {
    if (on !== flying) {
      flying = on
      root.classList.toggle('bee-flying', on)
    }
  }
  function pulse() {
    const b = whyIdx >= 0 ? bobs[whyIdx] : null
    if (!b) return
    b.classList.remove('is-landing')
    void b.offsetWidth
    b.classList.add('is-landing')
    window.setTimeout(() => b.classList.remove('is-landing'), 400)
  }

  function frame(t: number) {
    raf = 0
    if (!L) return
    const dt = lastT ? Math.min(0.05, (t - lastT) / 1000) : 1 / 60
    lastT = t
    const S = window.scrollY
    if (Ss === null) {
      Ss = S
      prev = null
      heading = headingAt(uAt(S))
    }
    Ss += (S - Ss) * (1 - Math.exp(-dt / TAU))
    const cap = L.vh * MAX_LAG // a quick scroll pulls the bee along instead of leaving it behind
    if (S - Ss > cap) Ss = S - cap
    else if (Ss - S > cap) Ss = S + cap
    if (Math.abs(S - Ss) < 1) Ss = S
    const u = uAt(Ss)
    const p = pathAt(u)
    const atRest = u >= N - 1 - 1e-4
    const moving = Math.abs(S - Ss) > 0.3
    let target = heading
    let spd = 0
    if (prev) {
      const dx = p.x - prev.x
      const dy = p.y - prev.y
      spd = Math.sqrt(dx * dx + dy * dy)
      if (spd > 0.22) target = (Math.atan2(dx, -dy) * 180) / Math.PI
    }
    if (atRest) target = 0
    heading += angDiff(heading, target) * (1 - Math.exp(-dt / TURN))
    heading = (((heading % 360) + 540) % 360) - 180
    if (atRest && Math.abs(heading) < 0.5) heading = 0 // exactly upright once landed
    prev = p
    render(p.x, p.y, heading)
    if (atRest && !landed) {
      landed = true
      pulse()
    } else if (!atRest) landed = false
    /* Wings beat while it visibly moves; they stop IDLE_MS after it slows. */
    if (spd > 0.6 && !atRest) {
      setFlying(true)
      if (idleTimer) {
        clearTimeout(idleTimer)
        idleTimer = 0
      }
    } else if (atRest) setFlying(false)
    else if (flying && !idleTimer)
      idleTimer = window.setTimeout(() => {
        idleTimer = 0
        setFlying(false)
      }, IDLE_MS)
    if (moving || Math.abs(angDiff(heading, target)) > 0.4) {
      raf = requestAnimationFrame(frame)
      return
    }
    lastT = 0
  }
  function kick() {
    if (!raf && motionOn && L) raf = requestAnimationFrame(frame)
  }

  function placeStill() {
    if (raf) {
      cancelAnimationFrame(raf)
      raf = 0
    }
    if (idleTimer) {
      clearTimeout(idleTimer)
      idleTimer = 0
    }
    setFlying(false)
    setPaused(false)
    hideAll()
    Ss = null
    prev = null
    landed = true
    lastT = 0
    root.classList.remove('bee-fly-on')
  }
  function applyMotion() {
    if (!L) return
    if (motionOn) {
      root.classList.add('bee-fly-on')
      Ss = null
      landed = false
      kick()
    } else placeStill()
  }

  let mt = 0
  function remeasure() {
    if (mt) return
    mt = requestAnimationFrame(() => {
      mt = 0
      if (!measure()) {
        placeStill()
        L = null
        return
      }
      if (motionOn) {
        root.classList.add('bee-fly-on')
        Ss = null
        kick()
      }
    })
  }

  const onScroll = () => kick()
  const onMq = (e: MediaQueryListEvent) => {
    motionOn = !e.matches
    applyMotion()
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', remeasure)
  window.addEventListener('pageshow', remeasure)
  if (mq) {
    if (mq.addEventListener) mq.addEventListener('change', onMq)
    else if (mq.addListener) mq.addListener(onMq)
  }
  const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(remeasure) : null
  if (ro) ro.observe(document.body)
  let alive = true
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => alive && remeasure())

  if (measure()) applyMotion()
  else L = null

  return function stop() {
    alive = false
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', remeasure)
    window.removeEventListener('pageshow', remeasure)
    if (mq) {
      if (mq.removeEventListener) mq.removeEventListener('change', onMq)
      else if (mq.removeListener) mq.removeListener(onMq)
    }
    if (ro) ro.disconnect()
    if (mt) cancelAnimationFrame(mt)
    placeStill()
    root.classList.remove('bee-paused')
  }
}
