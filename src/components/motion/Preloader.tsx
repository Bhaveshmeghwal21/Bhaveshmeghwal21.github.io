'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap, prefersReducedMotion } from '@/lib/motion'
import { markPreloaderDone } from '@/lib/preloader'

const SESSION_KEY = 'bm-preflight-done'
const STATUS_LINES = ['LINK ESTABLISHED', 'SENSORS NOMINAL', 'MOTORS ARMED', 'CLEARED FOR TAKEOFF']

/**
 * One-time-per-session "preflight check" boot screen: a percentage counter,
 * cycling status lines, and a progress bar, then the whole curtain lifts.
 * Signals completion through markPreloaderDone() so the hero can start its
 * entrance right as the curtain clears.
 */
export default function Preloader() {
  const [active, setActive] = useState(true)
  const rootRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLDivElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const alreadyRan = sessionStorage.getItem(SESSION_KEY) === '1'
    if (alreadyRan || prefersReducedMotion()) {
      setActive(false)
      markPreloaderDone()
      return
    }

    const root = rootRef.current
    const counter = counterRef.current
    const status = statusRef.current
    const bar = barRef.current
    if (!root || !counter || !status || !bar) {
      setActive(false)
      markPreloaderDone()
      return
    }

    const progress = { value: 0 }
    let lastLine = -1

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem(SESSION_KEY, '1')
        markPreloaderDone()
        setActive(false)
      },
    })

    tl.to(progress, {
      value: 100,
      duration: 1.5,
      ease: 'power2.inOut',
      onUpdate: () => {
        const v = Math.round(progress.value)
        counter.textContent = String(v).padStart(3, '0')
        bar.style.transform = `scaleX(${progress.value / 100})`
        const line = Math.min(STATUS_LINES.length - 1, Math.floor((v / 100) * STATUS_LINES.length))
        if (line !== lastLine) {
          lastLine = line
          status.textContent = STATUS_LINES[line]
        }
      },
    })
    tl.to(root, { yPercent: -100, duration: 0.75, ease: 'power4.inOut' }, '+=0.15')

    return () => {
      tl.kill()
      markPreloaderDone()
    }
  }, [])

  if (!active) return null

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#09090b]"
      aria-hidden
    >
      <div className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-500">
        Preflight check
      </div>
      <div
        ref={counterRef}
        className="mt-4 font-display text-7xl font-semibold tracking-tight text-zinc-50"
      >
        000
      </div>
      <div className="mt-6 h-px w-44 overflow-hidden bg-white/10">
        <div
          ref={barRef}
          className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-accent-400 to-ember-400"
        />
      </div>
      <div
        ref={statusRef}
        className="mt-4 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-accent-300"
      >
        &nbsp;
      </div>
    </div>
  )
}
