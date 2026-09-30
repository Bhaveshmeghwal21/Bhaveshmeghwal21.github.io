import { site } from '@/content/site.mjs'
import type { Post } from '@/lib/types'

/** Who the site is about, for search engines. Built from site.mjs. */
export function personJsonLd() {
  const current = site.timeline[0]
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    url: `${site.url}/`,
    image: `${site.url}${site.profileImage}`,
    jobTitle: site.role,
    description: site.description,
    email: `mailto:${site.email}`,
    homeLocation: { '@type': 'Place', name: site.location },
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Indian Institute of Technology (BHU) Varanasi' },
    worksFor: { '@type': 'Organization', name: current.org },
    sameAs: [site.github, site.linkedin],
  }
}

/** An essay, for search engines. */
export function blogPostingJsonLd(post: Post) {
  const url = `${site.url}/blog/${post.slug}/`
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    url,
    mainEntityOfPage: url,
    image: `${site.url}/images/og/${post.slug}.jpg`,
    author: { '@type': 'Person', name: site.name, url: `${site.url}/` },
  }
}
