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
    function toggleDescription(index: number) {
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

    // Touch handler - simplified
    $effect(() => {
        function handleTouch(e: TouchEvent) {
            const target = e.target as HTMLElement;
            const job = target.closest('.job');

            if (job) {
                const index = Array.from(document.querySelectorAll('.job')).indexOf(job);
                toggleDescription(index);
                return;
            }

            // Close all jobs if touched outside
            jobs.forEach((_, i) => {
                jobs[i].showDescription = false;
            });
        }

        document.addEventListener('touchstart', handleTouch);
        return () => document.removeEventListener('touchstart', handleTouch);
    });
</script>

<section class="section" aria-labelledby="history-header">
    <h2 id="history-header" class="header">History</h2>
    {#each jobs as job, i}
        <button 
            class="job" 
            onfocus={() => handleFocus(i)}
            onblur={() => handleBlur(i)}
            onclick={() => toggleDescription(i)}
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
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        position: relative;
        background-color: rgba(171, 209, 198, 0.05);
        transition: color 0.3s;
        border: none;
        margin: 0;
        padding: 0;
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
    }

    .role-text {
        overflow: hidden;
        font-size: 2vmin;
        padding-left: 20vw;
        padding-right: 20vw;
        font-style: italic;
        transition: opacity 0.5s ease-in-out;
        opacity: 1;
        text-align: left;
    }

    .text-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        z-index: 2;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .company {
        padding-left: 20vw;
        padding-right: 20vw;
        color: #e8e4e6;
        transition: color 0.3s ease-in-out, opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
        opacity: 1;
        z-index: 2;
        margin: 2rem 0 0 0;
    }

    .company, .year {
        font-size: 4vmin;
    }

    .description {
        font-size: 2.5vmin;
        padding-left: 20vw;
        padding-right: 20vw;
        color: #e8e4e6;
        transition: color 0.5s ease, opacity 0.5s ease, transform 0.5s ease;
        opacity: 1;
        transform: scale(1);
        z-index: 2;
        text-align: left;
    }

    button.job:hover .description {
        color: #abd1c6;
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

    button.job:hover .background {
        transform: scaleY(1);
    }

    button.job:hover {
        color: #e8e4e6;
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
        }
        .year {
            padding: 0;
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
        .role-text {
            padding-left: 5vw;
            font-size: 2.8vmin;
        }
        .year {
            padding: 0;
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
        .role-text {
            padding-left: 3vw;
            font-size: 2.5vmin;
        }
        .year {
            padding: 0;
            font-size: 2vmin;
        }
        .company {
            padding-left: 3vw;
            padding-right: 3vw;
            font-size: 2.8vmin;
        }
        .description {
            font-size: 2.3vmin;
            padding-left: 3vw;
            padding-right: 3vw;
        }
    }
</style>