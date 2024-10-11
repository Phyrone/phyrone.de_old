import type { PictureData } from '$lib/schema/picture-data';
import { z } from 'zod';

export const images = import.meta.glob('/{src,blog}/**/*.{heif,avif,jpeg,jpg,png,tiff,webp,gif}', {
	eager: false,
	import: 'default',
	query: '?url'
});

export const images_metadata = import.meta.glob(
	'/{src,blog}/**/*.{heif,avif,jpeg,jpg,png,tiff,webp,gif}',
	{
		eager: false,
		import: 'default',
		query: '?as=meta:height;width'
	}
);

export const image_blurhashs = import.meta.glob(
	'/{src,blog}/**/*.{heif,avif,jpeg,jpg,png,tiff,webp,gif}',
	{
		eager: false,
		import: 'default',
		query: '?blurhash'
	}
);

export const images_png = import.meta.glob(
	'/{src,blog}/**/*.{heif,avif,jpeg,jpg,png,tiff,webp,gif}',
	{
		eager: false,
		import: 'default',
		query: '?format=png&w=128;320;640;1200&withoutEnlargement&effort=max&as=srcset'
	}
);

export const images_jpeg = import.meta.glob(
	'/{src,blog}/**/*.{heif,avif,jpeg,jpg,png,tiff,webp,gif}',
	{
		eager: false,
		import: 'default',
		query: '?format=jpeg&w=128;320;640;1200&withoutEnlargement&effort=max&as=srcset'
	}
);

export const images_webp = import.meta.glob(
	'/{src,blog}/**/*.{heif,avif,jpeg,jpg,png,tiff,webp,gif}',
	{
		eager: false,
		import: 'default',
		query: '?format=webp&w=128;320;640;1200&withoutEnlargement&effort=max&as=srcset'
	}
);

export const images_avif = import.meta.glob(
	'/{src,blog}/**/*.{heif,avif,jpeg,jpg,png,tiff,webp,gif}',
	{
		eager: false,
		import: 'default',
		query: '?format=avif&w=128;320;640;1200&withoutEnlargement&effort=max&as=srcset'
	}
);

export async function picture_data(
	path: string,
	//work dir where the image got referenced or undefined for absolute
	relative_to?: string
): Promise<PictureData | undefined> {
	const full_path = relative_to ? new URL(path, 'file://' + relative_to).pathname : path;
	const TIME_KEY = '[Pictures] Loading ' + full_path;
	console.time(TIME_KEY);
	try {
		const [load_orig, load_metadata, load_blurhash, load_jpeg, load_png, load_webp, load_avif] = [
			images[full_path],
			images_metadata[full_path],
			image_blurhashs[full_path],
			images_jpeg[full_path],
			images_png[full_path],
			images_webp[full_path],
			images_avif[full_path]
		];
		if (
			!load_jpeg ||
			!load_png ||
			!load_webp ||
			!load_avif ||
			!load_orig ||
			!load_blurhash ||
			!load_metadata
		) {
			return undefined;
		}
		const [orig, { width, height }, blurhash, jpg, png, webp, avif] = await Promise.all([
			load_orig().then((data) => z.string().parseAsync(data)),
			load_metadata().then((data) =>
				z
					.object({
						width: z.number().int().positive(),
						height: z.number().int().positive()
					})
					.parseAsync(data)
			),
			load_blurhash().then((data) => z.string().parseAsync(data)),
			load_jpeg().then((data) => z.string().parseAsync(data)),
			load_png().then((data) => z.string().parseAsync(data)),
			load_webp().then((data) => z.string().parseAsync(data)),
			load_avif().then((data) => z.string().parseAsync(data))
		]);

		return {
			b: blurhash,
			w: width,
			h: height,
			s: orig,
			i: {
				j: jpg,
				p: png,
				w: webp,
				a: avif
			}
		} satisfies PictureData;
	} finally {
		console.timeEnd(TIME_KEY);
	}
}
