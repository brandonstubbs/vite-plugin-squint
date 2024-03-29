import { defineConfig } from "vite";
import Inspect from 'vite-plugin-inspect'
// import squint from 'vite-plugin-squint'; // FIXME somehow this isn't updated when updating the source file and running yarn install
import squint from '../index.mjs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    squint,
    Inspect()
  ]
});
