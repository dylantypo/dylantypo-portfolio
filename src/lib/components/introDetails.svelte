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

			gsap.registerPlugin(ScrollTrigger);
			viewportManager.init();

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

					gsap.set(letters, {
						opacity: 1,
						textShadow: 'none',
						color: (_index: number, target: any) => {
							return target.classList.contains('highlight')
								? 'var(--color-secondary)'
								: 'rgba(255,255,255,0.15)';
						}
					});

					const timeline = gsap.timeline({
						scrollTrigger: {
							trigger: el,
							start: isLandscape ? 'top 88%' : 'top 78%',
							end: isLandscape ? 'top 45%' : 'top 35%',
							scrub: isLandscape ? 1 : 1.5
						}
					});

					timeline.to(letters, {
						textShadow: (_index: number, target: any) => {
							if (target.classList.contains('highlight')) return undefined;
							return '2px -2px 12px rgba(255,80,80,0.8), -2px 2px 20px rgba(80,120,255,0.6), 3px 3px 28px rgba(255,255,80,0.4), -3px -3px 36px rgba(255,255,255,0.3)';
						},
						color: (_index: number, target: any) => {
							return target.classList.contains('highlight') ? undefined : 'rgba(255,255,255,1)';
						},
						stagger: {
							amount: isLandscape ? 1.2 : 1.6,
							from: 'start'
						},
						ease: 'power2.out',
						duration: 0.25
					});

					timeline.to(letters, {
						textShadow: (_index: number, target: any) => {
							if (target.classList.contains('highlight')) return undefined;
							return 'none';
						},
						color: (_index: number, target: any) => {
							return target.classList.contains('highlight') ? undefined : 'rgba(255,255,255,1)';
						},
						stagger: {
							amount: isLandscape ? 1.2 : 1.6,
							from: 'start'
						},
						ease: 'power2.out',
						duration: 0.25
					});
				});

				ScrollTrigger.refresh();
			});

			const handleViewportChange = () => {
				ScrollTrigger.refresh();
			};

			window.addEventListener('viewport:resize', handleViewportChange);

			return () => {
				window.removeEventListener('viewport:resize', handleViewportChange);
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
		aria-label="I'm a creative thinker bringing my unique global perspective to solve problems that matter."
	>
		I'm a creative thinker bringing my unique
		<span class="highlighted-text">global</span>
		perspective to solve problems that matter.
	</div>
</article>

<article class="section" id="experience" role="region" aria-labelledby="experience-header">
	<h2 id="experience-header" class="header">Experience</h2>
	<div
		id="experience-content"
		class="long-text fade-in"
		aria-label="Nearly half a decade building cutting-edge infrastructure combining data science, automation, and modern web technologies."
	>
		Nearly half a decade building
		<span class="highlighted-text">cutting-edge</span>
		infrastructure combining data science and modern web technologies.
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
	}

	:global(.letter.highlight) {
		color: var(--color-secondary) !important;
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
