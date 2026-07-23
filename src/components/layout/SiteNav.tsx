'use client'

import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiArrowUpRight, FiMenu, FiX } from 'react-icons/fi'
import { site } from '@/content/site.mjs'
import { smoothScrollTo } from '@/lib/scroll'
import Magnetic from '@/components/ui/Magnetic'

const routeLinks = [
  { label: 'Projects', href: '/projects' },
  { label: 'Blog', href: '/blog' },
]

export default function SiteNav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeHash, setActiveHash] = useState('')
  const router = useRouter()
  const isHome = router.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!isHome) return

    const sections = site.navItems
      .map((item) => document.getElementById(item.href.replace('#', '')))
      .filter((el): el is HTMLElement => Boolean(el))

    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveHash(`#${entry.target.id}`)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    )

    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [isHome])

  const handleHashClick = (event: React.MouseEvent, href: string) => {
    if (!isHome) return
    event.preventDefault()
    smoothScrollTo(href)
    setOpen(false)
  }

  const linkClass = (active: boolean) =>
    `focus-ring relative pb-1 hover:text-white after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-gradient-to-r after:from-accent-400 after:to-ember-400 after:transition-transform after:duration-300 ${
      active ? 'text-white after:scale-x-100' : 'text-zinc-300'
    }`

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-500 ${
        scrolled
          ? 'border-white/10 bg-[#09090b]/85 py-0 backdrop-blur'
          : 'border-transparent bg-transparent py-1.5'
      }`}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <Link href="/" className="flex items-center gap-3" data-cursor>
          <div className="min-w-0">
            <div className="font-display text-base font-semibold text-zinc-50">{site.name}</div>
            <div className="text-sm text-zinc-500">Robotics, AI, product systems</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-5 text-sm md:flex">
          {site.navItems.map((item) =>
            isHome ? (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleHashClick(e, item.href)}
                className={linkClass(activeHash === item.href)}
              >
                {item.label}
              </a>
            ) : (
              <Link key={item.href} href={`/${item.href}`} className={linkClass(false)}>
                {item.label}
              </Link>
            )
          )}
          {routeLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={linkClass(router.pathname.startsWith(item.href))}
            >
              {item.label}
            </Link>
          ))}
          <Magnetic strength={0.3}>
            <a
              href={site.resumeGeneral}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor
              className="button-secondary text-sm"
            >
              Resume
              <FiArrowUpRight />
            </a>
          </Magnetic>
        </nav>

        <button
          type="button"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          data-cursor
          className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-zinc-100 md:hidden"
          onClick={() => setOpen((current) => !current)}
        >
          {open ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-white/10 md:hidden"
          >
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-4">
              {site.navItems.map((item) =>
                isHome ? (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleHashClick(e, item.href)}
                    className="rounded-2xl px-4 py-3 text-zinc-200 hover:bg-white/5"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    href={`/${item.href}`}
                    className="rounded-2xl px-4 py-3 text-zinc-200 hover:bg-white/5"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              )}
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
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
