<script lang="ts">
	import type { HeadingElement } from '$lib/schema/blog-article';

	export let element: HeadingElement;
</script>

{#if element.l === 1}
	<h1 class="group text-6xl" id={element.a}>
		<slot />
		<a
			class="invisible opacity-50 hover:underline hover:underline-offset-2 group-hover:visible"
			href="#{element.a}"
		>
			#</a
		>
	</h1>
{:else if element.l === 2}
	<h2 class="group text-5xl" id={element.a}>
		<slot />
		<a
			class="invisible opacity-50 hover:underline hover:underline-offset-2 group-hover:visible"
			href="#{element.a}"
		>
			#</a
		>
	</h2>
{:else if element.l === 3}
	<h3 class="group text-4xl" id={element.a}>
		<slot />
		<a
			class="invisible opacity-50 hover:underline hover:underline-offset-2 group-hover:visible"
			href="#{element.a}"
		>
			#</a
		>
	</h3>
{:else if element.l === 4}
	<h4 class="group text-3xl" id={element.a}>
		<slot />
		<a
			class="invisible opacity-50 hover:underline hover:underline-offset-2 group-hover:visible"
			href="#{element.a}"
		>
			#</a
		>
	</h4>
{:else if element.l === 5}
	<h5 class="group text-2xl" id={element.a}>
		<slot />
		<a
			class="invisible opacity-50 hover:underline hover:underline-offset-2 group-hover:visible"
			href="#{element.a}"
		>
			#</a
		>
	</h5>
{:else if element.l === 6}
	<h6 class="group text-xl" id={element.a}>
		<slot />
		<a
			class="invisible opacity-50 hover:underline hover:underline-offset-2 group-hover:visible"
			href="#{element.a}"
		>
			#</a
		>
	</h6>
{/if}
