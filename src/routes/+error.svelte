<script lang="ts">
	import Globe from '$lib/globe.svelte';
	import { goto } from '$app/navigation';

	let hero_text = ' 404 ';
</script>

<main>
	<Globe {hero_text} />

	<section class="message">
		<button onclick={() => goto('/')}>
			<i class="fa-regular fa-rocket fa-bounce fa-2xl" style="--fa-animation-duration: 3.25s"></i>
			<h1>Page not found</h1>
			<i class="fa-regular fa-rocket fa-bounce fa-2xl" style="--fa-animation-duration: 3.67s"></i>
		</button>
	</section>
</main>

<style>
	@font-face {
		font-family: 'KenneyFuture';
		src: url('/Kenney Future.ttf') format('truetype');
		font-display: swap;
	}

	/* Global body styling */
	main {
		font-family: 'KenneyFuture', sans-serif;
		background-color: var(--color-background);
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
	}

	/* Message styles */
	.message {
		position: fixed;
		width: 100%;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: var(--color-secondary);
	}

	.message button {
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
		font-family: 'KenneyFuture';
		width: inherit;
		color: var(--color-text-primary);
		background-color: transparent;
		border: none;
	}

	.message button i {
		padding-left: 10vmin;
		padding-right: 10vmin;
	}
</style>
