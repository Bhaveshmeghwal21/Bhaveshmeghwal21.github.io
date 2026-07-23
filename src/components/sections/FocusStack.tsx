'use client'

import { useEffect, useRef } from 'react'
import { site } from '@/content/site.mjs'
import { ensureGsapPlugins, gsap, prefersReducedMotion } from '@/lib/motion'

/**
 * Pinned-label section: the heading sticks in place (plain CSS position:sticky,
 * not a GSAP pin — cheap and perfectly in sync) while a stack of real focus
 * areas brightens one at a time as it crosses the read line. This is the
 * "static label, advancing content" pattern from lenis.dev's own site — a
 * different mechanic from the horizontal gallery or the tilt cards, not just
 * another variation on them.
 */
export default function FocusStack() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root || prefersReducedMotion()) return

    ensureGsapPlugins()
    const items = gsap.utils.toArray<HTMLElement>('[data-focus-item]', root)
    const tweens = items.map((item) =>
      gsap.fromTo(
        item,
        { opacity: 0.16 },
        {
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: item,
            start: 'top 72%',
            end: 'top 40%',
            scrub: 0.4,
          },
        }
      )
    )

    return () => {
      tweens.forEach((tween) => {
        tween.scrollTrigger?.kill()
        tween.kill()
      })
    }
  }, [])

  return (
    <section ref={rootRef} className="section-container">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <div className="eyebrow">Where it goes</div>
          <h2 className="mt-4 font-display text-4xl leading-[0.95] text-zinc-50 md:text-5xl">
            Time spent, mostly here
          </h2>
          <p className="mt-4 max-w-xs text-sm leading-7 text-zinc-400">
            The technical surface area behind the work above.
          </p>
        </div>

        <div className="border-t border-white/10">
          {site.focusAreas.map((item, index) => (
            <div
              key={item}
              data-focus-item
              className="flex items-baseline gap-5 border-b border-white/10 py-8 md:py-10"
            >
              <span className="font-mono text-xs text-zinc-600">
                {String(index + 1).padStart(2, '0')}
              </span>
              <p className="font-display text-xl leading-snug text-zinc-100 md:text-2xl">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
