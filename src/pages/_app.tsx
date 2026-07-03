import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { IBM_Plex_Sans, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import Head from 'next/head'
import SmoothScroll from '@/components/motion/SmoothScroll'

const body = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

const heading = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-mono',
  display: 'swap',
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#09090b" />
      </Head>
      <SmoothScroll />
      <main className={`${body.variable} ${heading.variable} ${mono.variable} font-sans`}>
        <Component {...pageProps} />
      </main>
    </>
  )
}
