/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}'
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        'primary': ['"Josefin Sans"', 'sans-serif'],
        'firaCode': ['"Fira Code"', 'monospace']
      },
      colors: {
        primary: "#1660E7",
        secondary: "#E30047"
      },
      backgroundColor: {
        dark: "#121212",
        light: "#fff"
      }
    },
  },
  plugins: [],
}
