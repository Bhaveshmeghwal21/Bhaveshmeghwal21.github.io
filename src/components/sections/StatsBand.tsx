import Reveal from '@/components/motion/Reveal'
import TelemetryStat from '@/components/ui/TelemetryStat'
import { site } from '@/content/site.mjs'

/** Thin telemetry strip: the four headline stats counting up like sensor readouts. */
export default function StatsBand() {
  return (
    <section className="section-container py-0">
      <Reveal className="grid gap-6 border-y border-white/10 py-10 md:grid-cols-4">
        {site.stats.map((stat, index) => (
          <TelemetryStat key={stat.label} label={stat.label} value={stat.value} index={index} />
        ))}
      </Reveal>
    </section>
  )
}
