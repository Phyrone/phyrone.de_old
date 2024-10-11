import { z } from 'zod';
import { BlogArticleMeta } from '$lib/schema/blog-article-meta';

export const BlogServerData = z.object({
	articles: z.array(BlogArticleMeta)
});

export type BlogServerData = z.infer<typeof BlogServerData>;
