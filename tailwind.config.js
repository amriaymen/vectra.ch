/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#121519',
        surface: {
          DEFAULT: '#181C21',
          hover: '#1F242A',
        },
        line: '#282E36',
        primary: {
          DEFAULT: '#D9FF41',
          hover: '#c4ec2a',
        },
        // Electric blue: the "process" tone. Keeps primary lime reserved for
        // actions. White on this is 7.66:1; lime on it is 6.69:1.
        accent: {
          DEFAULT: '#1B2CF5',
          hover: '#1526D0',
        },

        /*
         * Band-relative tokens. A component asks for a ROLE; the band it sits
         * in decides what that role means. Values live in globals.css under
         * [data-tone="…"], which Section sets — so a leaf like HeroMedia or
         * Badge becomes tone-correct through plain CSS inheritance, with no
         * prop, no context and no API change.
         *
         * Channel triplets, NOT hex. Tailwind's `<alpha-value>` placeholder
         * only composes inside a colour function: a custom property holding
         * `#282E36` makes `border-band-line/60` compile to a bare
         * `border-color: #282E36` with the /60 silently discarded. Every
         * migrated class keeps the exact alpha it has today, so that silent
         * drop would be invisible in review and fatal in the diff.
         *
         * The literal `background`/`surface`/`line` keys above stay: sticky
         * chrome (Header, BackToTop, MobileNav) floats OVER bands and has no
         * band of its own, so it must not resolve against one.
         */
        band: {
          bg: 'rgb(var(--band-bg) / <alpha-value>)',
          card: 'rgb(var(--band-card) / <alpha-value>)',
          chip: 'rgb(var(--band-chip) / <alpha-value>)',
          inset: 'rgb(var(--band-inset) / <alpha-value>)',
          line: 'rgb(var(--band-line) / <alpha-value>)',
          'line-strong': 'rgb(var(--band-line-strong) / <alpha-value>)',
          fg: 'rgb(var(--band-fg) / <alpha-value>)',
          lead: 'rgb(var(--band-lead) / <alpha-value>)',
          body: 'rgb(var(--band-body) / <alpha-value>)',
          muted: 'rgb(var(--band-muted) / <alpha-value>)',
          faint: 'rgb(var(--band-faint) / <alpha-value>)',
          danger: 'rgb(var(--band-danger) / <alpha-value>)',
          brand: 'rgb(var(--band-brand) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: [
          'TT Firs Neue Trl Regular',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
        extralight: [
          'TT Firs Neue Trl ExtraLight',
          'sans-serif',
        ],
        medium: [
          'TT Firs Neue Trl Medium',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
}
