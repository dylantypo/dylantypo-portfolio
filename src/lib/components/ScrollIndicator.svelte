<script lang="ts">
	import { onMount } from 'svelte';
	import { viewportManager } from '$lib/utils';
	import ArrowDown from '$lib/icons/ArrowDown.svelte';

	let {
		targetId = 'aboutMe',
		duration = 1000,
		ariaLabel = 'Scroll to About Me section'
	} = $props<{
		targetId?: string;
		duration?: number;
		ariaLabel?: string;
	}>();

	function smoothScrollTo(element: HTMLElement, scrollDuration = 1000) {
		const start = window.scrollY;
		const end = element.getBoundingClientRect().top + window.scrollY;
		const startTime = performance.now();

		function easeOutCubic(t: number) {
			return 1 - Math.pow(1 - t, 3);
		}

		function scrollAnimation(currentTime: number) {
			const elapsed = currentTime - startTime;
			const progress = Math.min(elapsed / scrollDuration, 1);

			window.scrollTo({
				top: start + (end - start) * easeOutCubic(progress),
				behavior: 'auto'
			});

			if (progress < 1) {
				requestAnimationFrame(scrollAnimation);
			}
		}

		requestAnimationFrame(scrollAnimation);
	}

	function calculateOptimalTarget(targetSection: HTMLElement): HTMLElement {
		const header = targetSection.querySelector('.header, h2') as HTMLElement;
		const content = targetSection.querySelector('.long-text') as HTMLElement;

		if (!header && !content) return targetSection;

		const vh = window.innerHeight;
		const PADDING = 100;
		const availableHeight = vh - PADDING;

		const headerHeight = header?.offsetHeight || 0;
		const contentHeight = content?.offsetHeight || 0;
		const totalHeight = headerHeight + contentHeight;

		if (totalHeight <= availableHeight) {
			const centerOffset = (vh - totalHeight) / 2;
			const virtualTarget = document.createElement('div');
			const headerTop = header
				? header.getBoundingClientRect().top + window.scrollY
				: targetSection.getBoundingClientRect().top + window.scrollY;

			virtualTarget.style.position = 'absolute';
			virtualTarget.style.top = `${headerTop - centerOffset}px`;
			document.body.appendChild(virtualTarget);

			setTimeout(() => document.body.removeChild(virtualTarget), 100);
			return virtualTarget;
		}

		if (header) {
			const virtualTarget = document.createElement('div');
			const headerTop = header.getBoundingClientRect().top + window.scrollY;
			const targetOffset = headerTop - PADDING / 2;

			virtualTarget.style.position = 'absolute';
			virtualTarget.style.top = `${targetOffset}px`;
			document.body.appendChild(virtualTarget);

			setTimeout(() => document.body.removeChild(virtualTarget), 100);
			return virtualTarget;
		}

		return content || targetSection;
	}

	function handleScrollClick() {
		const targetSection = document.getElementById(targetId);
		if (targetSection) {
			const optimalTarget = calculateOptimalTarget(targetSection);
			smoothScrollTo(optimalTarget, duration);
		}
	}

	onMount(() => {
		viewportManager.init();
	});
</script>

<button class="scroll-indicator" onclick={handleScrollClick} aria-label={ariaLabel}>
	<div class="scroll-icon">
		<ArrowDown size={24} />
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
		transition:
			opacity var(--transition-speed) ease,
			transform var(--transition-speed) ease;
		pointer-events: auto;
		z-index: var(--z-index-overlay);
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
		will-change: transform, opacity;
		animation: float 3s ease-in-out infinite;
		backface-visibility: hidden;
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
		transform: translateZ(0);
		will-change: transform;
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

	@keyframes float {
		0%,
		100% {
			transform: translateX(-50%) translateY(0);
		}
		50% {
			transform: translateX(-50%) translateY(-10px);
		}
	}

	@media (max-width: 768px) {
		.scroll-indicator {
			bottom: calc(var(--vh, 1vh) * 8);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.scroll-indicator {
			transition: none;
			animation: none;
		}
	}
</style>
