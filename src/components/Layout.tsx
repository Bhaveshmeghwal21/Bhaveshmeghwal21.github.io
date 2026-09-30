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
  children: ReactNode
}

export default function Layout({ title, description = site.description, children }: LayoutProps) {
  const { asPath } = useRouter()
  const fullTitle = title ? `${title} | ${site.name}` : `${site.name} | ${site.role}`
  const path = asPath.split(/[?#]/)[0]
  const url = `${site.url}${path}`
  const image = `${site.url}/images/og-card.png`

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={site.name} />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={image} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
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
