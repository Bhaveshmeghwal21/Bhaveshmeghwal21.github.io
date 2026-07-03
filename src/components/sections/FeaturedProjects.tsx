import Link from 'next/link'
import { FiArrowRight, FiExternalLink, FiGithub } from 'react-icons/fi'
import { getFeaturedProjects } from '@/lib/content.mjs'
import Reveal from '@/components/motion/Reveal'

const featuredProjects = getFeaturedProjects()

export default function FeaturedProjects() {
  return (
    <section id="work" className="section-container">
      <Reveal>
        <div className="eyebrow">Selected work</div>
        <h2 className="section-title max-w-4xl text-[clamp(2.25rem,4vw,4.5rem)]">
          Six builds that show how I think
        </h2>
        <p className="section-copy">
          I picked a small set on purpose. These projects cover flight control, AI
          tooling, and product systems without turning the homepage into an archive.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        {featuredProjects.map((project, index) => (
          <Reveal key={project.slug} delay={index * 0.04}>
            <article className="surface flex h-full flex-col p-6">
              <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.16em] text-zinc-500">
                <span>{project.category}</span>
                <span>{project.timeframe}</span>
              </div>
              <h3 className="mt-4 font-display text-2xl text-zinc-50">{project.title}</h3>
              <p className="mt-3 text-base leading-8 text-zinc-300">{project.summary}</p>
              <p className="mt-4 text-sm leading-7 text-zinc-400">{project.outcomes[0]}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.slice(0, 4).map((item) => (
                  <span key={item} className="chip">
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-zinc-300">
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-2 text-sky-300 hover:text-sky-200"
                >
                  Read case study
                  <FiArrowRight />
                </Link>
                {project.links.live ? (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
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
                    className="inline-flex items-center gap-2 hover:text-white"
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

      <Reveal className="mt-8">
        <Link href="/projects" className="button-secondary">
          See all projects
          <FiArrowRight />
        </Link>
      </Reveal>
    </section>
  )
}
