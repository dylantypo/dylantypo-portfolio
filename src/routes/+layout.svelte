<script lang="ts">
    let { children} = $props();

    // Declare lang with a default value
    let lang = $state("en");

    // Use $effect to set the lang attribute on the <html> element
    $effect(() => {
        document.documentElement.lang = lang;
    });
</script>

{@render children()}

<style>
    :root {
        --font-family-kenney: 'KenneyFuture', sans-serif;
        --background-color-default: #004643;
        --focus-outline-color: #f9bc60;
    }

    @font-face {
        font-family: var(--font-family-kenney);
        src: url('/Kenney Future.ttf') format('truetype');
        font-display: swap;
    }

    :global(html) {
        scrollbar-width: none;
        width: 100vw;
        height: 100%;
        background-color: var(--background-color-default);
    }

    :global(body) {
        margin: 0;
        padding: 0;
        line-height: 1.35;
    }

    :global(::-webkit-scrollbar) {
        display: none;
    }

    :global(.sr-only) {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }

    :global(:focus) {
        outline: 3px solid var(--focus-outline-color);
        outline-offset: 2px;
    }

    :global(:focus:not(:focus-visible)) {
        outline: none;
    }

    :global(:focus-visible) {
        outline: 3px solid var(--focus-outline-color);
        outline-offset: 2px;
    }

    @media (prefers-reduced-motion: reduce) {
        :global(*) {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
        }
    }
</style>
