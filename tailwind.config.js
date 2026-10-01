/** @type {import('tailwindcss').Config} */

// Colours are RGB channel triplets defined in globals.css, so the same class
// works in light and dark mode and still supports opacity modifiers (bg-fg/5).
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`

module.exports = {
  // dark: classes follow the theme chosen with the nav toggle (see src/lib/theme.ts).
  darkMode: ['selector', '[data-theme="dark"]'],
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: token('bg'),
        surface: token('surface'),
        fg: token('fg'),
        muted: token('muted'),
        subtle: token('subtle'),
        line: token('line'),
        accent: token('accent'),
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '64rem',
      },
    },
  },
  plugins: [],
}
