'use client'

import Link from 'next/link'
import { useState } from 'react'
import { FiArrowUpRight, FiMenu, FiX } from 'react-icons/fi'
import { site } from '@/content/site.mjs'

const routeLinks = [
  { label: 'Projects', href: '/projects' },
  { label: 'Blog', href: '/blog' },
]

export default function SiteNav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 px-4 pt-4">
      <div className="surface mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 font-mono text-sm text-sky-300">
            BM
          </span>
          <div className="min-w-0">
            <div className="font-display text-base font-semibold text-zinc-50">
              {site.name}
            </div>
            <div className="text-sm text-zinc-400">Robotics, AI, product systems</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-5 text-sm text-zinc-300 md:flex">
          {site.navItems.map((item) => (
            <a key={item.href} href={item.href} className="focus-ring hover:text-white">
              {item.label}
            </a>
          ))}
          {routeLinks.map((item) => (
            <Link key={item.href} href={item.href} className="focus-ring hover:text-white">
              {item.label}
            </Link>
          ))}
          <a
            href={site.resumeGeneral}
            target="_blank"
            rel="noopener noreferrer"
            className="button-secondary text-sm"
          >
            Resume
            <FiArrowUpRight />
          </a>
        </nav>

        <button
          type="button"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 text-zinc-100 md:hidden"
          onClick={() => setOpen((current) => !current)}
        >
          {open ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </div>

      {open ? (
        <div className="surface mx-auto mt-3 flex w-full max-w-6xl flex-col gap-2 px-4 py-4 md:hidden">
          {site.navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-2xl px-4 py-3 text-zinc-200 hover:bg-white/5"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
          {routeLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-2xl px-4 py-3 text-zinc-200 hover:bg-white/5"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      ) : null}
    </header>
  )
}
