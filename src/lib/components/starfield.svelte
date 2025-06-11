<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let starContainer: HTMLDivElement;
	let mounted = false;
	let hydrated = false;
	let animationId: number = 0;
	let stars: HTMLElement[] = [];
	let shootingStars: HTMLElement[] = [];
	let lastShootingStarTime = 0;

	function generateInitialStars() {
		if (!browser || !starContainer) return;

		const isMobile = window.innerWidth < 768;
		const starCount = isMobile ? 60 : 120;

		starContainer.innerHTML = '';
		stars = [];

		for (let i = 0; i < starCount; i++) {
			const star = document.createElement('div');
			star.className = 'star';

			const x = Math.random() * 100;
			const y = Math.random() * 100;
			const size = Math.random() * 2 + 1;
			const delay = Math.random() * 4;
			const duration = Math.random() * 3 + 2;

			star.style.cssText = `
				left: ${x}%;
				top: ${y}%;
				width: ${size}px;
				height: ${size}px;
				animation-delay: ${delay}s;
				animation-duration: ${duration}s;
			`;

			// Store fade time for JS enhancement
			(star as any)._fadeTime = Date.now() + Math.random() * 30000 + 10000;
			(star as any)._fading = false;

			starContainer.appendChild(star);
			stars.push(star);
		}
	}

	function createShootingStar() {
		if (!starContainer || !hydrated) return;

		const shootingStar = document.createElement('div');
		shootingStar.className = 'shooting-star dynamic';

		const startSide = Math.floor(Math.random() * 4);
		const width = window.innerWidth;
		const height = window.innerHeight;
		let startX, startY, endX, endY;

		switch (startSide) {
			case 0: // Top
				startX = Math.random() * width;
				startY = -50;
				endX = startX + (Math.random() - 0.5) * 200;
				endY = Math.random() * height * 0.7 + height * 0.3;
				break;
			case 1: // Right
				startX = width + 50;
				startY = Math.random() * height;
				endX = Math.random() * width * 0.7;
				endY = startY + (Math.random() - 0.5) * 200;
				break;
			case 2: // Bottom
				startX = Math.random() * width;
				startY = height + 50;
				endX = startX + (Math.random() - 0.5) * 200;
				endY = Math.random() * height * 0.7;
				break;
			default: // Left
				startX = -50;
				startY = Math.random() * height;
				endX = Math.random() * width * 0.7 + width * 0.3;
				endY = startY + (Math.random() - 0.5) * 200;
		}

		shootingStar.style.cssText = `
			left: ${startX}px;
			top: ${startY}px;
			--end-x: ${endX}px;
			--end-y: ${endY}px;
		`;

		(shootingStar as any)._startX = startX;
		(shootingStar as any)._startY = startY;
		(shootingStar as any)._endX = endX;
		(shootingStar as any)._endY = endY;
		(shootingStar as any)._life = 0;
		(shootingStar as any)._maxLife = 120;

		starContainer.appendChild(shootingStar);
		shootingStars.push(shootingStar);
	}

	function updateStars() {
		if (!hydrated || !mounted) return;

		const now = Date.now();

		// Update static stars for fade/relocate
		stars.forEach((star) => {
			const starEl = star as any;

			if (!starEl._fading && now >= starEl._fadeTime) {
				starEl._fading = true;
				star.style.animation = 'twinkle 2s ease-in-out infinite, fadeOut 2s ease-out';

				setTimeout(() => {
					if (!mounted) return;

					// Relocate star
					const x = Math.random() * 100;
					const y = Math.random() * 100;
					star.style.left = `${x}%`;
					star.style.top = `${y}%`;
					star.style.animation = 'twinkle 2s ease-in-out infinite, fadeIn 2s ease-in';

					starEl._fading = false;
					starEl._fadeTime = now + Math.random() * 25000 + 15000;
				}, 2000);
			}
		});

		// Update shooting stars
		for (let i = shootingStars.length - 1; i >= 0; i--) {
			const star = shootingStars[i] as any;
			star._life++;

			const progress = star._life / star._maxLife;
			const x = star._startX + (star._endX - star._startX) * progress;
			const y = star._startY + (star._endY - star._startY) * progress;
			const opacity = Math.sin(progress * Math.PI) * 0.8;

			star.style.transform = `translate(${x - star._startX}px, ${y - star._startY}px)`;
			star.style.opacity = opacity;

			if (star._life >= star._maxLife) {
				star.remove();
				shootingStars.splice(i, 1);
			}
		}

		// Create new shooting stars
		if (now - lastShootingStarTime > 4000 + Math.random() * 6000) {
			if (Math.random() < 0.3) {
				createShootingStar();
				lastShootingStarTime = now;
			}
		}

		if (mounted) {
			animationId = requestAnimationFrame(updateStars);
		}
	}

	function handleResize() {
		if (mounted && hydrated) {
			// Only regenerate on significant size changes
			setTimeout(() => {
				if (mounted) {
					generateInitialStars();
				}
			}, 100);
		}
	}

	onMount(() => {
		if (!browser) return;

		mounted = true;

		// Phase 1: Generate static CSS stars immediately
		generateInitialStars();

		// Phase 2: Enable JS enhancements after hydration
		setTimeout(() => {
			if (mounted) {
				hydrated = true;
				lastShootingStarTime = Date.now();
				updateStars();
			}
		}, 500);

		window.addEventListener('resize', handleResize, { passive: true });

		return () => {
			mounted = false;
			hydrated = false;
			if (animationId) {
				cancelAnimationFrame(animationId);
				animationId = 0;
			}
			window.removeEventListener('resize', handleResize);
		};
	});
</script>

<div bind:this={starContainer} class="starfield" aria-hidden="true"></div>

<style>
	.starfield {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: -9999;
		background: #18181b;
		pointer-events: none;
		overflow: hidden;
	}

	:global(.star) {
		position: absolute;
		background: #ffffff;
		border-radius: 50%;
		animation: twinkle infinite ease-in-out;
		will-change: opacity, transform;
	}

	:global(.shooting-star) {
		position: absolute;
		width: 2px;
		height: 2px;
		background: #ffffff;
		border-radius: 50%;
		will-change: transform, opacity;
	}

	:global(.shooting-star::before) {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 15px;
		height: 1px;
		background: linear-gradient(90deg, rgba(255, 255, 255, 0.8), transparent);
		transform: translateX(-13px) rotate(-45deg);
		transform-origin: right center;
	}

	:global(.shooting-star.dynamic) {
		opacity: 0;
		transition: none;
	}

	@keyframes twinkle {
		0%,
		100% {
			opacity: 0.3;
			transform: scale(0.8);
		}
		50% {
			opacity: 1;
			transform: scale(1.2);
		}
	}

	@keyframes fadeOut {
		0% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}

	@keyframes fadeIn {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.starfield {
			display: none;
		}
	}

	@media (max-width: 768px) {
		:global(.star) {
			animation-duration: 4s !important;
		}
	}
</style>
