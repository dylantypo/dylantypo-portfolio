<script lang="ts">
	import gsap from 'gsap';
	import { onMount } from 'svelte';
	import { debounce } from 'lodash';
	import Skills from '$lib/skills.svelte';
	import History from '$lib/history.svelte';

	let elements: HTMLElement[] = [];

	let lastWidth = 0;
	let lastHeight = 0;

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

	const handleResize = debounce(() => {
		const newWidth = window.innerWidth;
		const newHeight = window.innerHeight;

		// Only update if dimensions actually changed
		if (newWidth === lastWidth && newHeight === lastHeight) return;

		lastWidth = newWidth;
		lastHeight = newHeight;

		ScrollTrigger.refresh();
	}, 500);

	onMount(() => {
		const initializeAnimations = async () => {
			const { ScrollTrigger } = await import('gsap/ScrollTrigger');
			gsap.registerPlugin(ScrollTrigger);

			const { CustomEase } = await import('gsap/CustomEase');
			gsap.registerPlugin(CustomEase);

			CustomEase.create('waterRipple', 'M0,0 C0.2,0.4 0.4,0.8 1,1');

			const ctx = gsap.context(() => {
				elements = gsap.utils.toArray('.fade-in') as HTMLElement[];

				elements.forEach((el, index) => {
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

					// 📱 Simple landscape detection for timing adjustment
					const isLandscape = window.innerHeight < 500 && window.innerWidth > window.innerHeight;

					const timeline = gsap.timeline({
						scrollTrigger: {
							trigger: el,
							start: isLandscape ? 'top 85%' : 'top 75%',
							end: () => `+=${el.offsetHeight}`,
							scrub: isLandscape ? 1.2 : 1.75
						}
					});

					timeline.fromTo(
						letters,
						{
							opacity: 0,
							y: '20%',
							rotateX: '45deg',
							transformOrigin: 'bottom',
							scale: 0.5
						},
						{
							opacity: 1,
							y: '0%',
							rotateX: '0deg',
							scale: 1,
							stagger: {
								amount: isLandscape ? 1.2 : 1.75,
								from: 'random'
							},
							ease: 'waterRipple',
							duration: 1.5
						}
					);
				});

				ScrollTrigger.refresh();
			});

			// Add resize listener
			window.addEventListener('resize', handleResize);

			// Store initial dimensions
			lastWidth = window.innerWidth;
			lastHeight = window.innerHeight;

			return () => {
				window.removeEventListener('resize', handleResize);
				ctx.revert();
			};
		};

		initializeAnimations();
	});

	$effect(() => {
		// Effect for tracking elements if needed
	});
</script>

<main id="content">
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

	<History />

	<Skills />

	<footer id="footer-content" aria-label="Copyright and contact">
		<p class="footer">
			<span id="copyright" aria-label="Copyright">©</span> Dylan Posner 2025
		</p>
		<button class="headshot" aria-label="View contact information">
			<img
				src="profile.webp"
				width="200"
				height="200"
				alt="Stylized avatar headshot created by Midjourney"
			/>
		</button>
	</footer>
</main>

<style>
	#content {
		color: var(--color-text-primary);
		user-select: text;
	}

	#footer-content {
		padding-bottom: 10vh;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}

	.headshot {
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
	}

	.headshot:focus-visible {
		border-radius: 50%;
		outline: 3px solid var(--color-focus);
		outline-offset: 2px;
	}

	.headshot img {
		width: 10vmin;
		height: auto;
		margin: 1em;
		border-radius: 50%;
		opacity: 0.6;
		box-shadow: 0 8px 10px rgba(0, 0, 0, 0.85);
		transition:
			transform var(--transition-speed),
			opacity var(--transition-speed),
			box-shadow var(--transition-speed);
	}

	.headshot img:hover {
		transform: scale(1.2);
		opacity: 1;
		box-shadow: 0 12px 16px rgba(0, 0, 0, 0.75);
	}

	.section {
		min-height: 30vh;
		height: auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		padding: var(--spacing-base) 0 var(--spacing-lg) 0;
		margin-bottom: 0;
		box-sizing: border-box;
	}

	.header,
	.footer {
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
			min-height: 25vh;
		}
	}

	@media (max-width: 925px) {
		.section {
			align-items: center;
			min-height: 35vh;
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
			min-height: 40vh;
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
			min-height: 45vh;
		}

		.long-text {
			font-size: clamp(1rem, 2.5vh + 1.2vw, 2.4rem);
		}
	}

	@media (min-width: 1400px) {
		.section {
			min-height: 25vh;
		}
	}
</style>
