import { defineConfig } from 'vite'
import squint from "vite-plugin-squint";
import preact from '@preact/preset-vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    squint(),
    preact()
  ],
})
