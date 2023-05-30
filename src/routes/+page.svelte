<script lang="ts">
    import RetroConsole from '$lib/RetroConsole.svelte';
	import ToolBar from '$lib/ToolBar.svelte';
    import MainContent from '$lib/mainContent.svelte';
    import { onMount } from 'svelte';

    onMount(() => {
        window.scrollTo(0, 0);
        window.addEventListener('resize', function(){
            location.reload();
        });
    });
</script>

<main>
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

    /* Customize the scrollbar in Webkit browsers */
    /* ::-webkit-scrollbar {
        width: 20px;
    }

    ::-webkit-scrollbar-track {
        background: rgba(0, 70, 67, 0.5);
    }

    ::-webkit-scrollbar-thumb {
        background: rgba(0, 30, 29, 0.1);
        border-radius: 12px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: rgba(171, 209, 198, 0.15);
    } */

    /* Hide scrollbar for non-webkit browsers */
    :global(html) {
        scrollbar-width: none;
    }
</style>