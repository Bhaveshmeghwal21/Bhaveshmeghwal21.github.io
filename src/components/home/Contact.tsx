import ContactForm from '@/components/ContactForm'
import Section from '@/components/Section'
import { site } from '@/content/site.mjs'

const channels = [
  { label: 'Email', value: site.email, href: `mailto:${site.email}` },
  { label: 'LinkedIn', value: site.linkedinHandle, href: site.linkedin },
  { label: 'GitHub', value: site.githubHandle, href: site.github },
]

export default function Contact() {
  return (
    <Section id="contact" title="Get in touch" description={site.availability}>
      <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:gap-16">
        <dl className="space-y-5 text-sm">
          {channels.map((channel) => (
            <div key={channel.label}>
              <dt className="text-subtle">{channel.label}</dt>
              <dd className="mt-1">
                <a
                  href={channel.href}
                  className="break-words rounded-sm text-fg transition-colors hover:text-accent"
                  {...(channel.href.startsWith('http')
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  {channel.value}
                </a>
              </dd>
            </div>
          ))}
        </dl>
        <ContactForm />
      </div>
    </Section>
  )
}
