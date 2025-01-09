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
        width: 100%;
        height: 100%;
        min-height: 100vh;
        position: relative;
    }
</style>