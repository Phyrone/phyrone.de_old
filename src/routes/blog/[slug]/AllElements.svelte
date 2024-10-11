<script lang="ts">
	import { ArticleElement } from '$lib/schema/blog-article';
	import BlogElement from './BlogElement.svelte';

	export let elements: unknown;
	let elementsarray: ArticleElement[] | 'error';
	$: elementsarray = elements as ArticleElement[];
</script>

{#each elementsarray as element}
	<BlogElement {element} />
{/each}
