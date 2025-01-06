import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
  plugins: [sveltekit()],
  
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,ts}'],
    setupFiles: ['./vitest.setup.js'],  // Optional: if you need a setup file
    coverage: {
      provider: 'c8',  // or 'istanbul'
      reporter: ['text', 'json', 'html'],
      exclude: [
        'src/routes/**/*.{ts,js}',
        '**/*.d.ts',
        '**/*.spec.{ts,js}',
        '**/*.test.{ts,js}'
      ]
    }
  }
});