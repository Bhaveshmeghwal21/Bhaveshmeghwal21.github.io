'use client'

import { useEffect, useRef } from 'react'
import { ensureGsapPlugins, ScrollTrigger, prefersReducedMotion } from '@/lib/motion'

const MAX_ALT_FT = 400 // legal drone ceiling — the page "climbs" to it

/**
 * Fixed altimeter readout (bottom-left, desktop only): scroll progress maps
 * to 0–400 ft with a small vertical gauge, like a drone climbing to ceiling.
 */
export default function AltitudeHUD() {
  const valueRef = useRef<HTMLSpanElement>(null)
  const gaugeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    ensureGsapPlugins()

    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        if (valueRef.current) {
          valueRef.current.textContent = String(Math.round(self.progress * MAX_ALT_FT)).padStart(3, '0')
        }
        if (gaugeRef.current) {
          gaugeRef.current.style.transform = `scaleY(${self.progress})`
        }
      },
    })

    return () => st.kill()
  }, [])

  return (
    <div
      className="pointer-events-none fixed bottom-6 left-6 z-40 hidden items-end gap-3 lg:flex"
      aria-hidden
    >
      <div className="h-16 w-px overflow-hidden bg-white/10">
        <div
          ref={gaugeRef}
          className="h-full w-full origin-bottom scale-y-0 bg-gradient-to-t from-accent-400 to-ember-400"
        />
      </div>
      <div className="font-mono text-[0.65rem] uppercase leading-relaxed tracking-[0.2em] text-zinc-500">
        <div>ALT</div>
        <div className="text-zinc-200">
          <span ref={valueRef}>000</span> FT
        </div>
      </div>
    </div>
  )
}
