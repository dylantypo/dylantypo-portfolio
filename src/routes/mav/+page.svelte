<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	// Configuration constants - easy to adjust
	const MAX_BUBBLE_SIZE = 350; // Maximum bubble size before popping
	const MIN_BUBBLE_SIZE = 5; // Starting size for new bubbles
	const BASE_BUBBLE_SIZE = 55; // Base reference size (now dynamically adjusted)
	const INFLATION_SPEED = 0.25; // How quickly bubbles inflate (0-1)
	const MAX_BUBBLES = 50; // Maximum number of bubbles
	const BUBBLE_SPAWN_INTERVAL_NO_AUDIO = 2000; // ms between spawns without audio
	const BUBBLE_RESPONSE_FACTOR = 0.4; // How responsive bubbles are to audio (0-1)
	const AUTO_POP_CHANCE = 0.001; // Random pop chance per frame

	// Bubble states
	enum BubbleState {
		INFLATING,
		ACTIVE,
		POPPING
	}

	// Simple Bubble class
	class Bubble {
		x: number;
		y: number;
		radius: number;
		baseRadius: number;
		targetRadius: number;
		color: string;
		frequencyBand: number; // 0=bass, 1=mid, 2=treble
		life: number = 0;
		maxLife: number = 500;
		state: BubbleState = BubbleState.INFLATING;
		inflationProgress: number = 0;
		popProgress: number = 0;
		velocity: { x: number; y: number } = { x: 0, y: 0 };
		wobble: number = 0;
		wobbleSpeed: number = Math.random() * 0.05 + 0.02;
		wobbleAmount: number = Math.random() * 3 + 1;

		constructor(x: number, y: number, radius: number, color: string, frequencyBand: number) {
			this.x = x;
			this.y = y;
			this.baseRadius = radius;
			this.radius = MIN_BUBBLE_SIZE;
			this.targetRadius = radius;
			this.color = color;
			this.frequencyBand = frequencyBand;

			// Random gentle movement
			this.velocity = {
				x: (Math.random() - 0.5) * 0.5,
				y: (Math.random() - 0.5) * 0.3 - 0.2 // Slightly upward bias
			};
		}

		update(audioValue: number, deltaTime: number = 16): boolean {
			this.life++;
			this.wobble += (this.wobbleSpeed * deltaTime) / 16;

			switch (this.state) {
				case BubbleState.INFLATING:
					// Quickly inflate to base size
					this.inflationProgress += (INFLATION_SPEED * deltaTime) / 16;
					if (this.inflationProgress >= 1) {
						this.inflationProgress = 1;
						this.state = BubbleState.ACTIVE;
					}
					this.radius =
						MIN_BUBBLE_SIZE +
						(this.baseRadius - MIN_BUBBLE_SIZE) * this.easeOutBack(this.inflationProgress);
					break;

				case BubbleState.ACTIVE:
					// Respond to audio and check for max size
					if (audioValue > 0) {
						// Make the response more subtle since base size already reflects audio
						this.targetRadius = this.baseRadius * (1 + audioValue * BUBBLE_RESPONSE_FACTOR * 0.5);
					} else {
						// Slowly return to base size when no audio
						this.targetRadius = this.baseRadius;
					}

					// Apply slight wobble
					const wobbleEffect = Math.sin(this.wobble) * this.wobbleAmount;
					this.radius += (this.targetRadius - this.radius) * 0.1 + wobbleEffect * 0.1;

					// Check for max size or random popping
					if (this.radius > MAX_BUBBLE_SIZE || Math.random() < AUTO_POP_CHANCE) {
						this.state = BubbleState.POPPING;
					}
					break;

				case BubbleState.POPPING:
					// Pop animation
					this.popProgress += (0.1 * deltaTime) / 16;
					if (this.popProgress >= 1) {
						return false; // Remove bubble
					}

					// Expand slightly then shrink to nothing
					if (this.popProgress < 0.2) {
						this.radius += (5 * deltaTime) / 16;
					} else {
						this.radius *= 0.8;
					}
					break;
			}

			// Apply movement
			this.x += (this.velocity.x * deltaTime) / 16;
			this.y += (this.velocity.y * deltaTime) / 16;

			// Add subtle movement based on audio
			if (this.state === BubbleState.ACTIVE && audioValue > 0.3) {
				this.x += (Math.random() - 0.5) * audioValue * 2;
				this.y += (Math.random() - 0.5) * audioValue * 2;
			}

			// Wrap around the screen with a buffer
			if (this.x < -this.radius * 2) this.x = canvasWidth + this.radius;
			if (this.x > canvasWidth + this.radius * 2) this.x = -this.radius;
			if (this.y < -this.radius * 2) this.y = canvasHeight + this.radius;
			if (this.y > canvasHeight + this.radius * 2) this.y = -this.radius;

			return this.life < this.maxLife || this.state === BubbleState.POPPING;
		}

		draw(ctx: CanvasRenderingContext2D) {
			// Skip if too small
			if (this.radius < 1) return;

			// Calculate opacity based on life and state
			let opacity = 1;
			if (this.state === BubbleState.INFLATING) {
				opacity = this.inflationProgress;
			} else if (this.state === BubbleState.ACTIVE) {
				opacity = Math.min(1, 1 - Math.pow(this.life / this.maxLife, 2));
			} else if (this.state === BubbleState.POPPING) {
				opacity = 1 - this.popProgress;
			}

			// Draw bubble with translucent glow
			ctx.save();

			// Use a different blend mode for better overlapping
			ctx.globalCompositeOperation = 'screen';

			// Inner gradient
			const innerGradient = ctx.createRadialGradient(
				this.x - this.radius * 0.3,
				this.y - this.radius * 0.3,
				0,
				this.x,
				this.y,
				this.radius
			);

			// More translucent colors for better mixing
			const baseColor = this.hexToRgb(this.color);
			const colorRgba = `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, ${0.4 * opacity})`;
			const highlightRgba = `rgba(${Math.min(255, baseColor.r + 50)}, ${Math.min(255, baseColor.g + 50)}, ${Math.min(255, baseColor.b + 50)}, ${0.5 * opacity})`;
			const transparentRgba = `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, 0)`;

			// Build gradient for bubble
			innerGradient.addColorStop(0, highlightRgba);
			innerGradient.addColorStop(0.6, colorRgba);
			innerGradient.addColorStop(1, transparentRgba);

			// Draw main bubble
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
			ctx.fillStyle = innerGradient;
			ctx.fill();

			// Draw highlight reflection
			const highlightSize = this.radius * 0.4;
			const highlightX = this.x - this.radius * 0.2;
			const highlightY = this.y - this.radius * 0.2;

			const highlightGradient = ctx.createRadialGradient(
				highlightX,
				highlightY,
				0,
				highlightX,
				highlightY,
				highlightSize
			);

			highlightGradient.addColorStop(0, `rgba(255, 255, 255, ${0.6 * opacity})`);
			highlightGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

			ctx.beginPath();
			ctx.arc(highlightX, highlightY, highlightSize, 0, Math.PI * 2);
			ctx.fillStyle = highlightGradient;
			ctx.fill();

			// Draw bubble edge with subtle rim
			if (this.state !== BubbleState.POPPING) {
				ctx.beginPath();
				ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
				ctx.strokeStyle = `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, ${0.1 * opacity})`;
				ctx.lineWidth = 1.5;
				ctx.stroke();
			}

			ctx.restore();
		}

		containsPoint(x: number, y: number): boolean {
			const distance = Math.sqrt((this.x - x) ** 2 + (this.y - y) ** 2);
			return distance < this.radius;
		}

		// Convert hex color to RGB for easier manipulation
		hexToRgb(hex: string): { r: number; g: number; b: number } {
			// Remove # if present
			hex = hex.replace(/^#/, '');

			// Parse hex values
			const r = parseInt(hex.substring(0, 2), 16);
			const g = parseInt(hex.substring(2, 4), 16);
			const b = parseInt(hex.substring(4, 6), 16);

			return { r, g, b };
		}

		// Easing function for bubble inflation
		easeOutBack(x: number): number {
			const c1 = 1.70158;
			const c3 = c1 + 1;
			return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
		}
	}

	// Constants
	const COLORS = [
		'#ff5252', // Bass (red)
		'#4caf50', // Mid (green)
		'#2196f3' // Treble (blue)
	];

	// Function to generate color variations
	function getColorVariation(baseColor: string, amount: number = 15): string {
		// Convert hex to RGB
		const r = parseInt(baseColor.substring(1, 3), 16);
		const g = parseInt(baseColor.substring(3, 5), 16);
		const b = parseInt(baseColor.substring(5, 7), 16);

		// Generate random variations within amount range
		const rVariation = Math.max(0, Math.min(255, r + (Math.random() * 2 - 1) * amount));
		const gVariation = Math.max(0, Math.min(255, g + (Math.random() * 2 - 1) * amount));
		const bVariation = Math.max(0, Math.min(255, b + (Math.random() * 2 - 1) * amount));

		// Convert back to hex with padding
		const rHex = Math.floor(rVariation).toString(16).padStart(2, '0');
		const gHex = Math.floor(gVariation).toString(16).padStart(2, '0');
		const bHex = Math.floor(bVariation).toString(16).padStart(2, '0');

		return `#${rHex}${gHex}${bHex}`;
	}

	// State variables
	let canvas = $state<HTMLCanvasElement | null>(null);
	let ctx = $state<CanvasRenderingContext2D | null>(null);
	let audioContext = $state<AudioContext | null>(null);
	let analyser = $state<AnalyserNode | null>(null);
	let mediaStream = $state<MediaStream | null>(null);
	let bubbles = $state<Bubble[]>([]);
	let hasAudio = $state(false);
	let isInitialized = $state(false);
	let animationId = $state<number | null>(null);
	let frequencyData = $state<Uint8Array | null>(null);
	let timeData = $state<Uint8Array | null>(null);
	let canvasWidth = $state(0);
	let canvasHeight = $state(0);
	let audioValues = $state<number[]>([0, 0, 0]); // [bass, mid, treble]
	let lastSpawnTime = $state(0);
	let lastFrameTime = $state(0);
	let beatDetector = $state<BeatDetector | null>(null);

	// Beat detection for more natural spawning
	class BeatDetector {
		private energyHistory: number[] = [];
		private beatHistory: number[] = [];
		private lastBeatTime: number = 0;
		private threshold: number = 0.6;
		private sensitivity: number = 1.2;

		constructor(private historySize: number = 30) {
			// Initialize history with zeros
			this.energyHistory = Array(historySize).fill(0);
			this.beatHistory = [];
		}

		addEnergy(energy: number, currentTime: number): boolean {
			// Add current energy to history
			this.energyHistory.push(energy);
			if (this.energyHistory.length > this.historySize) {
				this.energyHistory.shift();
			}

			// Calculate average energy from history
			const average =
				this.energyHistory.reduce((sum, val) => sum + val, 0) / this.energyHistory.length;

			// Detect beat if energy exceeds average by threshold
			if (energy > average * this.sensitivity && energy > this.threshold) {
				// Ensure not detecting beats too close together
				if (currentTime - this.lastBeatTime > 200) {
					this.lastBeatTime = currentTime;

					// Add to beat history for tempo calculation
					this.beatHistory.push(currentTime);
					if (this.beatHistory.length > 8) {
						this.beatHistory.shift();
					}

					return true;
				}
			}

			return false;
		}

		getEstimatedTempo(): number {
			if (this.beatHistory.length < 2) {
				return 0; // Not enough beats to calculate tempo
			}

			// Calculate time differences between beats
			const intervals: number[] = [];
			for (let i = 1; i < this.beatHistory.length; i++) {
				intervals.push(this.beatHistory[i] - this.beatHistory[i - 1]);
			}

			// Calculate average interval and convert to BPM
			const avgInterval = intervals.reduce((sum, val) => sum + val, 0) / intervals.length;
			const bpm = 60000 / avgInterval;

			// Round to reasonable BPM range (40-240)
			return Math.max(40, Math.min(240, bpm));
		}

		getTimeSinceLastBeat(currentTime: number): number {
			return currentTime - this.lastBeatTime;
		}
	}

	// Request audio access
	async function requestAudio() {
		if (!browser) return;

		try {
			audioContext = new AudioContext();
			analyser = audioContext.createAnalyser();
			analyser.fftSize = 512;
			analyser.smoothingTimeConstant = 0.8;

			frequencyData = new Uint8Array(analyser.frequencyBinCount);
			timeData = new Uint8Array(analyser.fftSize);

			mediaStream = await navigator.mediaDevices.getUserMedia({
				audio: {
					echoCancellation: true,
					noiseSuppression: true,
					autoGainControl: true
				}
			});

			const source = audioContext.createMediaStreamSource(mediaStream);
			source.connect(analyser);

			// Initialize beat detector
			beatDetector = new BeatDetector();

			hasAudio = true;
		} catch (err) {
			console.error('Error accessing audio:', err);
			alert('Could not access microphone');
		}
	}

	// Stop audio processing
	function stopAudio() {
		if (mediaStream) {
			mediaStream.getTracks().forEach((track) => track.stop());
			mediaStream = null;
		}

		if (audioContext) {
			audioContext.close();
			audioContext = null;
		}

		hasAudio = false;
		beatDetector = null;
	}

	// Create a new bubble at the specified position
	function createBubble(x: number, y: number, size: number = 0) {
		if (bubbles.length >= MAX_BUBBLES) {
			// Remove oldest bubble if we're at capacity
			bubbles.shift();
		}

		const band = Math.floor(Math.random() * 3);

		// Calculate dynamic base size using audio levels
		let dynamicBaseSize = BASE_BUBBLE_SIZE;

		if (hasAudio && audioValues.length > 0) {
			// Use the specific band for this bubble
			const bandValue = audioValues[band] || 0;

			// Scale base size based on audio levels
			dynamicBaseSize = BASE_BUBBLE_SIZE * (0.8 + bandValue * 1.5);

			// Add some randomness to the scaling
			const randomFactor = 0.7 + Math.random() * 0.6;
			dynamicBaseSize *= randomFactor;
		} else {
			// When no audio, use original randomization
			dynamicBaseSize *= 0.7 + Math.random() * 0.6;
		}

		// If size was explicitly provided, use that instead
		const radius = size > 0 ? size : dynamicBaseSize;

		const baseColor = COLORS[band];
		const colorVariation = getColorVariation(baseColor);
		bubbles.push(new Bubble(x, y, radius, colorVariation, band));
	}

	// Process audio data
	function processAudio(currentTime: number): boolean {
		if (!analyser || !frequencyData || !timeData || !beatDetector) return false;

		analyser.getByteFrequencyData(frequencyData);
		analyser.getByteTimeDomainData(timeData);

		// Calculate average values for low, mid, and high frequencies
		const bassSum = sumFrequencyRange(frequencyData, 0, 5); // Bass: 0-5
		const midSum = sumFrequencyRange(frequencyData, 6, 20); // Mid: 6-20
		const trebleSum = sumFrequencyRange(frequencyData, 21, 60); // Treble: 21-60

		// Normalize values (0-1 range)
		audioValues[0] = bassSum / (255 * 6); // Bass
		audioValues[1] = midSum / (255 * 15); // Mid
		audioValues[2] = trebleSum / (255 * 40); // Treble

		// Calculate overall energy for beat detection
		const energy = (audioValues[0] * 1.5 + audioValues[1] + audioValues[2] * 0.8) / 3;

		// Detect beats for bubble spawning
		return beatDetector.addEnergy(energy, currentTime);
	}

	// Helper to sum frequency ranges
	function sumFrequencyRange(data: Uint8Array, start: number, end: number): number {
		let sum = 0;
		for (let i = start; i <= end && i < data.length; i++) {
			sum += data[i];
		}
		return sum;
	}

	// Main animation loop
	function animate(currentTime: number) {
		if (!ctx || !canvas) {
			animationId = requestAnimationFrame(animate);
			return;
		}

		// Calculate delta time for smoother animations
		const deltaTime = lastFrameTime > 0 ? currentTime - lastFrameTime : 16;
		lastFrameTime = currentTime;

		// Process audio if available and detect beats
		let beatDetected = false;
		if (hasAudio) {
			beatDetected = processAudio(currentTime);

			// Spawn bubbles on beats or based on energy
			if (beatDetected) {
				const audioEnergy = Math.max(...audioValues);
				const maxBand = audioValues.indexOf(Math.max(...audioValues));

				// Spawn 1-3 bubbles based on energy
				const spawnCount = Math.floor(1 + audioEnergy * 2);
				for (let i = 0; i < spawnCount; i++) {
					const x = Math.random() * canvasWidth;
					const y = Math.random() * canvasHeight;
					const size = 30 + audioEnergy * 40;
					createBubble(x, y, size);
				}

				// Add extra bubble of the strongest frequency
				if (audioEnergy > 0.6) {
					const x = Math.random() * canvasWidth;
					const y = Math.random() * canvasHeight;
					createBubble(x, y, 60 + audioEnergy * 30);
				}
			}

			// Occasionally spawn small bubbles based on treble
			if (audioValues[2] > 0.7 && Math.random() < 0.1) {
				const x = Math.random() * canvasWidth;
				const y = Math.random() * canvasHeight;
				createBubble(x, y, 15 + audioValues[2] * 20);
			}
		} else {
			// Slow, steady spawn rate without audio
			if (currentTime - lastSpawnTime > BUBBLE_SPAWN_INTERVAL_NO_AUDIO) {
				const x = Math.random() * canvasWidth;
				const y = Math.random() * canvasHeight;
				createBubble(x, y);
				lastSpawnTime = currentTime;
			}
		}

		// Clear canvas with slight fade for trails
		ctx.fillStyle = 'rgba(0,0,0,0.1)';
		ctx.fillRect(0, 0, canvasWidth, canvasHeight);

		// Update and draw bubbles
		for (let i = bubbles.length - 1; i >= 0; i--) {
			const bubble = bubbles[i];
			const audioValue = audioValues[bubble.frequencyBand] || 0;

			// Update bubble and remove if expired
			if (!bubble.update(audioValue, deltaTime)) {
				// Create small pop bubbles
				if (bubble.state === BubbleState.POPPING && bubble.popProgress > 0.5) {
					// Add tiny bubbles as popping effect
					for (let j = 0; j < 3; j++) {
						const angle = Math.random() * Math.PI * 2;
						const distance = bubble.radius * 0.8;
						const newX = bubble.x + Math.cos(angle) * distance;
						const newY = bubble.y + Math.sin(angle) * distance;

						const tinyBubble = new Bubble(
							newX,
							newY,
							bubble.radius * 0.3,
							bubble.color,
							bubble.frequencyBand
						);
						tinyBubble.maxLife = 60 + Math.random() * 40;
						// Start already inflated
						tinyBubble.state = BubbleState.ACTIVE;
						tinyBubble.inflationProgress = 1;
						tinyBubble.velocity = {
							x: Math.cos(angle) * 2,
							y: Math.sin(angle) * 2
						};
						bubbles.push(tinyBubble);
					}
				}

				bubbles.splice(i, 1);
				continue;
			}

			// Draw the bubble
			bubble.draw(ctx);
		}

		// Draw beat detection info if in dev mode
		if (ctx && import.meta.env.DEV && beatDetector) {
			ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
			ctx.font = '12px Arial';

			const x = 10;
			let y = 20;

			ctx.fillText(`Bubbles: ${bubbles.length}/${MAX_BUBBLES}`, x, y);
			y += 20;

			if (hasAudio) {
				ctx.fillText(`Bass: ${audioValues[0].toFixed(2)}`, x, y);
				y += 20;
				ctx.fillText(`Mid: ${audioValues[1].toFixed(2)}`, x, y);
				y += 20;
				ctx.fillText(`Treble: ${audioValues[2].toFixed(2)}`, x, y);
				y += 20;

				const bpm = beatDetector.getEstimatedTempo();
				if (bpm > 0) {
					ctx.fillText(`Tempo: ~${Math.round(bpm)} BPM`, x, y);
				}
			}
		}

		// Continue animation
		animationId = requestAnimationFrame(animate);
	}

	// Handle window resize
	function handleResize() {
		if (!canvas || !browser) return;

		const dpr = window.devicePixelRatio || 1;
		canvasWidth = window.innerWidth;
		canvasHeight = window.innerHeight;

		canvas.width = canvasWidth * dpr;
		canvas.height = canvasHeight * dpr;
		canvas.style.width = `${canvasWidth}px`;
		canvas.style.height = `${canvasHeight}px`;

		if (ctx) {
			ctx.scale(dpr, dpr);
		}
	}

	// Handle mouse click
	function handleClick(e: MouseEvent) {
		const rect = canvas?.getBoundingClientRect();
		if (!rect) return;

		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		// Check if clicked on an existing bubble (pop it)
		for (let i = bubbles.length - 1; i >= 0; i--) {
			if (bubbles[i].containsPoint(x, y)) {
				// Set to popping state
				bubbles[i].state = BubbleState.POPPING;
				return;
			}
		}

		// If didn't hit a bubble, create a new one
		createBubble(x, y);
	}

	// Lifecycle hooks
	onMount(() => {
		if (!browser) return;

		if (canvas) {
			ctx = canvas.getContext('2d');
			handleResize();

			// Add event listeners
			window.addEventListener('resize', handleResize);
			canvas.addEventListener('click', handleClick);

			// Start animation
			lastFrameTime = performance.now();
			animationId = requestAnimationFrame(animate);

			// Create some initial static bubbles
			for (let i = 0; i < 5; i++) {
				const x = Math.random() * canvasWidth;
				const y = Math.random() * canvasHeight;
				const radius = 20 + Math.random() * 30;
				const band = i % 3;

				bubbles.push(new Bubble(x, y, radius, COLORS[band], band));
			}

			isInitialized = true;
		}
	});

	onDestroy(() => {
		if (animationId) {
			cancelAnimationFrame(animationId);
		}

		if (hasAudio) {
			stopAudio();
		}

		if (browser) {
			window.removeEventListener('resize', handleResize);
			canvas?.removeEventListener('click', handleClick);
		}
	});
</script>

<div class="container">
	<canvas bind:this={canvas}></canvas>

	<div class="controls">
		{#if !hasAudio}
			<button onclick={requestAudio}> Enable Audio </button>
		{:else}
			<button onclick={stopAudio}> Disable Audio </button>
		{/if}

		<p class="info">
			{#if hasAudio}
				🔊 Make some noise or play music!
			{:else}
				👆 Click to create bubbles | 🎵 Enable audio for reactive bubbles
			{/if}
		</p>
	</div>
</div>

<style>
	.container {
		width: 100%;
		height: 100vh;
		position: relative;
	}

	canvas {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: block;
	}

	.controls {
		position: absolute;
		top: 20px;
		left: 50%;
		transform: translateX(-50%);
		z-index: 10;
		background: var(--color-fill);
		padding: 15px;
		border-radius: 10px;
		text-align: center;
		font-family: var(--font-family);
	}

	button {
		background: var(--color-text-secondary);
		color: var(--color-text-primary);
		border: 1px solid var(--color-secondary);
		border-radius: 20px;
		padding: 8px 15px;
		font-size: 16px;
		cursor: pointer;
		transition: all 0.2s;
	}

	button:hover {
		background: var(--color-hover);
		box-shadow: 0 0 15px var(--color-secondary);
	}

	.info {
		color: var(--color-text-primary);
		margin: 10px 0 0;
		font-size: 14px;
	}
</style>
