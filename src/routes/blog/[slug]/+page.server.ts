import type { PageServerLoad } from './$types';
import { blog_post } from '$lib/server/posts';
import { error } from '@sveltejs/kit';
import type { BlogArticleServerData } from './schema';

export const load: PageServerLoad = async ({ params: { slug } }) => {
	const post = await blog_post(slug);
	if (post) {
		return {
			article: post
		} satisfies BlogArticleServerData;
	} else {
		return error(404, 'Post not found');
	}
};
