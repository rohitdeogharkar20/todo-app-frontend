/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      keyframes: {
        slideIn: {
          "0%": { transform: "translateY(-20px) scale(0.98)", opacity: "0" },
          "100%": { transform: "translateY(0) scale(1)", opacity: "1" },
        },
        slideOut: {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(20px)", opacity: "0" },
        },
      },
      animation: {
        slideIn: "slideIn 0.4s ease-out forwards",
        slideOut: "slideOut 0.3s ease-in forwards",
      },
    },
  },
  plugins: [],
};
