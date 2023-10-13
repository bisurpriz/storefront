/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3bb77e",
        ["primary-dark"]: "#2b8a5e",
        ["primary-light"]: "#4fc08d",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
  screens: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
  fontFamily: {
    sans: ["Inter", "sans-serif"],
    serif: ["Merriweather", "serif"],
  },
};
