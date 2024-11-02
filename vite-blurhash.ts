import type { Plugin } from 'vite';
import qs from 'qs';
import { z } from 'zod';
import { encode } from 'blurhash';
import sharp from 'sharp';
import persistent_cache from 'persistent-cache';
import { createHash } from 'crypto';

const cache = persistent_cache({
	memory: true,
	persist: true,
	base: './node_modules/.cache',
	name: 'blurhash-loader',
	duration: undefined
});

async function get_cached(file_hash: string): Promise<string | undefined> {
	return new Promise((resolve, reject) => {
		cache.get(file_hash, (err, data) => {
			if (err) reject(err);
			else resolve(data);
		});
	});
}

async function put_cached(file_hash: string, data: string): Promise<void> {
	return new Promise((resolve, reject) => {
		cache.put(file_hash, data, (err) => {
			if (err) reject(err);
			else resolve();
		});
	});
}

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
						.resize({
							withoutEnlargement: true,
							width: 800
						})
						.toBuffer({ resolveWithObject: true });
					const file_hash = createHash('sha256').update(data).digest('hex');
					const cached = await get_cached(file_hash);
					if (cached) {
						return `export default ${JSON.stringify(cached)}`;
					}
					const blurhash = encode(
						new Uint8ClampedArray(data),
						info.width,
						info.height,
						query.w || 6,
						query.h || 4
					);
					await put_cached(file_hash, blurhash);
					return `export default ${JSON.stringify(blurhash)}`;
				}
			} catch (e) {
				console.error('[Blurhash Loader]', 'id=', id, e);
			}
			return null;
		}
	} satisfies Plugin;
}
