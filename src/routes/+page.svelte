<script lang="ts">
    import Globe from '$lib/globe.svelte';
    import ToolBar from '$lib/ToolBar.svelte';
    import CoolBar from '$lib/CoolBar.svelte';
    import MainContent from '$lib/mainContent.svelte';
    import { onMount } from 'svelte';

    let hero_text = 'Dylan Posner';
    let isCoolBarVisible = false;

    function handleRevealCoolBar() {
        isCoolBarVisible = true;
    }

    onMount(() => {
        window.scrollTo(0, 0);
    });
</script>

<main id="main-content" aria-label="Portfolio Content">
    <CoolBar 
        visible={isCoolBarVisible} 
    />

    <ToolBar />

    <Globe {hero_text} />

    <MainContent triggerRevealCoolBar={handleRevealCoolBar} />
</main>

<style>
    main {
        font-family: var(--font-family-kenney);
        background-color: var(--background-color-default);
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
    }

    /* Component-specific focus styles */
    :global([role="button"]:focus) {
        outline: 3px solid var(--focus-outline-color);
        outline-offset: 2px;
    }
</style>