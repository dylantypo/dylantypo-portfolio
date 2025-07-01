<script lang="ts">
	import { onMount } from 'svelte';

	type PreloadHint = {
		href: string;
		as: string;
		type?: string;
	};

	let { children, data } = $props<{
		children: any;
		data?: {
			preloadHints?: PreloadHint[];
			routeId?: string;
			timestamp?: number;
		};
	}>();

	// Apply route-specific preloads
	onMount(() => {
		if (data?.preloadHints?.length) {
			data.preloadHints.forEach((hint: PreloadHint) => {
				// Check if already preloaded to avoid duplicates
				const existing = document.querySelector(`link[href="${hint.href}"]`);
				if (existing) return;

				const link = document.createElement('link');
				link.rel = 'preload';
				link.href = hint.href;
				link.as = hint.as;
				if (hint.type) link.type = hint.type;
				if (hint.as === 'font') link.crossOrigin = '';

				document.head.appendChild(link);
			});
		}
	});
</script>

{@render children()}
