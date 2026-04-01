import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,

    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      name: 'confettiApp',
      formats: ['iife'],
      fileName: () => 'app.js',
    },

    minify: 'terser',
    terserOptions: {
      mangle: {
        toplevel: true,
        properties: true,
        reserved: ['confettiApp'],
      },
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
      format: {
        comments: false,
      },
    },
  },
});