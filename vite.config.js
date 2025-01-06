import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  
  server: {
    port: 3000,
    open: true,
  },
  
  preview: {
    port: 5000,
    strictPort: true,
  },
  
  build: {
    target: 'esnext',
    outDir: 'build',
    sourcemap: true,
  },
  
  optimizeDeps: {
    include: ['svelte', '@sveltejs/kit']
  },

  define: {
    'import.meta.vitest': 'undefined'
  }
});