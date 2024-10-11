<script lang="ts">
	import 'highlight.js/scss/github-dark.scss';
	import '@fontsource-variable/jetbrains-mono/wght.css';
	import hljs, { type HighlightResult, type AutoHighlightResult } from 'highlight.js';

	export let language: string | undefined;
	export let code: string;
	export let inline: boolean;

	let highlight: HighlightResult | AutoHighlightResult;
	$: {
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
	}
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
		<pre class:jb-mono-font={!inline}>{@html highlight.value}</pre>
	{/if}
</code>

<style>
	.jb-mono-font {
		font-family: 'JetBrains Mono Variable', monospace;
		font-variant-ligatures: normal;
	}
</style>
