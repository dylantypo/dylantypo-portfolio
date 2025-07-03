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
	<path d="M18 6 6 18" />
	<path d="m6 6 12 12" />
</Icon>
