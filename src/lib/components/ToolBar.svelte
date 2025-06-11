<script lang="ts">
	import gsap from 'gsap';
	import { onMount, onDestroy } from 'svelte';

	let expandedTool = $state(false);

	let isTouchDevice = $state(false);

	let toolbar: HTMLElement; // Declare the variable toolbar

	// Toggle function for toolbar
	function toggleToolbar() {
		expandedTool = !expandedTool;
	}

	// Close toolbar when mouse leaves
	function handleCloseToolbar() {
		expandedTool = false;
	}

	// Keypress functions for each bubble
	function handleKeydown(event: { key: string }) {
		if (event.key === 'Enter' || event.key === ' ') {
			toggleToolbar();
		}
	}

	function handleOutsideTouch(event: TouchEvent) {
		if (toolbar && expandedTool && !toolbar.contains(event.target as Node)) {
			expandedTool = false;
		}
	}

	onMount(async () => {
		isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
		gsap.fromTo(toolbar, { x: '200' }, { delay: 1.05, duration: 2.75, x: '0', ease: 'back' });

		if (isTouchDevice) {
			document.addEventListener('touchstart', handleOutsideTouch);
		}
	});

	onDestroy(() => {
		if (isTouchDevice) {
			document.removeEventListener('touchstart', handleOutsideTouch);
		}
	});
</script>

<!-- Connections Bubble -->
<div
	bind:this={toolbar}
	class="toolbar {expandedTool ? 'expandedTool' : ''}"
	onclick={toggleToolbar}
	onkeydown={handleKeydown}
	onmouseleave={isTouchDevice ? undefined : handleCloseToolbar}
	tabindex="0"
	role="button"
	aria-pressed={expandedTool}
	aria-label={expandedTool ? 'Collapse toolbar menu' : 'Expand toolbar menu'}
>
	<div class="toolbar-content">
		<a
			href="https://www.linkedin.com/in/dylan-posner-3a0034152/"
			target="_blank"
			class="toolbar-link"
			aria-label="Visit Dylan's LinkedIn profile"
		>
			<div class="wrapper"><i class="fab fa-linkedin-in fa-2xl" aria-hidden="true"></i></div>
		</a>
		<a
			href="https://github.com/dylantypo/dylantypo.github.io"
			target="_blank"
			class="toolbar-link"
			aria-label="Visit Dylan's GitHub repository"
		>
			<div class="wrapper"><i class="fab fa-github fa-2xl" aria-hidden="true"></i></div>
		</a>
		<a href="/resume" target="_blank" class="toolbar-link" aria-label="Download Dylan's Resume">
			<div class="wrapper"><i class="fa-solid fa-file fa-2xl" aria-hidden="true"></i></div>
		</a>
		<div class="wrapper">
			<i
				class="fa-solid fa-angle-down fa-beat-fade fa-2xl"
				style="--fa-animation-delay: 3s"
				aria-hidden="true"
			></i>
		</div>
	</div>
	{#if !expandedTool}
		<i
			class="fa-solid fa-gear fa-spin fa-2xl"
			style="--fa-animation-duration: 10s"
			aria-hidden="true"
		></i>
	{/if}
</div>

<style>
	.wrapper {
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 40px;
		width: 40px;
	}

	.toolbar {
		position: fixed;
		bottom: 10vh;
		right: 5vw;
		background: var(--color-secondary);
		opacity: 65%;
		border-radius: 50%;
		width: 50px;
		height: 50px;
		transition:
			height 0.6s var(--transition-ease),
			border-radius 1s var(--transition-ease),
			opacity 1s var(--transition-speed);
		color: var(--color-primary);
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		z-index: var(--z-index-toolbar);
	}

	.toolbar.expandedTool {
		height: 228px;
		border-radius: 25px;
	}

	.toolbar-content {
		display: none;
	}

	.toolbar.expandedTool .toolbar-content {
		display: flex;
		flex-direction: column;
		align-content: space-around;
	}

	.toolbar-link {
		padding-bottom: var(--spacing-base);
		color: var(--color-primary);
		text-decoration: none;
	}

	.toolbar-link:focus-visible {
		border-radius: 50%;
		outline: 3px solid var(--color-focus);
		outline-offset: 2px;
	}

	@media (max-width: 1030px) {
		.toolbar {
			opacity: 50%;
			bottom: 12vh;
			right: 8vw;
			width: 45px;
			height: 45px;
		}
		.toolbar.expandedTool {
			opacity: 100%;
		}
	}
</style>
