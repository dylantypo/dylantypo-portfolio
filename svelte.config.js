import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess({ script: true }), // Enable script preprocessing
  kit: {
    adapter: adapter({
      fallback: '200.html',
      pages: 'build',
      assets: 'build',
    }),
    prerender: {
      entries: ['*'], // Prerender all routes
    },
  },
};

export default config;
