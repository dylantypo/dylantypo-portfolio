<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import Controls from './components/Controls.svelte';
    import AudioAnalyzer from './components/AudioAnalyzer.svelte';
    import FluidGlobe from './components/FluidGlobe.svelte';
    import type { AudioData } from './lib/types';
    import { browser } from '$app/environment';

    // State management with explicit types
    let hasAudioPermission = $state(false);
    let audioData = $state<AudioData | null>(null);
    let analyzer = $state<AudioAnalyzer | undefined>(undefined);
    let errorMessage = $state<string | null>(null);
    let isInitialized = $state(false);

    // Streamlined audio handlers
    async function handleRequestAudio() {
        if (!analyzer) {
            setError('Audio analyzer not initialized');
            return;
        }

        try {
            const success = await analyzer.startAudioAnalysis();
            
            if (success) {
                hasAudioPermission = true;
                errorMessage = null;
            } else {
                setError('Failed to start audio analysis');
            }
        } catch (err) {
            console.error('Audio request error:', err);
            setError('Failed to initialize audio');
        }
    }

    function handleStopAudio() {
        try {
            if (analyzer) {
                analyzer.stopAudioAnalysis();
                resetAudioState();
            }
        } catch (err) {
            console.error('Error stopping audio:', err);
            setError('Failed to stop audio analysis');
        }
    }

    // Utility functions for state management
    function setError(message: string) {
        errorMessage = message;
        resetAudioState();
    }

    function resetAudioState() {
        hasAudioPermission = false;
        audioData = null;
    }

    function dismissError() {
        errorMessage = null;
    }

    // Event handlers
    function handleError(e: CustomEvent<string>) {
        setError(e.detail);
    }

    function handleAudioData(e: CustomEvent<AudioData>) {
        audioData = e.detail;
    }

    // Lifecycle
    onMount(() => {
        if (!browser) return;
        isInitialized = true;
    });

    onDestroy(() => {
        // Clean up audio if active
        if (hasAudioPermission) {
            handleStopAudio();
        }

        // Force a redraw on cleanup to prevent ghost images
        if (browser) {
            requestAnimationFrame(() => {
                document.body.style.display = 'none';
                requestAnimationFrame(() => {
                    document.body.style.display = '';
                });
            });
        }
    });
</script>

{#if browser && isInitialized}
    <div class="container" class:has-error={errorMessage !== null}>
        <div class="scene-container">
            <FluidGlobe 
                audioData={audioData as AudioData | null}
                {hasAudioPermission}
            />
        </div>

        <div class="overlay-container">
            <AudioAnalyzer 
                bind:this={analyzer}
                on:audioData={handleAudioData}
                on:error={handleError}
            />

            <Controls
                {hasAudioPermission}
                onRequestAudio={handleRequestAudio}
                onStopAudio={handleStopAudio}
            />

            {#if errorMessage}
                <div class="error-overlay" role="alert">
                    <div class="error-message">
                        {errorMessage}
                        <button
                            onclick={dismissError}
                            class="error-close"
                            aria-label="Dismiss error"
                        >
                            ×
                        </button>
                    </div>
                </div>
            {/if}
        </div>
    </div>
{/if}

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		overflow: hidden;
	}

	.container {
		width: 100%;
		height: 100vh;
		background: #000510;
		overflow: hidden;
		position: relative;
		transform-style: preserve-3d;
		perspective: 1000px;
	}

	/* For mobile viewport height */
	@supports (height: 100dvh) {
		.container {
			height: 100dvh;
		}
	}

	.scene-container {
		position: absolute;
		inset: 0;
		z-index: 1;
	}

	.overlay-container {
		position: relative;
		z-index: 2;
		pointer-events: none;
	}

	.overlay-container :global(*) {
		pointer-events: auto;
	}

	.container.has-error {
		filter: brightness(0.8);
	}

	.error-overlay {
		position: fixed;
		top: 20px;
		left: 50%;
		transform: translateX(-50%);
		z-index: 2000;
		padding: 1rem;
		animation: slideIn 0.3s ease-out;
	}

	.error-message {
		background: rgba(255, 50, 50, 0.9);
		color: white;
		padding: 1rem 2rem;
		border-radius: 0.5rem;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		display: flex;
		align-items: center;
		gap: 1rem;
		font-family:
			system-ui,
			-apple-system,
			sans-serif;
	}

	.error-close {
		background: none;
		border: none;
		color: white;
		font-size: 1.5rem;
		cursor: pointer;
		padding: 0.25rem 0.5rem;
		border-radius: 0.25rem;
		line-height: 1;
		opacity: 0.8;
		transition: opacity 0.2s;
	}

	.error-close:hover {
		opacity: 1;
	}

	@keyframes slideIn {
		from {
			transform: translate(-50%, -100%);
			opacity: 0;
		}
		to {
			transform: translate(-50%, 0);
			opacity: 1;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.error-overlay {
			animation: none;
		}
	}

	@media (max-width: 768px) {
		.container {
			height: 100dvh;
			height: -webkit-fill-available;
		}
	}
</style>