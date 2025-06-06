import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(({ mode, command }) => {
	const isProd = mode === 'production';
	const isBuild = command === 'build';

	return {
		plugins: [
			sveltekit(),

			// 📊 Bundle Analysis - generates dist/stats.html
			isProd &&
				visualizer({
					filename: 'dist/bundle-stats.html',
					open: false, // Don't auto-open
					gzipSize: true,
					brotliSize: true,
					template: 'treemap' // Better visualization
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

			// 🚀 Performance optimizations
			minify: isProd ? 'esbuild' : false,
			cssMinify: isProd,

			rollupOptions: {
				output: {
					// 📦 Optimized chunking strategy
					manualChunks: (id) => {
						// Critical path - keep small
						if (id.includes('src/routes/+layout')) return 'layout';
						if (id.includes('src/routes/+page.svelte')) return 'home';

						// Route-based chunks
						if (id.includes('/routes/resume/') || id.includes('ResumeViewer'))
							return 'route-resume';
						if (id.includes('/routes/blog/')) return 'route-blog';

						// Heavy 3D libraries - separate chunks
						if (id.includes('three/examples/')) return 'three-examples';
						if (id.includes('three-globe') || id.includes('globe.svelte')) return 'globe';
						if (id.includes('three') && !id.includes('three-globe')) return 'three-core';

						// Animation library
						if (id.includes('gsap')) return 'gsap';

						// Content processing
						if (id.includes('marked') || id.includes('dompurify')) return 'markdown';

						// Everything else from node_modules
						if (
							id.includes('node_modules') &&
							!id.includes('three') &&
							!id.includes('gsap') &&
							!id.includes('marked') &&
							!id.includes('dompurify')
						) {
							return 'vendor';
						}
					},

					// 🎯 Optimize chunk names for caching
					chunkFileNames: isProd ? 'chunks/[name]-[hash].js' : '[name].js',
					assetFileNames: isProd ? 'assets/[name]-[hash].[ext]' : '[name].[ext]'
				}
			},

			// 🔧 Advanced build options
			reportCompressedSize: isProd,
			chunkSizeWarningLimit: 1000 // Warn for chunks > 1MB
		},

		// ⚡ Optimization settings
		optimizeDeps: {
			include: ['lodash', 'gsap', 'marked', 'dompurify'],
			exclude: [
				'three', // Dynamic import
				'three-globe' // Dynamic import
			]
		},

		define: {
			'process.env.NODE_ENV': JSON.stringify(mode),
			// 🎯 Performance flags
			__BUILD_TIME__: JSON.stringify(new Date().toISOString()),
			__PROD__: isProd
		},

		// 🚀 Preview server optimization
		preview: {
			port: 4173,
			host: true,
			headers: {
				'Cache-Control': 'public, max-age=31536000, immutable'
			}
		}
	};
});
