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
    extend: {}
  },
  plugins: [require("daisyui")],

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
