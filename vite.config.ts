import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { resolve } from "path";
import { analyzer } from "vite-bundle-analyzer";

export default defineConfig(({ mode }) => {
  const isAnalyze = mode === "analyze";
  const isTest = mode === "test";

  return {
    plugins: [
      svelte({
        compilerOptions: {
          runes: true,
          ...(isTest ? { compatibility: { componentApi: 4 } } : {}),
        },
        onwarn(warning, handler) {
          if (warning.code === "slot_element_deprecated") return;
          handler(warning);
        },
      }),
      // Bundle analyzer nur im analyze mode
      isAnalyze &&
        analyzer({
          analyzerMode: "static",
          openAnalyzer: true,
        }),
    ].filter(Boolean),
    // Simple alias mapping
    resolve: {
      alias: {
        cytoscape: "cytoscape/dist/cytoscape.umd.js",
        "@": resolve(__dirname, "src"),
      },
    },
    build: {
      target: "es2020",
      outDir: "dist",
      assetsDir: "assets",
      sourcemap: true,
      minify: false, // Für Svelte 5 Kompatibilität
      rollupOptions: {
        input: {
          main: resolve(__dirname, "src/index.ts"),
        },
        output: {
          // Foundry VTT erwartet eine spezifische Datei
          entryFileNames: "deathwatch.js",
          chunkFileNames: "assets/[name]-[hash].js",
          assetFileNames: "assets/[name]-[hash].[ext]",
          // manualChunks darf nicht gesetzt werden, wenn inlineDynamicImports true ist
          inlineDynamicImports: true,
          // Foundry VTT IIFE Format
          format: "iife",
          name: "DeathwatchModule",
          extend: true,
          globals: {
            jquery: "$",
            handlebars: "Handlebars",
          },
        },
        external: ["jquery", "handlebars"],
      },
    },
    server: {
      port: 3000,
      open: false,
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: ["./src/test/setup.ts"],
    },
  };
});
