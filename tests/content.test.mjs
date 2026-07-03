import assert from 'node:assert/strict'
import {
  getAllProjectSlugs,
  getFeaturedPosts,
  getFeaturedProjects,
  getPostBySlug,
  getProjectBySlug,
} from '../src/lib/content.mjs'

assert.equal(getFeaturedProjects().length, 6)

const slugs = getAllProjectSlugs()
assert.ok(slugs.includes('quadrotor-fault-tolerant-control'))
assert.ok(slugs.includes('rebloom'))

const project = getProjectBySlug('rebloom')
assert.equal(project.title, 'ReBloom')

assert.ok(getFeaturedPosts().length >= 2)

const post = getPostBySlug('what-flight-logs-hide')
assert.equal(post.slug, 'what-flight-logs-hide')
