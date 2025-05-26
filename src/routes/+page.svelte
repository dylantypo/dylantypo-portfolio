<script lang="ts">
	import LandingPage from '$lib/LandingPage.svelte';
	import Globe from '$lib/globe.svelte';
	import ToolBar from '$lib/ToolBar.svelte';
	import CoolBar from '$lib/CoolBar.svelte';
	import MainContent from '$lib/mainContent.svelte';
	import { onMount } from 'svelte';

	let hero_text = $state('Dylan Posner');
	let isCoolBarVisible = $state(false);

	let showLanding = $state(true);

	function handleRevealCoolBar() {
		isCoolBarVisible = true;
	}

	function handleEnter() {
		showLanding = false;
	}

	onMount(() => {
		window.scrollTo(0, 0);
	});
</script>

{#if showLanding}
	<LandingPage onEnter={handleEnter} />
{:else}
	<main id="main-content" aria-label="Portfolio Content">
		<CoolBar visible={isCoolBarVisible} />
		<ToolBar />
		<Globe {hero_text} />
		<MainContent {handleRevealCoolBar} />
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
</style>
