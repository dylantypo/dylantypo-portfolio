<script lang="ts">
	import Starfield from '$lib/components/Starfield.svelte';
	let { children } = $props();
</script>

<Starfield />
{@render children()}
