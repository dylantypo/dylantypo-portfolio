<script lang="ts">
    type Subskill = {
        name: string;
        years: number;
    };

    type Skill = {
        name: string;
        description: string;
        subskills: Subskill[];
        showDescription: boolean;
    };

    let skills: Skill[] = [
        {
            name: "Data Science & ML",
            description: "Core data science tools and machine learning implementations",
            subskills: [
                { name: "Python", years: 6 },
                { name: "NumPy/Pandas", years: 5 },
                { name: "Scikit-learn", years: 2.5 },
                { name: "R", years: 1 }
            ],
            showDescription: false
        },
        {
            name: "Cloud & Database",
            description: "Cloud infrastructure and database management",
            subskills: [
                { name: "AWS Services", years: 3 },
                { name: "SQL/PostgreSQL", years: 4 },
                { name: "Snowflake", years: 1 },
                { name: "Excel VBA", years: 5 }
            ],
            showDescription: false
        },
        {
            name: "Visualization",
            description: "Data visualization and business intelligence tools",
            subskills: [
                { name: "Tableau", years: 2 },
                { name: "Excel Advanced", years: 4 }
            ],
            showDescription: false
        },
        {
            name: "Web Development",
            description: "Full-stack web development technologies",
            subskills: [
                { name: "Svelte/SvelteKit", years: 4 },
                { name: "JavaScript", years: 5 },
                { name: "HTML/CSS", years: 6 },
                { name: "Flask", years: 1.5 },
                { name: "PHP", years: 1 }
            ],
            showDescription: false
        },
        {
            name: "Development Tools",
            description: "Development and deployment tools",
            subskills: [
                { name: "Git/GitLab", years: 5 },
                { name: "Jenkins", years: 1 },
                { name: "Agile/Scrum", years: 4 },
                { name: "Tkinter", years: 3 }
            ],
            showDescription: false
        }
    ];

    const toggleSkill = (index: number) => {
        skills[index].showDescription = !skills[index].showDescription;
        skills = [...skills];
        
        // After toggle, set custom property for each subskill
        if (skills[index].showDescription) {
            requestAnimationFrame(() => {
                const bars = document.querySelectorAll(`[data-skill="${index}"] .progress-fill`) as NodeListOf<HTMLElement>;
                bars.forEach((bar, i) => {
                    const width = (skills[index].subskills[i].years / 10) * 100;
                    bar.style.width = `${width}%`;
                });
            });
        }
    };
</script>

<div class="section">
    <p class="header">Skills</p>
    <div class="legend-container">
        {#each skills as skill, i}
            <div 
                class="legend-item"
                class:active={skill.showDescription}
                onclick={() => toggleSkill(i)}
                onkeydown={(e) => e.key === 'Enter' && toggleSkill(i)}
                tabindex="0"
                role="button"
                data-skill={i}
            >
                <div class="legend-header">
                    <span class="legend-marker"></span>
                    <h3 class="skill-name">{skill.name}</h3>
                    <span class="expand-icon">{skill.showDescription ? '−' : '+'}</span>
                </div>
                
                {#if skill.showDescription}
                    <div class="skill-details">
                        <p class="description">{skill.description}</p>
                        <div class="subskills-grid">
                            {#each skill.subskills as subskill}
                                <div class="subskill">
                                    <div class="subskill-header">
                                        <span class="subskill-name">{subskill.name}</span>
                                        <span class="proficiency">{subskill.years} year{subskill.years !== 1 ? 's' : ''}</span>
                                    </div>
                                    <div class="progress-bar">
                                        <div class="progress-fill"></div>
                                    </div>
                                </div>
                            {/each}
                        </div>
                    </div>
                {/if}
            </div>
        {/each}
    </div>
</div>

<style>
    .section {
        margin-bottom: 12.5vh;
    }

    .header {
        width: max-content;
        padding-left: 20vw;
        font-size: 3.5vmin;
        margin-bottom: 2em;
    }

    .legend-container {
        padding: 0 20vw;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .legend-item {
        background-color: rgba(171, 209, 198, 0.05);
        border-radius: 0.5rem;
        padding: 1rem;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .legend-item:hover {
        background-color: rgba(249, 188, 96, 0.1);
    }

    .legend-item.active {
        background-color: rgba(249, 188, 96, 0.15);
    }

    .legend-header {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .legend-marker {
        width: 1rem;
        height: 1rem;
        background-color: #f9bc60;
        border-radius: 50%;
    }

    .skill-name {
        flex: 1;
        font-size: 2.5vmin;
        margin: 0;
        color: #e8e4e6;
    }

    .expand-icon {
        font-size: 2vmin;
        color: #abd1c6;
    }

    .skill-details {
        margin-top: 1rem;
        padding-left: 2rem;
    }

    .description {
        color: #abd1c6;
        font-size: 2vmin;
        margin-bottom: 1rem;
    }

    .subskills-grid {
        display: grid;
        gap: 1rem;
    }

    .subskill {
        background-color: rgba(0, 70, 67, 0.3);
        padding: 0.75rem;
        border-radius: 0.25rem;
    }

    .subskill-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.5rem;
    }

    .subskill-name {
        color: #e8e4e6;
        font-size: 1.8vmin;
    }

    .proficiency {
        color: #abd1c6;
        font-size: 1.8vmin;
    }

    .progress-bar {
        height: 4px;
        background-color: rgba(171, 209, 198, 0.1);
        border-radius: 2px;
        overflow: hidden;
    }

    .progress-fill {
        height: 100%;
        background-color: #f9bc60;
        width: 0;
        transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }

    @media (max-width: 925px) {
        .section {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .header {
            padding-left: 0;
        }

        .legend-container {
            width: 85%;
            padding: 0 10vw;
        }
    }

    @media (max-width: 610px) {
        .legend-container {
            padding: 0 5vw;
        }
        
        .skill-name {
            font-size: 3vmin;
        }
        
        .subskill-name, .proficiency {
            font-size: 2.2vmin;
        }
    }

    @media (max-width: 480px) {
        .legend-container {
            padding: 0 3vw;
        }
        
        .legend-header {
            gap: 0.5rem;
        }
        
        .legend-marker {
            width: 0.75rem;
            height: 0.75rem;
        }
    }
</style>