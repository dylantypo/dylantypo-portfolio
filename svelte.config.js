import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import path from 'path';

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md'],
	layout: './src/lib/BlogLayout.svelte',
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
	extensions: ['.svelte', '.md'], // 🔥 Allow .md files as routes
	preprocess: [
		vitePreprocess({ script: true }),
		mdsvex(mdsvexOptions) // 🔥 Process markdown
	],
	kit: {
		adapter: adapter({
			fallback: '200.html',
			pages: 'build',
			assets: 'build',
			strict: false
		}),
		prerender: {
			entries: ['*'], // 🔥 Auto-discover everything (including .md)
			handleMissingId: 'ignore'
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
