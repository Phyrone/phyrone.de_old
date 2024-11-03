import type { RequestHandler } from './$types';
import { text } from '@sveltejs/kit';
import { create_feed } from '$lib/server/feed_utils';

export const trailingSlash = 'never';
export const prerender = true;

export const GET: RequestHandler = async ({ fetch }) => {
	const feed = await create_feed(fetch);

	const feed_json = feed.json1();
	const feed_json_minified = JSON.stringify(JSON.parse(feed_json));
	return text(feed_json_minified, {
		headers: {
			'Content-Type': 'application/feed+json'
		}
	});
};
