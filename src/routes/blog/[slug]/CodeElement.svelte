<script lang="ts">
	import { run } from 'svelte/legacy';

	import 'highlight.js/scss/github-dark.scss';
	import '@fontsource-variable/jetbrains-mono/wght.css';
	import hljs, { type HighlightResult, type AutoHighlightResult } from 'highlight.js';

	interface Props {
		language: string | undefined;
		code: string;
		inline: boolean;
	}

	let { language, code, inline }: Props = $props();

	let highlight: HighlightResult | AutoHighlightResult = $state();
	run(() => {
		try {
			if (language) {
				highlight = hljs.highlight(code, { language, ignoreIllegals: true });
			} else {
				highlight = hljs.highlightAuto(code);
			}
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (_e) {
			highlight = hljs.highlightAuto(code);
		}
	});
</script>

<code
	class=""
	data-code-lang={highlight.language}
	data-code-illegal={highlight.illegal}
	data-code-relevance={highlight.relevance}
	class:jb-mono-font={inline}
>
	{#if inline}
		{@html highlight.value}
	{:else}
		<pre class="overflow-x-auto w-full"
			class:jb-mono-font={!inline}>{@html highlight.value}</pre>
	{/if}
</code>

<style>
	.jb-mono-font {
		font-family: 'JetBrains Mono Variable', monospace;
		font-variant-ligatures: normal;
	}
</style>
