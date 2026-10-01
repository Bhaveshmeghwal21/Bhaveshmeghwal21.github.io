import { useEffect, useState } from 'react'
import { FiMoon, FiSun } from 'react-icons/fi'
import { getTheme, setTheme, type Theme } from '@/lib/theme'

export default function ThemeToggle() {
  // Unknown until mounted: the server can't see the visitor's choice. The icon
  // is switched by CSS (dark: variant), so it is right from the first paint.
  const [theme, setThemeState] = useState<Theme | null>(null)

  useEffect(() => {
    setThemeState(getTheme())
    // Stay in sync when the theme follows a system change.
    const observer = new MutationObserver(() => setThemeState(getTheme()))
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [])

  const toggle = () => {
    const next: Theme = getTheme() === 'dark' ? 'light' : 'dark'
    setTheme(next)
    setThemeState(next)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Dark mode"
      aria-pressed={theme === null ? undefined : theme === 'dark'}
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="grid h-10 w-10 place-items-center rounded-md text-muted transition-colors hover:bg-surface hover:text-fg sm:h-9 sm:w-9"
    >
      <FiMoon size={18} aria-hidden className="dark:hidden" />
      <FiSun size={18} aria-hidden className="hidden dark:block" />
    </button>
  )
}
