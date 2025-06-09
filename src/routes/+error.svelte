<script lang="ts">
	import { goto } from '$app/navigation';
</script>

<main>
	<section class="message">
		<button onclick={() => goto('/')}>
			<h1>Error 404: Page Not Found</h1>
		</button>
	</section>
</main>

<style>
	@font-face {
		font-family: 'KenneyFuture';
		src: url('/fonts/Kenney Future.woff2') format('woff2');
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
	}

	.message button {
		cursor: pointer !important;
		display: flex;
		justify-content: center;
		align-items: center;
		font-family: 'KenneyFuture';
		width: inherit;
		color: var(--color-text-primary);
		background-color: transparent;
		border: none;
	}
</style>
