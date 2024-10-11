import './pictures';
import type { BlogArticle } from '$lib/schema/blog-article';
import { z } from 'zod';
import { parse_article } from '$lib/server/article';
import { BlogArticleMeta } from '$lib/schema/blog-article-meta';

//articles are stored in /blog/ folder
//they can have subfolders for time
//dates can be in the format yyyy-mm-dd or yyyy/mm/dd
//  each part of the date can be a folder or a part of the directory name or filename
//  the date always needs to have the more significant parts the less significant parts are optional
//  day requires month, month requires year

//examples:
// /blog/simple-article.md
// /blog/2022-01-01/article.md
// /blog/2022/01/01/article.md
// /blog/2022-01-01-article.md
// /blog/2022/01-01-article.md
// /blog/2022-01-01/article/index.md
// /blog/2022/01/01/arbirary-folder-name/article.md
// /blog/2022-01-01/arbirary-folder-name/article/index.md
// /blog/2022/01/arbirary-folder-name/01/article.md
const post_imports = import.meta.glob('/blog/**/*.md', {
	eager: false,
	exhaustive: false,
	import: 'default',
	query: '?raw'
});

const ARTICLE_DATA_EXTRACT_PATTERN =
	/^\/blog\/(?:(?<year>\d{4})[-/](?:(?<month>[0-1]?\d)[-/](?:(?<day>[0-3]?\d)[-/])?)?)?(?:.+\/)?(?<slug>[a-zA-Z0-9][^/]*).md/;

export type PostPathData = {
	year?: number;
	month?: number;
	day?: number;
	slug: string;
};

function load_pathed_data(): Record<string, PostPathData> {
	const extracted_data: Record<string, PostPathData> = {};
	for (const path in post_imports) {
		const timing_key = `[Posts] path: ${path}`;
		console.time(timing_key);
		try {
			const maybe_match = path.match(ARTICLE_DATA_EXTRACT_PATTERN);
			if (maybe_match && maybe_match.groups?.slug) {
				//console.log('[Posts] match:', maybe_match);
				const data = {
					year: maybe_match.groups?.year ? parseInt(maybe_match.groups.year) : undefined,
					month: maybe_match.groups?.month ? parseInt(maybe_match.groups.month) : undefined,
					day: maybe_match.groups?.day ? parseInt(maybe_match.groups.day) : undefined,
					slug: maybe_match.groups?.slug
				} satisfies PostPathData;

				console.log('[Posts] path:', path, '->', data);
				extracted_data[path] = data;
			} else if (path.endsWith('.md')) {
				console.warn('[Posts] no match:', path);
			}
		} finally {
			console.timeEnd(timing_key);
		}
	}
	return extracted_data;
}

async function load_posts(): Promise<Record<string, BlogArticle>> {
	const data = load_pathed_data();
	const promises: Promise<undefined | [string, BlogArticle]>[] = [];
	for (const [path, path_data] of Object.entries(data)) {
		const parse_promise = (async () => {
			const timing_key = `[Posts] parse: ${path}`;
			console.time(timing_key);
			try {
				const post_txt_markdown_unsafe = await post_imports[path]();
				const post_txt_markdown = await z.string().parseAsync(post_txt_markdown_unsafe);
				const article = await parse_article(path, post_txt_markdown, path_data);
				return [article.meta.slug, article] satisfies [string, BlogArticle];
			} catch (e) {
				console.error('[Posts] error:', path, e);
				return undefined;
			} finally {
				console.timeEnd(timing_key);
			}
		})();
		promises.push(parse_promise);
	}
	const entries = await Promise.all(promises);
	//to records
	return Object.fromEntries(
		entries.filter((entry): entry is [string, BlogArticle] => entry !== undefined)
	);
}

const loaded_posts_promise = load_posts();

export async function all_slugs(): Promise<string[]> {
	return Object.keys(await loaded_posts_promise);
}

export async function articles_preview(): Promise<BlogArticleMeta[]> {
	return Object.values(await loaded_posts_promise).map((article) => article.meta);
}

export async function all_articles(): Promise<[string, BlogArticle][]> {
	return Object.entries(await loaded_posts_promise);
}

export async function blog_post(slug: string): Promise<BlogArticle | undefined> {
	return (await loaded_posts_promise)[slug];
}
