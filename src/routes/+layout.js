export const prerender = true;

export async function load({ url, route }) {
	const routeId = route.id;
	const preloadHints = [];

	// Route-specific resource hints
	switch (routeId) {
		case '/':
			// Homepage: Globe + Three.js resources
			preloadHints.push(
				{ href: '/geo/2_no_clouds_4k.webp', as: 'image', type: 'image/webp' },
				{ href: '/fonts/Kenney Future_Regular.json', as: 'fetch', type: 'application/json' }
			);
			break;

		case '/resume':
			// Resume: PDF fonts + Inter font
			preloadHints.push(
				{ href: '/fonts/Inter-Regular.woff2', as: 'font', type: 'font/woff2' },
				{ href: '/fonts/OpenDyslexicMono-Regular.woff2', as: 'font', type: 'font/woff2' }
			);
			break;

		case '/blog':
		case '/blog/posts/[slug]':
			// Blog: Inter font for content
			preloadHints.push({ href: '/fonts/Inter-Regular.woff2', as: 'font', type: 'font/woff2' });
			break;

		case '/contact':
			// Contact form: Basic resources only
			break;

		default:
			// No extra preloads for unknown routes
			break;
	}

	return {
		preloadHints,
		routeId,
		timestamp: Date.now()
	};
}
