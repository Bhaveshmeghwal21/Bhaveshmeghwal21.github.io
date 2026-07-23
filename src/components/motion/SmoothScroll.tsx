'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { ensureGsapPlugins, gsap, ScrollTrigger } from '@/lib/motion'
import { setLenisInstance } from '@/lib/scroll'

/**
 * Drives the whole site's scroll feel:
 * - Lenis smooths raw wheel/touch input with an exponential ease-out, so
 *   momentum decays naturally instead of snapping to a stop.
 * - Lenis is ticked from gsap.ticker (not a raw rAF loop) so every
 *   ScrollTrigger-based animation stays perfectly in sync with zero drift.
 * - Live scroll velocity is written to --scroll-velocity every frame, which
 *   `.velocity-skew` (globals.css) reads to give scrolling elements a subtle
 *   directional tilt that relaxes back to 0 the instant motion settles.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    ensureGsapPlugins()

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => 1 - Math.pow(2, -10 * t),
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 1.1,
    })

    setLenisInstance(lenis)
    document.documentElement.classList.add('lenis')

    let smoothedVelocity = 0

    const onTick = (time: number) => {
      lenis.raf(time * 1000)

      const rawVelocity = gsap.utils.clamp(-3.5, 3.5, lenis.velocity * 0.32)
      smoothedVelocity += (rawVelocity - smoothedVelocity) * 0.14
      document.documentElement.style.setProperty(
        '--scroll-velocity',
        Math.abs(smoothedVelocity) < 0.01 ? '0' : smoothedVelocity.toFixed(3)
      )
    }

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

    const refresh = requestAnimationFrame(() => ScrollTrigger.refresh())
    // Re-measure pinned sections once web fonts land (text metrics shift).
    let fontsSettled = false
    document.fonts.ready.then(() => {
      if (!fontsSettled) ScrollTrigger.refresh()
    })

    return () => {
      fontsSettled = true
      cancelAnimationFrame(refresh)
      gsap.ticker.remove(onTick)
      lenis.destroy()
      setLenisInstance(null)
      document.documentElement.classList.remove('lenis')
      document.documentElement.style.removeProperty('--scroll-velocity')
    }
  }, [])

  return null
}
