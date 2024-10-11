<script>
	import { Icon } from 'lucide-svelte';

	/**
	 * @type {import('simple-icons').SimpleIcon}
	 */
	export let icon;

	const iconNode = [['path', { d: icon.path }]];
</script>

<Icon name={icon.slug} {...$$props} {iconNode} />
