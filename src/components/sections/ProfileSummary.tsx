'use client'

import { useEffect, useRef } from 'react'
import Reveal from '@/components/motion/Reveal'
import KineticHeading from '@/components/motion/KineticHeading'
import { site } from '@/content/site.mjs'
import { ensureGsapPlugins, gsap, prefersReducedMotion } from '@/lib/motion'

export default function ProfileSummary() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = timelineRef.current
    const line = lineRef.current
    if (!container || !line || prefersReducedMotion()) return

    ensureGsapPlugins()
    gsap.set(line, { scaleY: 0, transformOrigin: 'top center' })

    const tween = gsap.to(line, {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top 75%',
        end: 'bottom 65%',
        scrub: 0.6,
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  return (
    <section id="about" className="section-container">
      <div className="grid gap-10 lg:grid-cols-[18rem_minmax(0,1fr)]">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <div className="space-y-4 border-l border-white/10 pl-4 text-sm leading-7 text-zinc-300">
            <div className="font-mono text-xs uppercase tracking-[0.14em] text-zinc-500">
              Based in
            </div>
            <p>{site.location}</p>
            <div className="font-mono text-xs uppercase tracking-[0.14em] text-zinc-500">
              Education
            </div>
            <p>{site.graduation}</p>
            <div className="font-mono text-xs uppercase tracking-[0.14em] text-zinc-500">
              Contact
            </div>
            <a href={`mailto:${site.email}`} className="block text-accent-300 hover:text-ember-300">
              {site.email}
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="eyebrow">About</div>
          <KineticHeading
            as="h2"
            className="mt-5 max-w-4xl font-display text-4xl leading-tight text-zinc-50 md:text-5xl"
          >
            Drones sit at the center. Control, software, and product work build out from there.
          </KineticHeading>
          <div className="mt-6 max-w-4xl space-y-5 text-base leading-8 text-zinc-300">
            {site.aboutParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-10 grid gap-10 md:grid-cols-2">
            <div>
              <h3 className="font-display text-2xl text-zinc-50">Focus</h3>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-zinc-300">
                {site.focusAreas.map((item) => (
                  <li key={item} className="border-b border-white/8 pb-3">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-display text-2xl text-zinc-50">Experience</h3>
              <div ref={timelineRef} className="relative mt-4 space-y-5 pl-5">
                <div className="absolute left-0 top-0 h-full w-px bg-white/10" aria-hidden />
                <div
                  ref={lineRef}
                  className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-accent-400 via-accent-400 to-ember-400"
                  aria-hidden
                />
                {site.timeline.map((item) => (
                  <article key={item.title}>
                    <div className="font-display text-xl text-zinc-50">{item.title}</div>
                    <div className="mt-1 text-sm text-accent-300">{item.org}</div>
                    <div className="mt-2 text-sm uppercase tracking-[0.14em] text-zinc-500">
                      {item.period}
                    </div>
                    <p className="mt-3 text-sm leading-7 text-zinc-400">{item.summary}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal className="mt-14 border-t border-white/10 pt-8" delay={0.12}>
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {site.skillGroups.map((group) => (
            <div key={group.title}>
              <h3 className="font-display text-xl text-zinc-50">{group.title}</h3>
              <ul className="mt-4 space-y-2 text-sm leading-7 text-zinc-400">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
