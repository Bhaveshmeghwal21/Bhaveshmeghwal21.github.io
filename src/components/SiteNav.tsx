import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import { site } from '@/content/site.mjs'

export default function SiteNav() {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  // Close the mobile menu after any navigation, including in-page hash jumps.
  useEffect(() => {
    const close = () => setOpen(false)
    router.events.on('routeChangeStart', close)
    router.events.on('hashChangeStart', close)
    return () => {
      router.events.off('routeChangeStart', close)
      router.events.off('hashChangeStart', close)
    }
  }, [router.events])

  // Only page routes get an active state; hash links point into the homepage.
  const isActive = (href: string) => !href.includes('#') && router.pathname.startsWith(href)

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-md">
      <nav aria-label="Main" className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="rounded-md text-[15px] font-semibold tracking-tight">
          {site.name}
        </Link>

        <ul className="hidden items-center gap-1 sm:flex">
          {site.navItems.map((item) => {
            const active = isActive(item.href)
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`rounded-md px-3 py-2 text-sm transition-colors ${
                    active ? 'text-fg' : 'text-muted hover:text-fg'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            )
          })}
          <li className="ml-3">
            <a
              href={site.resumeGeneral}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary h-9 px-3.5"
            >
              Resume
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="-mr-2 grid h-10 w-10 place-items-center rounded-md text-muted hover:text-fg sm:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <FiX size={20} aria-hidden /> : <FiMenu size={20} aria-hidden />}
        </button>
      </nav>

      {open ? (
        <div id="mobile-menu" className="border-t border-line sm:hidden">
          <ul className="container-page flex flex-col py-3">
            {site.navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-md py-2.5 text-[15px] text-muted hover:text-fg"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={site.resumeGeneral}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-md py-2.5 text-[15px] text-muted hover:text-fg"
              >
                Resume
              </a>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  )
}
