import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Layout from '@/components/Layout'
import PostList from '@/components/PostList'
import ProjectCard from '@/components/ProjectCard'
import Section from '@/components/Section'
import About from '@/components/home/About'
import Contact from '@/components/home/Contact'
import Experience from '@/components/home/Experience'
import Hero from '@/components/home/Hero'
import {
  getFeaturedPosts,
  getFeaturedProjects,
  toPostSummary,
  toProjectSummary,
} from '@/lib/content.mjs'
import { personJsonLd } from '@/lib/jsonLd'
import type { PostSummary, ProjectSummary } from '@/lib/types'

type HomeProps = {
  projects: ProjectSummary[]
  posts: PostSummary[]
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => ({
  props: {
    projects: getFeaturedProjects().map(toProjectSummary),
    posts: getFeaturedPosts().slice(0, 3).map(toPostSummary),
  },
})

export default function Home({ projects, posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout jsonLd={personJsonLd()}>
      <Hero />

      <Section
        id="writing"
        title="Writing"
        description="What building drones, software and a company is teaching me about working with AI and leading people."
        action={{ href: '/blog', label: 'All writing' }}
      >
        <PostList posts={posts} />
      </Section>

      <Section
        id="work"
        title="Selected work"
        description="Drone software, AI products and open-source tools I have built."
        action={{ href: '/projects', label: 'All projects' }}
      >
        <ul className="grid gap-4 sm:grid-cols-2">
          {projects.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </Section>

      <Experience />
      <About />

      <Contact />
    </Layout>
  )
}
