<script lang="ts">
	import { blurhashToCssGradientString } from '@unpic/placeholder';

	import type { PictureData } from '$lib/schema/picture-data';

	export let alt: string | undefined;
	export let data: PictureData;
	const bg = `background: ${blurhashToCssGradientString(data.b)};`;
</script>

<picture class="w-full">
	<source srcset={data.i.a} />
	<source srcset={data.i.w} />
	<source srcset={data.i.j} />
	<source srcset={data.i.p} />
	<img loading="lazy" style={bg} src={data.s} {alt} width={data.w} height={data.h} />
</picture>
