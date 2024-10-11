import { z } from 'zod';
import { BlogArticle } from '$lib/schema/blog-article';

export const BlogArticleServerData = z.object({
	article: BlogArticle
});

export type BlogArticleServerData = z.infer<typeof BlogArticleServerData>;
