import assert from 'node:assert/strict'
import {
  getAllProjectSlugs,
  getFeaturedPosts,
  getFeaturedProjects,
  getPostBySlug,
  getProjectBySlug,
} from '../src/lib/content.mjs'
import { site } from '../src/content/site.mjs'

assert.equal(getFeaturedProjects().length, 6)

const slugs = getAllProjectSlugs()
assert.ok(slugs.includes('quadrotor-fault-tolerant-control'))
assert.ok(slugs.includes('rebloom'))
assert.ok(slugs.includes('pawaac-internship'))
assert.ok(slugs.includes('cfd-analysis-of-uav-propellers'))
assert.ok(slugs.includes('speech-emotion-recognition'))

const project = getProjectBySlug('rebloom')
assert.equal(project.title, 'ReBloom')

assert.ok(getFeaturedPosts().length >= 2)

const post = getPostBySlug('what-flight-logs-hide')
assert.equal(post.slug, 'what-flight-logs-hide')

assert.equal(site.profileImage, '/images/profile.jpeg')
assert.match(site.shortBio, /Mechanical Engineering student at IIT \(BHU\)/)
assert.match(site.shortBio, /Secretary of Aero Modelling Club/)
