<script lang="ts">
	import Icon from './Icon.svelte';

	interface Props {
		size?: number;
		class?: string;
		strokeWidth?: number;
	}

	let { size = 24, class: className = '', strokeWidth = 2 }: Props = $props();
</script>

<Icon {size} class={className} {strokeWidth}>
	<path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
	<path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6" />
	<rect x="6" y="14" width="12" height="8" rx="1" />
</Icon>
