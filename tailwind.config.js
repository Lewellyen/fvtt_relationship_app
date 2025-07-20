/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,ts,hbs}",
    "./templates/**/*.hbs",
    "./styles/**/*.css",
  ],
  safelist: [
    { pattern: /^(px|py|rounded|font|transition|duration)-/ },
    { pattern: /^(bg|hover:bg|focus:ring)-/ }
  ],
  darkMode: ["class", ".dark-theme"],
  theme: {
    extend: {
      colors: {
        background: "var(--background-color)",
        foreground: "var(--font-color)",
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",
      },
    },
  },
};
