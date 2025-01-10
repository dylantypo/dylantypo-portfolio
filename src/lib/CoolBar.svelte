<script lang="ts">
    import gsap from 'gsap';
    import { onMount, onDestroy } from 'svelte';

    let timeline = $state<gsap.core.Timeline | undefined>();
    let expandedCool = $state(false);
    let isTouchDevice = $state(false);

    let { 
        visible = false 
    } = $props<{
        visible: boolean;
    }>();

    let coolbar: HTMLElement; // Declare the variable coolbar

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

    $effect(() => {
        if (visible && coolbar) {
            timeline = gsap.timeline()
                .to(
                    coolbar,
                    { x: '0', duration: 3, ease: "back" }
                );
        }
    });

    onMount(async () => {
        isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

        coolbar.style.transform = 'translate(-185px, 0)';

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
    class="coolbar {visible ? 'visible' : ''} {expandedCool ? 'expandedCool' : ''}"
    onclick={toggleCoolbar}
    onkeydown={handleKeydown}
    onmouseleave={isTouchDevice ? undefined : handleCloseCoolbar}
    tabindex="0"
    role="button"
    aria-hidden={!visible}
    aria-pressed="{expandedCool}"
    aria-label="{expandedCool ? 'Collapse connections menu' : 'Expand connections menu'}"
>
    <div class="coolbar-content">
        <a
            href="https://dylanposner.com/mav"
            target="_blank"
            class="coolbar-link"
            aria-label="View MAV Project"
        >
            <div class="wrapper">
                <i class="fa-solid fa-microphone-lines fa-2xl" aria-hidden="true"></i>
            </div>
        </a>
        <a
            href="https://dylanposner.com/ballz"
            target="_blank"
            class="coolbar-link"
            aria-label="View Ballz Project"
        >
            <div class="wrapper">
                <i class="fa-solid fa-hands-holding-circle fa-2xl" aria-hidden="true"></i>
            </div>
        </a>
        <a
            href="https://dylanposner.com/snake"
            target="_blank"
            class="coolbar-link"
            aria-label="View Snake Project"
        >
            <div class="wrapper">
                <i class="fa-solid fa-staff-snake fa-2xl" aria-hidden="true"></i>
            </div>
        </a>
        <div class="wrapper">
            <i
                class="fa-solid fa-angle-up fa-beat-fade fa-2xl"
                style="--fa-animation-delay: 3s"
                aria-hidden="true"
            ></i>
        </div>
    </div>
    {#if !expandedCool}
        <i
            class="fa-solid fa-atom fa-spin fa-2xl"
            style="--fa-animation-duration: 5s"
            aria-hidden="true"
        ></i>
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
        bottom: 5em;
        left: 5em;
        background: var(--color-secondary);
        opacity: 0;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        transition: height 0.6s var(--transition-ease), 
                  border-radius 1s var(--transition-ease), 
                  opacity 1s, 
                  transform var(--transition-speed);
        color: var(--color-primary);
        display: flex;
        justify-content: center;
        align-items: center;
        user-select: none;
        z-index: var(--z-index-toolbar);
    }

    .coolbar.visible {
        opacity: 45%;
        transform: scale(1);
        user-select: all;
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
        padding-bottom: var(--spacing-base);
        color: var(--color-primary);
        text-decoration: none;
    }

    @media (max-width: 1030px) {
        .coolbar {
            opacity: 0;
            bottom: 2em;
            left: 1em;
            user-select: none;
        }

        .coolbar.visible {
            opacity: 35%;
            transform: scale(1);
            user-select: all;
        }

        .coolbar.expandedCool {
            opacity: 75%;
        }
    }

    /* Focus styles */
    .coolbar:focus-visible {
        outline: 3px solid var(--color-focus);
        outline-offset: 2px;
    }

    /* Hover styles on devices that support hover */
    @media (hover: hover) {
        .coolbar:hover {
            opacity: 75%;
        }
    }
</style>