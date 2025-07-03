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
	<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
	<path d="M14 2v4a2 2 0 0 0 2 2h4" />
</Icon>
