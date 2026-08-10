'use client'

import { useRef } from 'react'
import ParticleField from '@/components/ParticleField'

/**
 * The closing ground: one continuous Miami skyline particle field behind the CTA
 * and the footer together, not a band that stops at the CTA's bottom edge. The
 * field is pointer-reactive across the whole block and fades to black at the
 * tops of the buildings.
 *
 * Freedom Tower, Miami Tower and 1000 Museum are drawn as real silhouettes among
 * generic filler towers. Job: close on the city instead of on flat black.
 *
 * Children (the CTA and the footer) are passed in so they stay server-rendered;
 * only the canvas and its pointer wiring are client-side.
 */
export default function ClosingBlock({ children }: { children: React.ReactNode }) {
  const blockRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={blockRef} className="closing-block">
      <ParticleField
        variant="skyline"
        eventTargetRef={blockRef}
        className="skyline-wrap"
        fallbackClassName="skyline-fallback"
      />
      {children}
    </div>
  )
}
