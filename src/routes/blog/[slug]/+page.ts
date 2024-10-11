import type { PageLoad, PageData } from './$types';
import { BlogArticleServerData } from './schema';

export const load: PageLoad = async ({ data, params: { slug } }) => {
	const server_data = await BlogArticleServerData.parseAsync(data);

	return {
		props: {
			slug
		},
		article: server_data.article
	} satisfies PageData;
};
