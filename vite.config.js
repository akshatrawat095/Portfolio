import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0,
  },
  server: {
    port: 5173,
    open: true,
  },
  assetsInclude: ['**/*.jpg', '**/*.png', '**/*.webp', '**/*.mp3', '**/*.ogg'],
});
