<!-- $lib/components/ScrollIndicator.svelte -->
<script lang="ts">
	// 🎯 Props - make component reusable
	let {
		targetId = 'aboutMe',
		duration = 2000,
		ariaLabel = 'Scroll to About Me section'
	} = $props<{
		targetId?: string;
		duration?: number;
		ariaLabel?: string;
	}>();

	// 🚀 Smooth scroll utility function
	function smoothScrollTo(element: HTMLElement, scrollDuration = 2000) {
		const start = window.scrollY;
		const end = element.getBoundingClientRect().top + window.scrollY;
		const startTime = performance.now();

		function easeInOutQuad(t: number) {
			return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
		}

		function scrollAnimation(currentTime: number) {
			const elapsed = currentTime - startTime;
			const progress = Math.min(elapsed / scrollDuration, 1);

			window.scrollTo({
				top: start + (end - start) * easeInOutQuad(progress),
				behavior: 'auto' // Prevent conflicts with native smooth scroll
			});

			if (progress < 1) {
				requestAnimationFrame(scrollAnimation);
			}
		}

		requestAnimationFrame(scrollAnimation);
	}

	// 🎯 Handle scroll action
	function handleScrollClick() {
		const targetSection = document.getElementById(targetId);
		if (targetSection) {
			smoothScrollTo(targetSection, duration);
		}
	}
</script>

<button class="scroll-indicator" onclick={handleScrollClick} aria-label={ariaLabel}>
	<div class="scroll-icon">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			aria-hidden="true"
		>
			<path d="M12 5v14M19 12l-7 7-7-7" />
		</svg>
	</div>
</button>

<style>
	.scroll-indicator {
		position: absolute;
		bottom: var(--spacing-lg);
		left: 50%;
		transform: translateX(-50%);
		color: var(--color-text-primary);
		opacity: 0.7;
		transition: opacity var(--transition-speed) ease;
		pointer-events: auto;
		z-index: var(--z-index-overlay);
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
		animation: float 3s ease-in-out infinite;
	}

	.scroll-icon {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-sm);
		background-color: var(--color-fill);
		padding: 0.75rem 1.5rem;
		border-radius: var(--spacing-lg);
		backdrop-filter: blur(4px);
		-webkit-backdrop-filter: blur(4px);
	}

	.scroll-indicator:hover,
	.scroll-indicator:focus-visible {
		opacity: 1;
		transform: translateX(-50%) translateY(-2px);
	}

	.scroll-indicator:active {
		transform: translateX(-50%) translateY(0);
	}

	.scroll-indicator:focus-visible {
		outline: 2px solid var(--color-focus);
		outline-offset: 2px;
	}

	/* 🎭 Animations */
	@keyframes float {
		0%,
		100% {
			transform: translateX(-50%) translateY(0);
		}
		50% {
			transform: translateX(-50%) translateY(-10px);
		}
	}

	/* 📱 Mobile responsive */
	@media (max-width: 768px) {
		.scroll-indicator {
			bottom: 1.5rem;
		}
	}

	/* ♿ Accessibility */
	@media (prefers-reduced-motion: reduce) {
		.scroll-indicator {
			transition: none;
			animation: none;
		}
	}
</style>
