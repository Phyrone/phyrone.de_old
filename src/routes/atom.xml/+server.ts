import type { RequestHandler } from './$types';
import { text } from '@sveltejs/kit';
import { create_feed } from '$lib/server/feed_utils';
import { minify } from 'minify-xml';

export const trailingSlash = 'never';
export const prerender = true;

export const GET: RequestHandler = async ({ fetch }) => {
	const feed = await create_feed(fetch);

	const feed_xml = feed.atom1();
	const feed_xml_minified = minify(feed_xml);
	return text(feed_xml_minified, {
		headers: {
			'Content-Type': 'application/atom+xml'
		}
	});
};
