import Link from 'next/link'
import { FiArrowRight, FiExternalLink, FiGithub } from 'react-icons/fi'
import { getFeaturedProjects } from '@/lib/content.mjs'
import Reveal from '@/components/motion/Reveal'
import TraceRow from '@/components/motion/TraceRow'
import KineticHeading from '@/components/motion/KineticHeading'

const featuredProjects = getFeaturedProjects()

export default function FeaturedProjects() {
  return (
    <section id="work" className="section-container">
      <Reveal>
        <div className="eyebrow">Selected work</div>
        <KineticHeading as="h2" className="section-title max-w-4xl text-[clamp(2.25rem,4vw,4.5rem)]">
          A short list from the portfolio
        </KineticHeading>
        <p className="section-copy">
          I kept the homepage tight. The archive carries the rest.
        </p>
      </Reveal>

      <div className="mt-10 border-t border-white/10">
        {featuredProjects.map((project, index) => (
          <TraceRow key={project.slug} index={index}>
            <article className="grid gap-4 lg:grid-cols-[4rem_minmax(0,1fr)_auto] lg:items-start">
              <div className="font-mono text-sm text-zinc-600">0{index + 1}</div>
              <div>
                <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.14em] text-zinc-500">
                  <span>{project.category}</span>
                  <span>{project.timeframe}</span>
                </div>
                <h3 className="mt-3 font-display text-2xl text-zinc-50">{project.title}</h3>
                <p className="mt-3 max-w-3xl text-base leading-8 text-zinc-300">
                  {project.summary}
                </p>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-400">
                  {project.outcomes[0]}
                </p>
                <p className="mt-3 text-sm text-zinc-500">{project.stack.slice(0, 4).join(' / ')}</p>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-300 lg:justify-end">
                <Link
                  href={`/projects/${project.slug}`}
                  data-cursor
                  className="inline-flex items-center gap-2 text-accent-300 transition-transform duration-300 hover:text-ember-300 group-hover:translate-x-0.5"
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
                    className="inline-flex items-center gap-2 hover:text-white"
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
                    className="inline-flex items-center gap-2 hover:text-white"
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

      <Reveal className="mt-8">
        <Link href="/projects" className="button-secondary">
          See all projects
          <FiArrowRight />
        </Link>
      </Reveal>
    </section>
  )
}
