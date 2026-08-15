'use client'

import { MotionConfig } from 'framer-motion'
import type { ReactNode } from 'react'

/**
 * Sitewide framer-motion configuration.
 *
 * Before this, nothing in the codebase honoured `prefers-reduced-motion` except
 * ParticleField, which checks the media query itself. Every framer-motion
 * component (Nav, Industries, TheApproach, HowWeWork, About, WhatWeRun,
 * CTASection, LandingPageTemplate) still ran its full slide and travel for a
 * visitor who had asked the OS for less movement.
 *
 * `reducedMotion="user"` defers to that OS setting: framer drops transform,
 * scale and rotate animations and snaps those elements to their end state,
 * while opacity and colour transitions still run. That is the right line to
 * draw. WCAG 2.3.3 is about motion, and a cross-fade is not motion, so the
 * pages keep their character instead of going flat.
 *
 * This is a client boundary wrapping server-rendered children, so pages below
 * it stay server components.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
