<script lang="ts">
    import { onMount } from 'svelte';

    let container: HTMLCanvasElement;

    const placesLived = [
        { lat: 37.4419, lng: -122.1430, text: "Palo Alto, California" },
        { lat: 33.5686, lng: -117.7267, text: "Aliso Viejo, California" },
        { lat: 44.8012, lng: -68.7778, text: "Bangor, Maine" },
        { lat: 33.7490, lng: -84.3880, text: "Atlanta, Georgia" },
        { lat: 38.8797, lng: -77.1057, text: "Arlington, Virginia" },
        { lat: 37.2296, lng: -80.4139, text: "Blacksburg, Virginia" },
        { lat: 38.9072, lng: -77.0369, text: "Washington, D.C." },
        { lat: 41.8781, lng: -87.6298, text: "Chicago, Illinois" },
        { lat: -23.5505, lng: -46.6333, text: "Sao Paulo, Brazil" },
        { lat: 56.9496, lng: 24.1052, text: "Riga, Latvia" }
    ];
</script>

<div class="globe-container">
    <canvas id="canvas" bind:this={container}></canvas>
</div>

<style>
    .globe-container {
        width: 100%;
        height: 100%;
    }

    canvas {
        width: 100%;
        height: 100%;
    }
</style>
