<script lang="ts">
    import { onMount } from 'svelte';

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

    onMount(() => {
        // Add a document touch listener
        document.addEventListener('touchstart', (e) => {
            const target = e.target as HTMLElement;
            const job = target.closest('.job');

            // If tapping inside the current job, prevent reset
            if (job) {
                const index = Array.from(document.querySelectorAll('.job')).indexOf(job);
                if (jobs[index].showDescription) {
                    // Let the interaction happen without resetting
                    return;
                }
                // Open the job description for the tapped element
                toggleDescription(index);
                return;
            }

            // Close all jobs if touched outside
            jobs.forEach((job) => (job.showDescription = false));
            jobs = [...jobs]; // Trigger reactivity
        });
    });
</script>

<div class="section">
    <p class="header">History</p>
    {#each jobs as job, i}
        <div 
            class="job" 
            on:mouseover={() => !job.showDescription && toggleDescription(i)} 
            on:focus={() => !job.showDescription && toggleDescription(i)} 
            on:mouseleave={() => resetDescription(i)} 
            aria-expanded={job.showDescription} 
            tabindex="0" 
            role="button"
        >   
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
        </div>
    {/each}
</div>

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

    .job {
        width: 100vw;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        position: relative;
        background-color: rgba(171, 209, 198, 0.05);
        transition: color 0.3s;
    }

    .job:focus {
        outline: none;
    }

    .year {
        padding-left: 20vw;
        color: #e8e4e6;
        z-index: 2;
    }

    .role-text {
        overflow: hidden;
        font-size: 2vmin;
        padding-left: 20vw;
        padding-right: 20vw;
        font-style: italic;
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
        color: #e8e4e6;
        transition: color 0.3s ease-in-out, opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
        opacity: 1;
        z-index: 2;
    }

    /* .job:hover .company {
        color: #004643;
    } */

    .company, .year {
        font-size: 4vmin;
    }

    .description {
        font-size: 2.5vmin;
        padding-left: 20vw;
        padding-right: 20vw;
        color: #e8e4e6;
        transition: color 0.5s ease, opacity 0.5s ease, transform 0.5s ease;
        opacity: 0;
        transform: scale(0.95);
        z-index: 2;
    }

    .job:hover .description {
        color: #abd1c6;
        opacity: 1;
        transform: scale(1);
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

    .job:hover .background {
        transform: scaleY(1);
    }

    .job:hover {
        color: #e8e4e6;
    }

    @media (max-width: 925px) {
        .section {
            align-items: center;
        }

        .header {
            padding-left: 0;
        }
        
        .job {
            flex-direction: column;
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
        .job {
            flex-direction: column;
        }

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
        .job {
            flex-direction: column;
        }

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