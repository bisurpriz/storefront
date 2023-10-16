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
        secondary: "#c72b98",
        ["secondary-dark"]: "#a21e7c",
        ["secondary-light"]: "#d13daa",
        error: "#dc2626",
        ["error-dark"]: "#b91c1c",
        ["error-light"]: "#ef4444",
        info: "#0891b2",
        ["info-dark"]: "#0e7490",
        ["info-light"]: "#06b6d4",
        success: "#16a34a",
        ["success-dark"]: "#15803d",
        ["success-light"]: "#22c55e",
        warning: "#ea580c",
        ["warning-dark"]: "#c2410c",
        ["warning-light"]: "#f97316",
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
