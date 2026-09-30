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
import { posts } from '../src/content/blog.mjs'
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
  'human-follower-drone',
]) {
  assert.ok(slugs.includes(slug), `missing project ${slug}`)
}
assert.ok(!slugs.includes('speech-emotion-recognition'), 'speech emotion recognition was removed')

// Every project is complete enough to render a card and a case study.
for (const project of projects) {
  for (const key of ['title', 'category', 'timeframe', 'status', 'summary', 'overview', 'role']) {
    assert.ok(project[key], `${project.slug} is missing ${key}`)
  }
  assert.ok(project.outcomes.length > 0, `${project.slug} has no outcomes`)
  assert.ok(project.stack.length > 0, `${project.slug} has no stack`)
  assert.ok(projectFilters.includes(project.category), `${project.slug} has unknown category`)
  const { live, repo, video, report } = project.links
  for (const url of [live, repo, video, report]) {
    if (url) assert.match(url, /^https:\/\//, `${project.slug} link must be https`)
  }
  for (const image of project.images ?? []) {
    assert.ok(image.alt, `${project.slug} image needs alt text`)
    assert.ok(existsSync(`${publicDir}${image.src}`), `${image.src} does not exist`)
  }
  if (project.video) {
    assert.ok(project.video.alt, `${project.slug} clip needs alt text`)
    for (const file of [project.video.src, project.video.poster]) {
      assert.ok(existsSync(`${publicDir}${file}`), `${file} does not exist`)
    }
  }
}

// Every filter except "All" has at least one project.
for (const filter of projectFilters.filter((f) => f !== 'All')) {
  assert.ok(projects.some((p) => p.category === filter), `filter ${filter} would be empty`)
}

// Clips and their source material are wired up.
for (const slug of ['quadrotor-fault-tolerant-control', 'human-follower-drone', 'swarm-drone-system']) {
  const project = getProjectBySlug(slug)
  assert.ok(project.video, `${slug} should have a clip`)
  assert.match(project.links.video, /^https:\/\/drive\.google\.com\//, `${slug} should link its full video`)
}
for (const slug of ['quadrotor-fault-tolerant-control', 'cfd-analysis-of-uav-propellers']) {
  assert.match(getProjectBySlug(slug).links.report, /^https:\/\/drive\.google\.com\//, `${slug} report`)
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
assert.ok(getFeaturedPosts().length >= 1, 'the homepage needs at least one featured post')
const postSlugs = getAllPostSlugs()
assert.equal(new Set(postSlugs).size, postSlugs.length, 'post slugs must be unique')
assert.equal(getPostBySlug('what-a-true-leader-should-be').slug, 'what-a-true-leader-should-be')
for (const post of posts) {
  if (!post.image) continue
  assert.ok(post.image.alt && post.image.caption, `${post.slug} image needs alt text and a caption`)
  assert.match(post.image.credit.href, /^https:\/\//, `${post.slug} image credit must link to its source`)
  assert.ok(existsSync(`${publicDir}${post.image.src}`), `${post.image.src} does not exist`)
}
assert.ok(getPostBySlug('is-ai-really-helping-us').image, 'the Musashi essay has its painting')
assert.ok(getPostBySlug('what-a-true-leader-should-be').image, 'the leadership post has its photograph')
for (const post of posts) {
  for (const section of post.sections) {
    for (const block of section.paragraphs) {
      if (typeof block === 'object' && 'quote' in block) {
        assert.ok(block.quote.trim(), `${post.slug} has an empty quote`)
        assert.ok(block.cite?.trim(), `${post.slug} has a quote without attribution`)
        assert.ok(post.note, `${post.slug} quotes a source, so it needs a source note`)
      }
    }
  }
}

// Site content and assets referenced by the layout.
assert.equal(site.name, 'Bhavesh Meghwal')
assert.match(site.url, /^https:\/\//)
assert.ok(site.description.length <= 160, 'meta description should stay under 160 characters')
for (const asset of ['/images/avatar.jpg', '/images/og-card.png', '/favicon.svg']) {
  assert.ok(existsSync(`${publicDir}${asset}`), `${asset} does not exist`)
}

console.log(`content tests passed: ${projects.length} projects, ${postSlugs.length} posts`)
