/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#F5F5F1',
          subtle: '#FAF9F6',
          muted: '#EAEAE4',
          dark: '#0D0D0D',
          darker: '#080808',
        },
        ink: {
          DEFAULT: '#0D0D0D',
          muted: '#62625D',
          subtle: '#9A9A94',
          border: 'rgba(13, 13, 13, 0.12)',
        },
        lime: {
          DEFAULT: '#CCFF00',
          accent: '#D4FF00',
          hover: '#B8E600',
          muted: 'rgba(204, 255, 0, 0.18)',
        }
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      letterSpacing: {
        'ultra-wide': '0.25em',
        'tighter-editorial': '-0.04em',
      }
    },
  },
  plugins: [],
}
