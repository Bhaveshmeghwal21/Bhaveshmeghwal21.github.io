import Head from 'next/head'
import { useRouter } from 'next/router'
import type { ReactNode } from 'react'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'
import { site } from '@/content/site.mjs'

type LayoutProps = {
  /** Page title; the site name is appended. Omit on the homepage. */
  title?: string
  description?: string
  /** Social preview image (path under public/, 1200x630). Defaults to the site card. */
  image?: string
  /** Set on essays so link previews treat the page as an article. */
  article?: { publishedTime: string }
  /** Keep the page out of search results (used by the 404 page). */
  noindex?: boolean
  children: ReactNode
}

export default function Layout({
  title,
  description = site.description,
  image = '/images/og-card.png',
  article,
  noindex = false,
  children,
}: LayoutProps) {
  const { asPath } = useRouter()
  const fullTitle = title ? `${title} | ${site.name}` : `${site.name} | ${site.role}`
  const path = asPath.split(/[?#]/)[0]
  const url = `${site.url}${path}`
  const imageUrl = `${site.url}${image}`

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        {noindex ? (
          <meta name="robots" content="noindex" />
        ) : (
          <link rel="canonical" href={url} />
        )}
        <meta property="og:type" content={article ? 'article' : 'website'} />
        <meta property="og:site_name" content={site.name} />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        {article ? (
          <>
            <meta property="article:published_time" content={article.publishedTime} />
            <meta property="article:author" content={site.name} />
          </>
        ) : null}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={imageUrl} />
      </Head>

      <a
        href="#content"
        className="sr-only z-50 rounded-md bg-fg px-3 py-2 text-sm text-bg focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <SiteNav />
      <main id="content">{children}</main>
      <SiteFooter />
    </>
  )
}
