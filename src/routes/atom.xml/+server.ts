/*
import type { RequestHandler } from './$types';
import { text } from '@sveltejs/kit';
import { create_feed } from '$lib/server/feed';
export const trailingSlash = 'never';
export const prerender = true;

export const GET: RequestHandler = async ({ fetch }) => {
	const feed = await create_feed(fetch);

	return text(feed.atom1(), {
		headers: {
			'Content-Type': 'application/atom+xml'
		}
	});
};
*/
