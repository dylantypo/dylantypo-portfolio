<script lang="ts">
    let jobs = $state([
        {
            year: "Now",
            company: "Booz Allen Hamilton",
            role: "Data Scientist (Senior Consultant)  ",
            description: "Developed Python-based tools and automated workflows, integrating AWS and Tableau to improve data analysis and visualization  ",
            showDescription: false,
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
    ]);

    // Helper function to close all descriptions
    function closeAllDescriptions() {
        jobs.forEach((job) => {
            job.showDescription = false;
        });
        jobs = [...jobs]; // Trigger reactivity
    }

    function toggleDescription(index: number, event?: Event) {
        const wasOpen = jobs[index].showDescription;
        
        // Only close other jobs if opening a new one
        if (!wasOpen) {
            jobs.forEach((job, i) => {
                // Only close other jobs, not the clicked one
                if (i !== index) {
                    job.showDescription = false;
                }
            });
        }
        
        // Toggle the clicked job
        jobs[index].showDescription = !wasOpen;
        
        // Trigger reactivity
        jobs = [...jobs];
    }

    function handleFocus(index: number) {
    }

    function handleBlur(index: number) {
    }

    // Handle mouse leave for desktop
    function handleMouseLeave() {
        // Only handle mouse leave if device supports hover
        if (window.matchMedia('(hover: hover)').matches) {
            closeAllDescriptions();
        }
    }

    // Document click handler
    $effect(() => {
        // Touch handler with scroll detection
        let touchStartY = 0;
        let isScrolling = false;
        let touchStartTime = 0;

        function handleTouchStart(e: TouchEvent) {
            touchStartY = e.touches[0].clientY;
            touchStartTime = Date.now();
            isScrolling = false;
        }

        function handleTouchMove(e: TouchEvent) {
            if (isScrolling) return;
            
            const touchCurrentY = e.touches[0].clientY;
            const deltaY = Math.abs(touchCurrentY - touchStartY);
            
            // If moved more than 10px vertically, consider it scrolling
            if (deltaY > 10) {
                isScrolling = true;
            }
        }

        function handleTouchEnd(e: TouchEvent) {
            // If we were scrolling, don't process as a tap
            if (isScrolling) return;

            // Check if this was a quick tap (less than 300ms)
            const touchEndTime = Date.now();
            const touchDuration = touchEndTime - touchStartTime;
            
            if (touchDuration > 300) return;

            const target = e.target as HTMLElement;
            const jobButton = target.closest('.job') as HTMLButtonElement;

            // Only handle touch end if it's directly on a job button
            if (jobButton && target.closest('.section')) {  // Add check for within section
                const index = parseInt(jobButton.dataset.index || '-1');
                if (index >= 0) {
                    e.preventDefault();  // Prevent any default behavior
                    e.stopPropagation(); // Stop event from bubbling
                    toggleDescription(index, e);
                }
            }
        }

        document.addEventListener('touchstart', handleTouchStart, { passive: true });
        document.addEventListener('touchmove', handleTouchMove, { passive: true });
        document.addEventListener('touchend', handleTouchEnd, { passive: false });

        // Cleanup
        return () => {
            document.removeEventListener('touchstart', handleTouchStart);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
        };
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
            onclick={(e) => {
                e.stopPropagation();  // Stop event from bubbling up
                toggleDescription(i, e);
            }}
            onmouseleave={() => handleMouseLeave()}
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
        padding-left: var(--content-padding-desktop);
        font-size: var(--font-size-lg);
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
        transition: color var(--transition-speed);
        border: none;
        margin: 0;
        padding: 2vh 0;
        font-family: var(--font-family-base);
        cursor: pointer;
        color: inherit;
    }

    button.job:focus-visible {
        outline: 3px solid var(--color-secondary);
        outline-offset: 2px;
    }

    .year {
        padding-left: var(--content-padding-desktop);
        color: var(--color-text-primary);
        z-index: 2;
        margin: 0;
        align-self: center;
    }

    .role-text {
        overflow: hidden;
        font-size: 3vmin;
        padding-left: var(--content-padding-desktop);
        padding-right: var(--content-padding-desktop);
        font-style: italic;
        transition: opacity var(--transition-speed) ease-in-out;
        opacity: 1;
        text-align: left;
        margin-top: var(--spacing-base);
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
        padding-left: var(--content-padding-desktop);
        padding-right: var(--content-padding-desktop);
        color: var(--color-text-primary);
        transition: color var(--transition-speed) ease-in-out, 
                  opacity var(--transition-speed) ease-in-out, 
                  transform var(--transition-speed) ease-in-out;
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
        padding-left: var(--content-padding-desktop);
        padding-right: var(--content-padding-desktop);
        color: var(--color-text-primary);
        transition: color var(--transition-speed) ease, 
                  opacity var(--transition-speed) ease, 
                  transform var(--transition-speed) ease;
        opacity: 1;
        transform: scale(1);
        z-index: 2;
        text-align: left;
        margin-top: var(--spacing-base);
    }

    .background {
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(249, 188, 96, 0.1);
        transform-origin: center; 
        transform: scaleY(0);
        transition: transform var(--transition-speed) ease-in-out, 
                    background-color var(--transition-speed) ease-in-out;
        z-index: 1;
    }

    /* Desktop hover animations */
    @media (hover: hover) {
        button.job:hover .background {
            transform: scaleY(1);
        }
        
        button.job:hover {
            color: var(--color-text-primary);
        }

        button.job:hover .description {
            color: var(--color-text-secondary);
        }
    }

    /* Touch device animations and states */
    @media (hover: none) {
        button.job[aria-expanded="true"] {
            color: var(--color-text-primary);
        }

        button.job[aria-expanded="true"] .background {
            transform: scaleY(1);
            background: rgba(249, 188, 96, 0.1); /* Explicit background */
        }

        button.job[aria-expanded="true"] .description {
            color: var(--color-text-secondary);
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
            padding-left: var(--content-padding-tablet);
            padding-right: var(--content-padding-tablet);
        }
        .year {
            padding: 2vh 0 0 0;
            font-size: 3vmin;
            margin-bottom: var(--spacing-base);
        }
        .company {
            padding-left: var(--content-padding-tablet);
            padding-right: var(--content-padding-tablet);
            margin-bottom: 0.75rem;
        }
        .description {
            padding-left: var(--content-padding-tablet);
            padding-right: var(--content-padding-tablet);
        }
        .background {
            top: 0;
        }
    }

    @media (max-width: 610px) {
        .role-text, .company, .description {
            padding-left: var(--content-padding-mobile);
            padding-right: var(--content-padding-mobile);
        }
        .year {
            margin-bottom: calc(var(--spacing-base) * 0.5);
        }
    }

    @media (max-width: 480px) {
        .role-text, .company, .description {
            padding-left: calc(var(--content-padding-mobile) * 0.6);
            padding-right: calc(var(--content-padding-mobile) * 0.6);
        }
    }
</style>