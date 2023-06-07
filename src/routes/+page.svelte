<script lang="ts">
    import { onMount } from 'svelte';
    // let SnakeGame;
    let RetroConsole;
	let ToolBar;
    let MainContent;

    onMount(async () => {
        // const sgModule = await import('$lib/snakeGame.svelte');
        // SnakeGame = sgModule.default;
        const rcModule = await import('$lib/RetroConsole.svelte');
        RetroConsole = rcModule.default;
        const tbModule = await import('$lib/ToolBar.svelte');
        ToolBar = tbModule.default;
        const mcModule = await import('$lib/mainContent.svelte');
        MainContent = mcModule.default;
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