import { defineConfig } from 'vite'
import squint from "vite-plugin-squint";
import { qwikVite } from '@builder.io/qwik/optimizer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    squint(),
    qwikVite({
      csr: true,
    }),
  ],
})
