<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>
<svelte:head>
	<title>Phyrone | Blog</title>
</svelte:head>

<h1>Posts</h1>

{#each data.articles as article}
	<a class="btn btn-link" href={`/blog/${article.slug}`}>{article.title}</a>
{/each}
