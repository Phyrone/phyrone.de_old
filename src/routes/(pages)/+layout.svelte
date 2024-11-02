<script>
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<div class:content-wrapper={true}>
	{@render children?.()}
</div>
