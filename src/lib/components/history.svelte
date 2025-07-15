<script lang="ts">
	import ChevronDown from '$lib/icons/ChevronDown.svelte';
	import ChevronUp from '$lib/icons/ChevronUp.svelte';

	let jobs = $state([
		{
			year: 'Now',
			company: 'Booz Allen Hamilton',
			role: 'Senior Data Scientist',
			description:
				'Developed Python-based tools and automated workflows, integrating AWS and Tableau to improve data analysis and visualization  ',
			showDescription: false
		},
		{
			year: '2019',
			company: 'Interos',
			role: 'Data Analytics Intern',
			description:
				'Used Snowflake and SQL to organize data and developed efficient pipelines for supply chain analysis  ',
			showDescription: false
		},
		{
			year: '2018',
			company: 'The Phoenix Team',
			role: 'Product Development Intern',
			description:
				'Leveraged agile practices to support product design and coordinated efforts to deliver a client-focused white paper  ',
			showDescription: false
		}
	]);

	function closeAllDescriptions() {
		jobs.forEach((job) => {
			job.showDescription = false;
		});
		jobs = [...jobs];
	}

	function toggleDescription(index: number, event?: Event) {
		const wasOpen = jobs[index].showDescription;

		if (!wasOpen) {
			jobs.forEach((job, i) => {
				if (i !== index) {
					job.showDescription = false;
				}
			});
		}

		jobs[index].showDescription = !wasOpen;
		jobs = [...jobs];
	}

	function handleMouseLeave() {
		if (window.matchMedia('(hover: hover)').matches) {
			closeAllDescriptions();
		}
	}

	$effect(() => {
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

			if (deltaY > 10) {
				isScrolling = true;
			}
		}

		function handleTouchEnd(e: TouchEvent) {
			if (isScrolling) return;

			const touchEndTime = Date.now();
			const touchDuration = touchEndTime - touchStartTime;

			if (touchDuration > 300) return;

			const target = e.target as HTMLElement;
			const jobButton = target.closest('.job') as HTMLButtonElement;

			if (jobButton && target.closest('.section')) {
				const index = parseInt(jobButton.dataset.index || '-1');
				if (index >= 0) {
					e.preventDefault();
					e.stopPropagation();
					toggleDescription(index, e);
				}
			}
		}

		document.addEventListener('touchstart', handleTouchStart, { passive: true });
		document.addEventListener('touchmove', handleTouchMove, { passive: true });
		document.addEventListener('touchend', handleTouchEnd, { passive: false });

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
			onclick={(e) => {
				e.stopPropagation();
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
					<div id={`job-description-${i}`} class="description" aria-live="polite">
						<p>
							{job.description}
							<span class="chevron-icon beat-fade"><ChevronUp size={24} /></span>
						</p>
					</div>
				{:else}
					<div class="role-text">
						<p>
							{job.role}
							<span class="chevron-icon"><ChevronDown size={20} /></span>
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
		padding-left: var(--content-padding-current);
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
		background-color: var(--color-fill);
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
		padding-left: var(--content-padding-current);
		color: var(--color-text-primary);
		z-index: 2;
		margin: 0;
		align-self: center;
	}

	.role-text {
		overflow: hidden;
		font-size: 3vmin;
		padding-left: var(--content-padding-current);
		padding-right: var(--content-padding-current);
		font-style: italic;
		transition: opacity var(--transition-speed) ease-in-out;
		opacity: 1;
		text-align: left;
		margin-top: var(--spacing-base);
	}

	.role-text p {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin: 0;
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
		padding-left: var(--content-padding-current);
		padding-right: var(--content-padding-current);
		color: var(--color-text-primary);
		transition:
			color var(--transition-speed) ease-in-out,
			opacity var(--transition-speed) ease-in-out,
			transform var(--transition-speed) ease-in-out;
		opacity: 1;
		z-index: 2;
		margin: 0;
		text-align: left;
	}

	.company,
	.year {
		font-size: 4vmin;
	}

	.description {
		font-size: 3vmin;
		padding-left: var(--content-padding-current);
		padding-right: var(--content-padding-current);
		color: var(--color-text-primary);
		transition:
			color var(--transition-speed) ease,
			opacity var(--transition-speed) ease,
			transform var(--transition-speed) ease;
		opacity: 1;
		transform: scale(1);
		z-index: 2;
		text-align: left;
		margin-top: var(--spacing-base);
	}

	.description p {
		display: inline;
		align-items: center;
		gap: 0.5rem;
		margin: 0;
	}

	.background {
		position: absolute;
		left: 0;
		width: 100%;
		height: 100%;
		background: var(--color-hover);
		transform-origin: center;
		transform: scaleY(0);
		transition:
			transform var(--transition-speed) ease-in-out,
			background-color var(--transition-speed) ease-in-out;
		z-index: 1;
	}

	:global(.beat-fade) {
		animation: beat-fade 2s infinite ease-in-out;
	}

	@keyframes beat-fade {
		0%,
		100% {
			opacity: 1;
			transform: rotate(180deg);
		}
		50% {
			opacity: 0.4;
		}
	}

	@media (hover: hover) {
		button.job:hover .background {
			transform: scaleY(1);
		}

		button.job:hover {
			color: var(--color-text-primary);
		}

		button.job:hover .description {
			color: var(--color-text-primary);
		}
	}

	@media (hover: none) {
		button.job[aria-expanded='true'] {
			color: var(--color-text-primary);
		}

		button.job[aria-expanded='true'] .background {
			transform: scaleY(1);
			background: var(--color-hover);
		}

		button.job[aria-expanded='true'] .description {
			color: var(--color-text-primary);
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
			padding-left: var(--content-padding-current);
			padding-right: var(--content-padding-current);
		}
		.year {
			padding: 2vh 0 0 0;
			font-size: 3vmin;
			margin-bottom: var(--spacing-base);
		}
		.company {
			margin-bottom: 0.75rem;
		}
		.background {
			top: 0;
		}
	}

	@media (max-width: 480px) {
		.role-text,
		.company,
		.description {
			padding-left: var(--content-padding-current);
			padding-right: var(--content-padding-current);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		:global(.icon-fade) {
			animation: none;
		}
	}
</style>
