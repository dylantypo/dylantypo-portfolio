<script lang="ts">
    import { goto } from '$app/navigation';
    import RetroConsole from '$lib/RetroConsole.svelte';

    let hero_text = '4 0 4';
</script>

<RetroConsole {hero_text} />

<section class="message">
    <button on:click={() => goto('/')}>
        <i class="fa-regular fa-rocket fa-bounce fa-2xl" style="--fa-animation-duration: 3.25s"></i>
        <h1>Page not found</h1>
        <i class="fa-regular fa-rocket fa-bounce fa-2xl" style="--fa-animation-duration: 3.67s"></i>
    </button>
</section>

<style>
    @font-face {
        font-family: 'KenneyFuture';
        src: url('/Kenney Future.ttf') format('truetype');
        font-display: swap;
    }

    /* Hide scrollbar for webkit browsers */
    :global(::-webkit-scrollbar) {
        display: none;
    }

    /* Hide scrollbar for non-webkit browsers */
    :global(html) {
        scrollbar-width: none;
    }

    /* Global body styling */
    :global(body) {
        font-family: 'KenneyFuture', sans-serif;
        background-color: #004643;
        margin: 0;
        padding: 0;
    }

    /* Message styles */
    .message {
        position: fixed;
        width: 100%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #f9bc60;
    }

    .message button {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: 'KenneyFuture';
        width: inherit;
        color: #e8e4e6;
        background-color: transparent;
        border: none;
    }

    .message button i {
        padding-left: 10vmin;
        padding-right: 10vmin;
    }
</style>