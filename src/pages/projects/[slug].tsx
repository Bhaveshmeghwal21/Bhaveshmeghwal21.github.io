import Head from 'next/head'
import Link from 'next/link'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { FiArrowLeft, FiExternalLink, FiGithub } from 'react-icons/fi'
import SiteFooter from '@/components/layout/SiteFooter'
import SiteNav from '@/components/layout/SiteNav'
import Reveal from '@/components/motion/Reveal'
import { getAllProjectSlugs, getProjectBySlug } from '@/lib/content.mjs'

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: getAllProjectSlugs().map((slug) => ({ params: { slug } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<{ project: any }> = async ({ params }) => {
  const slug = String(params?.slug)
  const project = getProjectBySlug(slug)

  if (!project) {
    return { notFound: true }
  }

  return {
    props: {
      project,
    },
  }
}

export default function ProjectDetailPage({
  project,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>{project.title} | Bhavesh Meghwal</title>
        <meta name="description" content={project.summary} />
      </Head>

      <SiteNav />
      <main>
        <section className="section-container pt-12 md:pt-20">
          <Reveal>
            <Link href="/projects" className="eyebrow">
              <FiArrowLeft />
              Back to projects
            </Link>
            <div className="mt-6 flex flex-wrap gap-3 text-xs uppercase tracking-[0.14em] text-zinc-500">
              <span>{project.category}</span>
              <span>{project.timeframe}</span>
              <span>{project.status}</span>
            </div>
            <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.75rem,5vw,5.75rem)] leading-[0.96] text-zinc-50">
              {project.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300">{project.summary}</p>
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)]">
            <Reveal className="surface p-6 md:p-8">
              <div className="reading-content max-w-none">
                <h2>Overview</h2>
                <p>{project.overview}</p>
                <h2>Role</h2>
                <p>{project.role}</p>
                <h2>Outcomes</h2>
                <ul>
                  {project.outcomes.map((item: string) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal className="surface p-6 md:p-8" delay={0.08}>
              <div className="text-xs uppercase tracking-[0.14em] text-zinc-500">Stack</div>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((item: string) => (
                  <span key={item} className="chip">
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-8 text-xs uppercase tracking-[0.14em] text-zinc-500">Links</div>
              <div className="mt-4 flex flex-col gap-3 text-sm text-zinc-300">
                {project.links.live ? (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:text-white"
                  >
                    Live product
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
                    Repository
                    <FiGithub />
                  </a>
                ) : null}
                <p className="leading-7 text-zinc-400">{project.links.note}</p>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
