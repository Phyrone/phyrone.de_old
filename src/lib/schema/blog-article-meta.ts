import { z } from 'zod';
import { PictureData } from '$lib/schema/picture-data';

export const BlogArticleMeta = z.object({
	slug: z.string(),
	title: z.string(),
	date: z.date().optional(),
	thumbnail: PictureData.optional()
});

export type BlogArticleMeta = z.infer<typeof BlogArticleMeta>;
