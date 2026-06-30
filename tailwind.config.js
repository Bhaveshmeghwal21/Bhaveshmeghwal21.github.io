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
        // Deep "mission control" base tones
        primary: {
          DEFAULT: '#0a0b1a',
          light: '#111327',
        },
        accent: {
          DEFAULT: '#1b1d3a',
          light: '#252a4d',
        },
        // Signature gradient endpoints: electric cyan -> violet
        highlight: {
          DEFAULT: '#22d3ee',
          light: '#a78bfa',
        },
        dark: {
          bg: '#05060f',
          card: '#0c0e22',
          lighter: '#161938',
        },
        neon: {
          cyan: '#22d3ee',
          sky: '#38bdf8',
          blue: '#6366f1',
          violet: '#8b5cf6',
          pink: '#f472b6',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'ui-monospace', 'monospace'],
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-up': 'slideUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.8s ease-out',
        'spin-slow': 'spin 18s linear infinite',
        'spin-reverse': 'spin 24s linear infinite reverse',
        marquee: 'marquee 32s linear infinite',
        'gradient-x': 'gradientX 6s ease infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        'border-flow': 'borderFlow 4s linear infinite',
        'grid-pan': 'gridPan 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        borderFlow: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        gridPan: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '50px 50px' },
        },
      },
      boxShadow: {
        glow: '0 0 24px rgba(34, 211, 238, 0.35)',
        'glow-lg': '0 0 48px rgba(34, 211, 238, 0.45)',
        'glow-violet': '0 0 40px rgba(139, 92, 246, 0.4)',
        'inner-glow': 'inset 0 1px 0 0 rgba(255,255,255,0.06)',
      },
      backgroundImage: {
        'aero-gradient': 'linear-gradient(135deg, #22d3ee 0%, #6366f1 50%, #8b5cf6 100%)',
        'radial-fade': 'radial-gradient(circle at center, rgba(34,211,238,0.12) 0%, transparent 70%)',
      },
    },
  },
  plugins: [],
}
