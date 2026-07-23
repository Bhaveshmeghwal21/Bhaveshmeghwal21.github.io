let done = false
let resolvers: Array<() => void> = []

/** Called by <Preloader> when its exit animation completes (or when it decides to skip). */
export function markPreloaderDone() {
  done = true
  resolvers.forEach((resolve) => resolve())
  resolvers = []
}

/**
 * Resolves once the preloader has finished, so load-triggered hero animations
 * can wait for the curtain to lift. A 3s safety timeout guarantees the hero
 * never stays hidden if something goes wrong.
 */
export function whenPreloaderDone(): Promise<void> {
  if (done) return Promise.resolve()
  return new Promise((resolve) => {
    resolvers.push(resolve)
    setTimeout(resolve, 3000)
  })
}
