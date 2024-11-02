<script lang="ts">
	import type { PageData } from './$types';
	import AllElements from './AllElements.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<svelte:head>
	<title>Phyrone | {data.article.meta.title}</title>
</svelte:head>

<AllElements elements={data.article.i} />
