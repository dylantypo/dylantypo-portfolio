import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [sveltekit()],

	test: {
		globals: true,
		environment: 'jsdom',
		include: ['src/**/*.{test,spec}.{js,ts}'],
		setupFiles: ['./vitest.setup.js'],

		deps: {
			optimizer: {
				web: {
					include: [],
					exclude: ['three', 'three-globe', '$lib/utils/three-helpers', '$lib/utils/module-loader']
				}
			}
		},

		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html'],
			exclude: [
				'src/routes/**/*.{ts,js}',
				'**/*.d.ts',
				'**/*.spec.{ts,js}',
				'**/*.test.{ts,js}',
				'src/lib/utils/three-helpers.ts',
				'src/lib/utils/module-loader.ts'
			]
		}
	}
});
