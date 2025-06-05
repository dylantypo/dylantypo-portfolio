import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
	const isProd = mode === 'production';

	return {
		plugins: [sveltekit()],

		server: {
			fs: {
				allow: ['src/posts']
			}
		},

		build: {
			target: 'esnext',
			sourcemap: !isProd,
			rollupOptions: {
				output: {
					manualChunks: (id) => {
						if (id.includes('/routes/resume/') || id.includes('ResumeViewer'))
							return 'route-resume';
						if (id.includes('/routes/blog/')) return 'route-blog';
						if (id.includes('three/examples/')) return 'three-examples';
						if (id.includes('three-globe') || id.includes('globe.svelte')) return 'globe';
						if (id.includes('three') && !id.includes('three-globe')) return 'three-core';
						if (id.includes('gsap')) return 'gsap';
						if (id.includes('marked') || id.includes('dompurify')) return 'markdown';

						if (id.includes('node_modules') && !id.includes('three') && !id.includes('gsap')) {
							return 'vendor';
						}
					}
				}
			}
		},

		define: {
			'process.env.NODE_ENV': JSON.stringify(mode)
		}
	};
});
