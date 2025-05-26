<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	let { onEnter } = $props<{ onEnter: () => void }>();

	let loadingChecks = $state({
		fonts: false,
		images: false,
		scripts: false,
		textures: false,
		dom: false,
		minTime: false
	});

	let isLoaded = $derived(Object.values(loadingChecks).every(Boolean));
	let observer: MutationObserver | null = null;
	let checkInterval: ReturnType<typeof setInterval> | null = null;

	// Track loading progress for debugging
	let loadingProgress = $derived(() => {
		const completed = Object.values(loadingChecks).filter(Boolean).length;
		const total = Object.keys(loadingChecks).length;
		return Math.round((completed / total) * 100);
	});

	function checkAllAssets() {
		if (!browser) return;

		// Check images (including dynamically added ones)
		checkImages();

		// Check for WebGL textures and 3D assets
		checkTextures();

		// Re-check fonts in case new ones were added
		checkFonts();
	}

	function checkImages() {
		const images = document.querySelectorAll('img, [style*="background-image"]');

		if (images.length === 0) {
			loadingChecks.images = true;
			return;
		}

		let loadedCount = 0;
		const totalImages = images.length;

		images.forEach((element) => {
			if (element instanceof HTMLImageElement) {
				// Regular img tags
				if (element.complete && element.naturalWidth > 0) {
					loadedCount++;
				} else {
					element.onload = () => {
						loadedCount++;
						if (loadedCount >= totalImages) {
							loadingChecks.images = true;
						}
					};
					element.onerror = () => {
						loadedCount++; // Count failed images as "loaded" to prevent hanging
						if (loadedCount >= totalImages) {
							loadingChecks.images = true;
						}
					};
				}
			} else {
				// Elements with background images
				loadedCount++; // Assume background images are loaded
			}
		});

		if (loadedCount >= totalImages) {
			loadingChecks.images = true;
		}
	}

	function checkFonts() {
		if (!browser) return;

		document.fonts.ready
			.then(() => {
				loadingChecks.fonts = true;
			})
			.catch(() => {
				// Fallback if font loading fails
				setTimeout(() => {
					loadingChecks.fonts = true;
				}, 2000);
			});
	}

	function checkTextures() {
		// Check for WebGL canvases and 3D content
		const canvases = document.querySelectorAll('canvas');
		const has3DContent = canvases.length > 0;

		if (!has3DContent) {
			loadingChecks.textures = true;
			return;
		}

		// Check if Three.js objects are loaded by looking for specific classes or attributes
		const globeElements = document.querySelectorAll(
			'[class*="globe"], [class*="three"], .css2d-renderer'
		);

		if (globeElements.length > 0) {
			// Give 3D content a moment to initialize
			setTimeout(() => {
				loadingChecks.textures = true;
			}, 500);
		} else {
			// No 3D content detected yet, keep checking
			setTimeout(checkTextures, 100);
		}
	}

	function checkScripts() {
		// Import critical modules
		Promise.all([
			import('$lib/globe.svelte').catch(() => null),
			import('three').catch(() => null),
			import('three-globe').catch(() => null),
			import('gsap').catch(() => null)
		])
			.then(() => {
				loadingChecks.scripts = true;
			})
			.catch(() => {
				// Fallback if imports fail
				setTimeout(() => {
					loadingChecks.scripts = true;
				}, 3000);
			});
	}

	onMount(() => {
		if (!browser) return;

		// Initial DOM ready
		loadingChecks.dom = true;

		// Start checking all assets
		checkAllAssets();
		checkScripts();

		// Set minimum time for good UX
		setTimeout(() => {
			loadingChecks.minTime = true;
		}, 1500);

		// Set up mutation observer to watch for new content
		observer = new MutationObserver((mutations) => {
			let shouldRecheck = false;

			mutations.forEach((mutation) => {
				if (mutation.type === 'childList') {
					// Check if new images or canvases were added
					mutation.addedNodes.forEach((node) => {
						if (node instanceof Element) {
							const hasImages =
								node.querySelectorAll?.('img, [style*="background-image"]').length > 0;
							const hasCanvases = node.querySelectorAll?.('canvas').length > 0;

							if (hasImages || hasCanvases || node.tagName === 'IMG' || node.tagName === 'CANVAS') {
								shouldRecheck = true;
							}
						}
					});
				}
			});

			if (shouldRecheck) {
				// Reset relevant checks and re-run
				loadingChecks.images = false;
				loadingChecks.textures = false;

				// Debounce the recheck
				setTimeout(checkAllAssets, 100);
			}
		});

		// Observe the entire document for changes
		observer.observe(document.body, {
			childList: true,
			subtree: true,
			attributes: true,
			attributeFilter: ['src', 'style'] // Watch for image src and style changes
		});

		// Periodic check as backup (every 500ms for first 10 seconds)
		let checkCount = 0;
		checkInterval = setInterval(() => {
			checkCount++;

			if (!isLoaded && checkCount < 20) {
				checkAllAssets();
			} else {
				if (checkInterval) clearInterval(checkInterval);
			}
		}, 500);

		// Emergency timeout - force complete after 15 seconds
		setTimeout(() => {
			if (!isLoaded) {
				console.warn('Loading timeout - forcing completion');
				Object.keys(loadingChecks).forEach((key) => {
					loadingChecks[key as keyof typeof loadingChecks] = true;
				});
			}
		}, 15000);
	});

	onDestroy(() => {
		if (observer) {
			observer.disconnect();
		}
		if (checkInterval) {
			clearInterval(checkInterval);
		}
	});

	function handleEnter() {
		onEnter();
	}
</script>

<div class="landing-container">
	<!-- Welcome Text -->
	<div class="welcome-text">Welcome 🌎</div>

	<!-- Loading/Enter Button -->
	<button
		class="enter-button"
		class:loading={!isLoaded}
		class:loaded={isLoaded}
		onclick={isLoaded ? handleEnter : undefined}
		disabled={!isLoaded}
		aria-label={isLoaded ? 'Enter website' : `Loading... ${loadingProgress()}%`}
		title={isLoaded ? 'Click to enter' : `Loading progress: ${loadingProgress()}%`}
	>
		{isLoaded ? '→' : '···'}
	</button>

	<!-- Debug info (remove in production) -->
	<!-- {#if !isLoaded && import.meta.env.DEV}
		<div class="debug-info">
			<div class="progress-text">{loadingProgress()}% loaded</div>
			<div class="loading-details">
				{#each Object.entries(loadingChecks) as [key, value]}
					<div class="loading-item" class:complete={value}>
						{key}: {value ? '✓' : '⏳'}
					</div>
				{/each}
			</div>
		</div>
	{/if} -->
</div>

<style>
	.landing-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: var(--color-background);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 3rem;
		font-family: var(--font-family-base);
		z-index: 1000;
	}

	.welcome-text {
		font-size: clamp(2.5rem, 6vw, 4rem);
		color: var(--color-text-primary);
		letter-spacing: -0.02em;
		font-weight: 600;
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
		-webkit-backdrop-filter: blur(4px);
		width: auto;
		height: auto;
	}

	.enter-button.loading {
		cursor: default;
		animation: pulse 1.5s ease-in-out infinite;
		opacity: 0.7;
	}

	.enter-button.loaded {
		opacity: 1;
	}

	.enter-button.loaded:hover {
		opacity: 1;
		transform: translateY(-2px);
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

		.enter-button {
			font-size: 1rem;
			padding: 0.65rem 1.2rem;
		}
	}

	/* Reduced motion */
	@media (prefers-reduced-motion: reduce) {
		.enter-button.loading {
			animation: none;
		}
	}

	/* Debug styles (development only) */
	/* .debug-info {
		position: fixed;
		bottom: 2rem;
		left: 2rem;
		background: rgba(0, 0, 0, 0.8);
		color: white;
		padding: 1rem;
		border-radius: 0.5rem;
		font-size: 0.8rem;
		backdrop-filter: blur(4px);
	}

	.progress-text {
		font-weight: bold;
		margin-bottom: 0.5rem;
	}

	.loading-item {
		display: flex;
		justify-content: space-between;
		margin: 0.2rem 0;
		opacity: 0.7;
	}

	.loading-item.complete {
		opacity: 1;
		color: var(--color-secondary, #14b8a6);
	}

	@media (max-width: 768px) {
		.debug-info {
			bottom: 1rem;
			left: 1rem;
			font-size: 0.7rem;
		}
	} */
</style>
