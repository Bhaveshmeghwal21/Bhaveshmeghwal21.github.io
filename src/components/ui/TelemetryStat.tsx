import AnimatedCounter from '@/components/ui/AnimatedCounter'

type TelemetryStatProps = {
  label: string
  value: string
  index?: number
  className?: string
}

/**
 * Hero/outcome stat styled like a flight-log readout: a small "SYS.0x" tag,
 * a counted-up value, and a caption underneath.
 */
export default function TelemetryStat({ label, value, index, className = '' }: TelemetryStatProps) {
  return (
    <div className={className}>
      {typeof index === 'number' ? (
        <div className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-accent-400/70">
          SYS.{String(index + 1).padStart(2, '0')}
        </div>
      ) : null}
      <AnimatedCounter value={value} className="metric-value mt-1 block" />
      <div className="mt-1 text-sm text-zinc-500">{label}</div>
    </div>
  )
}
