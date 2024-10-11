<script lang="ts">

	import CodeElement from './CodeElement.svelte';
	import MermaidGraphElement from './MermaidGraphElement.svelte';

	export let language: string | undefined;
	export let code: string;
	export let inline: boolean;

</script>


{#if (inline)}
	<CodeElement {inline} {code} {language} />
{:else if (language === 'mermaid')}
	<MermaidGraphElement {code} />
{:else}
	<CodeElement {inline} {code} {language} />
{/if}