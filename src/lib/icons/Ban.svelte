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
	<g color="red">
		<circle cx="12" cy="12" r="10" /><path d="m4.9 4.9 14.2 14.2" />
	</g>
</Icon>
