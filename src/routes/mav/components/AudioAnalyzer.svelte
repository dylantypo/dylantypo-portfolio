<script lang="ts">
	import { onDestroy, createEventDispatcher } from 'svelte';
	import type { AudioData } from '../lib/types';

	const dispatch = createEventDispatcher<{
		audioData: AudioData;
		error: string;
		stateChange: boolean; // Add state change event
	}>();

	// Audio state using runes
	let audioContext = $state<AudioContext | null>(null);
	let analyser = $state<AnalyserNode | null>(null);
	let isProcessing = $state(false);
	let animationFrameId = $state<number | null>(null);
	let lastProcessTime = $state(0); // Add timing optimization

	// Improve error handling with specific types
	type AudioError = {
		type: 'permission' | 'setup' | 'processing';
		message: string;
	};

	export async function startAudioAnalysis(): Promise<boolean> {
		try {
			if (audioContext) {
				await audioContext.resume();
			} else {
				audioContext = new AudioContext();
			}

			const stream = await navigator.mediaDevices.getUserMedia({
				audio: {
					echoCancellation: true,
					noiseSuppression: true,
					autoGainControl: true
				},
				video: false
			});

			analyser = audioContext.createAnalyser();
			analyser.fftSize = 256;
			analyser.smoothingTimeConstant = 0.8; // Add smoothing

			const source = audioContext.createMediaStreamSource(stream);
			const gainNode = audioContext.createGain();
			gainNode.gain.value = 0; // Prevent feedback

			source.connect(analyser);
			source.connect(gainNode);
			gainNode.connect(audioContext.destination);

			isProcessing = true;
			dispatch('stateChange', true);
			processAudio();
			return true;
		} catch (err) {
			const error: AudioError = {
				type: err instanceof Error && err.name === 'NotAllowedError' ? 'permission' : 'setup',
				message: err instanceof Error ? err.message : 'Failed to access microphone'
			};
			console.error('Audio setup error:', error);
			dispatch('error', error.message);
			return false;
		}
	}

	function processAudio() {
		if (!analyser || !isProcessing) return;

		const frequencyData = new Uint8Array(analyser.frequencyBinCount);
		const timeData = new Uint8Array(analyser.frequencyBinCount);

		function analyze(timestamp: number) {
			if (!analyser || !isProcessing) return;

			// Add frame timing optimization
			if (timestamp - lastProcessTime < 1000 / 60) {
				// 60fps cap
				animationFrameId = requestAnimationFrame(analyze);
				return;
			}
			lastProcessTime = timestamp;

			try {
				analyser.getByteFrequencyData(frequencyData);
				analyser.getByteTimeDomainData(timeData);

				const sum = frequencyData.reduce((a, b) => a + b);
				const averageFrequency = sum / frequencyData.length;

				const frequencies = new Float32Array(frequencyData.length);
				const waveform = new Float32Array(timeData.length);

				for (let i = 0; i < frequencyData.length; i++) {
					frequencies[i] = frequencyData[i] / 255;
					waveform[i] = (timeData[i] - 128) / 128;
				}

				dispatch('audioData', {
					frequencies,
					waveform,
					averageFrequency: averageFrequency / 255
				});
			} catch (err) {
				console.error('Audio processing error:', err);
				dispatch('error', 'Audio processing failed');
				stopAudioAnalysis();
				return;
			}

			animationFrameId = requestAnimationFrame(analyze);
		}

		analyze(performance.now());
	}

	export function stopAudioAnalysis() {
		isProcessing = false;
		dispatch('stateChange', false);

		if (animationFrameId) {
			cancelAnimationFrame(animationFrameId);
			animationFrameId = null;
		}

		if (audioContext) {
			audioContext.suspend().then(() => {
				audioContext?.close();
				audioContext = null;
			});
		}

		analyser = null;
	}

	// Cleanup on destroy
	onDestroy(() => {
		stopAudioAnalysis();
	});
</script>
