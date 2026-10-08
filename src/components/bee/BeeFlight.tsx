'use client'

import { useEffect } from 'react'

/**
 * Starts the homepage's flying bee once the page is idle. The flight code
 * (beeFlightEngine.ts) is imported dynamically, so it ships as its own small
 * chunk after the page is interactive and adds nothing to the homepage's
 * first load. The bee waits behind the hero until the visitor scrolls, so
 * starting late costs nothing; until then (and with reduced motion, or no
 * JavaScript) the still bee by the Why the bee link is what shows.
 */
type IdleWindow = Window & {
  requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
  cancelIdleCallback?: (id: number) => void
}

export default function BeeFlight() {
  useEffect(() => {
    let stop: (() => void) | undefined
    let cancelled = false
    const w = window as IdleWindow

    const begin = () => {
      import('./beeFlightEngine')
        .then((m) => {
          if (!cancelled) stop = m.startBeeFlight()
        })
        .catch(() => {
          /* The still bee stays; nothing else depends on the flight. */
        })
    }

    let idleId = 0
    let timer = 0
    if (w.requestIdleCallback) idleId = w.requestIdleCallback(begin, { timeout: 1500 })
    else timer = window.setTimeout(begin, 200)

    return () => {
      cancelled = true
      if (idleId && w.cancelIdleCallback) w.cancelIdleCallback(idleId)
      if (timer) window.clearTimeout(timer)
      if (stop) stop()
    }
  }, [])

  return null
}
