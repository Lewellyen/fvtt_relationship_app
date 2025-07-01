import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('svelte').Config} */
export default {
  preprocess: vitePreprocess(),
  compilerOptions: {
    runes: true,
  },
  onwarn(warning, handler) {
    if (warning.code === "slot_element_deprecated") return;
    handler(warning);
  },
};
