import type { PageLoad } from './$types';
import { BlogServerData } from './schema';

export const load: PageLoad = async ({ data }) => {
	const server_data = await BlogServerData.parseAsync(data);

	return {
		articles: server_data.articles
	};
};
