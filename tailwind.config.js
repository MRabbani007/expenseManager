/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        slideleft: {
          "0%": { translateX: "0px" },
          "100%": { translateX: "500px" },
        },
        slideright: {
          "0%": { translateX: "0px" },
          "100%": { translateX: "-500px" },
        },
      },
      animation: {
        "slide-left": "slideleft 1s linear",
        "slide-right": "slideright 1s linear",
      },
    },
  },
  plugins: [],
};
