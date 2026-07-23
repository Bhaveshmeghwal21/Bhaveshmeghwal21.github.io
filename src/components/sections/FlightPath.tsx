'use client'

import { useEffect, useRef } from 'react'
import Drone from '@/components/motion/Drone'
import TiltCard from '@/components/motion/TiltCard'
import { site } from '@/content/site.mjs'
import { ensureGsapPlugins, gsap, prefersReducedMotion } from '@/lib/motion'

/** Waypoint card anchor positions (percent of the pinned viewport) — one per quadrant with generous margins so cards never collide. */
const WAYPOINT_POSITIONS = [
  { x: '14%', y: '6%' },
  { x: '58%', y: '20%' },
  { x: '18%', y: '60%' },
  { x: '66%', y: '76%' },
]

/** Timeline progress marks at which each waypoint activates. */
const WAYPOINT_MARKS = [0.14, 0.38, 0.6, 0.82]

/**
 * The signature scroll section: the viewport pins for ~2.8 screens while a
 * dashed flight path draws itself across the screen and the drone flies along
 * it (MotionPathPlugin, auto-rotating into turns). As the drone passes each
 * waypoint, that milestone card scales in. On mobile the pin is dropped and
 * the waypoints become a simple vertical reveal list.
 */
export default function FlightPath() {
  const rootRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const droneRef = useRef<HTMLDivElement>(null)
  const droneStageRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const root = rootRef.current
    const stage = stageRef.current
    const path = pathRef.current
    const drone = droneRef.current
    if (!root || !stage || !path || !drone) return

    if (prefersReducedMotion()) {
      gsap.set(root.querySelectorAll('[data-waypoint]'), { opacity: 1 })
      return
    }

    ensureGsapPlugins()
    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px)', () => {
      const length = path.getTotalLength()
      gsap.set(path, { strokeDasharray: `${length}`, strokeDashoffset: length })
      gsap.set(drone, { opacity: 0 })

      // Bank into turns and pitch with climb/descent: sample the path's
      // tangent a hair ahead of the current point on every scroll update and
      // drive the drone's own preserve-3d stage (rotateY/X) — real 3D layered
      // on top of the 2D motion-path travel, no WebGL required.
      let prevHeading: number | null = null
      const applyBank = (progress: number) => {
        const stageEl = droneStageRef.current
        if (!stageEl) return
        const p2 = Math.min(1, progress + 0.008)
        const a = path.getPointAtLength(length * progress)
        const b = path.getPointAtLength(length * p2)
        const dx = b.x - a.x
        const dy = b.y - a.y
        const heading = Math.atan2(dy, dx)
        if (prevHeading === null) prevHeading = heading
        let dh = heading - prevHeading
        if (dh > Math.PI) dh -= Math.PI * 2
        if (dh < -Math.PI) dh += Math.PI * 2
        prevHeading = heading
        const bank = gsap.utils.clamp(-24, 24, dh * 300)
        const pitch = gsap.utils.clamp(-14, 14, -dy * 0.9)
        gsap.set(stageEl, { rotateY: bank, rotateX: pitch })
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: '+=280%',
          pin: true,
          scrub: 0.7,
          anticipatePin: 1,
          onUpdate: (self) => applyBank(self.progress),
        },
      })

      tl.to(path, { strokeDashoffset: 0, ease: 'none', duration: 1 }, 0)
      tl.to(drone, { opacity: 1, duration: 0.03 }, 0)
      tl.to(
        drone,
        {
          motionPath: {
            path,
            align: path,
            alignOrigin: [0.5, 0.5],
            autoRotate: 90,
          },
          ease: 'none',
          duration: 1,
        },
        0
      )

      const waypoints = gsap.utils.toArray<HTMLElement>('[data-waypoint]', root)
      waypoints.forEach((wp, i) => {
        tl.fromTo(
          wp,
          { opacity: 0, y: 24, scale: 0.92 },
          { opacity: 1, y: 0, scale: 1, duration: 0.07, ease: 'power2.out' },
          WAYPOINT_MARKS[i] ?? 0.5
        )
      })
    })

    mm.add('(max-width: 767px)', () => {
      const waypoints = gsap.utils.toArray<HTMLElement>('[data-waypoint]', root)
      waypoints.forEach((wp) => {
        gsap.fromTo(
          wp,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: { trigger: wp, start: 'top 88%', once: true },
          }
        )
      })
    })

    return () => mm.revert()
  }, [])

  return (
    <section ref={rootRef} className="hud-grid relative overflow-hidden">
      <div ref={stageRef} className="relative flex flex-col md:h-screen md:justify-center">
        <div className="mx-auto w-full max-w-6xl px-4 pt-16 md:px-6 md:pt-24">
          <div className="eyebrow">01 / Flight log</div>
          <h2 className="section-title max-w-3xl text-[clamp(2.25rem,4.5vw,4.5rem)]">
            The route so far
          </h2>
        </div>

        {/* Flight path + drone (desktop only). Starts below the heading block
            so the curve never crosses the text — it used to run straight
            through "The route so far". */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 top-48 hidden md:top-64 md:block"
          aria-hidden
        >
          <svg
            className="h-full w-full"
            viewBox="0 0 1440 760"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d="M -40 140 C 260 40, 430 320, 720 360 C 950 392, 990 130, 1180 160 C 1330 185, 1400 460, 1490 600"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="2"
            />
            <path
              ref={pathRef}
              d="M -40 140 C 260 40, 430 320, 720 360 C 950 392, 990 130, 1180 160 C 1330 185, 1400 460, 1490 600"
              stroke="url(#flight-gradient)"
              strokeWidth="2"
              strokeDasharray="8 10"
            />
            <defs>
              <linearGradient id="flight-gradient" x1="0%" x2="100%" y1="0%" y2="0%">
                <stop offset="0%" stopColor="rgba(255,90,51,0.9)" />
                <stop offset="55%" stopColor="rgba(255,138,40,0.85)" />
                <stop offset="100%" stopColor="rgba(255,176,32,0.9)" />
              </linearGradient>
            </defs>
          </svg>

          <div ref={droneRef} className="absolute left-0 top-0 w-24 opacity-0 lg:w-28">
            <Drone stageRef={droneStageRef} className="h-auto w-full" />
          </div>
        </div>

        {/* Waypoint cards */}
        <div className="relative mx-auto mt-8 w-full max-w-6xl space-y-4 px-4 pb-16 md:mt-0 md:h-[68vh] md:space-y-0 md:px-6 md:pb-0">
          {site.flightLog.map((wp, i) => (
            <TiltCard
              key={wp.code}
              max={7}
              style={
                {
                  '--wp-x': WAYPOINT_POSITIONS[i]?.x,
                  '--wp-y': WAYPOINT_POSITIONS[i]?.y,
                } as React.CSSProperties
              }
              className="max-w-xs md:absolute md:left-[var(--wp-x)] md:top-[var(--wp-y)] md:w-64 md:-translate-x-1/2"
            >
              <article data-waypoint className="surface p-5 opacity-0">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-accent-400">
                    {wp.code}
                  </span>
                  <span className="h-px flex-1 bg-gradient-to-r from-accent-400/50 to-transparent" />
                </div>
                <h3 className="mt-3 font-display text-lg text-zinc-50">{wp.title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-400">{wp.detail}</p>
              </article>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}
