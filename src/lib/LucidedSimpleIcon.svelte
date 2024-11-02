<script>
	import { Icon } from 'lucide-svelte';

	/**
	 * @typedef {Object} Props
	 * @property {import('simple-icons').SimpleIcon} icon
	 */

	/** @type {Props & { [key: string]: any }} */
	let { ...props } = $props();

	const iconNode = [['path', { d: props.icon.path }]];
</script>

<Icon name={props.icon.slug} {...props} {iconNode} />
