import Head from 'next/head'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { FiArrowRight, FiExternalLink, FiGithub } from 'react-icons/fi'
import SiteFooter from '@/components/layout/SiteFooter'
import SiteNav from '@/components/layout/SiteNav'
import Reveal from '@/components/motion/Reveal'
import { projectFilters, projects } from '@/content/projects.mjs'

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('All')

  const visibleProjects = useMemo(() => {
    if (activeFilter === 'All') return projects
    return projects.filter((project) => project.category === activeFilter)
  }, [activeFilter])

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
            <h1 className="section-title max-w-4xl text-[clamp(2.5rem,5vw,5.5rem)]">
              Archive of builds, systems, and product work
            </h1>
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
                  className={`rounded-full px-4 py-2 text-sm transition-colors ${
                    active
                      ? 'bg-sky-400 text-slate-950'
                      : 'border border-white/10 bg-white/5 text-zinc-300 hover:text-white'
                  }`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              )
            })}
          </Reveal>

          <div className="mt-10 border-t border-white/10">
            {visibleProjects.map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.03} className="border-b border-white/10 py-6">
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
                      className="inline-flex items-center gap-2 text-sky-300 hover:text-sky-200"
                    >
                      Case study
                      <FiArrowRight />
                    </Link>
                    {project.links.live ? (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
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
                        className="inline-flex items-center gap-2 text-zinc-300 hover:text-white"
                      >
                        Code
                        <FiGithub />
                      </a>
                    ) : null}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
