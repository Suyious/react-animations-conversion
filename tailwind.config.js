/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "background": "#0A0A0A",
        "background-hover": "#ffffff1f",
        "foreground": "#fff",
        "foreground-secondary": "#999999",
        "accent": "#FF4533",
      },
      boxShadow: {
        "primary": "0px 0px 1px 5px rgba(255, 69, 51, 0.3)",
        "secondary": "0px 0px 3px 4px rgba(255, 69, 51, 0.2)"
      }
    },
  },
  plugins: [],
}

