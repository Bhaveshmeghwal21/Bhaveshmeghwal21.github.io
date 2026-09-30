import Section from '@/components/Section'
import { site } from '@/content/site.mjs'

export default function About() {
  return (
    <Section id="about" title="About">
      <div className="grid gap-12 md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] md:gap-16">
        <div>
          <div className="space-y-5 leading-7 text-muted">
            {site.aboutParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <dl className="mt-8 grid gap-4 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-subtle">Education</dt>
              <dd className="mt-1">
                {site.education}
                <br />
                <span className="text-muted">{site.school}</span>
              </dd>
            </div>
            <div>
              <dt className="text-subtle">Based in</dt>
              <dd className="mt-1">{site.location}</dd>
            </div>
          </dl>
        </div>

        <div>
          <h3 className="text-sm font-medium">Skills</h3>
          <dl className="mt-4 divide-y divide-line border-y border-line text-sm">
            {site.skillGroups.map((group) => (
              <div key={group.title} className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-4 py-3">
                <dt className="text-subtle">{group.title}</dt>
                <dd className="leading-6 text-fg">{group.items.join(', ')}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  )
}
