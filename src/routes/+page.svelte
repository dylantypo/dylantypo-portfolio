<script lang="ts">
	import LandingPage from '$lib/components/LandingPage.svelte';
	import IntroDetails from '$lib/components/introDetails.svelte';
	import Skills from '$lib/components/skills.svelte';
	import History from '$lib/components/history.svelte';
	import Footer from '$lib/components/footer.svelte';
	import { onMount } from 'svelte';

	let hero_text = $state('Dylan Posner');
	let showLanding = $state(true);

	let GlobeComponent: any = $state(null);
	let ToolBarComponent: any = $state(null);
	let componentsLoaded = $state(false);

	async function handleEnter() {
		showLanding = false;
		try {
			const [{ default: Globe }, { default: ToolBar }] = await Promise.all([
				import('$lib/globe.svelte'),
				import('$lib/components/ToolBar.svelte')
			]);

			GlobeComponent = Globe;
			ToolBarComponent = ToolBar;
			componentsLoaded = true;
		} catch (error) {
			console.error('Failed to load components:', error);
			// Fallback: show content without heavy components
			componentsLoaded = true;
		}
	}

	onMount(() => {
		window.scrollTo(0, 0);
	});
</script>

{#if showLanding}
	<LandingPage onEnter={handleEnter} />
{:else}
	<main id="main-content" aria-label="Portfolio Content">
		{#if !componentsLoaded}
			<div class="loading-skeleton">
				<div class="skeleton-globe"></div>
				<div class="skeleton-content"></div>
			</div>
		{:else}
			{#if ToolBarComponent}
				<ToolBarComponent />
			{/if}

			{#if GlobeComponent}
				<GlobeComponent {hero_text} />
			{/if}

			<span id="content">
				<IntroDetails />

				<History />

				<Skills />

				<Footer />
			</span>
		{/if}
	</main>
{/if}

<style>
	main {
		position: relative;
		width: 100%;
		min-height: 100dvh;
		min-height: calc(var(--vh, 1vh) * 100);
		background-color: var(--color-background);
	}

	#content {
		color: var(--color-text-primary);
		user-select: text;
	}

	.loading-skeleton {
		position: relative;
		width: 100%;
		height: 100vh;
		background-color: var(--color-background);
	}

	.skeleton-globe {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
	}

	.skeleton-content {
		position: absolute;
		bottom: 2rem;
		left: 2rem;
		right: 2rem;
		height: 200px;
		border-radius: 1rem;
	}
</style>
