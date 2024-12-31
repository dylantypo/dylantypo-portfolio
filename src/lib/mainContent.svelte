<script lang="ts">
    import { onMount } from 'svelte';
    import gsap from 'gsap';

    let ScrollTrigger;
    let elements: HTMLElement[] | undefined;

    // Array of jobs with details including descriptions and visibility toggle
    let jobs = [
        {
            year: "Now",
            company: "Booz Allen Hamilton",
            role: "Data Scientist (Senior Consultant)  ",
            description: "Developed Python-based tools and automated workflows, integrating AWS and Tableau to improve data analysis and visualization  ",
            showDescription: false, // Toggles between showing role details or description
        },
        {
            year: "2019",
            company: "Interos",
            role: "Data Analytics Intern  ",
            description: "Used Snowflake and SQL to organize data and developed efficient pipelines for supply chain analysis  ",
            showDescription: false,
        },
        {
            year: "2018",
            company: "The Phoenix Team",
            role: "Product Development Intern  ",
            description: "Leveraged agile practices to support product design and coordinated efforts to deliver a client-focused white paper  ",
            showDescription: false,
        },
    ];

    // Toggles the display of the description or role details for a job
    const toggleDescription = (index: number) => {
        jobs[index].showDescription = !jobs[index].showDescription;
        jobs = [...jobs]; // Ensures reactivity by creating a new array reference
    };

    // Resets showDescription to false when the mouse leaves the job
    const resetDescription = (index: number) => {
        jobs[index].showDescription = false;
        jobs = [...jobs]; // Ensures reactivity
    };

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

                nodes.forEach(node => {
                    if (node.nodeType === Node.TEXT_NODE) {
                        // Splits plain text into words and wraps each in a span
                        let words = node.textContent ? node.textContent.split(" ") : [];
                        words.forEach(word => {
                            let span = document.createElement('span');
                            span.textContent = word + " ";
                            el.appendChild(span);
                        });
                    } else if (node.nodeType === Node.ELEMENT_NODE && (node as Element).classList.contains('highlighted-text')) {
                        // Handles highlighted text, preserving its style
                        let words = node.textContent ? node.textContent.split(" ") : [];
                        words.forEach(word => {
                            let span = document.createElement('span');
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
                duration: 1, // Animation duration of 1 second
            });
        });
    });
</script>

<div id="content">
    <div class="section">
        <p class="header">About Me</p>
        <h1 class="long-text fade-in">I'm a versatile data scientist, expertly crafting <span class="highlighted-text">cutting-edge</span> analytics that illuminate data from fresh and inventive perspectives.</h1>
    </div>
    
    <div class="section">
        <p class="header">Experience</p>
        <h1 class="long-text fade-in">Nearly <span class="highlighted-text">half a decade</span> of diverse experience, enhancing data-driven decisions with a unique blend of creativity and innovation.</h1>
    </div>

    <div class="section">
        <p class="header">History</p>
        {#each jobs as job, i}
            <!-- Use a button for better accessibility and style it to remove default button appearance -->
            <button class="job" type="button" on:click={() => toggleDescription(i)} on:keydown={(e) => e.key === 'Enter' && toggleDescription(i)} on:mouseleave={() => resetDescription(i)} aria-expanded={job.showDescription}>
                <h1 class="year">{job.year}</h1>
                <div class="text-wrapper">
                    <h1 class="company">{job.company}</h1>
                    {#if job.showDescription}
                        <div class="description">
                            <p>{job.description}<i class="fa-solid fa-caret-up fa-fade"></i></p>

                        </div>
                    {:else}
                        <div class="role-text">
                            <p>{job.role}<i class="fa-solid fa-caret-down fa-beat"></i></p>
                        </div>
                    {/if}
                </div>
                <div class="background"></div>
            </button>
        {/each}
    </div>

    <!-- Skills to Include -->
    <!-- <dl id="skills">
        <dt>Python</dt>
            <dd>NumPy</dd>
            <dd>SciPy</dd>
            <dd>Pandas</dd>
            <dd>Matplotlib</dd>
            <dd>Seaborn</dd>
            <dd>SciKit-learn</dd>
            <dd>OpenCV</dd>
            <dd>PyTorch</dd>
        <dt>SQL</dt>
        <dt>R</dt>
            <dd>dplyr</dd>
            <dd>ggplot2</dd>
        <dt>Excel</dt>
        <dt>D3.js</dt>
    </dl> -->
    <!-- NEED TO REDESIGN SKILLS SECTION -->
    <!-- <div class="section">
        <p class="text header">Skills</p>
    </div> -->

    <div id="footer-content">
        <p class="footer"><span id="copyright">&#169</span> Dylan Posner 2024</p>
        <div class="headshot"><img src="favicon.png" alt="avatar headshot by midjourney"></div>
    </div>
</div>

<style>
    :global(html), :global(body) {
        scrollbar-width: none;
        width: 100vw;
        height: 100%;
        margin: 0;
        padding: 0;
        background-color: #004643;
    }

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

    .header, .footer {
        width: max-content;
        padding-left: 20vw;
        font-size: 3.5vmin;
    }

    .long-text {
        font-size: 7.5vmin;
        padding: 0 20vw;
        color: #abd1c6;
    }

    .job {
        all: unset; /* Removes all default button styles */
        width: 100vw;
        cursor: pointer;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        position: relative;
        transition: color 0.3s;
    }

    .job:focus {
        outline: none; /* Removes focus outline */
    }

    .role-text, .year {
        padding-left: 20vw;
        z-index: 2;
    }

    .role-text {
        font-size: 2vmin;
        font-style: italic;
        width: 100%;
        transition: opacity 0.5s ease-in-out;
        opacity: 1;
    }

    .text-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        z-index: 2;
    }

    .company {
        padding-left: 20vw;
        padding-right: 20vw;
        color: #e8e4e6; /* Default color */
        transition: color 0.3s ease-in-out, opacity 0.3s ease-in-out, transform 0.3s ease-in-out; /* Slightly faster for responsiveness */
        opacity: 1; /* Start visible */
        z-index: 2;
    }

    .job:hover .company {
        color: #004643; /* Matches hover color with job text */
    }

    .company, .year {
        font-size: 4vmin;
    }

    .description {
        font-size: 2.5vmin;
        padding-left: 20vw;
        padding-right: 20vw;
        color: #e8e4e6; /* Default color */
        transition: color 0.5s ease, opacity 0.5s ease, transform 0.5s ease; /* Unified durations */
        opacity: 0; /* Start invisible */
        transform: scale(0.95); /* Slightly shrink */
        z-index: 2;
    }

    .job:hover .description {
        color: #004643; /* Matches hover color with job text */
        opacity: 1; /* Fade in description */
        transform: scale(1); /* Return to full size */
    }

    .background {
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgb(249, 188, 96);
        transform-origin: center; 
        transform: scaleY(0);
        transition: transform 0.3s ease-in-out; /* Longer for fluidity */
        z-index: 1;
    }

    .job:hover .background {
        transform: scaleY(1);
    }

    .job:hover {
        color: #004643;
    }

    @media (max-width: 925px) {
        .long-text {
            padding: 0 12vw;
        }
        .job {
            flex-direction: column;
        }

        .role-text, .year {
            padding-left: 10vw;
            font-size: 3vmin;
        }

        .company {
            padding-left: 10vw;
            padding-right: 10vw;
            font-size: 3.5vmin;
        }

        .description {
            font-size: 3vmin;
            padding-left: 10vw;
            padding-right: 10vw;
        }
    }

    @media (max-width: 610px) {
        .long-text {
            padding: 0 5vw;
        }
        .job {
            flex-direction: column;
        }

        .role-text, .year {
            padding-left: 5vw;
            font-size: 2.5vmin;
        }

        .company {
            padding-left: 5vw;
            padding-right: 5vw;
            font-size: 3vmin;
        }

        .description {
            font-size: 2.5vmin;
            padding-left: 5vw;
            padding-right: 5vw;
        }
    }

    @media (max-width: 480px) {
        #footer-content {
            flex-direction: column-reverse;
            margin-bottom: 5vh;
        }

        .footer {
            padding-right: 0;
        }
        .job {
            flex-direction: column;
        }

        .role-text, .year {
            padding-left: 2vw;
            font-size: 2vmin;
        }

        .company {
            padding-left: 2vw;
            padding-right: 2vw;
            font-size: 2.5vmin;
        }

        .description {
            font-size: 2vmin;
            padding-left: 2vw;
            padding-right: 2vw;
        }
    }
</style>