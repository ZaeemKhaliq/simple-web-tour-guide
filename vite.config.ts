import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// https://vite.dev
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/simple-tour-guide.ts"),
      formats: ["es"],
    },
    rolldownOptions: {
      external: ["lit", /^lit\//, /^@lit\//, "react", "react-dom"],
    },
  },
  plugins: [dts()],
});
