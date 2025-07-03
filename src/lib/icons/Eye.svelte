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
	<path
		d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"
	/>
	<circle cx="12" cy="12" r="3" />
</Icon>
