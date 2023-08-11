<script lang="ts">
    import { onMount } from 'svelte';

    import { makeNoise2D } from 'open-simplex-noise';
    const noise2D = makeNoise2D(Date.now());

    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;

    let isMusicPlaying = false;
    const silenceThreshold = 25; // adjust this value based on your needs

    let isFlashingEnabled = false;

    function toggleFlashing() {
        isFlashingEnabled = !isFlashingEnabled;
    }

    let isFrozen = false;

    function toggleMovement() {
        isFrozen = !isFrozen;
    }


    onMount(async() => {
        if (typeof window === 'undefined') return; // Stop execution if not in browser environment

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx = canvas.getContext('2d')!;

        // Handle window resize
        function handleResize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        // Call handleResize initially to set the correct size
        handleResize();

        // Listen for window resize events
        window.addEventListener('resize', handleResize);

        navigator.mediaDevices.getUserMedia({ audio: true, video: false })
            .then((stream: MediaStream) => {
                let audioContext = new AudioContext();
                let analyserNode = audioContext.createAnalyser();
                analyserNode.fftSize = 256;
                let frequencyData = new Uint8Array(analyserNode.frequencyBinCount);
                let timeData = new Uint8Array(analyserNode.frequencyBinCount);

                let sourceNode = audioContext.createMediaStreamSource(stream);
                let gainNode = audioContext.createGain(); // Create a GainNode
                gainNode.gain.value = 0; // Mute the sound
                sourceNode.connect(analyserNode);
                sourceNode.connect(gainNode); // Connect the sourceNode to the gainNode
                gainNode.connect(audioContext.destination); // Connect the gainNode to the destination

                let lastVolume = 0;
                let beatThreshold = 0.85; // Adjust this value to make beat detection more or less sensitive

                function frameLooper() {
                    window.requestAnimationFrame(frameLooper);

                    if (isFrozen) return;

                    // Get volume and waveform data
                    analyserNode.getByteFrequencyData(frequencyData);
                    analyserNode.getByteTimeDomainData(timeData);

                    // Calculate volume as the average of the frequency data
                    let volume = frequencyData.reduce((a, b) => a + b) / frequencyData.length;

                    // Calculate waveform as the average of the time data
                    let waveform = timeData.reduce((a, b) => a + b) / volume;

                    // Calculate levels as the sum of the frequency data
                    let levels = frequencyData.reduce((a, b) => a + b);

                    // Detect beats by comparing the current volume to the last volume
                    let beat = volume > lastVolume + beatThreshold;
                    lastVolume = volume;

                    // Check if music is playing
                    isMusicPlaying = volume > silenceThreshold;

                    // Randomly pick a number between 4 and 10 for number of colors used in gradient
                    let stops = Math.floor(Math.random() * (10 - 4 +1)) + 4

                    if (isMusicPlaying) {
                        // Use HSL color to allow easy manipulation of hue, saturation, and lightness
                        let hue = waveform
                        let saturation = levels / frequencyData.length; // Average levels
                        let lightness = volume;
                        if (beat && isFlashingEnabled) {
                            let intensity = volume / 255; // Convert volume to a percentage
                            document.body.style.backgroundColor = `hsl(0, 0%, ${intensity}%`; // Flash the background based on the intensity
                        } else {
                            document.body.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
                        }

                        // Create a gradient with multiple color stops
                        let gradient = ctx.createRadialGradient(
                            canvas.width / 2, // x-coordinate of start circle
                            canvas.height / 2, // y-coordinate of start circle
                            0, // radius of start circle
                            canvas.width / 2, // x-coordinate of end circle
                            canvas.height / 2, // y-coordinate of end circle
                            Math.sqrt(Math.pow(canvas.width / 2, 2) + Math.pow(canvas.height / 2, 2)) // radius of end circle
                        );

                        for (let i = 0; i < stops; i++) {
                            // Use Simplex noise to generate a random value between -1 and 1
                            let noiseValue = noise2D(waveform * i * 0.0005, volume * 0.0001);

                            // Map the noise value to a hue value
                            let hue = map(noiseValue, -1, 1, 0, 360);

                            // Add a color stop with the calculated hue
                            gradient.addColorStop(i / 9, `hsl(${hue}, 100%, 50%)`);
                        }

                        // Fill the canvas with the gradient
                        ctx.fillStyle = gradient;
                        ctx.fillRect(0, 0, canvas.width, canvas.height);
                    }
                }

                // Maps a number from one range to another
                function map(num: number, in_min: number, in_max: number, out_min: number, out_max: number) {
                    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
                }

                frameLooper();
            })
            .catch((err: any) => {
                console.log('The following error occurred: ' + err);
                // alert('The following error occurred: ' + err);
        });
    });
</script>

<svelte:head>
    <title>Microphone Audio Visualizer</title>
    <link rel="icon" href="\mav_icon.ico" />

    <!-- IOS Tags -->
    <link rel="apple-touch-icon" href="\mav_icon.ico">
    <!-- <meta name="apple-mobile-web-app-status-bar-style" content="white"> -->
</svelte:head>

<main>
    <h1>Microphone Audio Visualizer</h1>
    <button on:click={toggleFlashing} style="opacity: {isFlashingEnabled ? 1 : 0.5};">Intensify</button>
    <button on:click={toggleMovement} style="opacity: {isFrozen? 1 : 0.5};">Freeze</button>
</main>

<canvas bind:this={canvas}></canvas>

<style>
    :root {
        --font-family-kenney: 'KenneyFuture';
        --color-text: rgba(255, 255, 255, 0.8);
        --text-shadow-light: -1px 1px 1px rgba(0, 0, 0, 0.5);
        --text-shadow-heavy: -8px 1px 18px rgba(0, 0, 0, 0.8);
        --transition-time: 0.75s;
    }

    @font-face {
        font-family: var(--font-family-kenney);
        src: url('/Kenney Future.ttf') format('truetype');
        font-display: swap;
    }

    :global(body) {
        user-select: none;
        overflow: hidden;
        font-family: var(--font-family-kenney);
        color: var(--color-text);
        height: 100%;
        width: 100%;
        margin: 0;
        padding: 0;
        transition: background-color var(--transition-time) ease;
    }

    main {
        font-size: 1.5em;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 2;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        text-shadow: var(--text-shadow-heavy);
    }

    button {
        transform: scale(2);
        font-family: var(--font-family-kenney);
        color: var(--color-text);
        background-color: transparent;
        text-shadow: var(--text-shadow-light);
        border: none;
        margin: 1rem 0; /* 1rem margin on the top and bottom, 0 on the sides */
        transition: transform 0.5s ease;
    }

    button:hover {
        transform: scale(1.1);
    }

    canvas {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        opacity: 0.085;
    }

    @media (max-width: 1905px) {
        main h1 {
            display: none;
        }
    }
</style>