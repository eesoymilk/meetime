/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Noto Sans TC", "sans-serif"],
        serif: ["Noto Serif TC", "serif"],
        cursive: ["Itim", "cursive"],
      },
    },
  },
  plugins: [],
};
