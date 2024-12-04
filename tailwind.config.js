/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        oranges: "#FC8500",
      },
      fontFamily: {
        violetSans: ["VioletSans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
