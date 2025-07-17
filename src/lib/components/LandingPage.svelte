<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import { viewportManager } from '$lib/utils/viewport-manager';
	import Camera from '$lib/icons/Camera.svelte';
	import House from '$lib/icons/House.svelte';
	import ArrowRight from '$lib/icons/ArrowRight.svelte';
	import Hourglass from '$lib/icons/Hourglass.svelte';
	import Earth from '$lib/icons/Earth.svelte';

	let { onEnter } = $props<{ onEnter: () => void }>();

	let ready = $state(false);

	function checkFonts() {
		if (!browser) return;

		// Check if KenneyFuture is already loaded
		if (document.fonts.check('16px KenneyFuture')) {
			ready = true;
			return;
		}

		// Fallback timeout for slow connections
		const timeout = setTimeout(() => {
			ready = true;
		}, 800);

		// Listen for font load
		document.fonts.ready.then(() => {
			clearTimeout(timeout);
			ready = true;
		});
	}

	onMount(() => {
		if (!browser) return;

		// Initialize viewport manager first
		viewportManager.init();

		// Use centralized body overflow management
		viewportManager.setBodyOverflow('hidden', 'landing-page');

		// Prevent touch scrolling on mobile
		const preventTouch = (e: TouchEvent) => {
			if (e.touches.length > 1) return; // Allow pinch zoom
			e.preventDefault();
		};

		document.addEventListener('touchmove', preventTouch, { passive: false });

		checkFonts();

		return () => {
			document.removeEventListener('touchmove', preventTouch);
		};
	});

	onDestroy(() => {
		if (!browser) return;
		// Remove body overflow using centralized manager
		viewportManager.removeBodyOverflow('landing-page');
	});

	function handleEnter() {
		// Remove body overflow before transitioning
		viewportManager.removeBodyOverflow('landing-page');
		onEnter();
	}

	function handlePhotoNav() {
		viewportManager.removeBodyOverflow('landing-page');
		window.location.href = '/contact';
	}
</script>

<svelte:head>
	<title>Dylan Posner | Data Scientist</title>
	<meta
		name="description"
		content="Data Scientist with 3+ years experience. Python | AWS | Tableau expert."
	/>
	<meta property="og:title" content="Dylan Posner | Data Scientist" />
	<meta
		property="og:description"
		content="Data Scientist with 3+ years experience. Python | AWS | Tableau expert."
	/>
</svelte:head>

<div class="landing-container">
	<!-- Welcome Text -->
	<div class="welcome-text">Welcome 🌎</div>

	<!-- Button Pill or Loading -->
	{#if ready}
		<div class="button-pill">
			<button
				class="pill-button photo-button"
				onclick={handlePhotoNav}
				aria-label="Photography services"
			>
				<Camera />
			</button>

			<button class="pill-button main-button" onclick={handleEnter} aria-label="Enter portfolio">
				<House /><ArrowRight size={10} />
			</button>
		</div>
	{:else}
		<div class="loading-state"><Hourglass /></div>
	{/if}
</div>

<style>
	.landing-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		height: calc(var(--vh, 1vh) * 100);
		background-color: var(--color-background);
		backdrop-filter: blur(1.25px);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 3rem;
		font-family: var(--font-family-base);
		z-index: 1000;
		overflow: hidden;
		overscroll-behavior: none;
		touch-action: none;
	}

	.welcome-text {
		font-size: clamp(4rem, 6vw, 6rem);
		color: var(--color-text-primary);
		letter-spacing: -0.02em;
		font-weight: 750;
		animation: fadeIn 0.25s ease-out;
		text-align: center;
		white-space: nowrap;
		max-width: 90vw;
		overflow: hidden;
	}

	.button-pill {
		display: flex;
		background-color: var(--color-fill);
		border-radius: 2rem;
		overflow: hidden;
		backdrop-filter: blur(8px);
		border: 1px solid rgba(255, 255, 255, 0.1);
		animation: slideUp 0.4s ease-out 0.2s both;
	}

	.pill-button {
		background: none;
		border: none;
		color: var(--color-text-primary);
		font-family: var(--font-family-base);
		font-size: 1.2rem;
		padding: 0.75rem 1.5rem;
		cursor: pointer;
		transition: all var(--transition-speed) ease;
		touch-action: manipulation;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
	}

	.photo-button {
		border-right: 1px solid rgba(255, 255, 255, 0.1);
	}

	.pill-button:hover {
		background-color: var(--color-hover);
		transform: scale(1.02);
	}

	.pill-button:active {
		transform: scale(0.98);
	}

	.pill-button:focus-visible {
		border: 2px solid var(--color-focus);
		outline: none;
		position: relative;
	}

	.photo-button:focus-visible {
		border-radius: 2rem 0 0 2rem;
	}

	.main-button:focus-visible {
		border-radius: 0 2rem 2rem 0;
	}

	.loading-state {
		font-size: 1.5rem;
		color: var(--color-text-primary);
		opacity: 0.7;
		animation: pulse 1.5s ease-in-out infinite;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 0.7;
		}
		50% {
			opacity: 1;
		}
	}

	/* Mobile adjustments */
	@media (max-width: 768px) {
		.landing-container {
			gap: 2rem;
		}

		.welcome-text {
			font-size: clamp(2.5rem, 8vw, 4rem);
			font-weight: 600;
			max-width: 85vw;
		}

		.pill-button {
			font-size: 1rem;
			padding: 0.65rem 1.2rem;
		}
	}

	/* Orientation change handling */
	@media (max-height: 500px) and (orientation: landscape) {
		.landing-container {
			gap: 1.5rem;
		}

		.welcome-text {
			font-size: clamp(2rem, 6vh, 3rem);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.welcome-text,
		.button-pill,
		.pill-button,
		.loading-state {
			animation: none;
			transition: none;
		}
	}
</style>
