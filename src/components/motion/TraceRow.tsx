'use client'

import { ReactNode, useEffect, useRef } from 'react'
import { ensureGsapPlugins, gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/motion'

type TraceRowProps = {
  index: number
  children: ReactNode
  className?: string
}

/**
 * Shared row shell for every project/writing list (home, /projects, /blog):
 * the neutral bottom divider gets "traced in" left-to-right with a warm
 * gradient as the row enters view, and the whole row gets a tactile lift +
 * accent tint on hover. Keeps the animated-divider logic in one place
 * instead of duplicated across four listing pages.
 */
export default function TraceRow({ index, children, className = '' }: TraceRowProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    const line = lineRef.current
    if (!root || !line) return

    if (prefersReducedMotion()) {
      gsap.set(line, { scaleX: 1 })
      return
    }

    ensureGsapPlugins()
    gsap.set(line, { scaleX: 0, transformOrigin: 'left center' })

    const tween = gsap.to(line, {
      scaleX: 1,
      duration: 1,
      ease: 'power2.out',
      delay: Math.min(index * 0.05, 0.4),
      scrollTrigger: { trigger: root, start: 'top 92%', once: true },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [index])

  return (
    <div
      ref={rootRef}
      className={`group relative border-b border-white/10 py-6 transition-[background-color,transform] duration-500 hover:-translate-y-[1px] hover:bg-accent/[0.04] ${className}`}
    >
      <div
        ref={lineRef}
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-accent-400 via-accent-400 to-ember-400"
      />
      {children}
    </div>
  )
}
