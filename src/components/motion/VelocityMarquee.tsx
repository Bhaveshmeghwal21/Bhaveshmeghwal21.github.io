'use client'

import { useEffect, useRef } from 'react'
import { ensureGsapPlugins, gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/motion'

type VelocityMarqueeProps = {
  items: string[]
  /** 1 scrolls left, -1 scrolls right. */
  direction?: 1 | -1
  className?: string
  /** Seconds for one full loop at rest. */
  duration?: number
  outline?: boolean
}

/**
 * Infinite marquee whose playback speed reacts to scroll velocity: flick the
 * page and the strip whips along with it, then eases back to cruise speed.
 */
export default function VelocityMarquee({
  items,
  direction = 1,
  className = '',
  duration = 26,
  outline = false,
}: VelocityMarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track || prefersReducedMotion()) return

    ensureGsapPlugins()

    const tween = gsap.fromTo(
      track,
      { xPercent: direction === 1 ? 0 : -50 },
      { xPercent: direction === 1 ? -50 : 0, ease: 'none', duration, repeat: -1 }
    )

    const speed = { value: 1 }
    const applySpeed = () => tween.timeScale(speed.value)

    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        const target = gsap.utils.clamp(1, 6, 1 + Math.abs(self.getVelocity()) / 700)
        gsap.to(speed, {
          value: target,
          duration: 0.2,
          ease: 'power1.out',
          overwrite: true,
          onUpdate: applySpeed,
          onComplete: () =>
            gsap.to(speed, {
              value: 1,
              duration: 1.4,
              ease: 'power2.out',
              onUpdate: applySpeed,
            }),
        })
      },
    })

    return () => {
      st.kill()
      gsap.killTweensOf(speed)
      tween.kill()
    }
  }, [direction, duration])

  const doubled = [...items, ...items]

  return (
    <div className={`overflow-hidden ${className}`} aria-hidden>
      <div ref={trackRef} className="marquee-row items-center gap-8 pr-8">
        {doubled.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center gap-8">
            <span
              className={`font-display text-4xl font-bold uppercase tracking-tight md:text-6xl ${
                outline ? 'text-outline' : 'text-zinc-100/90'
              }`}
            >
              {item}
            </span>
            <span className="h-2 w-2 rotate-45 bg-gradient-to-br from-accent-400 to-ember-400" />
          </span>
        ))}
      </div>
    </div>
  )
}
