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
