'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { FiArrowRight, FiExternalLink, FiGithub } from 'react-icons/fi'
import { getFeaturedProjects } from '@/lib/content.mjs'
import { ensureGsapPlugins, gsap, prefersReducedMotion } from '@/lib/motion'
import TiltCard from '@/components/motion/TiltCard'

// Curated, not the full list — three strong cases beats six competing for
// attention. The rest live at /projects behind "Full archive" below.
const featured = getFeaturedProjects().slice(0, 3)
const total = String(featured.length).padStart(2, '0')

/**
 * Pinned horizontal gallery: the section locks to the viewport and vertical
 * scroll scrubs the card track sideways through the featured projects, with a
 * live "0X / 06" progress readout. Falls back to a vertical stack on mobile
 * and for reduced-motion users.
 */
export default function ProjectsHorizontal() {
  const rootRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const root = rootRef.current
    const track = trackRef.current
    if (!root || !track || prefersReducedMotion()) return

    ensureGsapPlugins()
    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px)', () => {
      const distance = () => track.scrollWidth - window.innerWidth

      // Cover-flow depth: cards away from viewport-center bank in 3D
      // (rotateY), recede (z) and dim slightly — genuine 3D-on-scroll, not
      // just a horizontal slide.
      const cards = gsap.utils.toArray<HTMLElement>('.tilt-card', track)
      gsap.set(cards, { transformPerspective: 1400 })

      gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (counterRef.current) {
              const index = Math.round(self.progress * (featured.length - 1)) + 1
              counterRef.current.textContent = String(index).padStart(2, '0')
            }

            const trackX = (gsap.getProperty(track, 'x') as number) || 0
            const viewportCenter = window.innerWidth / 2
            const spread = window.innerWidth * 0.66
            cards.forEach((card) => {
              const cardCenter = card.offsetLeft + card.offsetWidth / 2 + trackX
              const ratio = gsap.utils.clamp(-1, 1, (cardCenter - viewportCenter) / spread)
              gsap.set(card, {
                rotateY: ratio * -16,
                z: -Math.abs(ratio) * 90,
                scale: 1 - Math.abs(ratio) * 0.06,
                opacity: 1 - Math.abs(ratio) * 0.35,
              })
            })
          },
        },
      })
    })

    return () => mm.revert()
  }, [])

  return (
    <section id="work" ref={rootRef} className="relative overflow-hidden">
      <div className="flex flex-col py-16 md:h-screen md:justify-center md:py-0">
        <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
          <div className="eyebrow">02 / Selected work</div>
          <h2 className="section-title max-w-3xl text-[clamp(2rem,3.2vw,3.25rem)]">
            Field-tested builds
          </h2>
        </div>

        <div
          ref={trackRef}
          className="mt-10 flex flex-col gap-6 px-4 md:mt-12 md:w-max md:flex-row md:items-stretch md:gap-8 md:pl-[max(1rem,calc((100vw-72rem)/2))] md:pr-[36vw]"
        >
          {featured.map((project, index) => (
            <TiltCard key={project.slug} className="w-full shrink-0 md:w-[42rem] md:max-w-[86vw]" max={6}>
            <article
              className="surface group relative h-full w-full overflow-hidden p-6 transition-colors duration-500 hover:border-accent-400/30 md:p-9"
            >
              <div
                aria-hidden
                className="text-outline pointer-events-none absolute -right-2 -top-6 select-none font-display text-[5.5rem] font-bold leading-none md:text-[7rem]"
              >
                {String(index + 1).padStart(2, '0')}
              </div>

              <div className="relative">
                <div className="flex flex-wrap gap-3 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-zinc-500">
                  <span className="text-accent-400">{project.category}</span>
                  <span>{project.timeframe}</span>
                  <span>{project.status}</span>
                </div>

                <h3 className="mt-5 max-w-md font-display text-3xl leading-tight text-zinc-50 md:text-4xl">
                  {project.title}
                </h3>
                <p className="mt-4 max-w-md text-sm leading-7 text-zinc-300 md:text-base md:leading-8">
                  {project.summary}
                </p>
                <p className="mt-4 max-w-md border-l-2 border-accent-400/60 pl-4 text-sm leading-6 text-zinc-400">
                  {project.outcomes[0]}
                </p>

                <div className="mt-6 font-mono text-xs text-zinc-500">
                  {project.stack.slice(0, 5).join(' / ')}
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-5 text-sm">
                  <Link
                    href={`/projects/${project.slug}`}
                    data-cursor
                    className="inline-flex items-center gap-2 text-accent-300 transition-colors hover:text-ember-300"
                  >
                    Case study
                    <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                  {project.links.live ? (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor
                      className="inline-flex items-center gap-2 text-zinc-300 hover:text-white"
                    >
                      Live
                      <FiExternalLink />
                    </a>
                  ) : null}
                  {project.links.repo ? (
                    <a
                      href={project.links.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor
                      className="inline-flex items-center gap-2 text-zinc-300 hover:text-white"
                    >
                      Code
                      <FiGithub />
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
            </TiltCard>
          ))}
        </div>

        <div className="mx-auto mt-10 flex w-full max-w-6xl items-center justify-between px-4 md:px-6">
          <div className="font-mono text-xs text-zinc-500">
            <span ref={counterRef} className="text-zinc-200">
              01
            </span>{' '}
            / {total}
          </div>
          <Link
            href="/projects"
            data-cursor
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
          >
            Full archive
            <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  )
}
