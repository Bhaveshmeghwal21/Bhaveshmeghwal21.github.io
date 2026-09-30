import { posts } from '../content/blog.mjs'
import { projects } from '../content/projects.mjs'

/** Card-sized view of a project, so pages don't ship full case studies as props. */
export function toProjectSummary(project) {
  const { title, slug, category, timeframe, summary, stack } = project
  return { title, slug, category, timeframe, summary, stack }
}

/** List-sized view of a post. */
export function toPostSummary(post) {
  const { title, slug, date, readTime, excerpt } = post
  return { title, slug, date, readTime, excerpt }
}

export function getFeaturedProjects() {
  return projects.filter((project) => project.featured).slice(0, 6)
}

export function getAllProjectSlugs() {
  return projects.map((project) => project.slug)
}

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug)
}

/** The project after `slug` in archive order, wrapping to the first. */
export function getNextProject(slug) {
  const index = projects.findIndex((project) => project.slug === slug)
  if (index === -1 || projects.length < 2) return null
  return projects[(index + 1) % projects.length]
}

export function getFeaturedPosts() {
  return posts.filter((post) => post.featured)
}

export function getAllPostSlugs() {
  return posts.map((post) => post.slug)
}

export function getPostBySlug(slug) {
  return posts.find((post) => post.slug === slug)
}
