import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),
    kit: {
        adapter: adapter({
            fallback: '200.html',
            pages: 'build',
            assets: 'build',
            // by default, `static` will output client and server
            // but the server runtime is unnecessary when prerendering
            prerender: true
        }),
    },
};

export default config;
