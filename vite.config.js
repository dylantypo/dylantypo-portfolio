import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
	const isProd = mode === 'production';

	return {
		plugins: [sveltekit()],

		build: {
			target: 'esnext',
			sourcemap: !isProd,
			rollupOptions: {
				output: {
					manualChunks: (id) => {
						// Break up the three.js dependencies
						if (id.includes('three/examples/')) {
							return 'three-examples';
						}
						if (id.includes('three-globe') || id.includes('globe.svelte')) {
							return 'globe';
						}
						if (id.includes('three') && !id.includes('three-globe')) {
							return 'three-core';
						}
						if (id.includes('gsap')) {
							return 'gsap';
						}
						if (id.includes('node_modules') && !id.includes('three') && !id.includes('gsap')) {
							return 'vendor';
						}
						if (id.includes('marked') || id.includes('dompurify')) {
							return 'markdown';
						}
					}
				}
			}
		}
	};
});
