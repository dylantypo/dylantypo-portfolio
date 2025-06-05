import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extension: '.md'
		})
	],
	extensions: ['.svelte', '.md'],

	kit: {
		adapter: adapter({
			fallback: '200.html',
			pages: 'build',
			assets: 'build',
			strict: false
		}),
		prerender: {
			entries: ['*'],
			handleMissingId: 'ignore',
			crawl: true
		},
		alias: {
			$lib: path.resolve('./src/lib')
		}
	},
	compilerOptions: {
		runes: true
	}
};

export default config;
