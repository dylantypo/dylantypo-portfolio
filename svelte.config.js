import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import path from 'path';

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md'],
	// 🔥 NO LAYOUT - Let dynamic routes handle rendering
	layout: false,
	highlight: {
		highlighter: async (code, lang = 'text') => {
			const { codeToHtml } = await import('shiki');
			const html = await codeToHtml(code, {
				lang,
				theme: 'github-dark'
			});
			return `{@html \`${html}\` }`;
		}
	}
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [
		mdsvex(mdsvexOptions), // Process .md for serialization fixes
		vitePreprocess({ script: true })
	],
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
