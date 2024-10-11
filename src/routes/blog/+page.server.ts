import type { PageServerLoad } from './$types';
import { BlogServerData } from './schema';
import { articles_preview } from '$lib/server/posts';

export const load: PageServerLoad = async () => {
	return await BlogServerData.parseAsync({
		articles: await articles_preview()
	} satisfies BlogServerData);
};
