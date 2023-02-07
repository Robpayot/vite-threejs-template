import { defineConfig } from 'vite'
import glsl from 'vite-plugin-glsl'
import * as path from 'path'

export default defineConfig({
  root: 'src',
  base: '/vite-2d-shader-template/', // for Github pages, otherwise use './'
  build: {
    outDir: '../dist',
  },
  server: {
    host: true, // to test on other devices with IP address
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [glsl()],
})
