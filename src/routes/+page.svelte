<script lang="ts">
    import Globe from '$lib/globe.svelte';
    import ToolBar from '$lib/ToolBar.svelte';
    import CoolBar from '$lib/CoolBar.svelte';
    import MainContent from '$lib/mainContent.svelte';
    import { onMount } from 'svelte';

    let hero_text = $state('Dylan Posner');
    let isCoolBarVisible = $state(false);

    function handleRevealCoolBar() {
        isCoolBarVisible = true;
    }

    onMount(() => {
        window.scrollTo(0, 0);
    });
</script>

<main 
    id="main-content" 
    aria-label="Portfolio Content"
>
    <CoolBar visible={isCoolBarVisible} />
    <ToolBar />
    <Globe {hero_text} />
    <MainContent {handleRevealCoolBar} />
</main>

<style>
    main {
        position: relative;
        width: 100%;
        min-height: 100dvh;
        min-height: calc(var(--vh, 1vh) * 100);
        background-color: var(--color-background);
    }
</style>