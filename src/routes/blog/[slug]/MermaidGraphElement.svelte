<script lang="ts">
	import { building } from '$app/environment';

	interface Props {
		code: string;
	}

	let { code }: Props = $props();

	function init(element: HTMLElement) {
		if (building) return;
		(async () => {
			const mermaid = await import('mermaid')
				.then((module) => module.default);
			await mermaid.run({
				nodes: [element]
			});
		})();
	}
</script>

<pre use:init>
	{code}
</pre>
