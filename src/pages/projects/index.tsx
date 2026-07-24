import Head from 'next/head'
import Link from 'next/link'
import { useMemo, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { FiArrowRight, FiExternalLink, FiGithub } from 'react-icons/fi'
import SiteFooter from '@/components/layout/SiteFooter'
import SiteNav from '@/components/layout/SiteNav'
import Reveal from '@/components/motion/Reveal'
import TraceRow from '@/components/motion/TraceRow'
import KineticHeading from '@/components/motion/KineticHeading'
import { projectFilters, projects } from '@/content/projects.mjs'
import { ensureGsapPlugins, Flip, gsap, prefersReducedMotion } from '@/lib/motion'

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const listRef = useRef<HTMLDivElement>(null)

  const visibleProjects = useMemo(() => {
    if (activeFilter === 'All') return projects
    return projects.filter((project) => project.category === activeFilter)
  }, [activeFilter])

  const handleFilter = (filter: string) => {
    if (filter === activeFilter) return

    if (prefersReducedMotion() || !listRef.current) {
      setActiveFilter(filter)
      return
    }

    ensureGsapPlugins()
    const state = Flip.getState(listRef.current.children)

    flushSync(() => setActiveFilter(filter))

    Flip.from(state, {
      duration: 0.65,
      ease: 'power3.inOut',
      absolute: true,
      stagger: 0.025,
      onEnter: (elements) =>
        gsap.fromTo(
          elements,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.45, stagger: 0.03, ease: 'power2.out' }
        ),
      onLeave: (elements) => gsap.to(elements, { opacity: 0, duration: 0.2 }),
    })
  }

  return (
    <>
      <Head>
        <title>Projects | Bhavesh Meghwal</title>
        <meta
          name="description"
          content="Project archive across robotics, AI products, and product systems by Bhavesh Meghwal."
        />
      </Head>

      <SiteNav />
      <main>
        <section className="section-container pt-12 md:pt-20">
          <Reveal>
            <div className="eyebrow">All projects</div>
            <KineticHeading as="h1" className="section-title max-w-4xl text-[clamp(2.25rem,4vw,4rem)]">
              Archive of builds, systems, and product work
            </KineticHeading>
            <p className="section-copy max-w-3xl">
              This page holds the full range. The homepage only shows the short list.
            </p>
          </Reveal>

          <Reveal className="mt-8 flex flex-wrap gap-3">
            {projectFilters.map((filter) => {
              const active = filter === activeFilter
              return (
                <button
                  key={filter}
                  type="button"
                  data-cursor
                  className={`rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
                    active
                      ? 'bg-gradient-to-r from-accent-400 to-ember-400 text-[#fff5f5]'
                      : 'border border-white/10 bg-white/5 text-zinc-300 hover:text-white'
                  }`}
                  onClick={() => handleFilter(filter)}
                >
                  {filter}
                </button>
              )
            })}
          </Reveal>

          <div ref={listRef} className="mt-10 border-t border-white/10">
            {visibleProjects.map((project, index) => (
              <TraceRow key={project.slug} index={index}>
                <article className="grid gap-4 lg:grid-cols-[4rem_minmax(0,1fr)_auto] lg:items-start">
                  <div className="font-mono text-sm text-zinc-600">
                    {(index + 1).toString().padStart(2, '0')}
                  </div>
                  <div>
                    <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.14em] text-zinc-500">
                      <span>{project.category}</span>
                      <span>{project.timeframe}</span>
                      <span>{project.status}</span>
                    </div>
                    <h2 className="mt-3 font-display text-2xl text-zinc-50">{project.title}</h2>
                    <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-300">{project.summary}</p>
                    <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-400">{project.overview}</p>
                    <p className="mt-3 text-sm text-zinc-500">{project.stack.slice(0, 5).join(' / ')}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm lg:justify-end">
                    <Link
                      href={`/projects/${project.slug}`}
                      data-cursor
                      className="inline-flex items-center gap-2 text-accent-300 hover:text-ember-300"
                    >
                      Case study
                      <FiArrowRight />
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
                </article>
              </TraceRow>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
