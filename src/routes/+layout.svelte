<script lang="ts">
	import '../app.css';
	import Navbar from './Navbar.svelte';
	import FooterBar from './FooterBar.svelte';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
	//import { navigating } from '$app/stores';
</script>

<div class="flex flex-col mx-auto max-w-screen-lg bg-base-100 min-h-screen shadow-sm">
	<Navbar />
	<main class="flex-auto px-1 py-2">
		{@render children?.()}
	</main>
	<!-- TODO footer -->
	<FooterBar />
</div>
