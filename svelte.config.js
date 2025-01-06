import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess({ script: true }),
  kit: {
    adapter: adapter({
      fallback: '200.html',
      pages: 'build',
      assets: 'build',
    }),
    prerender: {
      entries: ['*'],
    },
    alias: {
      $lib: path.resolve('./src/lib')
    }
  },
};

export default config;