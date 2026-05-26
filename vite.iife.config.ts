import { resolve } from "path";
import { defineConfig } from "vite";

// https://vite.dev
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/simple-tour-guide.ts"),
      name: "SimpleTourGuide",
      formats: ["iife"],
      fileName: () => "simple-web-tour-guide.iife.js",
    },
    emptyOutDir: false,
  },
});
