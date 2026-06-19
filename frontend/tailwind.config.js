/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          purple: "#7b39fc",
          "dark-purple": "#2b2344",
          surface: "#09090b",
        },
      },
      fontFamily: {
        manrope: ["Manrope", "sans-serif"],
        cabin: ["Cabin", "sans-serif"],
        instrument: ["Instrument Serif", "serif"],
        inter: ["Inter", "sans-serif"],
      },
      animation: {
        marquee: "marquee 30s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};