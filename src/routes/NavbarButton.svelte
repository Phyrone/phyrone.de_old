<script lang="ts">
	export let href: string;
</script>

<a class="join-item btn btn-sm btn-ghost rounded-sm" {href}>
	<slot />
	<!-- TODO maybe support retracting text -->
	<slot name="expanded" />
</a>
