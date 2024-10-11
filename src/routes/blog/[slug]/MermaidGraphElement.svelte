<script lang="ts">


	import { mermaid_init } from '$lib/get_mermaid';
	import { building } from '$app/environment';

	export let code: string;

	function init(element: HTMLElement) {
		if (building) return;
		(async () => {
			const mermaid = await mermaid_init;
			await mermaid.run({
				nodes: [element]
			});

		})();
	}

</script>

<pre use:init>
	{code}
</pre>