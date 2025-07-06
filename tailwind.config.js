import flowbitePlugin from "flowbite/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,ts,hbs}",
    "./templates/**/*.hbs",
    "node_modules/flowbite/**/*.js",
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
  plugins: [flowbitePlugin],
};
