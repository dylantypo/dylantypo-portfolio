<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import { viewportManager } from '$lib/utils/viewport-manager';

	let { onEnter } = $props<{ onEnter: () => void }>();

	let ready = $state(false);

	function checkFonts() {
		if (!browser) return;

		const fontTimeout = setTimeout(() => (ready = true), 600);

		document.fonts.ready
			.then(() => {
				clearTimeout(fontTimeout);
				ready = true;
			})
			.catch(() => {
				clearTimeout(fontTimeout);
				ready = true;
			});
	}

	onMount(() => {
		if (!browser) return;

		// 🎯 Initialize viewport manager first
		viewportManager.init();

		// 🔒 Use centralized body overflow management
		viewportManager.setBodyOverflow('hidden', 'landing-page');

		// 🚫 Prevent touch scrolling on mobile
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
		// 🔓 Remove body overflow using centralized manager
		viewportManager.removeBodyOverflow('landing-page');
	});

	function handleEnter() {
		// 🔓 Remove body overflow before transitioning
		viewportManager.removeBodyOverflow('landing-page');
		onEnter();
	}
</script>

<div class="landing-container">
	<!-- Welcome Text -->
	<div class="welcome-text">Welcome 🌎</div>

	<!-- Loading/Enter Button -->
	<button
		class="enter-button"
		class:loading={!ready}
		class:loaded={ready}
		onclick={ready ? handleEnter : undefined}
		disabled={!ready}
		aria-label={ready ? 'Enter website' : 'Loading...'}
	>
		{ready ? '→' : '⏳'}
	</button>
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

	.enter-button {
		background-color: var(--color-fill);
		border: none;
		border-radius: 2rem;
		color: var(--color-text-primary);
		font-family: var(--font-family-base);
		font-size: 1.2rem;
		padding: 0.75rem 1.5rem;
		cursor: pointer;
		transition: all var(--transition-speed) ease;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		backdrop-filter: blur(4px);
		touch-action: manipulation;
	}

	.enter-button.loading {
		cursor: default;
		opacity: 0.7;
	}

	.enter-button.loaded {
		opacity: 1;
		transform: scale(1.02);
	}

	.enter-button.loaded:hover {
		opacity: 1;
		transform: translateY(-2px) scale(1.05);
	}

	.enter-button.loaded:active {
		transform: translateY(0);
	}

	.enter-button:focus-visible {
		outline: 2px solid var(--color-focus);
		outline-offset: 2px;
	}

	.enter-button:disabled {
		pointer-events: none;
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

	/* 📱 Mobile adjustments */
	@media (max-width: 768px) {
		.landing-container {
			gap: 2rem;
			height: 100vh;
			height: calc(var(--vh, 1vh) * 100);
		}

		.welcome-text {
			font-size: clamp(2.5rem, 8vw, 4rem);
			font-weight: 600;
			max-width: 85vw;
		}

		.enter-button {
			font-size: 1rem;
			padding: 0.65rem 1.2rem;
		}
	}

	/* 🔄 Orientation change handling */
	@media (max-height: 500px) and (orientation: landscape) {
		.landing-container {
			gap: 1.5rem;
		}

		.welcome-text {
			font-size: clamp(2rem, 6vh, 3rem);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.welcome-text {
			animation: none;
		}
		.enter-button.loading {
			animation: none;
		}
	}
</style>
