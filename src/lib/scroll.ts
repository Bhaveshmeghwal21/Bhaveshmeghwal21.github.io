import type Lenis from 'lenis'

let instance: Lenis | null = null

/** Called once by <SmoothScroll> so the rest of the app can share one Lenis instance. */
export function setLenisInstance(lenis: Lenis | null) {
  instance = lenis
}

export function getLenisInstance() {
  return instance
}

/**
 * Smooth-scrolls to an anchor, element, or offset using the shared Lenis
 * instance when available, falling back to native scrollIntoView.
 */
export function smoothScrollTo(target: string | number | HTMLElement, offset = -84) {
  if (instance) {
    instance.scrollTo(target, {
      offset,
      duration: 1.5,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
    })
    return
  }

  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: 'smooth' })
    return
  }

  const el = typeof target === 'string' ? document.querySelector(target) : target
  el?.scrollIntoView({ behavior: 'smooth' })
}
