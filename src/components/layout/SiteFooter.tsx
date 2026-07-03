import Link from 'next/link'
import { site } from '@/content/site.mjs'

export default function SiteFooter() {
  return (
    <footer className="section-container pt-0">
      <div className="flex flex-col gap-6 border-t border-white/10 pt-8 text-sm text-zinc-400 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="font-display text-lg text-zinc-100">{site.name}</p>
          <p className="mt-2 leading-7">
            I build systems that make hard engineering readable, usable, and worth shipping.
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link href="/projects" className="hover:text-white">
            All projects
          </Link>
          <Link href="/blog" className="hover:text-white">
            Blog
          </Link>
          <a href={`mailto:${site.email}`} className="hover:text-white">
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}
