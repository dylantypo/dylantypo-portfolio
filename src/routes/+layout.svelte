<script lang="ts">
    let { children } = $props();
    let lang = $state("en");

    $effect(() => {
        document.documentElement.lang = lang;
    });
</script>

{@render children()}

<style>
    :root {
        /* Color System */
        --color-primary: #004643;
        --color-secondary: #f9bc60;
        --color-text-primary: #e8e4e6;
        --color-text-secondary: #abd1c6;
        --color-background: var(--color-primary);
        --color-focus: var(--color-secondary);
        
        /* Typography */
        --font-family-base: 'KenneyFuture', sans-serif;
        --font-size-base: 16px;
        --font-size-lg: 3.5vmin;
        --font-size-xl: 7vmin;
        
        /* Spacing */
        --spacing-base: 1rem;
        --spacing-lg: 2rem;
        --spacing-xl: 4rem;
        
        /* Layout */
        --content-width-desktop: 80vw;
        --content-padding-desktop: 20vw;
        --content-padding-tablet: 10vw;
        --content-padding-mobile: 5vw;
        
        /* Transitions */
        --transition-speed: 0.3s;
        --transition-ease: cubic-bezier(.28,1.79,.72,.72);
        
        /* Z-index layers */
        --z-index-toolbar: 3;
        --z-index-modal: 50;
    }

    @font-face {
        font-family: var(--font-family-base);
        src: url('/Kenney Future.ttf') format('truetype');
        font-display: swap;
    }

    /* Global Reset */
    :global(html) {
        scrollbar-width: none;
        width: 100vw;
        height: 100%;
        background-color: var(--color-background);
        font-family: var(--font-family-base);
        font-size: var(--font-size-base);
    }

    :global(body) {
        margin: 0;
        padding: 0;
        line-height: 1.35;
    }

    /* Hide scrollbars */
    :global(::-webkit-scrollbar) {
        display: none;
    }

    /* Accessibility */
    :global(.sr-only) {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        white-space: nowrap;
        border: 0;
    }

    /* Focus States */
    :global(:focus-visible) {
        outline: 3px solid var(--color-focus);
        outline-offset: 2px;
    }

    /* Common Media Queries */
    @media (max-width: 925px) {
        :root {
            --content-padding-desktop: var(--content-padding-tablet);
        }
    }

    @media (max-width: 610px) {
        :root {
            --content-padding-desktop: var(--content-padding-mobile);
        }
    }

    /* Reduced Motion */
    @media (prefers-reduced-motion: reduce) {
        :global(*) {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
        }
    }
</style>