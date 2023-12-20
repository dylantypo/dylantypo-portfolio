<script lang="ts">
    import RetroConsole from '$lib/RetroConsole.svelte';
	import ToolBar from '$lib/ToolBar.svelte';
    import CoolBar from '$lib/CoolBar.svelte';
    import MainContent from '$lib/mainContent.svelte';
    import { onMount } from 'svelte';

    let hero_text = 'Dylan P.'

    onMount(() => {
        window.scrollTo(0, 0);
    });
</script>

<main>
    <CoolBar />

    <ToolBar />

    <RetroConsole {hero_text} />

    <MainContent />
</main>

<style>
    :root {
        --font-family-kenney: 'KenneyFuture', sans-serif;
        --background-color-default: #004643;
    }

    @font-face {
        font-family: var(--font-family-kenney);
        src: url('/Kenney Future.ttf') format('truetype');
        font-display: swap;
    }
    
    main {
        font-family: var(--font-family-kenney);
        background-color: var(--background-color-default);
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
    }

    /* Hide scrollbar for all elements */
    :global(::-webkit-scrollbar) {
        display: none;
    }

    :global(html) {
        scrollbar-width: none;
        width: 100vw;
        height: 100%;
    }
</style>