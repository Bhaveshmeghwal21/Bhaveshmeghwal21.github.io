import { site } from '@/content/site.mjs'

const links = [
  { label: 'GitHub', href: site.github },
  { label: 'LinkedIn', href: site.linkedin },
  { label: 'Email', href: `mailto:${site.email}` },
]

export default function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="container-page flex flex-col gap-4 py-10 text-sm text-subtle sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <ul className="flex gap-6">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="rounded-sm transition-colors hover:text-fg"
                {...(link.href.startsWith('http')
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
