/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./src/**/*.{js, jsx, ts, tsx}",
      "node_modules/preline/dist/*.js",
  ],
  theme: {
      extend: {
          fontFamily: {
              "satoshi-bold": ["Satoshi-bold", "sans-serif"],
          },
          colors: {
              "brics-blue": "#3B82F6",
              "brics-pen": "#A855F7",
              "brics-fin": "#1E3A8A",
              "brics-rej": "#EF4444",
              "custom-gray": "#D9D9D9",
              "custom-red": "#EF4444",
              "custom-dark-gray": "#171717"
          },
      },
      borderRadius: {
          custom: "100px",
          none: "0",
          sm: "0.125rem",
          DEFAULT: "0.25rem",
          md: "0.375rem",
          lg: "0.5rem",
          full: "9999px",
      },
      screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1200px",
          "2xl": "1536px",
      },
  },
  plugins: [require("@tailwindcss/forms"), require("preline/plugin")],
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
};