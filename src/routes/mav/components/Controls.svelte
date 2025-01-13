<script lang="ts">
	import { onDestroy } from 'svelte';

	// Props using Svelte 5 runes
	let {
		hasAudioPermission = false,
		onRequestAudio = () => {},
		onStopAudio = () => {}
	} = $props<{
		hasAudioPermission: boolean;
		onRequestAudio: () => void;
		onStopAudio: () => void;
	}>();

	// Animation state
	let fadeTimeout = $state<ReturnType<typeof setTimeout> | null>(null);
	let shouldFade = $state(false);

	// Handle mouse interactions
	function handleMouseEnter() {
		if (fadeTimeout) {
			clearTimeout(fadeTimeout);
			fadeTimeout = null;
		}
		shouldFade = false;
	}

	function handleMouseLeave() {
		if (hasAudioPermission) {
			fadeTimeout = setTimeout(() => {
				shouldFade = true;
			}, 5000);
		}
	}

	// Reset fade animation on permission change
	$effect(() => {
		if (hasAudioPermission) {
			fadeTimeout = setTimeout(() => {
				shouldFade = true;
			}, 5000);
		} else {
			shouldFade = false;
			if (fadeTimeout) {
				clearTimeout(fadeTimeout);
				fadeTimeout = null;
			}
		}
	});

	// Cleanup on destroy
	onDestroy(() => {
		if (fadeTimeout) {
			clearTimeout(fadeTimeout);
		}
	});
</script>

<div
	class="controls"
	class:active={hasAudioPermission}
	class:fade={shouldFade}
	role="region"
	aria-label="Audio controls"
	onmouseenter={handleMouseEnter}
	onmouseleave={handleMouseLeave}
>
	<h1>Audio Fluid Globe</h1>

	<div class="permissions">
		{#if !hasAudioPermission}
			<button
				class="permission-button"
				onclick={onRequestAudio}
				aria-label="Enable microphone input"
			>
				<i class="mic-icon">🎤</i>
				Enable Audio
			</button>
		{:else}
			<button class="permission-button" onclick={onStopAudio} aria-label="Disable microphone input">
				<i class="mic-icon">🎤</i>
				Disable Audio
			</button>
		{/if}
	</div>

	<div class="instructions">
		{#if hasAudioPermission}
			Make some noise or play music to see the fluid react!
		{:else}
			Enable microphone access to see the fluid react to sound.
		{/if}
		<br />
		Drag to rotate, scroll to zoom.
	</div>
</div>

<style>
	.controls {
		position: absolute;
		top: 20px;
		left: 50%;
		transform: translateX(-50%);
		color: white;
		text-align: center;
		font-family: Arial, sans-serif;
		z-index: 1000;
		background: rgba(0, 0, 0, 0.2);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		padding: 1.5rem;
		border-radius: 1rem;
		transition: all 0.3s ease;
		opacity: 1;
	}

	.controls.active.fade {
		opacity: 0.2;
	}

	h1 {
		margin: 0;
		font-size: 2em;
		margin-bottom: 0.5em;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
	}

	.instructions {
		font-size: 1.2em;
		opacity: 0.8;
		margin-top: 1rem;
	}

	.permissions {
		margin: 1rem 0;
	}

	.permission-button {
		background: rgba(255, 255, 255, 0.1);
		border: none;
		color: white;
		padding: 0.75rem 1.5rem;
		border-radius: 2rem;
		cursor: pointer;
		font-size: 1rem;
		transition: all 0.2s ease;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin: 0 auto;
	}

	.permission-button:hover {
		background: rgba(255, 255, 255, 0.2);
		transform: translateY(-1px);
	}

	.permission-button:focus-visible {
		outline: 2px solid white;
		outline-offset: 2px;
	}

	.mic-icon {
		font-size: 1.2em;
	}

	@media (max-width: 768px) {
		.controls {
			width: 90%;
			font-size: 14px;
			padding: 1rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.controls,
		.permission-button {
			transition: none;
		}
	}
</style>
