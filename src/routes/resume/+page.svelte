<script lang="ts">
	import ResumeViewer from '$lib/ResumeViewer.svelte';

	// Use $state for reactive variables
	let markdownContent = $state('');
	let isLoading = $state(true);
	let error = $state<string | null>(null);

	// Regular async function for loading content
	async function loadContent() {
		isLoading = true;
		error = null;

		try {
			const response = await fetch('/DylanPosner_Resume.md');
			if (!response.ok) {
				throw new Error(`Failed to load resume (${response.status})`);
			}
			markdownContent = await response.text();
		} catch (err) {
			error = err instanceof Error ? err.message : 'Failed to load resume';
			markdownContent = '# Error\nFailed to load resume content.';
		} finally {
			isLoading = false;
		}
	}

	// Use $effect for initialization
	$effect(() => {
		loadContent();
	});
</script>

{#if isLoading}
	<div class="flex justify-center items-center min-h-screen">
		<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
	</div>
{:else if error}
	<div class="text-red-500 p-4">
		{error}
	</div>
{:else}
	<ResumeViewer {markdownContent} fileName="DylanPosner_Resume.md" />
{/if}
