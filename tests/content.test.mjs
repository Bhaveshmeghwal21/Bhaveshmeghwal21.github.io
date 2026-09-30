import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import {
  getAllPostSlugs,
  getAllProjectSlugs,
  getFeaturedPosts,
  getFeaturedProjects,
  getNextProject,
  getPostBySlug,
  getProjectBySlug,
  toProjectSummary,
} from '../src/lib/content.mjs'
import { projectFilters, projects } from '../src/content/projects.mjs'
import { site } from '../src/content/site.mjs'

const publicDir = fileURLToPath(new URL('../public', import.meta.url))

// Featured work: six cards, led by the two newest open-source projects.
const featured = getFeaturedProjects()
assert.equal(featured.length, 6)
assert.deepEqual(
  featured.slice(0, 2).map((project) => project.slug),
  ['palmier-pro-linux', 'codex-azure']
)

// Slugs are unique and the long-standing ones still resolve.
const slugs = getAllProjectSlugs()
assert.equal(new Set(slugs).size, slugs.length, 'project slugs must be unique')
for (const slug of [
  'palmier-pro-linux',
  'codex-azure',
  'quadrotor-fault-tolerant-control',
  'rebloom',
  'pawaac-internship',
  'cfd-analysis-of-uav-propellers',
  'speech-emotion-recognition',
]) {
  assert.ok(slugs.includes(slug), `missing project ${slug}`)
}

// Every project is complete enough to render a card and a case study.
for (const project of projects) {
  for (const key of ['title', 'category', 'timeframe', 'status', 'summary', 'overview', 'role']) {
    assert.ok(project[key], `${project.slug} is missing ${key}`)
  }
  assert.ok(project.outcomes.length > 0, `${project.slug} has no outcomes`)
  assert.ok(project.stack.length > 0, `${project.slug} has no stack`)
  assert.ok(projectFilters.includes(project.category), `${project.slug} has unknown category`)
  for (const url of [project.links.live, project.links.repo]) {
    if (url) assert.match(url, /^https:\/\//, `${project.slug} link must be https`)
  }
  for (const image of project.images ?? []) {
    assert.ok(image.alt, `${project.slug} image needs alt text`)
    assert.ok(existsSync(`${publicDir}${image.src}`), `${image.src} does not exist`)
  }
}

// New projects point at their public repositories.
assert.equal(
  getProjectBySlug('palmier-pro-linux').links.repo,
  'https://github.com/Bhaveshmeghwal21/palmier-pro-linux'
)
assert.equal(
  getProjectBySlug('codex-azure').links.repo,
  'https://github.com/Bhaveshmeghwal21/codex-azure'
)
assert.equal(getProjectBySlug('rebloom').title, 'ReBloom')

// Summaries only carry card fields.
assert.deepEqual(Object.keys(toProjectSummary(projects[0])).sort(), [
  'category',
  'slug',
  'stack',
  'summary',
  'timeframe',
  'title',
])

// Next-project navigation wraps around.
assert.equal(getNextProject(projects[0].slug).slug, projects[1].slug)
assert.equal(getNextProject(projects.at(-1).slug).slug, projects[0].slug)
assert.equal(getNextProject('does-not-exist'), null)

// Writing.
assert.ok(getFeaturedPosts().length >= 3)
const postSlugs = getAllPostSlugs()
assert.equal(new Set(postSlugs).size, postSlugs.length, 'post slugs must be unique')
assert.equal(getPostBySlug('what-flight-logs-hide').slug, 'what-flight-logs-hide')

// Site content and assets referenced by the layout.
assert.equal(site.name, 'Bhavesh Meghwal')
assert.match(site.url, /^https:\/\//)
assert.ok(site.description.length <= 160, 'meta description should stay under 160 characters')
for (const asset of ['/images/avatar.jpg', '/images/og-card.png', '/favicon.svg']) {
  assert.ok(existsSync(`${publicDir}${asset}`), `${asset} does not exist`)
}

console.log(`content tests passed: ${projects.length} projects, ${postSlugs.length} posts`)
