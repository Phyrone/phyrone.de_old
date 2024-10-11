import type { Plugin } from 'vite';
import qs from 'qs';
import { z } from 'zod';
import { encode } from 'blurhash';
import sharp from 'sharp';

const QueryPrams = z.object({
	blurhash: z.literal('').or(z.literal(true)),
	w: z.number().int().positive().optional(),
	h: z.number().int().positive().optional()
});

export const PRE_TEST = /\.(png|jpe?g|gif|webp|avif|svg)\?.+$/i;

export default function () {
	return {
		name: 'blurhash',
		enforce: 'pre',
		async load(id) {
			if (!PRE_TEST.test(id)) return null;
			try {
				const query_unchecked = qs.parse(id.split('?')[1]);
				const path = id.split('?')[0];
				const query_check_result = await QueryPrams.safeParseAsync(query_unchecked);
				if (query_check_result.success && query_check_result.data) {
					const query = query_check_result.data;
					const { data, info } = await sharp(path)
						.raw()
						.ensureAlpha()
						.toBuffer({ resolveWithObject: true });

					const blurhash = encode(
						new Uint8ClampedArray(data),
						info.width,
						info.height,
						query.w || 6,
						query.h || 4
					);

					return `export default ${JSON.stringify(blurhash)}`;
				}
			} catch (e) {
				console.error('[Blurhash Loader]', 'id=', id, e);
			}
			return null;
		}
	} satisfies Plugin;
}
