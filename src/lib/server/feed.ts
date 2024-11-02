/*
import { Feed, type Item as FeedItem } from 'feed';
import { all_articles } from './posts';

export type FetchFunction = typeof fetch;

const date_zero = new Date(0);
const updated = new Date();

const BASE_URL = 'https://www.phyrone.de';

export async function create_feed(fetch: FetchFunction): Promise<Feed> {
	const feed = new Feed({
		id: 'www.phyrone.de',
		title: 'Phyrones Blog',
		copyright: 'All rights reserved ' + updated.getUTCFullYear() + ', Phyrone',
		updated,
		generator: 'https://github.com/jpmonette/feed',
		link: BASE_URL + '/blog/',
		author: {
			name: 'Phyrone',
			email: 'phyrone@phyrone.de',
			link: 'https://www.phyrone.de'
		}
	});
	const articles = await all_articles();
	for (const [slug, article] of articles) {
		const item: FeedItem = {
			link: 'https://www.phyrone.de/blog/' + slug,
			id: slug,
			title: article.meta.title,
			date: article.meta.date ?? date_zero
		} satisfies FeedItem;
		if (article.meta.thumbnail)
			item.image = {
				url: BASE_URL + article.meta.thumbnail.s,
				length: undefined
			};

		feed.addItem(item);
	}

	return feed;
}
*/
