import { defineConfig } from "vite";
import Inspect from "vite-plugin-inspect";
import squint from "vite-plugin-squint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    squint(),
    Inspect()
  ],
});
