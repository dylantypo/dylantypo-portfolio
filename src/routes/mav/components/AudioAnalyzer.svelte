<script lang="ts">
	import { onDestroy, createEventDispatcher } from 'svelte';
	import type {
		AudioData,
		AudioBands,
		WaveformAnalysis,
		AudioSettings,
		FrequencyBand
	} from '../lib/types';

	const dispatch = createEventDispatcher<{
		audioData: AudioData;
		error: string;
		stateChange: boolean;
	}>();

	// Enhanced configuration
	const FREQUENCY_BANDS: Record<string, FrequencyBand> = {
		bass: {
			low: 20,
			high: 140,
			centerFrequency: 80,
			bandwidth: 120
		},
		midLow: {
			low: 140,
			high: 400,
			centerFrequency: 270,
			bandwidth: 260
		},
		midHigh: {
			low: 400,
			high: 2600,
			centerFrequency: 1500,
			bandwidth: 2200
		},
		treble: {
			low: 2600,
			high: 16000,
			centerFrequency: 9300,
			bandwidth: 13400
		}
	} as const;

	const SETTINGS: AudioSettings = {
		fftSize: 2048,
		smoothingTimeConstant: 0.85,
		minDecibels: -90,
		maxDecibels: -10,
		sampleRate: 44100,
		frameCap: 1000 / 60,
		gain: 1.5,
		noiseFloor: 0.1,
		peakDecay: 0.98,
		energyDistribution: 0.5,
		bandSplitFrequencies: [140, 400, 2600] // Split points between bands
	};

	// Audio state
	let audioContext = $state<AudioContext | null>(null);
	let analyser = $state<AnalyserNode | null>(null);
	let isProcessing = $state(false);
	let animationFrameId = $state<number | null>(null);
	let lastProcessTime = $state(0);
	let peakLevels = $state<Float32Array>(new Float32Array(4));
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
		const centerBin = Math.floor((lowBin + highBin) / 2);
		let energy = 0;

		// Weight frequencies based on distance from center frequency
		for (let i = lowBin; i <= highBin && i < frequencies.length; i++) {
			const weight = 1 - Math.abs(i - centerBin) / (highBin - lowBin);
			energy += frequencies[i] * frequencies[i] * weight;
		}

		return Math.sqrt(energy / (highBin - lowBin + 1));
	}

	// Enhanced waveform analysis
	function analyzeWaveform(timeData: Float32Array): WaveformAnalysis {
		let sum = 0;
		let peak = 0;
		let crossings = 0;
		let prevSample = timeData[0];
		let spectralSum = 0;
		let weightedFreqSum = 0;

		// Existing waveform analysis
		for (let i = 0; i < timeData.length; i++) {
			const sample = timeData[i];
			sum += sample * sample;
			peak = Math.max(peak, Math.abs(sample));

			if (prevSample * sample < 0) crossings++;
			prevSample = sample;

			// Calculate spectral properties
			const frequency = (i * SETTINGS.sampleRate) / timeData.length;
			spectralSum += Math.abs(sample);
			weightedFreqSum += frequency * Math.abs(sample);
		}

		const rms = Math.sqrt(sum / timeData.length);
		const crest = peak / rms;

		// Calculate spectral centroid (weighted average of frequencies)
		const spectralCentroid = weightedFreqSum / spectralSum;

		// Calculate spectral flatness (geometric mean / arithmetic mean)
		const geometricMean = Math.exp(
			timeData.reduce((sum, val) => sum + Math.log(Math.abs(val) + 1e-6), 0) / timeData.length
		);
		const arithmeticMean = timeData.reduce((sum, val) => sum + Math.abs(val), 0) / timeData.length;
		const spectralFlatness = geometricMean / (arithmeticMean + 1e-6);

		return {
			rms,
			crest,
			zeroCrossings: crossings,
			spectralCentroid,
			spectralFlatness
		};
	}

	function analyzeBand(
		frequencies: Float32Array,
		band: FrequencyBand
	): { energy: number; centerFrequency: number } {
		const energy = getFrequencyBandEnergy(frequencies, SETTINGS.sampleRate, band.low, band.high);

		return {
			energy,
			centerFrequency: band.centerFrequency
		};
	}

	// Improved audio setup
	export async function startAudioAnalysis(): Promise<boolean> {
		try {
			if (!audioContext) {
				audioContext = new AudioContext({ sampleRate: SETTINGS.sampleRate });
			} else if (audioContext.state === 'suspended') {
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

			if (!analyser) {
				analyser = audioContext.createAnalyser();
				Object.assign(analyser, {
					fftSize: SETTINGS.fftSize,
					smoothingTimeConstant: SETTINGS.smoothingTimeConstant,
					minDecibels: SETTINGS.minDecibels,
					maxDecibels: SETTINGS.maxDecibels
				});
			}

			const source = audioContext.createMediaStreamSource(stream);
			const gainNode = audioContext.createGain();
			const filter = audioContext.createBiquadFilter();

			filter.type = 'highpass';
			filter.frequency.value = 20;
			gainNode.gain.value = SETTINGS.gain;

			source.connect(filter).connect(gainNode).connect(analyser);

			isProcessing = true;
			dispatch('stateChange', true);
			processAudio();
			return true;
		} catch (err) {
			const error = {
				type: err instanceof Error && err.name === 'NotAllowedError' ? 'permission' : 'setup',
				message: err instanceof Error ? err.message : 'Audio setup failed',
				details: err
			};
			console.error('Audio setup error:', error);
			dispatch('error', error.message);
			return false;
		}
	}

	// Streamlined cleanup function
	export function stopAudioAnalysis() {
		isProcessing = false;
		dispatch('stateChange', false);

		if (animationFrameId) {
			cancelAnimationFrame(animationFrameId);
			animationFrameId = null;
		}

		if (audioContext?.state === 'running') {
			audioContext.suspend().then(() => {
				cleanupAudioState();
			});
		} else {
			cleanupAudioState();
		}
	}

	function cleanupAudioState() {
		if (audioContext) {
			audioContext.close();
			audioContext = null;
		}
		analyser = null;
		peakLevels = new Float32Array(4);
		averageEnergy = 0;
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
				const bandAnalysis = Object.entries(FREQUENCY_BANDS).map(([name, band]) =>
					analyzeBand(frequencies, band)
				);

				const bands: AudioBands = {
					bass: bandAnalysis[0].energy,
					midLow: bandAnalysis[1].energy,
					midHigh: bandAnalysis[2].energy,
					treble: bandAnalysis[3].energy,
					fullSpectrum: getFrequencyBandEnergy(
						frequencies,
						SETTINGS.sampleRate,
						FREQUENCY_BANDS.bass.low,
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
					(Object.values(bands) as number[]).reduce((sum, energy, i) => {
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
						waveformAnalysis,
						timestamp: performance.now()
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

	onDestroy(() => {
		stopAudioAnalysis();
	});
</script>
