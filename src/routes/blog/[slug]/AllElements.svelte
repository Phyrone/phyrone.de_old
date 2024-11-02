<script lang="ts">
	import { ArticleElement } from '$lib/schema/blog-article';
	import BlogElement from './BlogElement.svelte';

	interface Props {
		elements: unknown;
	}

	let { elements }: Props = $props();
	let elementsarray: ArticleElement[] | 'error' = $derived(elements as ArticleElement[]);
</script>

{#each elementsarray as element}
	<BlogElement {element} />
{/each}
