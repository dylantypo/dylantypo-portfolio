<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let starContainer: HTMLDivElement;

	function generateStars() {
		if (!browser || !starContainer) return;

		const isMobile = window.innerWidth < 768;
		const starCount = isMobile ? 60 : 120;

		const stars = Array.from({ length: starCount }, (_, i) => {
			const x = Math.random() * 100;
			const y = Math.random() * 100;
			const size = Math.random() * 1.5 + 0.5;
			const delay = Math.random() * 4;
			const duration = Math.random() * 3 + 2;

			return `
				.star-${i} {
					left: ${x}%;
					top: ${y}%;
					width: ${size}px;
					height: ${size}px;
					animation-delay: ${delay}s;
					animation-duration: ${duration}s;
				}
			`;
		}).join('');

		const styleEl = document.createElement('style');
		styleEl.textContent = stars;
		document.head.appendChild(styleEl);

		starContainer.innerHTML = Array.from(
			{ length: starCount },
			(_, i) => `<div class="star star-${i}"></div>`
		).join('');
	}

	onMount(() => {
		generateStars();
	});
</script>

<div bind:this={starContainer} class="starfield" aria-hidden="true"></div>

<style>
	.starfield {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: -9999;
		background: #18181b;
		pointer-events: none;
		overflow: hidden;
		contain: strict;
	}

	:global(.star) {
		position: absolute;
		background: #ffffff;
		border-radius: 50%;
		animation: twinkle infinite ease-in-out;
		will-change: opacity, transform;
		backface-visibility: hidden;
		transform: translateZ(0);
	}

	@keyframes twinkle {
		0%,
		100% {
			opacity: 0.4;
			transform: scale(0.8) translateZ(0);
		}
		50% {
			opacity: 1;
			transform: scale(1.2) translateZ(0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.starfield {
			display: none;
		}
	}
</style>
