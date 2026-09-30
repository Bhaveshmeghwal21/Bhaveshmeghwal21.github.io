import Link from 'next/link'
import { FiArrowUpRight } from 'react-icons/fi'
import type { ProjectSummary } from '@/lib/types'

type ProjectCardProps = {
  project: ProjectSummary
  headingAs?: 'h2' | 'h3'
}

export default function ProjectCard({ project, headingAs: Heading = 'h3' }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex h-full flex-col rounded-xl border border-line p-5 transition-colors hover:border-fg/20 hover:bg-surface sm:p-6"
    >
      <div className="flex items-center justify-between gap-4 text-xs text-subtle">
        <span>{project.category}</span>
        <span className="tabular-nums">{project.timeframe}</span>
      </div>
      <Heading className="mt-3 flex items-start justify-between gap-3 text-[17px] font-semibold leading-snug tracking-tight text-fg">
        {project.title}
        <FiArrowUpRight
          aria-hidden
          className="mt-0.5 shrink-0 text-subtle transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
        />
      </Heading>
      <p className="mt-2 text-sm leading-6 text-muted">{project.summary}</p>
      <ul className="mt-auto flex flex-wrap gap-1.5 pt-5" aria-label="Tech stack">
        {project.stack.slice(0, 4).map((item) => (
          <li key={item} className="tag">
            {item}
          </li>
        ))}
      </ul>
    </Link>
  )
}
