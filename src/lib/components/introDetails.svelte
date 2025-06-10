<script lang="ts">
	import { onMount } from 'svelte';
	import { viewportManager, loadGlobeModules } from '$lib/utils';

	let elements: HTMLElement[] = [];

	function splitTextIntoLetters(text: string, highlight: boolean = false): string {
		return text
			.split(' ')
			.map(
				(word) =>
					`<span class="word-container">${word
						.split('')
						.map((char) => `<span class="letter${highlight ? ' highlight' : ''}">${char}</span>`)
						.join('')}</span> `
			)
			.join('');
	}

	onMount(() => {
		const initializeAnimations = async () => {
			const { gsap } = await loadGlobeModules();
			const { ScrollTrigger } = await import('gsap/ScrollTrigger');
			const { CustomEase } = await import('gsap/CustomEase');

			gsap.registerPlugin(ScrollTrigger, CustomEase);
			viewportManager.init();

			const handleViewportChange = (event: CustomEvent) => {
				ScrollTrigger.refresh();
			};

			CustomEase.create('waterRipple', 'M0,0 C0.2,0.4 0.4,0.8 1,1');

			const ctx = gsap.context(() => {
				elements = gsap.utils.toArray('.fade-in') as HTMLElement[];

				elements.forEach((el) => {
					const nodes = Array.from(el.childNodes);
					el.innerHTML = '';
					const originalContent = el.textContent;
					el.setAttribute('aria-label', originalContent || '');

					nodes.forEach((node) => {
						if (node.nodeType === Node.TEXT_NODE) {
							const text = node.textContent || '';
							el.insertAdjacentHTML('beforeend', splitTextIntoLetters(text));
						} else if (
							node.nodeType === Node.ELEMENT_NODE &&
							(node as Element).classList.contains('highlighted-text')
						) {
							const text = node.textContent || '';
							el.insertAdjacentHTML('beforeend', splitTextIntoLetters(text, true));
						}
					});

					const letters = el.querySelectorAll('.letter');
					const viewport = viewportManager.getViewportInfo();
					const isLandscape = viewport.height < 500 && viewport.width > viewport.height;

					// Text starts visible with no glow
					gsap.set(letters, {
						opacity: 1,
						textShadow: '0 0 0px rgba(255,255,255,0)'
					});

					// 🚀 PRE-CALCULATE lighting intensities (performance fix)
					const sectionRect = el.getBoundingClientRect();
					const lightX = sectionRect.left + sectionRect.width * 0.2;
					const lightY = sectionRect.top + sectionRect.height * 0.3;
					const maxDistance = Math.sqrt(sectionRect.width ** 2 + sectionRect.height ** 2);

					const lightingIntensities = Array.from(letters).map((letter) => {
						const rect = letter.getBoundingClientRect();
						const letterX = rect.left + rect.width / 2;
						const letterY = rect.top + rect.height / 2;

						const distance = Math.sqrt((letterX - lightX) ** 2 + (letterY - lightY) ** 2);
						const normalizedDistance = distance / maxDistance;
						const rawIntensity = Math.max(0.05, 1 - normalizedDistance);

						return Math.pow(rawIntensity, 4.75) * 1.25;
					});

					// Scroll-triggered glow wave
					const timeline = gsap.timeline({
						scrollTrigger: {
							trigger: el,
							start: isLandscape ? 'top 85%' : 'top 75%',
							end: () => `+=${el.offsetHeight}`,
							scrub: isLandscape ? 1.2 : 1.75
						}
					});

					timeline.to(letters, {
						textShadow: (index: number) => {
							const intensity = lightingIntensities[index];
							const baseGlow = 15 * intensity;
							const midGlow = 25 * intensity;
							const outerGlow = 35 * intensity;
							const alpha1 = 0.35 * intensity;
							const alpha2 = 0.4 * intensity;
							const alpha3 = 0.2 * intensity;

							return `0 0 ${baseGlow}px rgba(255,255,255,${alpha1}), 0 0 ${midGlow}px rgba(153,191,128,${alpha2}), 0 0 ${outerGlow}px rgba(191,153,128,${alpha3})`;
						},
						stagger: {
							amount: isLandscape ? 1.2 : 1.75,
							from: 'start'
						},
						ease: 'waterRipple',
						duration: 1.5
					});
				});

				ScrollTrigger.refresh();
			});

			window.addEventListener('viewport:resize', handleViewportChange as EventListener);

			return () => {
				window.removeEventListener('viewport:resize', handleViewportChange as EventListener);
				ctx.revert();
			};
		};

		initializeAnimations();
	});
</script>

<article class="section" id="aboutMe" role="region" aria-labelledby="aboutMe-header">
	<h2 id="aboutMe-header" class="header">About Me</h2>
	<div
		id="aboutMe-content"
		class="long-text fade-in"
		aria-label="I'm a versatile data scientist, expertly crafting cutting-edge analytics that illuminate data from fresh and inventive perspectives."
	>
		I'm a versatile data scientist, expertly crafting <!-- First segment -->
		<span class="highlighted-text">cutting-edge</span>
		<!-- Highlighted -->
		analytics that illuminate data from fresh and inventive perspectives. <!-- Last segment -->
	</div>
</article>

<article class="section" id="experience" role="region" aria-labelledby="experience-header">
	<h2 id="experience-header" class="header">Experience</h2>
	<div
		id="experience-content"
		class="long-text fade-in"
		aria-label="Nearly half a decade of diverse experience, enhancing data-driven decisions with a unique blend of creativity and innovation."
	>
		Nearly half a decade of diverse experience, enhancing <!-- First segment -->
		<span class="highlighted-text">data-driven</span>
		<!-- Highlighted -->
		decisions with a unique blend of creativity and innovation. <!-- Last segment -->
	</div>
</article>

<style>
	.section {
		min-height: calc(var(--vh, 1vh) * 30);
		height: auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		padding: var(--spacing-base) 0 var(--spacing-lg) 0;
		margin-bottom: 0;
		box-sizing: border-box;
	}

	.header {
		width: max-content;
		padding-left: var(--content-padding-current);
		font-size: var(--font-size-lg);
		flex-shrink: 0;
		font-family: var(--font-family-base);
	}

	.long-text {
		font-size: clamp(1.6rem, 4vh + 2vw, 4rem);
		line-height: clamp(1.3, 1.2 + 1vh, 1.6);
		font-weight: 600;
		letter-spacing: clamp(0.02em, 0.03vw, 0.06em);
		word-spacing: clamp(0.1em, 0.15vw, 0.25em);
		padding: var(--spacing-lg) var(--content-padding-current);
		color: var(--color-text-primary);
		max-width: 100%;
		font-family: var(--font-family-base);
		transform-style: preserve-3d;
		perspective: 2000px;
		position: relative;
		overflow: visible;
		contain: layout style;
		text-rendering: optimizeLegibility;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	:global(.letter) {
		display: inline-block;
		transform-style: preserve-3d;
		backface-visibility: hidden;
		perspective: 1000px;
		will-change: transform, opacity;
		transition: color var(--transition-speed) ease;
	}

	:global(.letter.highlight) {
		color: var(--color-secondary);
		text-shadow: 0 0 2px rgba(20, 184, 166, 0.3);
	}

	:global(.word-container) {
		display: inline-block;
		margin-right: clamp(0.15em, 0.3vw, 0.4em);
		min-height: 1.3em;
		vertical-align: middle;
		perspective: 1000px;
		overflow: visible;
	}

	@media (max-height: 500px) and (orientation: landscape) {
		.section {
			min-height: calc(var(--vh, 1vh) * 25);
		}
	}

	@media (max-width: 925px) {
		.section {
			align-items: center;
			min-height: calc(var(--vh, 1vh) * 35);
		}

		.header {
			padding-left: 0;
		}

		.long-text {
			font-size: clamp(1.5rem, 3.5vh + 1.8vw, 3.6rem);
			letter-spacing: clamp(0.025em, 0.035vw, 0.07em);
			word-spacing: clamp(0.12em, 0.18vw, 0.28em);
		}
	}

	@media (max-width: 610px) {
		.section {
			min-height: calc(var(--vh, 1vh) * 40);
		}

		.long-text {
			font-size: clamp(1.2rem, 2.8vh + 1.5vw, 2.8rem);
			letter-spacing: clamp(0.03em, 0.04vw, 0.08em);
			word-spacing: clamp(0.15em, 0.2vw, 0.3em);
			line-height: clamp(1.3, 1.2 + 0.8vh, 1.5);
		}
	}

	@media (max-width: 480px) {
		.section {
			min-height: calc(var(--vh, 1vh) * 45);
		}

		.long-text {
			font-size: clamp(1rem, 2.5vh + 1.2vw, 2.4rem);
		}
	}

	@media (min-width: 1400px) {
		.section {
			min-height: calc(var(--vh, 1vh) * 25);
		}
	}

	/* Accessibility */
	@media (prefers-reduced-motion: reduce) {
		:global(.letter) {
			transition: none;
		}
	}
</style>
