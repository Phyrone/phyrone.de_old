<script lang="ts">
	import type { PageData } from './$types';
	import AllElements from './AllElements.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>Phyrone | {data.article.meta.title}</title>
</svelte:head>

<AllElements elements={data.article.i} />
