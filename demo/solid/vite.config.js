import { defineConfig } from 'vite'
import squint from "vite-plugin-squint";
import solid from 'vite-plugin-solid'

export default defineConfig({
  plugins: [
    squint(),
    solid()
  ],
})
