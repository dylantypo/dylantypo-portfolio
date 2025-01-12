<script lang="ts">
    import { onDestroy, createEventDispatcher } from 'svelte';
    import type { AudioData } from '../lib/types';

    // Event Dispatcher
    const dispatch = createEventDispatcher<{
        audioData: AudioData;
        error: string;
    }>();

    // Audio state using runes
    let audioContext = $state<AudioContext | null>(null);
    let analyser = $state<AnalyserNode | null>(null);
    let isProcessing = $state(false);
    let animationFrameId = $state<number | null>(null);

    // Start audio analysis
    export async function startAudioAnalysis(): Promise<boolean> {
        try {
            audioContext = new AudioContext();
            
            const stream = await navigator.mediaDevices.getUserMedia({ 
                audio: true, 
                video: false 
            });

            analyser = audioContext.createAnalyser();
            analyser.fftSize = 256;
            
            const source = audioContext.createMediaStreamSource(stream);
            const gainNode = audioContext.createGain();
            gainNode.gain.value = 0; // Prevent feedback
            
            source.connect(analyser);
            source.connect(gainNode);
            gainNode.connect(audioContext.destination);

            isProcessing = true;
            processAudio();
            return true;

        } catch (err) {
            console.error('Audio setup error:', err);
            dispatch('error', 'Failed to access microphone');
            return false;
        }
    }

    // Process audio data
    function processAudio() {
        if (!analyser || !isProcessing) return;

        const frequencyData = new Uint8Array(analyser.frequencyBinCount);
        const timeData = new Uint8Array(analyser.frequencyBinCount);

        function analyze() {
            if (!analyser || !isProcessing) return;

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

            animationFrameId = requestAnimationFrame(analyze);
        }

        analyze();
    }

    // Stop audio analysis
    export function stopAudioAnalysis() {
        isProcessing = false;
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
        if (audioContext) {
            audioContext.close();
            audioContext = null;
        }
        analyser = null;
    }

    // Cleanup on destroy
    onDestroy(() => {
        stopAudioAnalysis();
    });
</script>