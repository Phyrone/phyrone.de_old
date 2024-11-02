<script lang="ts">
	interface Props {
		href: string;
		children?: import('svelte').Snippet;
		expanded?: import('svelte').Snippet;
	}

	let { href, children, expanded }: Props = $props();
</script>

<a class="join-item btn btn-sm btn-ghost rounded-sm" {href}>
	{@render children?.()}
	<!-- TODO maybe support retracting text -->
	{@render expanded?.()}
</a>
