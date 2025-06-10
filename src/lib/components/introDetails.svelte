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

			CustomEase.create('subtleGlow', 'M0,0 C0.3,0.6 0.7,0.9 1,1');

			function createLightingEffect(el: HTMLElement) {
				const letters = el.querySelectorAll('.letter');
				const viewport = viewportManager.getViewportInfo();
				const isLandscape = viewport.height < 500 && viewport.width > viewport.height;

				const sectionRect = el.getBoundingClientRect();
				const lightX = sectionRect.left + sectionRect.width * 0.15;
				const lightY = sectionRect.top + sectionRect.height * 0.25;
				const maxDistance = Math.sqrt(sectionRect.width ** 2 + sectionRect.height ** 2);

				const lightingIntensities = Array.from(letters).map((letter) => {
					const rect = letter.getBoundingClientRect();
					const letterX = rect.left + rect.width / 2;
					const letterY = rect.top + rect.height / 2;

					const distance = Math.sqrt((letterX - lightX) ** 2 + (letterY - lightY) ** 2);
					const normalizedDistance = distance / maxDistance;
					const rawIntensity = Math.max(0.1, 1 - normalizedDistance);

					return Math.pow(rawIntensity, 5) * 1.5;
				});

				return { letters, lightingIntensities, isLandscape };
			}

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

					const { letters, lightingIntensities, isLandscape } = createLightingEffect(el);

					gsap.set(letters, {
						opacity: 1,
						textShadow: '0 0 0px rgba(255,255,255,0)'
					});

					gsap.set(el.querySelectorAll('.letter:not(.highlight)'), {
						color: 'rgba(255,255,255,0.15)'
					});

					const timeline = gsap.timeline({
						scrollTrigger: {
							trigger: el,
							start: isLandscape ? 'top 85%' : 'top 75%',
							end: () => `+=${el.offsetHeight}`,
							scrub: isLandscape ? 1.2 : 1.6
						}
					});

					timeline.to(letters, {
						textShadow: (index: number) => {
							const intensity = lightingIntensities[index];

							const sunCore = 8 * intensity;
							const sunGlow = 12 * intensity;
							const chromeSharp = 10 * intensity;
							const chromeGlow = 15 * intensity;
							const edgeWarm = 12 * intensity;
							const edgeSoft = 18 * intensity;
							const deepGlow = 75 * intensity;

							const coreAlpha = Math.min(0.9, 0.7 * intensity);
							const chromeAlpha = Math.min(0.7, 0.5 * intensity);
							const edgeAlpha = Math.min(0.6, 0.45 * intensity);
							const deepAlpha = Math.min(0.4, 0.3 * intensity);

							return [
								`0 0 ${sunCore}px rgba(255,255,255,${coreAlpha})`,
								`0 0 ${sunGlow}px rgba(255,255,255,${coreAlpha * 0.6})`,
								`0 0 ${chromeSharp}px rgba(0,200,255,${chromeAlpha})`,
								`0 0 ${chromeGlow}px rgba(0,160,255,${chromeAlpha * 0.8})`,
								`0 0 ${edgeWarm}px rgba(255,80,0,${edgeAlpha})`,
								`0 0 ${edgeSoft}px rgba(255,40,0,${edgeAlpha * 0.9})`,
								`0 0 ${deepGlow}px rgba(180,0,255,${deepAlpha})`
							].join(', ');
						},
						color: (index: number, target: any) => {
							return target.classList.contains('highlight') ? undefined : 'rgba(255,255,255,1.0)';
						},
						stagger: {
							amount: isLandscape ? 1.8 : 2.4,
							from: 'start',
							ease: 'power2.out'
						},
						ease: 'power2.out',
						duration: 2.2
					});
				});

				ScrollTrigger.refresh();
			});

			const handleViewportChange = (event: CustomEvent) => {
				elements.forEach((el) => {
					createLightingEffect(el);
				});
				ScrollTrigger.refresh();
			};

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
		I'm a versatile data scientist, expertly crafting
		<span class="highlighted-text">cutting-edge</span>
		analytics that illuminate data from fresh and inventive perspectives.
	</div>
</article>

<article class="section" id="experience" role="region" aria-labelledby="experience-header">
	<h2 id="experience-header" class="header">Experience</h2>
	<div
		id="experience-content"
		class="long-text fade-in"
		aria-label="Nearly half a decade of diverse experience, enhancing data-driven decisions with a unique blend of creativity and innovation."
	>
		Nearly half a decade of diverse experience, enhancing
		<span class="highlighted-text">data-driven</span>
		decisions with a unique blend of creativity and innovation.
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
		position: relative;
		overflow: visible;
		contain: layout style;
		text-rendering: optimizeLegibility;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	:global(.letter) {
		display: inline-block;
		will-change: text-shadow, color;
		transition: none;
		color: rgba(255, 255, 255, 0.15);
	}

	:global(.letter.highlight) {
		color: var(--color-secondary) !important;
		text-shadow: 0 0 8px rgba(20, 184, 166, 0.8) !important;
		font-weight: 700;
	}

	:global(.word-container) {
		display: inline-block;
		margin-right: clamp(0.15em, 0.3vw, 0.4em);
		min-height: 1.3em;
		vertical-align: middle;
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

	@media (prefers-reduced-motion: reduce) {
		:global(.letter) {
			transition: none;
			will-change: auto;
		}
	}
</style>
