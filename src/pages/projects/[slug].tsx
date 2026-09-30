import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { FiArrowLeft, FiArrowRight, FiExternalLink, FiGithub } from 'react-icons/fi'
import Layout from '@/components/Layout'
import { getAllProjectSlugs, getNextProject, getProjectBySlug } from '@/lib/content.mjs'
import type { Project } from '@/lib/types'

type ProjectPageProps = {
  project: Project
  next: { slug: string; title: string } | null
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getAllProjectSlugs().map((slug) => ({ params: { slug } })),
  fallback: false,
})

export const getStaticProps: GetStaticProps<ProjectPageProps> = async ({ params }) => {
  const slug = String(params?.slug)
  const project = getProjectBySlug(slug) as Project | undefined
  if (!project) return { notFound: true }

  const next = getNextProject(slug)
  return {
    props: {
      project,
      next: next ? { slug: next.slug, title: next.title } : null,
    },
  }
}

export default function ProjectPage({
  project,
  next,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [cover, ...gallery] = project.images ?? []

  return (
    <Layout title={project.title} description={project.summary}>
      <article className="container-page py-14 sm:py-20">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 rounded-md text-sm text-muted transition-colors hover:text-fg"
        >
          <FiArrowLeft aria-hidden />
          All projects
        </Link>

        <header className="mt-8 max-w-3xl">
          <p className="text-sm text-subtle">
            {project.category} · {project.timeframe} · {project.status}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            {project.title}
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">{project.summary}</p>

          {project.links.repo || project.links.live ? (
            <div className="mt-8 flex flex-wrap gap-3">
              {project.links.repo ? (
                <a
                  href={project.links.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <FiGithub aria-hidden />
                  View source
                </a>
              ) : null}
              {project.links.live ? (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={project.links.repo ? 'btn-secondary' : 'btn-primary'}
                >
                  Visit site
                  <FiExternalLink aria-hidden />
                </a>
              ) : null}
            </div>
          ) : null}
        </header>

        {cover ? (
          <div className="mt-12">
            <Image
              src={cover.src}
              alt={cover.alt}
              width={960}
              height={540}
              priority
              className="w-full rounded-xl border border-line"
            />
            {gallery.length ? (
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {gallery.map((image) => (
                  <Image
                    key={image.src}
                    src={image.src}
                    alt={image.alt}
                    width={960}
                    height={540}
                    className="w-full rounded-xl border border-line"
                  />
                ))}
              </div>
            ) : null}
          </div>
        ) : null}

        <div className="mt-14 grid gap-12 md:grid-cols-[minmax(0,1fr)_14rem] md:gap-16">
          <div className="prose-body max-w-2xl [&>h2:first-child]:mt-0">
            <h2>Overview</h2>
            <p>{project.overview}</p>
            <h2>My role</h2>
            <p>{project.role}</p>
            <h2>Highlights</h2>
            <ul>
              {project.outcomes.map((outcome) => (
                <li key={outcome}>{outcome}</li>
              ))}
            </ul>
          </div>

          <aside className="space-y-8 text-sm md:border-l md:border-line md:pl-8">
            <div>
              <h2 className="font-medium">Stack</h2>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {project.stack.map((item) => (
                  <li key={item} className="tag">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-medium">Availability</h2>
              <p className="mt-2 leading-6 text-muted">{project.links.note}</p>
            </div>
          </aside>
        </div>

        {next ? (
          <nav aria-label="Next project" className="mt-20 border-t border-line pt-8">
            <Link
              href={`/projects/${next.slug}`}
              className="group inline-flex flex-col gap-1 rounded-md"
            >
              <span className="text-sm text-subtle">Next project</span>
              <span className="inline-flex items-center gap-2 text-lg font-medium transition-colors group-hover:text-accent">
                {next.title}
                <FiArrowRight
                  aria-hidden
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </span>
            </Link>
          </nav>
        ) : null}
      </article>
    </Layout>
  )
}
