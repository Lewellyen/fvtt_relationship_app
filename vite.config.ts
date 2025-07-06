import { defineConfig } from "vite";
import { resolve } from "path";
import { analyzer } from "vite-bundle-analyzer";

export default defineConfig(({ mode }) => {
  const isAnalyze = mode === "analyze";
  const isTest = mode === "test";

  return {
    plugins: [
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
      minify: false,
      rollupOptions: {
        input: {
          main: resolve(__dirname, "src/index.ts"),
        },
        output: {
          // Foundry VTT erwartet eine spezifische Datei
          entryFileNames: "relationship-app.js",
          chunkFileNames: "assets/[name]-[hash].js",
          assetFileNames: "assets/[name]-[hash].[ext]",
          // manualChunks darf nicht gesetzt werden, wenn inlineDynamicImports true ist
          inlineDynamicImports: true,
          // Foundry VTT IIFE Format
          format: "iife",
          name: "Relationship-App",
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
