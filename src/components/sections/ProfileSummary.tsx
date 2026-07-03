import Reveal from '@/components/motion/Reveal'
import { site } from '@/content/site.mjs'

export default function ProfileSummary() {
  return (
    <section id="about" className="section-container">
      <div className="grid gap-10 lg:grid-cols-[18rem_minmax(0,1fr)]">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <div className="space-y-4 border-l border-white/10 pl-4 text-sm leading-7 text-zinc-300">
            <div className="font-mono text-xs uppercase tracking-[0.14em] text-zinc-500">
              Based in
            </div>
            <p>{site.location}</p>
            <div className="font-mono text-xs uppercase tracking-[0.14em] text-zinc-500">
              Education
            </div>
            <p>{site.graduation}</p>
            <div className="font-mono text-xs uppercase tracking-[0.14em] text-zinc-500">
              Contact
            </div>
            <a href={`mailto:${site.email}`} className="block text-sky-300 hover:text-sky-200">
              {site.email}
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="eyebrow">About</div>
          <h2 className="mt-5 max-w-4xl font-display text-4xl leading-tight text-zinc-50 md:text-5xl">
            Drones sit at the center. Control, software, and product work build out from there.
          </h2>
          <div className="mt-6 max-w-4xl space-y-5 text-base leading-8 text-zinc-300">
            {site.aboutParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-10 grid gap-10 md:grid-cols-2">
            <div>
              <h3 className="font-display text-2xl text-zinc-50">Focus</h3>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-zinc-300">
                {site.focusAreas.map((item) => (
                  <li key={item} className="border-b border-white/8 pb-3">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-display text-2xl text-zinc-50">Experience</h3>
              <div className="mt-4 space-y-5">
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
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal className="mt-14 border-t border-white/10 pt-8" delay={0.12}>
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {site.skillGroups.map((group) => (
            <div key={group.title}>
              <h3 className="font-display text-xl text-zinc-50">{group.title}</h3>
              <ul className="mt-4 space-y-2 text-sm leading-7 text-zinc-400">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
