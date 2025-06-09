import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(({ mode, command }) => {
	const isProd = mode === 'production';

	return {
		plugins: [
			sveltekit(),
			isProd &&
				visualizer({
					filename: 'dist/bundle-stats.html',
					open: false,
					gzipSize: true,
					brotliSize: true,
					template: 'treemap'
				})
		].filter(Boolean),

		server: {
			fs: {
				allow: ['src/posts']
			}
		},

		build: {
			target: 'esnext',
			sourcemap: !isProd,
			minify: isProd ? 'esbuild' : false,
			cssMinify: isProd,
			reportCompressedSize: isProd,
			chunkSizeWarningLimit: 800,

			rollupOptions: {
				output: {
					manualChunks: (id) => {
						if (id.includes('src/routes/+layout')) return 'layout';
						if (id.includes('src/routes/+page.svelte')) return 'home';
						if (id.includes('/routes/resume/') || id.includes('ResumeViewer'))
							return 'route-resume';
						if (id.includes('/routes/blog/')) return 'route-blog';
						if (id.includes('three/examples/')) return 'three-examples';
						if (id.includes('three-globe') || id.includes('globe.svelte')) return 'globe';
						if (id.includes('gsap')) return 'gsap';
						if (id.includes('marked') || id.includes('dompurify')) return 'markdown';

						if (id.includes('node_modules')) {
							if (id.includes('three')) return 'vendor-three';
							if (id.includes('firebase')) return 'vendor-firebase';
							if (id.includes('xmlbuilder2')) return 'vendor-xml';
							if (id.includes('protobufjs') || id.includes('open-simplex-noise')) {
								return 'vendor-small';
							}
							if (
								!id.includes('three') &&
								!id.includes('gsap') &&
								!id.includes('marked') &&
								!id.includes('dompurify')
							) {
								return 'vendor';
							}
						}
					}
				}
			}
		},

		optimizeDeps: {
			include: ['gsap', 'marked', 'dompurify', 'three-globe'],
			exclude: ['three']
		},

		define: {
			'process.env.NODE_ENV': JSON.stringify(mode),
			__BUILD_TIME__: JSON.stringify(new Date().toISOString()),
			__PROD__: isProd
		},

		preview: {
			port: 4173,
			host: true
		}
	};
});
