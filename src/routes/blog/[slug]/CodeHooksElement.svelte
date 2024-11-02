<script lang="ts">
	import CodeElement from './CodeElement.svelte';
	import MermaidGraphElement from './MermaidGraphElement.svelte';

	interface Props {
		language: string | undefined;
		code: string;
		inline: boolean;
	}

	let { language, code, inline }: Props = $props();
</script>

{#if inline}
	<CodeElement {inline} {code} {language} />
{:else if language === 'mermaid'}
	<MermaidGraphElement {code} />
{:else}
	<CodeElement {inline} {code} {language} />
{/if}
