import { defineConfig } from 'vite'
import glsl from 'vite-plugin-glsl'
import * as path from 'path'

export default defineConfig({
  root: 'src',
  base: '/vite-threejs-template/', // for Github pages, otherwise use './'
  build: {
    outDir: '../dist',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [glsl()],
})
