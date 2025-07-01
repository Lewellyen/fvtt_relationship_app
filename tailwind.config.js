import flowbitePlugin from "flowbite/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{svelte,ts}",
    "node_modules/flowbite-svelte/**/*.{svelte,js,ts}",
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
