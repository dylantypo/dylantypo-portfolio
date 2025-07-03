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
	<path d="M12 15V3" />
	<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
	<path d="m7 10 5 5 5-5" />
</Icon>
