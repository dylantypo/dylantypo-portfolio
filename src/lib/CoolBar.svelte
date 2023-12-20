<script lang="ts">
    import gsap from 'gsap';
    import { onMount, onDestroy } from 'svelte';

    let expandedCool = false;

    let isTouchDevice = false;

    let coolbar: HTMLElement // Declare the variable coolbar

    // Toggle function for coolbar
    function toggleCoolbar() {
        expandedCool = !expandedCool;
    }

    // Close coolbar when mouse leaves
    function handleCloseCoolbar() {
        expandedCool = false;
    }

    // Keypress functions for each bubble
    function handleKeydown(event: { key: string; }) {
        if (event.key === 'Enter' || event.key === ' ') {
            toggleCoolbar();
        }
    }

    function handleOutsideTouch(event: TouchEvent) {
        if (coolbar && expandedCool && !coolbar.contains(event.target as Node)) {
            expandedCool = false;
        }
    }

    onMount(async () => {
        isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        gsap.fromTo(coolbar, { x: '200' }, { delay: 0.5, duration: 4, x: '0', ease: "back" });

        if (isTouchDevice) {
            document.addEventListener('touchstart', handleOutsideTouch);
        }
    })

    onDestroy(() => {
        if (isTouchDevice) {
            document.removeEventListener('touchstart', handleOutsideTouch);
        }
    })
</script>

<!-- Connections Bubble -->
<div
    bind:this={coolbar}
    class="coolbar {expandedCool ? 'expandedCool' : ''}"
    on:click={toggleCoolbar}
    on:keydown={handleKeydown}
    on:mouseleave={isTouchDevice ? undefined : handleCloseCoolbar}
    tabindex="0"
    role="button"
    aria-pressed="{expandedCool}"
>
    <div class="coolbar-content">
        <div class="wrapper"><i class="fa-solid fa-angle-up fa-beat-fade fa-2xl" style="--fa-animation-delay: 3s"></i></div>
        <a href="https://dylanposner.com/mav" target="_blank" class="coolbar-link">
            <div class="wrapper"><i class="fa-solid fa-microphone-lines fa-2xl"></i></div>
        </a>
        <a href="https://dylanposner.com/ballz" target="_blank" class="coolbar-link">
            <div class="wrapper"><i class="fa-solid fa-hands-holding-circle fa-2xl"></i></div>
        </a>
        <a href="https://dylanposner.com/snake" target="_blank" class="coolbar-link">
            <div class="wrapper"><i class="fa-solid fa-staff-snake fa-2xl"></i></div>
        </a>
    </div>
    {#if !expandedCool}
        <i class="fa-solid fa-atom fa-spin fa-2xl" style="--fa-animation-duration: 5s"></i>
    {/if}
</div>

<style>
    .wrapper {
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 40px;
        width: 40px;
    }

    .coolbar {
        position: fixed;
        top: 5em;
        right: 5em;
        background: #f9bc60;
        opacity: 45%;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        transition: height 0.6s cubic-bezier(.28,1.79,.72,.72), border-radius 1s cubic-bezier(.28,1.79,.72,.72), opacity 1s;
        color: #004643;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        z-index: 3;
    }
    .coolbar.expandedCool {
        height: 228px;
        border-radius: 25px;
    }
    .coolbar-content {
        display: none;
    }
    .coolbar.expandedCool .coolbar-content {
        display: flex;
        flex-direction: column;
        align-content: space-around;
    }
    .coolbar-link {
        padding-bottom: 1rem;
        color: #004643;
        text-decoration: none;
    }

    @media (max-width: 1030px) {
        .coolbar {
            opacity: 35%;
            top: 2em;
            right: 1em;
        }
        .coolbar.expandedCool {
            opacity: 75%;
        }
    }
</style>