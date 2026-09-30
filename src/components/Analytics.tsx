import Script from 'next/script'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { site } from '@/content/site.mjs'

type GoatCounter = { count: (vars: { path: string }) => void }

declare global {
  interface Window {
    goatcounter?: GoatCounter
  }
}

/**
 * Privacy-friendly visit counts via GoatCounter: no cookies and no personal
 * data, so no consent banner is needed. Renders nothing unless
 * `site.goatcounter` is set.
 */
export default function Analytics() {
  const router = useRouter()
  const code: string = site.goatcounter

  // count.js records the first page load itself. Later page changes happen
  // client-side, so they are sent here.
  useEffect(() => {
    if (!code) return
    const onRouteChange = (url: string) => {
      window.goatcounter?.count({ path: url.split(/[?#]/)[0] })
    }
    router.events.on('routeChangeComplete', onRouteChange)
    return () => router.events.off('routeChangeComplete', onRouteChange)
  }, [code, router.events])

  if (!code) return null

  return (
    <Script
      src="https://gc.zgo.at/count.js"
      data-goatcounter={`https://${code}.goatcounter.com/count`}
      strategy="afterInteractive"
    />
  )
}
