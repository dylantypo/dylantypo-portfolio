import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { readdir } from 'fs/promises';
import { join } from 'path';
import path from 'path';

// Auto-discover blog posts
async function getBlogEntries() {
	try {
		const postsDir = join(process.cwd(), 'static/blog/posts');
		const files = await readdir(postsDir);
		return files
			.filter((file) => file.endsWith('.md'))
			.map((file) => `/blog/${file.replace('.md', '')}`);
	} catch (error) {
		console.warn('Could not read blog posts:', error);
		return [];
	}
}

const blogEntries = await getBlogEntries();
console.log('📝 Auto-discovered blog posts:', blogEntries);

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess({ script: true }),
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			strict: false
		}),
		prerender: {
			entries: [
				'*',
				'/blog',
				...blogEntries // Auto-add all blog posts
			],
			handleMissingId: 'warn'
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
