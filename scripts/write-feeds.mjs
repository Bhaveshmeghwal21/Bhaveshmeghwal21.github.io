// Runs after `next build` (npm "postbuild"). Writes sitemap.xml, robots.txt and
// feed.xml into the static export so search engines and feed readers can find
// every page. Content comes from the same files the pages are built from.
import { existsSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { posts } from '../src/content/blog.mjs'
import { projects } from '../src/content/projects.mjs'
import { site } from '../src/content/site.mjs'

const outDir = fileURLToPath(new URL('../out/', import.meta.url))
if (!existsSync(outDir)) {
  console.error('write-feeds: ./out not found. Run `next build` first.')
  process.exit(1)
}

const escapeXml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')

// URLs match the export: trailingSlash is on in next.config.js.
const pageUrl = (path) => `${site.url}${path}`
const newestFirst = [...posts].sort((a, b) => b.date.localeCompare(a.date))

// Sitemap.
const pages = [
  { path: '/', lastmod: newestFirst[0]?.date },
  { path: '/projects/' },
  ...projects.map((project) => ({ path: `/projects/${project.slug}/` })),
  { path: '/blog/', lastmod: newestFirst[0]?.date },
  ...newestFirst.map((post) => ({ path: `/blog/${post.slug}/`, lastmod: post.date })),
]
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...pages.map(({ path, lastmod }) =>
    [
      '  <url>',
      `    <loc>${escapeXml(pageUrl(path))}</loc>`,
      lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
      '  </url>',
    ]
      .filter(Boolean)
      .join('\n')
  ),
  '</urlset>',
  '',
].join('\n')

// robots.txt.
const robots = ['User-agent: *', 'Allow: /', '', `Sitemap: ${pageUrl('/sitemap.xml')}`, ''].join('\n')

// RSS 2.0 feed of the essays. Dates are ISO days, published at midnight UTC.
const rfc822 = (isoDay) => new Date(`${isoDay}T00:00:00Z`).toUTCString()
const feed = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
  '  <channel>',
  `    <title>${escapeXml(`${site.name} · Writing`)}</title>`,
  `    <link>${escapeXml(pageUrl('/blog/'))}</link>`,
  `    <description>${escapeXml('Essays on working with AI and leading people.')}</description>`,
  '    <language>en</language>',
  newestFirst[0] ? `    <lastBuildDate>${rfc822(newestFirst[0].date)}</lastBuildDate>` : null,
  `    <atom:link href="${escapeXml(pageUrl('/feed.xml'))}" rel="self" type="application/rss+xml" />`,
  ...newestFirst.map((post) =>
    [
      '    <item>',
      `      <title>${escapeXml(post.title)}</title>`,
      `      <link>${escapeXml(pageUrl(`/blog/${post.slug}/`))}</link>`,
      `      <guid isPermaLink="true">${escapeXml(pageUrl(`/blog/${post.slug}/`))}</guid>`,
      `      <pubDate>${rfc822(post.date)}</pubDate>`,
      `      <description>${escapeXml(post.excerpt)}</description>`,
      '    </item>',
    ].join('\n')
  ),
  '  </channel>',
  '</rss>',
  '',
]
  .filter((line) => line !== null)
  .join('\n')

writeFileSync(`${outDir}sitemap.xml`, sitemap)
writeFileSync(`${outDir}robots.txt`, robots)
writeFileSync(`${outDir}feed.xml`, feed)
console.log(`write-feeds: sitemap (${pages.length} URLs), robots.txt, feed (${newestFirst.length} posts)`)
