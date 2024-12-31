import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    sveltekit(),
  ],
  test: {
    globals: true, // Enables global variables like `describe` and `it` for Vitest
    environment: 'jsdom', // Simulates a browser-like environment for testing
    include: ['src/**/*.{test,spec}.{js,ts}'], // Matches test files in the project
  },
  server: {
    port: 3000, // Default dev server port
    open: true, // Automatically open the browser on dev server start
  },
  preview: {
    port: 5000, // Preview server port
    strictPort: true, // Ensures the server fails if the port is already in use
  },
  build: {
    target: 'esnext', // Future-proof JavaScript target for modern browsers
    outDir: 'build', // Ensures consistent output directory
    sourcemap: true, // Generate source maps for easier debugging
  },
  optimizeDeps: {
    include: ['svelte', '@sveltejs/kit'], // Pre-bundles dependencies for faster builds
	exclude: ['chunk-6NTGOH3P.js', 'chunk-OA26F2SJ.js'], // Add problematic dependencies heren
  },
});
