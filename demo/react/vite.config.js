import { defineConfig } from 'vite'
import squint from "vite-plugin-squint";
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    squint(),
    react()
  ],
})
