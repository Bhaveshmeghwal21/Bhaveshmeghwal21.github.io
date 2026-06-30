import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import Head from 'next/head'
import { ThemeProvider } from '@/contexts/ThemeContext'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#05060f" />
      </Head>
      <ThemeProvider>
        <main
          className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans`}
        >
          <Component {...pageProps} />
        </main>
      </ThemeProvider>
    </>
  )
}
