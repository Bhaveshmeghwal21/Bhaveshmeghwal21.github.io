import { posts } from '../content/blog.mjs'
import { projects } from '../content/projects.mjs'

export function getFeaturedProjects() {
  return projects.filter((project) => project.featured).slice(0, 6)
}

export function getAllProjectSlugs() {
  return projects.map((project) => project.slug)
}

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug)
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
