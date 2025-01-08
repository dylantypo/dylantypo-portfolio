<script lang="ts">
    // Array of jobs with details including descriptions and visibility toggle
    let jobs = $state([
        {
            year: "Now",
            company: "Booz Allen Hamilton",
            role: "Data Scientist (Senior Consultant)  ",
            description: "Developed Python-based tools and automated workflows, integrating AWS and Tableau to improve data analysis and visualization  ",
            showDescription: false,
            isKeyboardControl: false,
        },
        {
            year: "2019",
            company: "Interos",
            role: "Data Analytics Intern  ",
            description: "Used Snowflake and SQL to organize data and developed efficient pipelines for supply chain analysis  ",
            showDescription: false,
            isKeyboardControl: false,
        },
        {
            year: "2018",
            company: "The Phoenix Team",
            role: "Product Development Intern  ",
            description: "Leveraged agile practices to support product design and coordinated efforts to deliver a client-focused white paper  ",
            showDescription: false,
            isKeyboardControl: false,
        },
    ]);

    // Single toggle function for all interactions
    function toggleDescription(index: number, event?: Event) {
        if (event) {
            event.preventDefault(); // Prevent default touch behavior
            event.stopPropagation(); // Stop event bubbling
        }
        const job = jobs[index];
        job.showDescription = !job.showDescription;
    }

    // Keyboard handlers - just for accessibility
    function handleFocus(index: number) {
        jobs[index].isKeyboardControl = true;
    }

    function handleBlur(index: number) {
        jobs[index].isKeyboardControl = false;
    }

    // Touch handler - improved version
    $effect(() => {
        function handleTouch(e: TouchEvent) {
            const target = e.target as HTMLElement;
            const jobButton = target.closest('.job') as HTMLButtonElement;

            if (jobButton) {
                e.preventDefault();
                const index = parseInt(jobButton.dataset.index || '-1');
                if (index >= 0) {
                    toggleDescription(index, e);
                }
                return;
            }

            // Close all jobs if touched outside
            jobs.forEach((_, i) => {
                jobs[i].showDescription = false;
            });
        }

        // Add passive: false to ensure preventDefault works
        document.addEventListener('touchstart', handleTouch, { passive: false });
        return () => document.removeEventListener('touchstart', handleTouch);
    });
</script>

<section class="section" aria-labelledby="history-header">
    <h2 id="history-header" class="header">History</h2>
    {#each jobs as job, i}
        <button 
            class="job" 
            data-index={i}
            onfocus={() => handleFocus(i)}
            onblur={() => handleBlur(i)}
            onclick={(e) => toggleDescription(i, e)}
            onkeydown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleDescription(i);
                }
            }}
            aria-expanded={job.showDescription} 
            aria-controls={`job-description-${i}`}
            aria-label={`${job.company} - ${job.role}`}
        >   
            <h3 class="year">{job.year}</h3>
            <div class="text-wrapper">
                <h4 class="company">{job.company}</h4>
                {#if job.showDescription}
                    <div 
                        id={`job-description-${i}`}
                        class="description"
                        aria-live="polite"
                    >
                        <p>{job.description}
                            <i class="fa-solid fa-caret-up fa-fade" aria-hidden="true"></i>
                        </p>
                    </div>
                {:else}
                    <div class="role-text">
                        <p>{job.role}
                            <i class="fa-solid fa-caret-down fa-beat" aria-hidden="true"></i>
                        </p>
                    </div>
                {/if}
            </div>
            <div class="background" aria-hidden="true"></div>
        </button>
    {/each}
</section>

<style>
    .section {
        margin-bottom: 12.5vh;
        display: flex;
        flex-direction: column;
    }

    .header {
        width: max-content;
        padding-left: 20vw;
        font-size: 3.5vmin;
    }

    button.job {
        width: 100vw;
        min-height: 15vh;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        position: relative;
        background-color: rgba(171, 209, 198, 0.05);
        transition: color 0.3s;
        border: none;
        margin: 0;
        padding: 2vh 0;
        font-family: inherit;
        cursor: pointer;
        color: inherit;
    }

    button.job:focus-visible {
        outline: 3px solid #f9bc60;
        outline-offset: 2px;
    }

    .year {
        padding-left: 20vw;
        color: #e8e4e6;
        z-index: 2;
        margin: 0;
        align-self: center;
    }

    .role-text {
        overflow: hidden;
        font-size: 3vmin;
        padding-left: 20vw;
        padding-right: 20vw;
        font-style: italic;
        transition: opacity 0.5s ease-in-out;
        opacity: 1;
        text-align: left;
        margin-top: 1rem;
    }

    .text-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        z-index: 2;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
    }

    .company {
        padding-left: 20vw;
        padding-right: 20vw;
        color: #e8e4e6;
        transition: color 0.3s ease-in-out, opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
        opacity: 1;
        z-index: 2;
        margin: 0;
        text-align: left;
    }

    .company, .year {
        font-size: 4vmin;
    }

    .description {
        font-size: 3vmin;
        padding-left: 20vw;
        padding-right: 20vw;
        color: #e8e4e6;
        transition: color 0.5s ease, opacity 0.5s ease, transform 0.5s ease;
        opacity: 1;
        transform: scale(1);
        z-index: 2;
        text-align: left;
        margin-top: 1rem;
    }

    .background {
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(249, 188, 96, 0.1);
        transform-origin: center; 
        transform: scaleY(0);
        transition: transform 0.3s ease-in-out;
        z-index: 1;
    }

    /* Desktop hover animations */
    @media (hover: hover) {
        button.job:hover .background {
            transform: scaleY(1);
        }
        
        button.job:hover {
            color: #e8e4e6;
        }

        button.job:hover .description {
            color: #abd1c6;
        }
    }

    /* Touch device animations and states */
    @media (hover: none) {
        button.job:active .background {
            transform: scaleY(1);
        }
        
        button.job:active {
            color: #e8e4e6;
        }

        button.job:active .description {
            color: #abd1c6;
        }

        button.job[aria-expanded="true"] .background {
            transform: scaleY(1);
        }

        button.job[aria-expanded="true"] {
            color: #e8e4e6;
        }

        button.job[aria-expanded="true"] .description {
            color: #abd1c6;
        }
    }

    @media (max-width: 925px) {
        .section {
            align-items: center;
        }
        .header {
            padding-left: 0;
        }
        
        button.job {
            flex-direction: column;
            align-items: center;
        }
        .role-text {
            padding-left: 10vw;
            padding-right: 10vw;
        }
        .year {
            padding: 2vh 0 0 0;
            font-size: 3vmin;
            margin-bottom: 1rem;
        }
        .company {
            padding-left: 10vw;
            padding-right: 10vw;
            margin-bottom: 0.75rem;
        }
        .description {
            padding-left: 10vw;
            padding-right: 10vw;
        }
        .background {
            top: 0;
        }
    }

    @media (max-width: 610px) {
        .role-text {
            padding-left: 5vw;
            padding-right: 5vw;
        }
        .year {
            margin-bottom: 0.5rem;
        }
        .company {
            padding-left: 5vw;
            padding-right: 5vw;
            margin-bottom: 0.5rem;
        }
        .description {
            padding-left: 5vw;
            padding-right: 5vw;
        }
    }

    @media (max-width: 480px) {
        .role-text {
            padding-left: 3vw;
            padding-right: 3vw;
        }
        .year {
            margin-bottom: 0.5rem;
        }
        .company {
            padding-left: 3vw;
            padding-right: 3vw;
            margin-bottom: 0;
        }
        .description {
            padding-left: 3vw;
            padding-right: 3vw;
        }
    }
</style>