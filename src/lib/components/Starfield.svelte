<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import { viewportManager } from '$lib/utils';

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D | null;
	let animationId: number;
	let staticStars: StaticStar[] = [];
	let shootingStars: ShootingStar[] = [];
	let lastShootingStarTime = 0;

	type StaticStar = {
		x: number;
		y: number;
		size: number;
		brightness: number;
		twinklePhase: number;
		twinkleSpeed: number;
		fadePhase: number;
		fadeDirection: number;
		nextFadeTime: number;
	};

	type ShootingStar = {
		x: number;
		y: number;
		vx: number;
		vy: number;
		life: number;
		maxLife: number;
		size: number;
		brightness: number;
	};

	function createStaticStar(): StaticStar {
		return {
			x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
			y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
			size: Math.random() * 1.5 + 0.5,
			brightness: Math.random() * 0.6 + 0.4,
			twinklePhase: Math.random() * 6.28,
			twinkleSpeed: Math.random() * 0.02 + 0.01,
			fadePhase: 1,
			fadeDirection: 0,
			nextFadeTime: Date.now() + Math.random() * 15000 + 5000
		};
	}

	function createShootingStar(): ShootingStar {
		const side = Math.floor(Math.random() * 4);
		let x, y, vx, vy;
		const width = typeof window !== 'undefined' ? window.innerWidth : 1000;
		const height = typeof window !== 'undefined' ? window.innerHeight : 1000;

		switch (side) {
			case 0: // Top
				x = Math.random() * width;
				y = -50;
				vx = (Math.random() - 0.5) * 4;
				vy = Math.random() * 3 + 2;
				break;
			case 1: // Right
				x = width + 50;
				y = Math.random() * height;
				vx = -(Math.random() * 3 + 2);
				vy = (Math.random() - 0.5) * 4;
				break;
			case 2: // Bottom
				x = Math.random() * width;
				y = height + 50;
				vx = (Math.random() - 0.5) * 4;
				vy = -(Math.random() * 3 + 2);
				break;
			default: // Left
				x = -50;
				y = Math.random() * height;
				vx = Math.random() * 3 + 2;
				vy = (Math.random() - 0.5) * 4;
		}

		return {
			x,
			y,
			vx,
			vy,
			life: 0,
			maxLife: 60 + Math.random() * 80,
			size: Math.random() * 2 + 1,
			brightness: Math.random() * 0.4 + 0.6
		};
	}

	function initStars() {
		const viewport = viewportManager.getViewportInfo();
		const starCount = viewport.isMobile ? 80 : 150;

		staticStars = Array.from({ length: starCount }, () => {
			const star = createStaticStar();
			star.nextFadeTime = Date.now() + Math.random() * 30000;
			return star;
		});
		shootingStars = [];
	}

	function updateStaticStar(star: StaticStar) {
		star.twinklePhase += star.twinkleSpeed;
		if (star.twinklePhase > 6.28) star.twinklePhase -= 6.28;

		const now = Date.now();

		if (star.fadeDirection === 0 && now >= star.nextFadeTime) {
			star.fadeDirection = -1;
		}

		if (star.fadeDirection !== 0) {
			star.fadePhase += star.fadeDirection * 0.02;

			if (star.fadePhase <= 0) {
				star.x = Math.random() * window.innerWidth;
				star.y = Math.random() * window.innerHeight;
				star.fadeDirection = 1;
				star.fadePhase = 0;
			} else if (star.fadePhase >= 1) {
				star.fadePhase = 1;
				star.fadeDirection = 0;
				star.nextFadeTime = now + Math.random() * 20000 + 10000;
			}
		}
	}

	function updateShootingStar(star: ShootingStar) {
		star.x += star.vx;
		star.y += star.vy;
		star.life++;
	}

	function drawStaticStar(star: StaticStar) {
		if (!ctx) return;

		const twinkle = 0.6 + 0.4 * Math.sin(star.twinklePhase);
		const opacity = star.brightness * twinkle * star.fadePhase;

		if (opacity <= 0.01) return;

		ctx.globalAlpha = opacity;
		ctx.fillStyle = '#ffffff';
		ctx.beginPath();
		ctx.arc(star.x, star.y, star.size, 0, 6.28);
		ctx.fill();
	}

	function drawShootingStar(star: ShootingStar) {
		if (!ctx) return;

		const fadeOut = Math.max(0, 1 - star.life / star.maxLife);
		const opacity = star.brightness * fadeOut;

		ctx.globalAlpha = opacity;
		ctx.fillStyle = '#ffffff';
		ctx.beginPath();
		ctx.arc(star.x, star.y, star.size, 0, 6.28);
		ctx.fill();
	}

	function animate() {
		if (!ctx || !canvas) return;

		ctx.fillStyle = 'rgba(24, 24, 27, 0.02)';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		for (let i = 0; i < staticStars.length; i++) {
			updateStaticStar(staticStars[i]);
			drawStaticStar(staticStars[i]);
		}

		const now = Date.now();
		if (now - lastShootingStarTime > 3000 + Math.random() * 7000) {
			if (Math.random() < 0.3) {
				shootingStars.push(createShootingStar());
				lastShootingStarTime = now;
			}
		}

		for (let i = shootingStars.length - 1; i >= 0; i--) {
			const star = shootingStars[i];
			updateShootingStar(star);
			drawShootingStar(star);

			if (
				star.life >= star.maxLife ||
				star.x < -100 ||
				star.x > canvas.width + 100 ||
				star.y < -100 ||
				star.y > canvas.height + 100
			) {
				shootingStars.splice(i, 1);
			}
		}

		animationId = requestAnimationFrame(animate);
	}

	function resize() {
		if (!canvas || !ctx) return;

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		// Restart everything for clean viewport adjustment
		initStars();
		lastShootingStarTime = Date.now();
	}

	onMount(() => {
		if (!browser) return;

		ctx = canvas.getContext('2d');
		if (!ctx) return;

		viewportManager.init();
		resize();
		initStars();
		animate();

		const handleResize = () => {
			resize();
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	});

	onDestroy(() => {
		if (animationId) {
			cancelAnimationFrame(animationId);
		}
	});
</script>

<canvas bind:this={canvas} class="starfield" aria-hidden="true"></canvas>

<style>
	.starfield {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: -9999;
		background: var(--color-primary);
		pointer-events: none;
		will-change: transform;
	}

	@media (prefers-reduced-motion: reduce) {
		.starfield {
			display: none;
		}
	}
</style>
