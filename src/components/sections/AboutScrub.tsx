'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Reveal from '@/components/motion/Reveal'
import VelocityMarquee from '@/components/motion/VelocityMarquee'
import { site } from '@/content/site.mjs'
import { ensureGsapPlugins, gsap, SplitText, prefersReducedMotion } from '@/lib/motion'

const FLIGHT_STACK = ['PX4', 'ROS 2', 'Gazebo', 'C++', 'EKF2', 'QGroundControl', 'OpenCV', 'MAVROS']
const PRODUCT_STACK = ['Next.js', 'TypeScript', 'FastAPI', 'Three.js', 'Qt / QML', 'Redis', 'PostGIS', 'Azure OpenAI']

/**
 * About block with the classic scroll-scrub text effect: every word starts
 * dimmed and brightens to full as it crosses the reading band, so the copy
 * "reads itself" while you scroll. Below it, two velocity-reactive marquee
 * strips carry the stack, then the experience timeline draws itself in.
 */
export default function AboutScrub() {
  const rootRef = useRef<HTMLElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root || prefersReducedMotion()) return

    ensureGsapPlugins()

    const splits: InstanceType<typeof SplitText>[] = []
    const tweens: gsap.core.Tween[] = []
    let cancelled = false

    document.fonts.ready.then(() => {
      if (cancelled) return
      const paras = gsap.utils.toArray<HTMLElement>('[data-scrub-text]', root)
      paras.forEach((p) => {
        const split = SplitText.create(p, { type: 'words' })
        splits.push(split)
        tweens.push(
          gsap.fromTo(
            split.words,
            { opacity: 0.13 },
            {
              opacity: 1,
              ease: 'none',
              stagger: 0.04,
              scrollTrigger: {
                trigger: p,
                start: 'top 80%',
                end: 'bottom 45%',
                scrub: 0.4,
              },
            }
          )
        )
      })
    })

    // Timeline line draws downward with scroll.
    if (timelineRef.current && lineRef.current) {
      gsap.set(lineRef.current, { scaleY: 0, transformOrigin: 'top center' })
      tweens.push(
        gsap.to(lineRef.current, {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 75%',
            end: 'bottom 60%',
            scrub: 0.6,
          },
        })
      )
    }

    return () => {
      cancelled = true
      tweens.forEach((tween) => {
        tween.scrollTrigger?.kill()
        tween.kill()
      })
      splits.forEach((split) => split.revert())
    }
  }, [])

  return (
    <section id="about" ref={rootRef}>
      <div className="section-container">
        <Reveal>
          <div className="eyebrow">03 / About</div>
        </Reveal>

        <div className="mt-10 grid gap-12 lg:grid-cols-[19rem_minmax(0,1fr)]">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <div className="surface velocity-skew p-3">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[0.95rem]">
                <Image
                  src={site.profileImage}
                  alt="Bhavesh Meghwal"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 19rem"
                />
              </div>
            </div>
            <div className="mt-5 space-y-4 border-l border-white/10 pl-4 text-sm leading-7 text-zinc-300">
              <div>
                <div className="font-mono text-xs uppercase tracking-[0.14em] text-zinc-500">
                  Based in
                </div>
                <p>{site.location}</p>
              </div>
              <div>
                <div className="font-mono text-xs uppercase tracking-[0.14em] text-zinc-500">
                  Education
                </div>
                <p>{site.graduation}</p>
              </div>
              <div>
                <div className="font-mono text-xs uppercase tracking-[0.14em] text-zinc-500">
                  Contact
                </div>
                <a
                  href={`mailto:${site.email}`}
                  data-cursor
                  className="text-accent-300 hover:text-ember-300"
                >
                  {site.email}
                </a>
              </div>
            </div>
          </Reveal>

          <div>
            {site.aboutParagraphs.map((paragraph) => (
              <p
                key={paragraph}
                data-scrub-text
                className="mb-8 font-display text-2xl leading-snug text-zinc-100 md:text-[2.1rem] md:leading-[1.35]"
              >
                {paragraph}
              </p>
            ))}

            <Reveal className="mt-10 flex flex-wrap gap-2.5">
              {site.focusAreas.map((item) => (
                <span key={item} className="chip">
                  <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-accent-400 to-ember-400" />
                  {item}
                </span>
              ))}
            </Reveal>
          </div>
        </div>
      </div>

      {/* Full-bleed velocity marquees */}
      <div className="space-y-4 overflow-hidden border-y border-white/10 py-8">
        <VelocityMarquee items={FLIGHT_STACK} direction={1} outline />
        <VelocityMarquee items={PRODUCT_STACK} direction={-1} duration={30} />
      </div>

      {/* Experience timeline */}
      <div className="section-container">
        <Reveal>
          <div className="eyebrow">Experience</div>
          <h3 className="mt-4 font-display text-3xl text-zinc-50 md:text-4xl">Log entries</h3>
        </Reveal>

        <div ref={timelineRef} className="relative mt-10 space-y-10 pl-6 md:pl-8">
          <div className="absolute left-0 top-0 h-full w-px bg-white/10" aria-hidden />
          <div
            ref={lineRef}
            className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-accent-400 via-accent-400 to-ember-400"
            aria-hidden
          />
          {site.timeline.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05}>
              <article className="relative">
                <span
                  className="absolute -left-6 top-2 h-2 w-2 -translate-x-1/2 rotate-45 bg-gradient-to-br from-accent-400 to-ember-400 md:-left-8"
                  aria-hidden
                />
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h4 className="font-display text-xl text-zinc-50 md:text-2xl">{item.title}</h4>
                  <span className="text-sm text-accent-300">{item.org}</span>
                </div>
                <div className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-zinc-500">
                  {item.period}
                </div>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-400">{item.summary}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
