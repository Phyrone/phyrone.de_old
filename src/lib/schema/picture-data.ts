import { z } from 'zod';

export const PictureData = z.object({
	//blurhash
	b: z.string(),
	//width
	w: z.number().int().positive(),
	//height
	h: z.number().int().positive(),
	//src
	s: z.string(),
	//src sets
	i: z.object({
		//png
		p: z.string(),
		//jpeg
		j: z.string(),
		//webp
		w: z.string(),
		//avif
		a: z.string()
	})
});
export type PictureData = z.infer<typeof PictureData>;
