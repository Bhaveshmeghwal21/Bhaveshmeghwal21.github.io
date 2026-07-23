/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: '#09090b',
        surface: '#101218',
        'surface-2': '#161923',
        line: 'rgba(255,255,255,0.12)',
        accent: {
          DEFAULT: '#ff5a33',
          50: '#fff1ec',
          200: '#ffcab0',
          300: '#ffa375',
          400: '#ff5a33',
          500: '#ef4423',
          600: '#c9331a',
        },
        ember: {
          DEFAULT: '#ffb020',
          300: '#ffd166',
          400: '#ffb020',
          500: '#f2941a',
        },
        'accent-2': '#ffb020',
        muted: '#a1a1aa',
      },
      fontFamily: {
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        display: ['var(--font-heading)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      animation: {
        shimmer: 'shimmer 2.4s linear infinite',
        trace: 'trace 10s linear infinite',
        blink: 'blink 1.1s step-end infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        trace: {
          '0%': { strokeDashoffset: '440' },
          '100%': { strokeDashoffset: '0' },
        },
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
