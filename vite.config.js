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
						// 🎯 Add route splitting to your existing logic
						if (id.includes('/routes/mav/')) return 'route-mav';
						if (id.includes('/routes/ballz/')) return 'route-ballz';
						if (id.includes('/routes/snake/')) return 'route-snake';
						if (id.includes('/routes/resume/') || id.includes('ResumeViewer'))
							return 'route-resume';

						// Your existing three.js chunking (keep as-is)
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
		},

		// 🎯 Add this for better optimization
		define: {
			'process.env.NODE_ENV': JSON.stringify(mode)
		}
	};
});
