import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useState } from 'react'
import Layout from '@/components/Layout'
import PageHeader from '@/components/PageHeader'
import ProjectCard from '@/components/ProjectCard'
import { projectFilters, projects as allProjects } from '@/content/projects.mjs'
import { toProjectSummary } from '@/lib/content.mjs'
import type { ProjectSummary } from '@/lib/types'

type ProjectsProps = {
  projects: ProjectSummary[]
  filters: string[]
}

export const getStaticProps: GetStaticProps<ProjectsProps> = async () => ({
  props: {
    projects: allProjects.map(toProjectSummary),
    // Hide filters that would show nothing.
    filters: projectFilters.filter(
      (filter) => filter === 'All' || allProjects.some((project) => project.category === filter)
    ),
  },
})

export default function ProjectsPage({
  projects,
  filters,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [active, setActive] = useState('All')
  const visible = active === 'All' ? projects : projects.filter((p) => p.category === active)

  return (
    <Layout
      title="Projects"
      description="Software, AI products, robotics and machine learning projects by Bhavesh Meghwal."
    >
      <div className="container-page py-14 sm:py-20">
        <PageHeader title="Projects">
          <p>Everything I have built, from open-source developer tools to drone flight control.</p>
        </PageHeader>

        <div role="group" aria-label="Filter by category" className="mt-10 flex flex-wrap gap-2">
          {filters.map((filter) => {
            const selected = filter === active
            return (
              <button
                key={filter}
                type="button"
                aria-pressed={selected}
                onClick={() => setActive(filter)}
                className={`h-9 rounded-full border px-4 text-sm transition-colors ${
                  selected
                    ? 'border-fg bg-fg text-bg'
                    : 'border-line text-muted hover:border-fg/30 hover:text-fg'
                }`}
              >
                {filter}
              </button>
            )
          })}
        </div>

        <p className="sr-only" role="status" aria-live="polite">
          Showing {visible.length} {visible.length === 1 ? 'project' : 'projects'}
        </p>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {visible.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} headingAs="h2" />
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  )
}
