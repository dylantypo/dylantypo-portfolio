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

	let skills: Skill[] = $state([
		{
			name: 'Data Science & ML',
			description: 'Core data science tools and machine learning implementations',
			subskills: [
				{ name: 'Python', years: 6 },
				{ name: 'NumPy/Pandas', years: 5 },
				{ name: 'Scikit-learn', years: 2.5 },
				{ name: 'R', years: 1 }
			],
			showDescription: false
		},
		{
			name: 'Cloud & Database',
			description: 'Cloud infrastructure and database management',
			subskills: [
				{ name: 'AWS Services', years: 3 },
				{ name: 'Splunk/SPL', years: 1 },
				{ name: 'SQL/PostgreSQL', years: 4 },
				{ name: 'Snowflake', years: 1 },
				{ name: 'Excel VBA', years: 5 }
			],
			showDescription: false
		},
		{
			name: 'Visualization',
			description: 'Data visualization and business intelligence tools',
			subskills: [
				{ name: 'Tableau', years: 2 },
				{ name: 'Excel Advanced', years: 4 }
			],
			showDescription: false
		},
		{
			name: 'Web Development',
			description: 'Full-stack web development technologies',
			subskills: [
				{ name: 'Svelte/SvelteKit', years: 4 },
				{ name: 'JavaScript', years: 5 },
				{ name: 'HTML/CSS', years: 6 },
				{ name: 'Flask', years: 1.5 },
				{ name: 'PHP', years: 1 }
			],
			showDescription: false
		},
		{
			name: 'Development Tools',
			description: 'Development and deployment tools',
			subskills: [
				{ name: 'Git/GitLab', years: 5 },
				{ name: 'Jenkins', years: 1 },
				{ name: 'Agile/Scrum', years: 4 },
				{ name: 'Tkinter', years: 3 }
			],
			showDescription: false
		}
	]);

	const toggleSkill = (index: number) => {
		skills[index].showDescription = !skills[index].showDescription;
		skills = [...skills];

		// After toggle, set custom property for each subskill
		if (skills[index].showDescription) {
			requestAnimationFrame(() => {
				const bars = document.querySelectorAll(
					`[data-skill="${index}"] .progress-fill`
				) as NodeListOf<HTMLElement>;
				bars.forEach((bar, i) => {
					const width = (skills[index].subskills[i].years / 10) * 100;
					bar.style.width = `${width}%`;
				});
			});
		}
	};
</script>

<section class="section" aria-labelledby="skills-header">
	<h2 id="skills-header" class="header">Skills</h2>
	<div class="legend-container">
		{#each skills as skill, i}
			<button
				class="legend-item"
				class:active={skill.showDescription}
				onclick={() => toggleSkill(i)}
				data-skill={i}
				aria-expanded={skill.showDescription}
				aria-controls={`skill-details-${i}`}
			>
				<div class="legend-header">
					<span class="legend-marker" aria-hidden="true"></span>
					<h3 class="skill-name">{skill.name}</h3>
					<span class="expand-icon" aria-hidden="true">{skill.showDescription ? '−' : '+'}</span>
				</div>

				{#if skill.showDescription}
					<div id={`skill-details-${i}`} class="skill-details" aria-live="polite">
						<p class="description">{skill.description}</p>
						<ul class="subskills-grid">
							{#each skill.subskills as subskill}
								<li class="subskill">
									<div class="subskill-header">
										<span class="subskill-name">{subskill.name}</span>
										<span class="proficiency"
											>{subskill.years} year{subskill.years !== 1 ? 's' : ''}</span
										>
									</div>
									<div
										class="progress-bar"
										role="progressbar"
										aria-valuemin="0"
										aria-valuemax="10"
										aria-valuenow={subskill.years}
										aria-label={`${subskill.years} years of experience in ${subskill.name}`}
									>
										<div class="progress-fill"></div>
									</div>
								</li>
							{/each}
						</ul>
					</div>
				{/if}
			</button>
		{/each}
	</div>
</section>

<style>
	.section {
		margin-bottom: 12.5vh;
	}

	.header {
		width: max-content;
		padding-left: var(--content-padding-current);
		font-size: var(--font-size-lg);
		margin-bottom: var(--spacing-xl);
	}

	.legend-container {
		padding: 0 var(--content-padding-current);
		display: flex;
		flex-direction: column;
		gap: var(--spacing-base);
	}

	.legend-item {
		width: 100%;
		text-align: left;
		border: none;
		border-radius: 0.5rem;
		padding: var(--spacing-base);
		cursor: pointer;
		background-color: var(--color-fill);
		transition: all var(--transition-speed) ease;
		font-family: var(--font-family-base);
	}

	.legend-item:hover {
		background-color: var(--color-hover);
	}

	.legend-item:focus-visible {
		outline: 3px solid var(--color-secondary);
		outline-offset: 2px;
	}

	.legend-item.active {
		background-color: rgba(255, 255, 255, 0.15);
	}

	.legend-header {
		display: flex;
		align-items: center;
		gap: var(--spacing-base);
	}

	.legend-marker {
		width: 1rem;
		height: 1rem;
		background-color: var(--color-secondary);
		border-radius: 50%;
	}

	.skill-name {
		flex: 1;
		font-size: 2.5vmin;
		margin: 0;
		color: var(--color-text-primary);
	}

	.expand-icon {
		font-size: 2vmin;
		color: var(--color-text-primary);
	}

	.skill-details {
		margin-top: var(--spacing-base);
		padding-left: var(--spacing-xl);
	}

	.description {
		color: var(--color-text-primary);
		font-size: 2.5vmin;
		margin-bottom: var(--spacing-base);
	}

	.subskills-grid {
		display: grid;
		gap: var(--spacing-base);
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.subskill {
		background-color: var(--color-fill);
		padding: 0.75rem;
		border-radius: 0.25rem;
	}

	.subskill-header {
		display: flex;
		justify-content: space-between;
		margin-bottom: 0.5rem;
	}

	.subskill-name {
		color: var(--color-text-primary);
		font-size: 1.8vmin;
	}

	.proficiency {
		color: var(--color-text-primary);
		font-size: 1.8vmin;
	}

	.progress-bar {
		height: 4px;
		background-color: var(--color-fill);
		border-radius: 2px;
		overflow: hidden;
	}

	.progress-fill {
		height: 100%;
		background-color: var(--color-secondary);
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
		}
	}

	@media (max-width: 610px) {
		.legend-container {
			padding: 0 var(--content-padding-current);
		}

		.skill-name {
			font-size: 3vmin;
		}

		.subskill-name,
		.proficiency {
			font-size: 2.2vmin;
		}
	}

	@media (max-width: 480px) {
		.legend-marker {
			width: 0.75rem;
			height: 0.75rem;
		}
	}
</style>
