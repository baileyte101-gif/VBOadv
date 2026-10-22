'use client'

import { useEffect, useRef, useState } from 'react'

// Mary's labels for the control (copy.md section 7): the button names what it
// will do next.
const PAUSE = 'Pause'
const PLAY = 'Play'

/**
 * A social post that plays as video (pairs B and C "after", 10/13 step 17b).
 *
 * Tim: "Make the second and third ones actual videos that run automatically on
 * the page." So: muted, looping, inline, no sound track at all in the file.
 *
 * - Starts on its own, but only while it is on screen (IntersectionObserver),
 *   and pauses again when it scrolls away. Started by script, not by the
 *   autoplay attribute, so nothing plays off screen or before the visitor's
 *   motion setting has been read.
 * - Never starts on its own for a visitor who has asked for reduced motion:
 *   the poster (the first frame that plays) stays, and the button offers Play.
 * - WCAG 2.2.2 (Pause, Stop, Hide): it moves for more than five seconds, so a
 *   real button pauses and plays it, with "Pause" and "Play" as its name. The
 *   visitor's choice then wins: a paused video stays paused when it comes
 *   back on screen; one they started plays whenever it is on screen.
 * - The video's accessible name is Mary's label (her alt column for the row);
 *   the figure's caption sits under it as on every other post.
 * - If the browser refuses to play (Low Power Mode on an iPhone, say), the
 *   poster stays and the button says Play.
 */
export default function PostVideo({
  src,
  poster,
  width,
  height,
  label,
}: {
  src: string
  poster: string
  width: number
  height: number
  label: string
}) {
  const ref = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  // null until the visitor presses the button; their choice then wins
  const choice = useRef<'play' | 'pause' | null>(null)
  const onScreen = useRef(false)
  const motionOK = useRef(false)
  const sync = useRef<() => void>(() => {})

  useEffect(() => {
    const v = ref.current
    if (!v) return
    // React sets muted as a property; set both so every browser treats the
    // element as muted before any play() call.
    v.muted = true
    v.defaultMuted = true
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    motionOK.current = !mq.matches

    sync.current = () => {
      const wanted = choice.current ? choice.current === 'play' : motionOK.current
      if (onScreen.current && wanted) {
        if (v.paused) v.play().catch(() => setPlaying(false))
      } else if (!v.paused) {
        v.pause()
      }
    }

    const io = new IntersectionObserver(([entry]) => {
      onScreen.current = entry.isIntersecting
      sync.current()
    })
    io.observe(v)
    const onMotion = () => {
      motionOK.current = !mq.matches
      sync.current()
    }
    mq.addEventListener('change', onMotion)
    const onPlaying = () => setPlaying(true)
    const onPaused = () => setPlaying(false)
    v.addEventListener('play', onPlaying)
    v.addEventListener('pause', onPaused)
    return () => {
      io.disconnect()
      mq.removeEventListener('change', onMotion)
      v.removeEventListener('play', onPlaying)
      v.removeEventListener('pause', onPaused)
    }
  }, [])

  const toggle = () => {
    choice.current = playing ? 'pause' : 'play'
    sync.current()
  }

  return (
    <>
      <video
        ref={ref}
        aria-label={label}
        poster={poster}
        width={width}
        height={height}
        muted
        loop
        playsInline
        preload="none"
      >
        <source src={src} type="video/mp4" />
      </video>
      <button type="button" className="vw-video-toggle" aria-label={playing ? PAUSE : PLAY} onClick={toggle}>
        {playing ? (
          <svg viewBox="0 0 14 14" aria-hidden>
            <rect x="2.5" y="1.5" width="3" height="11" fill="currentColor" />
            <rect x="8.5" y="1.5" width="3" height="11" fill="currentColor" />
          </svg>
        ) : (
          <svg viewBox="0 0 14 14" aria-hidden>
            <path d="M3.5 1.5 12.5 7l-9 5.5z" fill="currentColor" />
          </svg>
        )}
      </button>
    </>
  )
}
