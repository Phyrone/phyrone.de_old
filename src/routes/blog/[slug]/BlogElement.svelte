<script lang="ts">
	import type { ArticleElement } from '$lib/schema/blog-article';
	import AllElements from './AllElements.svelte';
	import PictureRender from '$lib/PictureRender.svelte';
	import CodeHooksElement from './CodeHooksElement.svelte';
	import HeadingElement from './HeadingElement.svelte';
	import PictureNotFound from './PictureNotFound.svelte';
	import { ImageIcon, ShellIcon } from 'lucide-svelte';

	export let element: ArticleElement;
</script>

{#if typeof element === 'string'}
	{element}
{:else if element.t === 'p'}
	<p>
		<AllElements elements={element.i} />
	</p>
{:else if element.t === 'h'}
	<HeadingElement {element}>
		<AllElements elements={element.i} />
	</HeadingElement>
{:else if element.t === '§'}
	{#if element.f === 'b'}
		<b>
			<AllElements elements={element.i} />
		</b>
	{:else if element.f === 'i'}
		<i>
			<AllElements elements={element.i} />
		</i>
	{:else if element.f === 'u'}
		<u>
			<AllElements elements={element.i} />
		</u>
	{:else if element.f === 'd'}
		<del>
			<AllElements elements={element.i} />
		</del>
	{/if}
{:else if element.t === '@'}
	<PictureRender data={element.d} alt={element.a} />
{:else if element.t === '*'}
	<PictureNotFound />
{:else if element.t === '>'}
	<CodeHooksElement inline={element.i} code={element.c} language={element.l} />
{:else if element.t === 'a'}
	<a class="link link-primary" href={element.l}>
		<AllElements elements={element.i} />
	</a>
{:else if element.t === 'l'}
	<ul>
		<AllElements elements={element.i} />
	</ul>
{:else if element.t === '-'}
	<li class="list-item">
		<AllElements elements={element.i} />
	</li>
{:else}
	<div class="skeleton h-32 w-full grid place-items-center">
		<span class="text-error animate-spin"><ShellIcon /></span>
	</div>
{/if}
