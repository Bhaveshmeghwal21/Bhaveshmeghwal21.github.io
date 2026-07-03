import Reveal from '@/components/motion/Reveal'
import { site } from '@/content/site.mjs'

const focusAreas = [
  'PX4 control work and autonomy',
  'Mission planning and operator workflows',
  'Applied AI products with real users',
  'System design across frontend and backend',
]

export default function ProfileSummary() {
  return (
    <section id="about" className="section-container">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <Reveal className="surface p-6 md:p-8">
          <div className="eyebrow">About</div>
          <h2 className="mt-5 font-display text-4xl leading-tight text-zinc-50">
            I like hard systems and clear interfaces.
          </h2>
          <p className="mt-5 text-base leading-8 text-zinc-300">{site.shortBio}</p>
          <p className="mt-4 text-base leading-8 text-zinc-400">{site.graduation}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {focusAreas.map((item) => (
              <span key={item} className="chip">
                {item}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal className="surface p-6 md:p-8" delay={0.08}>
          <div className="eyebrow">Experience</div>
          <div className="mt-6 space-y-5">
            {site.timeline.map((item) => (
              <article key={item.title} className="border-l border-white/10 pl-4">
                <div className="font-display text-xl text-zinc-50">{item.title}</div>
                <div className="mt-1 text-sm text-sky-300">{item.org}</div>
                <div className="mt-2 text-sm uppercase tracking-[0.14em] text-zinc-500">
                  {item.period}
                </div>
                <p className="mt-3 text-sm leading-7 text-zinc-400">{item.summary}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
