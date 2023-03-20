/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./client/**/*.{js,jsx,ts,tsx}",
    "./client/containers/landing-page-container.jsx",
    "./client/components/**/*.{js,jsx,ts,tsx}"
  ],
  mode: "jit",
  purge: ["./dist/*.html", "./client/**/*.{js,jsx,ts,tsx,vue}"],
  theme: {
    screens: {
      xsm: { min: "480px" },
      sm: { min: "640px" },
      // => @media (min-width: 640px) { ... }
      md: { min: "768px" },
      // => @media (min-width: 768px) { ... }
      lgmax: { min: "1024px" },
      lg: "1024px",
      // => @media (min-width: 1024px) { ... }
      xl: "1280px",
      // => @media (min-width: 1280px) { ... }
      "2xl": "1536px"
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      fontFamily: { sans: ["Inter var"] }
    }
  },
  plugins: [require("daisyui"), require("@tailwindcss/forms")],

  daisyui: {
    styled: true,
    themes: false,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark"
  }
};
