import Image from 'next/image'
import Link from 'next/link'
import { FiArrowRight, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { site } from '@/content/site.mjs'

const socials = [
  { label: 'GitHub', href: site.github, icon: FiGithub },
  { label: 'LinkedIn', href: site.linkedin, icon: FiLinkedin },
  { label: 'Email', href: `mailto:${site.email}`, icon: FiMail },
]

export default function Hero() {
  return (
    <section className="container-page pb-16 pt-14 sm:pb-20 sm:pt-24">
      <div className="flex items-center gap-4">
        <Image
          src="/images/avatar.jpg"
          alt={`Portrait of ${site.name}`}
          width={56}
          height={56}
          priority
          className="h-14 w-14 rounded-full border border-line object-cover"
        />
        <div>
          <p className="font-medium">{site.name}</p>
          <p className="text-sm text-muted">
            {site.role}
            <span className="block sm:inline">
              <span className="hidden sm:inline" aria-hidden>
                {' · '}
              </span>
              {site.location}
            </span>
          </p>
        </div>
      </div>

      <h1 className="mt-10 max-w-4xl text-balance text-[2.25rem] font-semibold leading-[1.12] tracking-tight sm:text-5xl sm:leading-[1.08]">
        {site.headline}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">{site.heroIntro}</p>

      <div className="mt-9 flex flex-wrap items-center gap-3">
        <Link href="/#work" className="btn-primary">
          View my work
          <FiArrowRight aria-hidden />
        </Link>
        <a
          href={site.resumeGeneral}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary"
        >
          Resume
        </a>
        <ul className="-ml-2.5 flex items-center gap-1 sm:ml-1">
          {socials.map(({ label, href, icon: Icon }) => (
            <li key={label}>
              <a
                href={href}
                aria-label={label}
                title={label}
                className="grid h-10 w-10 place-items-center rounded-lg text-muted transition-colors hover:bg-surface hover:text-fg"
                {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <Icon size={18} aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <ul className="mt-14 flex flex-col gap-2.5 text-sm text-muted sm:flex-row sm:flex-wrap sm:gap-x-8">
        {site.heroHighlights.map((item) => (
          <li key={item} className="flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </section>
  )
}
