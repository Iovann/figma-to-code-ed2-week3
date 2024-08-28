/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        tokena_blue: "#006EFF",
        tokena_red: "#CB0101",
        tokena_white: "#FFFFFF",
        tokena_light_gray: "#F3F4F6",
        tokena_gray: "#D1D5DB",
        tokena_dark: "#1D1D1D",
        tokena_yellow: "#F2D604",
        tokena_green: "#01B130",
        tokena_dark_gray: "#6B7280",
        tokena_dark_2: "#0065EA",
        tokena_dark_blue_1: "#171923",
        tokena_dark_blue_2: "#292C3B",
      },
    },
  },
  plugins: [],
};
