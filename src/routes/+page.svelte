<script lang="ts">
    // import SnakeGame from '$lib/snakeGame.svelte';
    import RetroConsole from '$lib/RetroConsole.svelte';
	import ToolBar from '$lib/ToolBar.svelte';
    import MainContent from '$lib/mainContent.svelte';
    import { onMount } from 'svelte';

    onMount(() => {
        window.scrollTo(0, 0);
    });
</script>

<main>
    <!-- <SnakeGame /> -->

    <ToolBar />

    <RetroConsole />

    <MainContent />
</main>

<style>
    @font-face {
        font-family: 'KenneyFuture';
        src: url('/Kenney Future.ttf') format('truetype');
    }

    /* Hide scrollbar for all elements */
    :global(::-webkit-scrollbar) {
        display: none;
    }

    /* Body color and other properties */
    :global(body) {
        font-family: 'KenneyFuture', sans-serif;
        background-color: #004643;
        margin: 0;
        padding: 0;
    }

    /* Hide scrollbar for non-webkit browsers */
    :global(html) {
        scrollbar-width: none;
    }
</style>