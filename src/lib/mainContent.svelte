<script lang="ts">
    import { onMount } from 'svelte';
    import gsap from 'gsap';
    import Skills from '$lib/skills.svelte';
    import History from '$lib/history.svelte';

    let { triggerRevealCoolBar } = $props<{
        triggerRevealCoolBar: () => void
    }>();
    
    function handleKeydown(e: KeyboardEvent) {
        if (e.key === 'Enter') triggerRevealCoolBar();
    }

    let ScrollTrigger;
    let elements: HTMLElement[] | undefined;

    // Runs animations for elements with fade-in effects when scrolling
    onMount(async () => {
        const module = await import('gsap/ScrollTrigger');
        ScrollTrigger = module.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);

        elements = gsap.utils.toArray(".fade-in") as HTMLElement[];

        if (elements) {
            elements.forEach(el => {
                let nodes = Array.from(el.childNodes);

                // Clears the element's content to prepare for animation
                el.innerHTML = '';

                const originalContent = el.textContent; // Store original content for aria-label
                el.setAttribute('aria-label', originalContent || '');

                nodes.forEach(node => {
                    if (node.nodeType === Node.TEXT_NODE) {
                        // Splits plain text into words and wraps each in a span
                        let words = node.textContent ? node.textContent.split(" ") : [];
                        words.forEach(word => {
                            let span = document.createElement('span');
                            span.setAttribute('aria-hidden', 'true');
                            span.textContent = word + " ";
                            el.appendChild(span);
                        });
                    } else if (node.nodeType === Node.ELEMENT_NODE && (node as Element).classList.contains('highlighted-text')) {
                        // Handles highlighted text, preserving its style
                        let words = node.textContent ? node.textContent.split(" ") : [];
                        words.forEach(word => {
                            let span = document.createElement('span');
                            span.setAttribute('aria-hidden', 'true');
                            span.style.color = "#f9bc60"; // Applies specific highlight color
                            span.textContent = word + " ";
                            el.appendChild(span);
                        });
                    }
                });
            });
        }

        let spans = gsap.utils.toArray(".fade-in span") as HTMLElement[];

        spans.forEach(span => {
            // Applies fade-in animation with ScrollTrigger
            gsap.from(span, {
                scrollTrigger: {
                    trigger: span,
                    start: "top 75%", // Animation starts when 75% of the span enters the viewport
                    end: "bottom 25%", // Animation ends when 25% of the span leaves the viewport
                    scrub: true, // Smooth scrolling animation
                },
                autoAlpha: 0.025, // Initial opacity set to 5%
                duration: 1.75, // Animation duration of 1 second
            });
        });
    });
</script>

<main id="content">
    <article class="section" id="aboutMe" role="region" aria-labelledby="aboutMe-header">
        <button 
            class="section-button"
            aria-controls="aboutMe-content"
        >
            <h2 id="aboutMe-header" class="header">About Me</h2>
            <div 
                id="aboutMe-content"
                class="long-text fade-in"
                aria-label="I'm a versatile data scientist, expertly crafting cutting-edge analytics that illuminate data from fresh and inventive perspectives."
            >
                I'm a versatile data scientist, expertly crafting <span class="highlighted-text">cutting-edge</span> analytics that illuminate data from fresh and inventive perspectives.
            </div>
        </button>
    </article>
    
    <article class="section" id="experience" role="region" aria-labelledby="experience-header">
        <button 
            class="section-button"
            aria-controls="experience-content"
        >
            <h2 id="experience-header" class="header">Experience</h2>
            <div 
                id="experience-content"
                class="long-text fade-in"
                aria-label="Nearly half a decade of diverse experience, enhancing data-driven decisions with a unique blend of creativity and innovation."
            >
                Nearly <span class="highlighted-text">half a decade</span> of diverse experience, enhancing data-driven decisions with a unique blend of creativity and innovation.
            </div>
        </button>
    </article>

    <History />

    <Skills />

    <footer id="footer-content" aria-label="Copyright and contact">
        <p class="footer">
            <span id="copyright" aria-label="Copyright">©</span> Dylan Posner 2025
        </p>
        <button 
            class="headshot" 
            onclick={triggerRevealCoolBar} 
            onkeydown={handleKeydown}
            aria-label="View contact information"
        >
            <img src="favicon.png" alt="Stylized avatar headshot created by Midjourney">
        </button>
    </footer>
</main>

<style>
    #content {
        color: #e8e4e6;
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
        outline: 3px solid #f9bc60;
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
        margin-bottom: 12.5vh;
        display: flex;
        flex-direction: column;
    }

    .section-button {
        background: none;
        border: none;
        padding: 5vh;
        width: 100%;
        text-align: left;
        color: inherit;
        font-family: var(--font-family-kenney);
    }

    .section-button:focus-visible {
        outline: 1px solid #f9bc60;
        outline-offset: 4px;
    }

    .header, .footer {
        width: max-content;
        padding-left: 20vw;
        font-size: 3.5vmin;
    }

    .long-text {
        font-size: 7vmin;
        font-weight: 600;
        padding: 0 20vw;
        color: #abd1c6;
    }

    @media (max-width: 925px) {
        .section {
            align-items: center;
        }

        .header {
            padding-left: 0;
        }

        .long-text {
            font-size: 6.65vmin;
            padding: 0 12vw;
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
            padding: 0 8vw;
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
            padding: 0 5vw;
        }
    }
</style>