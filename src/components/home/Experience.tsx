import Section from '@/components/Section'
import { site } from '@/content/site.mjs'

export default function Experience() {
  return (
    <Section id="experience" title="Experience">
      <ol className="space-y-8">
        {site.timeline.map((item) => (
          <li
            key={`${item.title}-${item.org}`}
            className="grid gap-1 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-8"
          >
            <p className="text-sm tabular-nums text-subtle sm:pt-0.5">{item.period}</p>
            <div>
              <h3 className="font-medium">
                {item.title}
                <span className="font-normal text-muted"> · {item.org}</span>
              </h3>
              <p className="mt-1.5 max-w-2xl text-sm leading-6 text-muted">{item.summary}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}
