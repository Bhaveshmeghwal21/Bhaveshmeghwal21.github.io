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
          DEFAULT: '#ff3347',
          50: '#fff0f2',
          200: '#ffb4bd',
          300: '#ff8a95',
          400: '#ff3347',
          500: '#e0182f',
          600: '#a8101f',
        },
        ember: {
          DEFAULT: '#8f0f22',
          300: '#ff6b78',
          400: '#8f0f22',
          500: '#6b0a19',
        },
        'accent-2': '#8f0f22',
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
