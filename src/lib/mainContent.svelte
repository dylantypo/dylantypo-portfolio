<script lang="ts">
    import gsap from 'gsap';
    import { onMount } from 'svelte';
    import Skills from '$lib/skills.svelte';
    import History from '$lib/history.svelte';

    let { handleRevealCoolBar } = $props<{ handleRevealCoolBar: () => void }>();

    function handleKeydown(e: KeyboardEvent) {
        if (e.key === 'Enter') handleRevealCoolBar();
    }

    let elements: HTMLElement[] = [];

    function splitTextIntoLetters(text: string, highlight: boolean = false): string {
        return text
            .split(' ')
            .map(
                (word) =>
                    `<span class="word-container">${word
                        .split('')
                        .map(
                            (char) =>
                                `<span class="letter${highlight ? ' highlight' : ''}">${char}</span>`
                        )
                        .join('')}</span> `
            )
            .join('');
    }

    // Initialize animations when the component is mounted
    onMount(() => {
        console.log("Component mounted. Initializing animations.");

        const initializeAnimations = async () => {
            const { ScrollTrigger } = await import('gsap/ScrollTrigger');
            console.log("ScrollTrigger imported");
            gsap.registerPlugin(ScrollTrigger);

            // Wrap animations in GSAP context for cleanup and initialization
            const ctx = gsap.context(() => {
                elements = gsap.utils.toArray(".fade-in") as HTMLElement[];
                console.log("Found elements:", elements);

                elements.forEach((el, index) => {
                    console.log(`Processing element ${index}:`, el);

                    // Split text into letters
                    const nodes = Array.from(el.childNodes);
                    el.innerHTML = '';
                    const originalContent = el.textContent;
                    el.setAttribute('aria-label', originalContent || '');

                    nodes.forEach((node) => {
                        if (node.nodeType === Node.TEXT_NODE) {
                            const text = node.textContent || '';
                            el.insertAdjacentHTML('beforeend', splitTextIntoLetters(text));
                        } else if (
                            node.nodeType === Node.ELEMENT_NODE &&
                            (node as Element).classList.contains('highlighted-text')
                        ) {
                            const text = node.textContent || '';
                            el.insertAdjacentHTML('beforeend', splitTextIntoLetters(text, true));
                        }
                    });

                    // Animation timeline
                    const letters = el.querySelectorAll('.letter');
                    if (letters.length === 0) {
                        gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 1 });
                        return;
                    }

                    const timeline = gsap.timeline({
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 75%',
                            end: () => `+=${el.offsetHeight * 0.9}`, // Dynamic end value
                            scrub: 2,
                            // markers: true,
                        },
                    });

                    timeline.fromTo(
                        letters,
                        { opacity: 0.05 },
                        {
                            opacity: 1,
                            stagger: 0.15,
                            ease: 'power1.inOut',
                        }
                    );
                });
                ScrollTrigger.refresh();
            });

            // Cleanup animations when the component is destroyed
            return () => {
                ctx.revert();
                console.log("Component destroyed. Animations cleaned up.");
            };
        };

        initializeAnimations();
    });

    // Reactively log element updates if `elements` changes
    $effect(() => {
        console.log("Elements updated:", elements);
    });
</script>

<main id="content">
    <article class="section" id="aboutMe" role="region" aria-labelledby="aboutMe-header">
        <h2 id="aboutMe-header" class="header">About Me</h2>
        <div 
            id="aboutMe-content"
            class="long-text fade-in"
            aria-label="I'm a versatile data scientist, expertly crafting cutting-edge analytics that illuminate data from fresh and inventive perspectives."
        >
            I'm a versatile data scientist, expertly crafting <!-- First segment -->
            <span class="highlighted-text">cutting-edge</span> <!-- Highlighted -->
            analytics that illuminate data from fresh and inventive perspectives. <!-- Last segment -->
        </div>
    </article>
    
    <article class="section" id="experience" role="region" aria-labelledby="experience-header">
        <h2 id="experience-header" class="header">Experience</h2>
        <div 
            id="experience-content"
            class="long-text fade-in"
            aria-label="Nearly half a decade of diverse experience, enhancing data-driven decisions with a unique blend of creativity and innovation."
        >
            Nearly half a decade of diverse experience, enhancing <!-- First segment -->
            <span class="highlighted-text">data-driven</span> <!-- Highlighted -->
            decisions with a unique blend of creativity and innovation. <!-- Last segment -->
        </div>
    </article>

    <History />

    <Skills />

    <footer id="footer-content" aria-label="Copyright and contact">
        <p class="footer">
            <span id="copyright" aria-label="Copyright">©</span> Dylan Posner 2025
        </p>
        <button 
            class="headshot" 
            onclick={handleRevealCoolBar} 
            onkeydown={handleKeydown}
            aria-label="View contact information"
        >
            <img src="favicon.png" alt="Stylized avatar headshot created by Midjourney">
        </button>
    </footer>
</main>

<style>
    #content {
        color: var(--color-text-primary); 
        user-select: none;
    }

    #footer-content {
        padding-bottom: 10vh;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }

    .headshot {
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;
    }

    .headshot:focus-visible {
        outline: 3px solid var(--color-secondary);
        border-radius: 50%;
    }

    .headshot img {
        width: 10vmin;
        height: auto;
        margin-left: 1em;
        border-radius: 50%;
        opacity: 0.6;
        box-shadow: 0 8px 10px rgba(0, 0, 0, 0.85);
        transition: transform 0.55s, opacity 0.55s, box-shadow 0.55s;
    }

    .headshot img:hover {
        transform: scale(1.2);
        opacity: 1;
        box-shadow: 0 12px 16px rgba(0, 0, 0, 0.75);
    }

    .section {
        height: auto;
        margin-bottom: 20vh;
        display: flex;
        flex-direction: column;
    }

    .header, .footer {
        width: max-content;
        padding-left: 20vw;
        font-size: 3.5vmin;
    }

    .long-text {
        font-size: clamp(2rem, 5vw, 4rem);
        line-height: 1.25;
        font-weight: 600;
        padding: 0 max(20vw, 2rem);
        color: var(--color-text-secondary);
        max-width: 100%;
    }

    :global(.word-container) {
        display: inline-block;
        margin-right: 0.25em;
        min-height: 1.3em;
        vertical-align: middle;
    }

    :global(.letter.highlight) {
        color: var(--color-secondary);
    }

    @media (max-width: 925px) {
        .section {
            align-items: center;
        }

        .header {
            padding-left: 0;
        }

        .long-text {
            font-size: clamp(1.8rem, 4.5vw, 3.5rem);
            padding: 0 max(12vw, 1.5rem);
        }
    }

    @media (max-width: 610px) {
        .section {
            align-items: center;
        }

        .header {
            padding-left: 0;
        }

        .long-text {
            font-size: clamp(1.5rem, 4vw, 3rem);
            padding: 0 max(8vw, 1rem);
        }
    }

    @media (max-width: 480px) {
        .section {
            align-items: center;
        }

        .header {
            padding-left: 0;
        }

        .long-text {
            padding: 0 max(5vw, 0.8rem);
        }
    }
</style>