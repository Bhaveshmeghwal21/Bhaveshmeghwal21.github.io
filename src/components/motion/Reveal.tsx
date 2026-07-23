'use client'

import { ReactNode, useEffect, useRef } from 'react'
import { ensureGsapPlugins, gsap, ScrollTrigger } from '@/lib/motion'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  /** Ties opacity/position directly to scroll progress instead of firing once. */
  scrub?: boolean
}

/**
 * Scroll-triggered reveal, now driven by GSAP ScrollTrigger (synced to the
 * shared Lenis scroller in SmoothScroll) instead of a plain IntersectionObserver,
 * so timing lines up exactly with the rest of the scroll-linked motion system.
 */
export default function Reveal({ children, className = '', delay = 0, y = 28, scrub = false }: RevealProps) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = rootRef.current
    if (!node) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(node, { opacity: 1, y: 0 })
      return
    }

    ensureGsapPlugins()
    gsap.set(node, { opacity: 0, y })

    const tween = gsap.to(node, {
      opacity: 1,
      y: 0,
      delay: scrub ? 0 : delay,
      duration: scrub ? 1 : 0.8,
      ease: 'power3.out',
      scrollTrigger: scrub
        ? { trigger: node, start: 'top 88%', end: 'top 55%', scrub: 0.6 }
        : { trigger: node, start: 'top 88%', once: true },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [delay, y, scrub])

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  )
}
