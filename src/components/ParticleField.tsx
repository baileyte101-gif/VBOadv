'use client'

import { useEffect, useRef } from 'react'

/* ═══════════════════════════════════════════════════════════════════════════
   Shared flicker particle field. Ported from Jules's approved mockup:
   Jules/designs/vbo/website/homepage-redesign-2026-08-08/section-system-concept.html

   Builds points by rasterising a silhouette to an offscreen canvas and sampling
   its alpha channel, eases them back from a pointer repel, and flickers each one
   on its own clock. Flicker, not flash: independent phase and period per dot,
   a small swing around its own baseline, never reaching white, with a minority
   sitting dimmer and slower for depth.

   ── PERFORMANCE DIALS ──────────────────────────────────────────────────────
   Vega's INP budget is under 200ms on a mid-range Android. Two concurrent
   canvases plus pointer-repel physics is exactly the shape of main-thread work
   that regresses it. If a real-device measurement comes back over budget, the
   fix is to turn these down, NOT to delete the effect. Nothing else needs to
   change.
   ═══════════════════════════════════════════════════════════════════════════ */

/** Below this viewport width, particle density takes an extra cut. */
const MOBILE_WIDTH_BREAKPOINT = 480
/** Raise to thin the mobile field further. 1 = no extra cut. */
const MOBILE_DENSITY_DIVISOR = 1.6
/**
 * Flip to false to drop pointer-repel physics on touch devices only. The static
 * flicker underneath stays on. The repel math is the expensive part, not the
 * flicker, so this is the cheap fix if the measured number comes back high.
 */
const TOUCH_REPEL_ENABLED = true

const GOLD = '#B8962E'
/** The hero wordmark is the one hot-gold object in its viewport. One per screen. */
const GOLD_HOT = '#E7CE86'

/**
 * Where the hero photo takes over and the wordmark stops. Must stay in step with
 * the `@media (min-width: 1024px)` rule on `.hero-wordmark-wrap` in globals.css.
 */
const HERO_PHOTO_BREAKPOINT = 1024
/**
 * How far below centre the wordmark sits once it is confined to the copy column,
 * as a fraction of the hero's height. Enough to clear most of the display
 * headline and sit behind the body copy. Below the breakpoint there is no photo
 * and no crowding, so the mark stays centred.
 */
const WORDMARK_Y_BIAS = 0.15

type Particle = {
  bx: number
  by: number
  x: number
  y: number
  r: number
  baseO: number
  ampl: number
  period: number
  phase: number
}

type BuildOpts = {
  fontFamily: string
  /** Fraction of the canvas height to push the wordmark below centre. */
  yBias: number
}

type Preset = {
  build: (ctx: CanvasRenderingContext2D, W: number, H: number, opts: BuildOpts) => void
  color: string
  density: number
  dimChance: number
  baseORange: [number, number]
  baseORangeDim: [number, number]
  amplRange: [number, number]
  amplRangeDim: [number, number]
  periodRange: [number, number]
  periodRangeDim: [number, number]
}

/* ── Silhouette builders ─────────────────────────────────────────────────── */

/**
 * The VBO wordmark, rasterised from typed letterforms. Tim's round 7 correction
 * keeps this technique as built: "I'm good with the pixels just being the V, the
 * B, and the O... don't go reinvent that." The canonical logo asset is used for
 * the nav and for this field's fallback, which are real logo placements; the
 * particle field is the named exception.
 *
 * Fit checks BOTH width and height, since the box is taller relative to its width
 * than the original band and an unchecked height runs the glyphs off the top and
 * bottom.
 *
 * yBias drops the mark below centre. On desktop it clears most of the display
 * headline and sits behind the smaller body copy, where the dots read as dots
 * instead of disappearing under 100px letterforms.
 */
function buildWordmark(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  { fontFamily, yBias }: BuildOpts
) {
  ctx.fillStyle = '#fff'
  const text = 'VBO'
  const targetW = W * 0.82
  // The usable height shrinks by the bias, so the mark can move down without
  // ever running off the bottom of the canvas.
  const targetH = H * (0.6 - Math.abs(yBias))
  let size = Math.min(targetH, targetW * 0.5)
  ctx.font = `900 ${size}px ${fontFamily}`
  while (size > 10 && (ctx.measureText(text).width > targetW || size > targetH)) {
    size -= 4
    ctx.font = `900 ${size}px ${fontFamily}`
  }
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, W / 2, H / 2 + size * 0.03 + H * yBias)
}

function mulberry32(seed: number) {
  return function () {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Recognition lives in the crown, so what sits below each named tower stays a
// plain rectangle on purpose.
function drawGenericTower(
  ctx: CanvasRenderingContext2D,
  x: number,
  w: number,
  hgt: number,
  baseY: number,
  rng: () => number
) {
  ctx.fillRect(x, baseY - hgt, w, hgt)
  if (rng() > 0.72) {
    const tierW = w * 0.5
    const tierH = hgt * 0.12
    ctx.fillRect(x + (w - tierW) / 2, baseY - hgt - tierH, tierW, tierH)
  }
  if (rng() > 0.8) {
    ctx.fillRect(x + w * 0.44, baseY - hgt - hgt * 0.06 - 14, Math.max(2, w * 0.08), 14)
  }
}

// Freedom Tower: broad base, a clear step in to a narrower shaft, a small cupola.
function drawFreedomTower(ctx: CanvasRenderingContext2D, cx: number, baseY: number, bandH: number) {
  const baseW = bandH * 0.46
  const baseH = bandH * 0.5
  const shaftW = baseW * 0.5
  const shaftH = bandH * 0.3
  const crownW = shaftW * 0.42
  const crownH = bandH * 0.13
  ctx.fillRect(cx - baseW / 2, baseY - baseH, baseW, baseH)
  ctx.fillRect(cx - shaftW / 2, baseY - baseH - shaftH, shaftW, shaftH)
  ctx.fillRect(cx - crownW / 2, baseY - baseH - shaftH - crownH, crownW, crownH)
  ctx.beginPath()
  ctx.arc(cx, baseY - baseH - shaftH - crownH, crownW * 0.42, Math.PI, 0)
  ctx.fill()
}

// Miami Tower: plain tapering shaft, the large ringed halo crown does the work.
function drawMiamiTower(ctx: CanvasRenderingContext2D, cx: number, baseY: number, bandH: number) {
  const shaftW = bandH * 0.24
  const shaftH = bandH * 0.86
  const taper = shaftW * 0.22
  ctx.beginPath()
  ctx.moveTo(cx - shaftW / 2, baseY)
  ctx.lineTo(cx - shaftW / 2 + taper, baseY - shaftH)
  ctx.lineTo(cx + shaftW / 2 - taper, baseY - shaftH)
  ctx.lineTo(cx + shaftW / 2, baseY)
  ctx.closePath()
  ctx.fill()
  const ringY = baseY - shaftH
  const outerR = shaftW * 0.62
  const innerR = outerR * 0.56
  ctx.beginPath()
  ctx.arc(cx, ringY, outerR, 0, Math.PI * 2)
  ctx.fill()
  ctx.save()
  ctx.globalCompositeOperation = 'destination-out'
  ctx.beginPath()
  ctx.arc(cx, ringY, innerR, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()
}

// 1000 Museum: not a rectangle, a curving sculptural exoskeleton down both sides.
function drawMuseum(ctx: CanvasRenderingContext2D, cx: number, baseY: number, bandH: number) {
  const w = bandH * 0.34
  const h = bandH * 0.78
  const top = baseY - h
  const wob = w * 0.22
  ctx.beginPath()
  ctx.moveTo(cx - w / 2, baseY)
  ctx.bezierCurveTo(
    cx - w / 2 - wob, baseY - h * 0.3,
    cx - w / 2 + wob, baseY - h * 0.55,
    cx - w / 2 - wob * 0.6, baseY - h * 0.8
  )
  ctx.lineTo(cx - w / 2 + wob * 0.4, top)
  ctx.lineTo(cx + w / 2 - wob * 0.4, top)
  ctx.bezierCurveTo(
    cx + w / 2 + wob * 0.6, baseY - h * 0.78,
    cx + w / 2 - wob, baseY - h * 0.5,
    cx + w / 2 + wob, baseY - h * 0.28
  )
  ctx.lineTo(cx + w / 2, baseY)
  ctx.closePath()
  ctx.fill()
}

/**
 * The Miami skyline. bandH is capped rather than a straight fraction of H, so the
 * towers keep a real skyline's proportions however tall the closing block grows.
 * The extra height above them is empty sky, which is what a skyline shot looks
 * like from a distance, and it is what the fade-to-black gradient lands on.
 */
function buildSkyline(ctx: CanvasRenderingContext2D, W: number, H: number) {
  ctx.fillStyle = '#fff'
  const baseY = H
  const bandH = Math.max(170, Math.min(H * 0.5, 320))
  const rng = mulberry32(2601)
  const namedX = { freedom: W * 0.27, miami: W * 0.5, museum: W * 0.72 }
  let x = 0
  let guard = 0
  while (x < W && guard < 4000) {
    guard++
    // +1px past each zone edge: jumping to the exact boundary can land a hair
    // back inside it under floating point rounding, which stalls the loop.
    if (Math.abs(x - namedX.freedom) < bandH * 0.36) {
      drawFreedomTower(ctx, namedX.freedom, baseY, bandH)
      x = namedX.freedom + bandH * 0.36 + 1
      continue
    }
    if (Math.abs(x - namedX.miami) < bandH * 0.2) {
      drawMiamiTower(ctx, namedX.miami, baseY, bandH)
      x = namedX.miami + bandH * 0.2 + 1
      continue
    }
    if (Math.abs(x - namedX.museum) < bandH * 0.26) {
      drawMuseum(ctx, namedX.museum, baseY, bandH)
      x = namedX.museum + bandH * 0.26 + 1
      continue
    }
    const w = 14 + rng() * 30
    const hgt = bandH * (0.22 + rng() * 0.6)
    drawGenericTower(ctx, x, w, hgt, baseY, rng)
    x += w + 4 + rng() * 8
  }
}

const PRESETS: Record<'wordmark' | 'skyline', Preset> = {
  wordmark: {
    build: buildWordmark,
    color: GOLD_HOT,
    density: 190,
    dimChance: 0.22,
    baseORange: [0.46, 0.8],
    baseORangeDim: [0.22, 0.38],
    amplRange: [0.1, 0.18],
    amplRangeDim: [0.05, 0.1],
    periodRange: [1500, 4000],
    periodRangeDim: [2600, 6000],
  },
  skyline: {
    build: buildSkyline,
    color: GOLD,
    density: 240,
    dimChance: 0.3,
    baseORange: [0.3, 0.6],
    baseORangeDim: [0.12, 0.26],
    amplRange: [0.12, 0.22],
    amplRangeDim: [0.06, 0.12],
    periodRange: [2200, 5000],
    periodRangeDim: [3600, 7500],
  },
}

type Props = {
  variant: 'wordmark' | 'skyline'
  /**
   * The element pointer events are read from. Listening on the whole section
   * rather than the canvas wrap, since content sits above the wrap in the
   * stacking order and would otherwise swallow the events.
   */
  eventTargetRef: React.RefObject<HTMLElement>
  className?: string
  fallbackClassName?: string
  fallback?: React.ReactNode
  /** Brightens the field slightly while the hero's marble ground is showing. */
  boost?: boolean
}

export default function ParticleField({
  variant,
  eventTargetRef,
  className,
  fallbackClassName,
  fallback,
  boost = false,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fallbackRef = useRef<HTMLDivElement>(null)
  const boostRef = useRef(boost)

  // Keep the running loop's boost value current without restarting the field.
  useEffect(() => {
    boostRef.current = boost
  }, [boost])

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    const eventTarget = eventTargetRef.current
    if (!wrap || !canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const cfg = PRESETS[variant]
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    // Resolve the real family name behind next/font's CSS variable. Hardcoding
    // "Barlow Condensed" would silently rasterise in a fallback face, since
    // next/font ships the family under a generated name.
    const fontFamily =
      getComputedStyle(document.documentElement).getPropertyValue('--font-barlow').trim() ||
      '"Barlow Condensed", sans-serif'

    let W = 0
    let H = 0
    let particles: Particle[] = []
    let running = false
    let rafId: number | null = null
    let repelRadius = 170
    const REPEL_FORCE = 70
    const REPEL_PUSH = 0.2
    const EASE = 0.075

    // Pointer position is captured as viewport coordinates and converted to
    // canvas space inside the rAF tick. Keeping getBoundingClientRect out of the
    // input handler means one layout read per frame instead of one per event,
    // which is the single cheapest thing available for the INP budget.
    let pointerClientX = -99999
    let pointerClientY = -99999
    let pointerActive = false

    function rand(range: [number, number]) {
      return range[0] + Math.random() * (range[1] - range[0])
    }

    function build() {
      if (!ctx) return
      const off = document.createElement('canvas')
      off.width = W
      off.height = H
      const octx = off.getContext('2d')
      if (!octx) return
      // Read on every build so a resize across the breakpoint re-centres correctly.
      const yBias =
        variant === 'wordmark' && window.innerWidth >= HERO_PHOTO_BREAKPOINT
          ? WORDMARK_Y_BIAS
          : 0
      cfg.build(octx, W, H, { fontFamily, yBias })
      let img: Uint8ClampedArray
      try {
        img = octx.getImageData(0, 0, W, H).data
      } catch {
        return
      }
      particles = []
      // Below ~480px viewport width, cut density further rather than trusting
      // the density formula's natural falloff on a smaller canvas alone.
      let effectiveDensity = cfg.density
      if (W < MOBILE_WIDTH_BREAKPOINT) effectiveDensity = effectiveDensity / MOBILE_DENSITY_DIVISOR
      const step = Math.max(4, Math.floor(W / effectiveDensity))
      for (let y = 0; y < H; y += step) {
        for (let x = 0; x < W; x += step) {
          const idx = (y * W + x) * 4
          if (img[idx + 3] > 80) {
            const dim = Math.random() < cfg.dimChance
            particles.push({
              bx: x,
              by: y,
              x,
              y,
              r: 0.8 + Math.random() * 1.4,
              baseO: dim ? rand(cfg.baseORangeDim) : rand(cfg.baseORange),
              ampl: dim ? rand(cfg.amplRangeDim) : rand(cfg.amplRange),
              period: dim ? rand(cfg.periodRangeDim) : rand(cfg.periodRange),
              phase: Math.random() * Math.PI * 2,
            })
          }
        }
      }
      if (fallbackRef.current) {
        fallbackRef.current.style.display = particles.length ? 'none' : 'flex'
      }
    }

    function drawStatic() {
      if (!ctx) return
      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = cfg.color
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        ctx.globalAlpha = p.baseO
        ctx.beginPath()
        ctx.arc(p.bx, p.by, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    function resize() {
      if (!wrap || !canvas || !ctx) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const nextW = wrap.clientWidth
      const nextH = wrap.clientHeight
      if (!nextW || !nextH) return
      W = nextW
      H = nextH
      canvas.width = W * dpr
      canvas.height = H * dpr
      canvas.style.width = W + 'px'
      canvas.style.height = H + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      repelRadius = Math.max(150, Math.min(200, W * 0.16))
      build()
      if (reduceMotion) drawStatic()
    }

    function tick(t: number) {
      if (!running || !ctx || !wrap) return
      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = cfg.color
      const boostFactor = boostRef.current ? 1.14 : 1
      // The distance/force repel math below is the expensive part of this loop,
      // not the ease-back or the flicker. With TOUCH_REPEL_ENABLED false, touch
      // devices skip only that math: particles still ease back and still flicker,
      // so the field keeps moving without the per-touchmove sqrt/atan2 recompute.
      const repelActive = TOUCH_REPEL_ENABLED || !isTouchDevice
      let mx = -99999
      let my = -99999
      if (repelActive && pointerActive) {
        const rect = wrap.getBoundingClientRect()
        mx = pointerClientX - rect.left
        my = pointerClientY - rect.top
      }
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        if (repelActive && pointerActive) {
          const dx = p.x - mx
          const dy = p.y - my
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < repelRadius) {
            const force = (1 - dist / repelRadius) * REPEL_FORCE
            const ang = Math.atan2(dy, dx)
            p.x += Math.cos(ang) * force * REPEL_PUSH
            p.y += Math.sin(ang) * force * REPEL_PUSH
          }
        }
        p.x += (p.bx - p.x) * EASE
        p.y += (p.by - p.y) * EASE
        const flick = Math.sin((t / p.period) * Math.PI * 2 + p.phase)
        let alpha = p.baseO * (1 + flick * p.ampl) * boostFactor
        if (alpha < 0.03) alpha = 0.03
        if (alpha > 0.92) alpha = 0.92
        ctx.globalAlpha = alpha
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      rafId = requestAnimationFrame(tick)
    }

    function start() {
      if (running || reduceMotion) return
      running = true
      rafId = requestAnimationFrame(tick)
    }

    function stop() {
      running = false
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
        rafId = null
      }
    }

    const onPointerMove = (e: MouseEvent) => {
      pointerClientX = e.clientX
      pointerClientY = e.clientY
      pointerActive = true
    }
    const onPointerOut = () => {
      pointerActive = false
    }
    const onTouch = (e: TouchEvent) => {
      if (e.touches && e.touches.length) {
        pointerClientX = e.touches[0].clientX
        pointerClientY = e.touches[0].clientY
        pointerActive = true
      }
    }

    if (eventTarget) {
      eventTarget.addEventListener('mousemove', onPointerMove, { passive: true })
      eventTarget.addEventListener('mouseleave', onPointerOut)
      eventTarget.addEventListener('touchstart', onTouch, { passive: true })
      eventTarget.addEventListener('touchmove', onTouch, { passive: true })
      eventTarget.addEventListener('touchend', onPointerOut)
    }

    // Mobile browsers fire resize every time the URL bar collapses or expands.
    // Rebuilding the whole field on each of those is pure wasted main-thread
    // work, so small height-only changes are ignored and the canvas simply
    // stretches. Width changes and real height changes still rebuild.
    let resizeTimer: number | null = null
    const onResize = () => {
      if (resizeTimer !== null) window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(() => {
        if (!wrap) return
        const nextW = wrap.clientWidth
        const nextH = wrap.clientHeight
        if (nextW === W && Math.abs(nextH - H) < 140) return
        resize()
      }, 150)
    }
    window.addEventListener('resize', onResize)

    resize()
    if (document.fonts && document.fonts.ready) {
      // The wordmark rasterises typed letterforms, so it has to be rebuilt once
      // the real face has loaded or it samples the fallback's shapes.
      document.fonts.ready.then(() => resize())
    }

    // Animation only runs while the field is actually on screen.
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((ent) => {
          if (ent.isIntersecting && ent.intersectionRatio > 0.15) start()
          else stop()
        })
      },
      { threshold: [0, 0.15, 0.4] }
    )
    obs.observe(wrap)

    return () => {
      stop()
      obs.disconnect()
      window.removeEventListener('resize', onResize)
      if (resizeTimer !== null) window.clearTimeout(resizeTimer)
      if (eventTarget) {
        eventTarget.removeEventListener('mousemove', onPointerMove)
        eventTarget.removeEventListener('mouseleave', onPointerOut)
        eventTarget.removeEventListener('touchstart', onTouch)
        eventTarget.removeEventListener('touchmove', onTouch)
        eventTarget.removeEventListener('touchend', onPointerOut)
      }
    }
  }, [variant, eventTargetRef])

  return (
    <div ref={wrapRef} className={className} aria-hidden="true">
      <canvas ref={canvasRef} aria-hidden="true" />
      <div ref={fallbackRef} className={fallbackClassName} aria-hidden="true">
        {fallback}
      </div>
    </div>
  )
}
