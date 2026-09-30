import { Html, Head, Main, NextScript } from 'next/document'

// Static tags only. Title, description and social tags are set per page in
// components/Layout.tsx so they can be overridden without duplicates.
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Bhavesh Meghwal · Writing"
          href="/feed.xml"
        />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0a0a0b" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
