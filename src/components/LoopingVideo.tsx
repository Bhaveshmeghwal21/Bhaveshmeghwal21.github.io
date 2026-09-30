import { useEffect, useRef, useState } from 'react'
import { FiPause, FiPlay } from 'react-icons/fi'
import type { ProjectVideo } from '@/lib/types'

/**
 * A short, silent, looping clip that behaves like a GIF but at a fraction of the size.
 *
 * - Plays only while on screen, and never starts on its own for visitors who
 *   prefer reduced motion (they see the poster and can press play).
 * - Always shows a pause/play button, since looping motion must be stoppable.
 */
export default function LoopingVideo({ src, poster, alt }: ProjectVideo) {
  const ref = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  // null until the visitor presses the button; then their choice wins over autoplay.
  const [userChoice, setUserChoice] = useState<'play' | 'pause' | null>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const wantsPlay = userChoice ? userChoice === 'play' : !reduceMotion

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && wantsPlay) {
          // play() rejects if the browser blocks it; the poster stays up and the button still works.
          video.play().catch(() => setPlaying(false))
        } else {
          video.pause()
        }
      },
      { threshold: 0.25 }
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [userChoice])

  const toggle = () => {
    const video = ref.current
    if (!video) return
    if (video.paused) {
      setUserChoice('play')
      video.play().catch(() => setPlaying(false))
    } else {
      setUserChoice('pause')
      video.pause()
    }
  }

  return (
    <figure className="relative overflow-hidden rounded-xl border border-line bg-surface">
      <video
        ref={ref}
        src={src}
        poster={poster}
        width={960}
        height={540}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={alt}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="block aspect-video h-auto w-full object-cover"
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? 'Pause clip' : 'Play clip'}
        className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-black/80"
      >
        {playing ? <FiPause size={16} aria-hidden /> : <FiPlay size={16} aria-hidden className="translate-x-px" />}
      </button>
    </figure>
  )
}
