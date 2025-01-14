<script lang="ts">
	import { onDestroy, createEventDispatcher } from 'svelte';
	import type { AudioData, FrequencyBand } from '../lib/types';

	const dispatch = createEventDispatcher<{
		audioData: AudioData;
		error: string;
		stateChange: boolean;
	}>();

	// Enhanced configuration
	const FREQUENCY_BANDS = {
		bass: { low: 20, high: 140 },
		midLow: { low: 140, high: 400 },
		midHigh: { low: 400, high: 2600 },
		treble: { low: 2600, high: 16000 }
	} as const;

	const SETTINGS = {
		fftSize: 2048, // Increased for better frequency resolution
		smoothingTimeConstant: 0.85,
		minDecibels: -90,
		maxDecibels: -10,
		sampleRate: 44100,
		frameCap: 1000 / 60, // 60fps cap
		gain: 1.5, // Amplification factor
		noiseFloor: 0.1, // Minimum threshold for signal
		peakDecay: 0.98, // How quickly peaks fall
		energyDistribution: 0.5 // Balance between frequency bands
	} as const;

	// Audio state using runes
	let audioContext = $state<AudioContext | null>(null);
	let analyser = $state<AnalyserNode | null>(null);
	let isProcessing = $state(false);
	let animationFrameId = $state<number | null>(null);
	let lastProcessTime = $state(0);
	let peakLevels = $state<Float32Array>(new Float32Array(4)); // For each frequency band
	let averageEnergy = $state(0);

	// Enhanced error handling
	type AudioError = {
		type: 'permission' | 'setup' | 'processing' | 'context';
		message: string;
		details?: unknown;
	};

	// Frequency analysis utilities
	function getFrequencyBandEnergy(
		frequencies: Float32Array,
		sampleRate: number,
		low: number,
		high: number
	): number {
		const lowBin = Math.floor((low * frequencies.length) / (sampleRate / 2));
		const highBin = Math.ceil((high * frequencies.length) / (sampleRate / 2));
		let energy = 0;

		for (let i = lowBin; i <= highBin && i < frequencies.length; i++) {
			energy += frequencies[i] * frequencies[i];
		}

		return Math.sqrt(energy / (highBin - lowBin + 1));
	}

	// Enhanced waveform analysis
	function analyzeWaveform(timeData: Float32Array): {
		rms: number;
		crest: number;
		zeroCrossings: number;
	} {
		let sum = 0;
		let peak = 0;
		let crossings = 0;
		let prevSample = timeData[0];

		for (let i = 0; i < timeData.length; i++) {
			const sample = timeData[i];
			sum += sample * sample;
			peak = Math.max(peak, Math.abs(sample));

			if (prevSample * sample < 0) crossings++;
			prevSample = sample;
		}

		const rms = Math.sqrt(sum / timeData.length);
		const crest = peak / rms;

		return {
			rms,
			crest,
			zeroCrossings: crossings
		};
	}

	// Improved audio setup
	export async function startAudioAnalysis(): Promise<boolean> {
		try {
			if (!audioContext) {
				audioContext = new AudioContext({ sampleRate: SETTINGS.sampleRate });
			} else {
				await audioContext.resume();
			}

			const stream = await navigator.mediaDevices.getUserMedia({
				audio: {
					echoCancellation: true,
					noiseSuppression: true,
					autoGainControl: true,
					channelCount: 1
				}
			});

			analyser = audioContext.createAnalyser();
			Object.assign(analyser, {
				fftSize: SETTINGS.fftSize,
				smoothingTimeConstant: SETTINGS.smoothingTimeConstant,
				minDecibels: SETTINGS.minDecibels,
				maxDecibels: SETTINGS.maxDecibels
			});

			// Enhanced audio processing chain
			const source = audioContext.createMediaStreamSource(stream);
			const gainNode = audioContext.createGain();
			const filter = audioContext.createBiquadFilter();

			filter.type = 'highpass';
			filter.frequency.value = 20; // Remove sub-bass noise
			gainNode.gain.value = SETTINGS.gain;

			source.connect(filter).connect(gainNode).connect(analyser);

			isProcessing = true;
			dispatch('stateChange', true);
			processAudio();
			return true;
		} catch (err) {
			const error: AudioError = {
				type: err instanceof Error && err.name === 'NotAllowedError' ? 'permission' : 'setup',
				message: err instanceof Error ? err.message : 'Audio setup failed',
				details: err
			};
			console.error('Audio setup error:', error);
			dispatch('error', error.message);
			return false;
		}
	}

	// Enhanced audio processing
	function processAudio() {
		if (!analyser || !isProcessing) return;

		const frequencyData = new Float32Array(analyser.frequencyBinCount);
		const timeData = new Float32Array(analyser.fftSize);

		function analyze(timestamp: number) {
			if (!analyser || !isProcessing) return;

			if (timestamp - lastProcessTime < SETTINGS.frameCap) {
				animationFrameId = requestAnimationFrame(analyze);
				return;
			}
			lastProcessTime = timestamp;

			try {
				analyser.getFloatFrequencyData(frequencyData);
				analyser.getFloatTimeDomainData(timeData);

				// Convert from dB to linear amplitude
				const frequencies = frequencyData.map((db) => Math.pow(10, db / 20));

				// Analyze frequency bands
				const bands: Record<keyof typeof FREQUENCY_BANDS, number> = {
					bass: getFrequencyBandEnergy(
						frequencies,
						SETTINGS.sampleRate,
						FREQUENCY_BANDS.bass.low,
						FREQUENCY_BANDS.bass.high
					),
					midLow: getFrequencyBandEnergy(
						frequencies,
						SETTINGS.sampleRate,
						FREQUENCY_BANDS.midLow.low,
						FREQUENCY_BANDS.midLow.high
					),
					midHigh: getFrequencyBandEnergy(
						frequencies,
						SETTINGS.sampleRate,
						FREQUENCY_BANDS.midHigh.low,
						FREQUENCY_BANDS.midHigh.high
					),
					treble: getFrequencyBandEnergy(
						frequencies,
						SETTINGS.sampleRate,
						FREQUENCY_BANDS.treble.low,
						FREQUENCY_BANDS.treble.high
					)
				};

				// Update peak levels with decay
				Object.entries(bands).forEach(([band, energy], index) => {
					peakLevels[index] = Math.max(energy, peakLevels[index] * SETTINGS.peakDecay);
				});

				// Analyze waveform characteristics
				const waveformAnalysis = analyzeWaveform(timeData);

				// Calculate overall energy with frequency weighting
				const newEnergy =
					Object.values(bands).reduce((sum, energy, i) => {
						const weight = Math.pow(SETTINGS.energyDistribution, i);
						return sum + energy * weight;
					}, 0) / Object.keys(bands).length;

				// Smooth energy transitions
				averageEnergy = averageEnergy * 0.9 + newEnergy * 0.1;

				// Only dispatch if significant change
				if (averageEnergy > SETTINGS.noiseFloor) {
					dispatch('audioData', {
						frequencies: new Float32Array(frequencies),
						bands,
						waveform: timeData,
						energy: averageEnergy,
						peaks: peakLevels,
						waveformAnalysis
					});
				}
			} catch (err) {
				const error: AudioError = {
					type: 'processing',
					message: 'Audio processing failed',
					details: err
				};
				console.error(error);
				dispatch('error', error.message);
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

		if (audioContext?.state === 'running') {
			audioContext.suspend().then(() => {
				audioContext?.close();
				audioContext = null;
				analyser = null;
				peakLevels = new Float32Array(4);
				averageEnergy = 0;
			});
		}
	}

	// Cleanup
	onDestroy(() => {
		stopAudioAnalysis();
	});
</script>
