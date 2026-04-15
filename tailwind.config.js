/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'tt-navy':  '#1c3480',
        'tt-dark':  '#0d1b4b',
        'tt-blue':  '#3b82f6',
        'tt-cyan':  '#06b6d4',
        'tt-green': '#22c55e',
        'tt-white': '#ffffff',
        'tt-bg':    '#080e24',
      },
      fontFamily: {
        heading: ['"Barlow Condensed"', 'sans-serif'],
        mono:    ['"Space Mono"',       'monospace'],
        body:    ['Inter',              'sans-serif'],
      },
      animation: {
        'marquee':     'marquee 35s linear infinite',
        'marquee-rev': 'marquee 28s linear infinite reverse',
        'blink':       'blink 1s step-end infinite',
        'float':       'float 6s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
}
