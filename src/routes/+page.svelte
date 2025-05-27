<script lang="ts">
	import LandingPage from '$lib/LandingPage.svelte';
	import MainContent from '$lib/mainContent.svelte';
	import { onMount } from 'svelte';

	let hero_text = $state('Dylan Posner');
	let isCoolBarVisible = $state(false);
	let showLanding = $state(true);

	let GlobeComponent: any = $state(null);
	let ToolBarComponent: any = $state(null);
	let CoolBarComponent: any = $state(null);
	let componentsLoaded = $state(false);

	function handleRevealCoolBar() {
		isCoolBarVisible = true;
	}

	async function handleEnter() {
		showLanding = false;
		try {
			const [{ default: Globe }, { default: ToolBar }, { default: CoolBar }] = await Promise.all([
				import('$lib/globe.svelte'),
				import('$lib/ToolBar.svelte'),
				import('$lib/CoolBar.svelte')
			]);

			GlobeComponent = Globe;
			ToolBarComponent = ToolBar;
			CoolBarComponent = CoolBar;
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
			{#if CoolBarComponent}
				<CoolBarComponent visible={isCoolBarVisible} />
			{/if}

			{#if ToolBarComponent}
				<ToolBarComponent />
			{/if}

			{#if GlobeComponent}
				<GlobeComponent {hero_text} />
			{/if}

			<MainContent {handleRevealCoolBar} />
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
		background: radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
		animation: pulse 2s ease-in-out infinite;
	}

	.skeleton-content {
		position: absolute;
		bottom: 2rem;
		left: 2rem;
		right: 2rem;
		height: 200px;
		background: var(--color-fill);
		border-radius: 1rem;
		animation: pulse 2s ease-in-out infinite 0.5s;
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 0.6;
		}
		50% {
			opacity: 0.3;
		}
	}
</style>
