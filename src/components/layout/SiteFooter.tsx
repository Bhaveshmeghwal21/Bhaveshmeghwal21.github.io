'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { site } from '@/content/site.mjs'

const HQ_TIMEZONE = 'Asia/Kolkata'

/** Real local time at HQ, mono/HUD-styled — a small "living system" detail, not another animation. */
function useHqTime() {
  const [time, setTime] = useState<string | null>(null)

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat('en-GB', {
      timeZone: HQ_TIMEZONE,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
    const tick = () => setTime(formatter.format(new Date()))
    tick()
    const id = setInterval(tick, 15000)
    return () => clearInterval(id)
  }, [])

  return time
}

export default function SiteFooter() {
  const hqTime = useHqTime()

  return (
    <footer className="section-container pt-0">
      <div className="flex flex-col gap-6 border-t border-white/10 pt-8 text-sm text-zinc-400 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="font-display text-lg text-zinc-100">{site.name}</p>
          <p className="mt-2 leading-7">
            Built from drone work, AI tools, and product experiments.
          </p>
          <p className="mt-3 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-zinc-600">
            HQ · {site.location} {hqTime ? `· ${hqTime} IST` : ''}
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link href="/projects" data-cursor className="hover:text-white">
            All projects
          </Link>
          <Link href="/blog" data-cursor className="hover:text-white">
            Blog
          </Link>
          <a href={`mailto:${site.email}`} data-cursor className="hover:text-white">
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}
