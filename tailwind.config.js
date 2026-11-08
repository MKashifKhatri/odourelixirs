/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Newsreader', 'Georgia', 'Cambria', 'serif'],
      },
      colors: {
        ink: '#111111',
        muted: '#6f6f6f',
        surface: '#f6f6f6',
        line: '#e8e8e8',
      },
      maxWidth: { page: '1140px' },
    },
  },
  plugins: [],
};
