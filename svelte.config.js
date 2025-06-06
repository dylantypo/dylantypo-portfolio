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
			strict: false,
			precompress: true
		}),
		prerender: {
			entries: ['*'],
			handleMissingId: 'ignore',
			crawl: true,
			concurrency: 4
		},
		alias: {
			$lib: path.resolve('./src/lib'),
			$utils: path.resolve('./src/lib/utils')
		}
	},
	compilerOptions: {
		runes: true
	}
};

export default config;
