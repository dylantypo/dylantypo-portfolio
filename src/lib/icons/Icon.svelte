<script lang="ts">
	interface Props {
		size?: number;
		class?: string;
		strokeWidth?: number;
		children?: any;
	}

	let { size = 24, class: className = '', strokeWidth = 2, children }: Props = $props();
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width={strokeWidth}
	stroke-linecap="round"
	stroke-linejoin="round"
	class={className}
>
	{@render children()}
</svg>
