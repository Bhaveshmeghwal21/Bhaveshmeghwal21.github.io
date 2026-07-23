'use client'

import { useEffect, useRef } from 'react'
import { FiArrowDown, FiArrowRight, FiDownload } from 'react-icons/fi'
import { site } from '@/content/site.mjs'
import Drone from '@/components/motion/Drone'
import Magnetic from '@/components/ui/Magnetic'
import { ensureGsapPlugins, gsap, SplitText, prefersReducedMotion } from '@/lib/motion'
import { whenPreloaderDone } from '@/lib/preloader'
import { smoothScrollTo } from '@/lib/scroll'

const NAME_LINES = ['BHAVESH', 'MEGHWAL']

/**
 * Full-viewport hero: the name lands character by character out of clip masks
 * once the preloader lifts, the drone hovers with mouse parallax, and the
 * whole composition scrubs apart as you scroll away — the two name lines
 * drift in opposite directions while the drone flies off the top edge.
 */
export default function HomeHero() {
  const rootRef = useRef<HTMLElement>(null)
  const droneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    if (prefersReducedMotion()) {
      gsap.set(root.querySelectorAll('[data-hero-fade]'), { opacity: 1 })
      return
    }

    ensureGsapPlugins()

    const splits: InstanceType<typeof SplitText>[] = []
    let cancelled = false

    const ctx = gsap.context(() => {
      gsap.set('[data-hero-fade]', { opacity: 0, y: 26 })

      // Scroll-out choreography: name lines shear apart, drone flies off.
      const scrollOut = { trigger: root, start: 'top top', end: 'bottom top', scrub: 0.6 }
      gsap.to('[data-hero-line="0"]', { xPercent: -7, opacity: 0.25, ease: 'none', scrollTrigger: scrollOut })
      gsap.to('[data-hero-line="1"]', { xPercent: 7, opacity: 0.25, ease: 'none', scrollTrigger: scrollOut })
      if (droneRef.current) {
        gsap.to(droneRef.current, {
          x: 170,
          y: -320,
          rotation: 12,
          opacity: 0,
          ease: 'power1.in',
          scrollTrigger: scrollOut,
        })
      }
    }, root)

    // Entrance plays once fonts are ready and the preloader curtain has lifted.
    Promise.all([document.fonts.ready, whenPreloaderDone()]).then(() => {
      if (cancelled) return

      ctx.add(() => {
        const lines = gsap.utils.toArray<HTMLElement>('[data-hero-line]', root)
        lines.forEach((line, i) => {
          const split = SplitText.create(line, { type: 'chars', mask: 'chars' })
          splits.push(split)
          gsap.from(split.chars, {
            yPercent: 110,
            duration: 1.05,
            ease: 'power4.out',
            stagger: 0.035,
            delay: 0.1 + i * 0.14,
          })
        })

        gsap.to('[data-hero-fade]', {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.09,
          delay: 0.55,
        })
      })
    })

    // Mouse parallax on the drone (outside the context: cleaned up manually).
    const droneInner = droneRef.current?.firstElementChild ?? null
    let onMove: ((e: MouseEvent) => void) | null = null
    if (droneInner) {
      const xTo = gsap.quickTo(droneInner, 'x', { duration: 0.7, ease: 'power3.out' })
      const yTo = gsap.quickTo(droneInner, 'y', { duration: 0.7, ease: 'power3.out' })
      onMove = (e: MouseEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5
        const ny = e.clientY / window.innerHeight - 0.5
        xTo(nx * 34)
        yTo(ny * 26)
      }
      window.addEventListener('mousemove', onMove)
    }

    return () => {
      cancelled = true
      if (onMove) window.removeEventListener('mousemove', onMove)
      if (droneInner) gsap.killTweensOf(droneInner)
      splits.forEach((split) => split.revert())
      ctx.revert()
    }
  }, [])

  return (
    <section
      ref={rootRef}
      className="hud-grid relative flex min-h-[100svh] flex-col justify-center overflow-hidden"
    >
      <div className="mx-auto w-full max-w-6xl px-4 pt-24 md:px-6">
        <div data-hero-fade className="eyebrow">
          Aerial robotics · AI products · IIT (BHU)
        </div>

        <h1 className="mt-6 font-display font-bold uppercase leading-[0.88] tracking-[-0.04em] text-zinc-50">
          {NAME_LINES.map((line, i) => (
            <span
              key={line}
              data-hero-line={i}
              className="block text-[clamp(3.6rem,14vw,12rem)] will-change-transform"
            >
              {line}
            </span>
          ))}
        </h1>

        <div className="mt-8 grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <p data-hero-fade className="max-w-xl text-base leading-8 text-zinc-300 md:text-lg">
            {site.heroIntro}
          </p>

          <div data-hero-fade className="flex flex-wrap items-center gap-3">
            <Magnetic strength={0.3}>
              <a
                href="#work"
                data-cursor
                className="button-primary"
                onClick={(e) => {
                  e.preventDefault()
                  smoothScrollTo('#work', 0)
                }}
              >
                Selected work
                <FiArrowRight />
              </a>
            </Magnetic>
            <Magnetic strength={0.3}>
              <a
                href={site.resumeGeneral}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor
                className="button-secondary"
              >
                Resume
                <FiDownload />
              </a>
            </Magnetic>
          </div>
        </div>

        <div
          data-hero-fade
          className="mt-12 flex flex-wrap gap-x-10 gap-y-3 border-t border-white/10 pt-6"
        >
          {site.heroHighlights.map((item) => (
            <div key={item.label} className="flex items-baseline gap-3 text-sm">
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-500">
                {item.label}
              </span>
              <span className="text-zinc-200">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Drone: hovers top-right, parallaxes with the mouse, flies off on scroll */}
      <div
        ref={droneRef}
        className="pointer-events-none absolute right-[4%] top-[12%] hidden w-[16rem] md:block lg:w-[19rem]"
        aria-hidden
      >
        <div>
          <Drone bob className="h-auto w-full" />
        </div>
      </div>

      {/* Scroll cue */}
      <div
        data-hero-fade
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-zinc-500">
          Scroll to fly
        </span>
        <FiArrowDown className="animate-bounce text-accent-400" />
      </div>
    </section>
  )
}
