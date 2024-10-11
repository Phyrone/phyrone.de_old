import remarkDirective from 'remark-directive';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkEmoji from 'remark-emoji';
import remarkParse from 'remark-parse';
import remarkHeadingId from 'remark-heading-id';
import { unified } from 'unified';
import YAML from 'yaml';
import type { Image, Paragraph, Parent, Root } from 'mdast';

import {
	ArticleElement,
	BlogArticle,
	type FormatText,
	type CodeElement,
	type HeadingElement,
	type LinkElement,
	type ParagraphElement,
	type ParentElement,
	type PictureElement,
	type RawHtmlElement,
	type UnkownElement,
	type ListElement,
	type ListItemElement,
	type PictureNotFountElement
} from '$lib/schema/blog-article';
import type { PostPathData } from '$lib/server/posts';
import { removePosition } from 'unist-util-remove-position';
import { FrontmatterData } from '$lib/schema/frontmatter-data';
import { z } from 'zod';
import { picture_data } from '$lib/server/pictures';

const mdProcessor = unified()
	.use(remarkParse)
	.use(remarkDirective)
	.use(remarkFrontmatter)
	.use(remarkGfm)
	.use(remarkEmoji)
	.use(remarkMath)
	.use(remarkHeadingId, { defaults: true, uniqueDefaults: true });

async function apply_frontmatter(text: string, source: string, article: BlogArticle) {
	const parsed = YAML.parse(text);
	const frontmatter = await FrontmatterData.parseAsync(parsed);
	if (frontmatter.title) {
		article.meta.title = frontmatter.title;
	}
	if (frontmatter.thumbnail) {
		article.meta.thumbnail = await picture_data(frontmatter.thumbnail, source);
	}
}

async function parse_image_element(
	source: string,
	content: Image
): Promise<PictureElement | PictureNotFountElement> {
	const data = await picture_data(content.url, source);
	if (data)
		return {
			t: '@',
			a: content.alt || content.type,
			d: data
		} satisfies PictureElement;
	return {
		t: '*'
	} satisfies PictureNotFountElement;
}

async function transform_node(
	source: string,
	article: BlogArticle,
	parent: ParentElement,
	content: Parent
): Promise<ArticleElement[]> {
	const elements: (Promise<ArticleElement | unknown> | ArticleElement)[] = [];
	for (const element of content.children) {
		switch (element.type) {
			case 'yaml':
				if (element.value.length > 0) await apply_frontmatter(element.value, source, article);
				break;
			case 'paragraph':
				elements.push(
					(async () => {
						const paragraph = {
							t: 'p',
							i: [] as (ArticleElement | string)[]
						} satisfies ParagraphElement;
						paragraph.i = await transform_node(source, article, paragraph, element as Paragraph);
						return paragraph;
					})()
				);
				break;
			case 'html':
				elements.push({
					t: '!',
					v: element.value
				} satisfies RawHtmlElement);
				break;

			case 'strong':
			case 'delete':
			case 'emphasis':
				elements.push(
					(async () => {
						let format: 'b' | 'd' | 'i';
						switch (element.type) {
							case 'strong':
								format = 'b';
								break;
							case 'delete':
								format = 'd';
								break;
							case 'emphasis':
								format = 'i';
								break;
						}
						const bold = {
							t: '§',
							f: format,
							i: [] as (ArticleElement | string)[]
						} satisfies FormatText;
						bold.i = await transform_node(source, article, bold, element);
						return bold;
					})()
				);
				break;
			case 'code':
				elements.push({
					t: '>',
					l: element.lang ?? undefined,
					i: false,
					c: element.value
				} satisfies CodeElement);
				break;
			case 'inlineCode':
				elements.push({
					t: '>',
					l: undefined,
					i: true,
					c: element.value
				} satisfies CodeElement);
				break;

			case 'heading':
				elements.push(
					(async () => {
						const heading = {
							t: 'h',
							l: element.depth,
							a: (element.data as { id: string })?.id,
							i: [] as (ArticleElement | string)[]
						} satisfies HeadingElement;
						heading.i = await transform_node(source, article, heading, element);
						return heading;
					})()
				);
				break;
			case 'link':
				elements.push(
					(async () => {
						const link = {
							t: 'a',
							l: element.url,
							i: [] as (ArticleElement | string)[]
						} satisfies LinkElement;
						link.i = await transform_node(source, article, link, element);
						return link;
					})()
				);
				break;
			case 'text':
				elements.push(element.value);
				break;
			case 'image':
				elements.push(parse_image_element(source, element));
				break;
			case 'list':
			case 'listItem':
				elements.push(
					(async () => {
						const list = {
							t: element.type === 'list' ? 'l' : '-',
							i: [] as (ArticleElement | string)[]
						} satisfies ListElement | ListItemElement;
						list.i = await transform_node(source, article, list, element);
						return list;
					})()
				);
				break;

			default:
				elements.push({
					t: '?',
					v: element
				} satisfies UnkownElement);
				break;
		}
	}
	//await all and filter out undefined
	return Promise.all(elements)
		.then((elements) => elements.filter((e) => e !== undefined))
		.then((elements) => elements as ArticleElement[]);
}

function try_extract_date(path_data: PostPathData): Date | undefined {
	const MonthConstraint = z.number().int().min(1).max(12);
	const DayConstraint = z.number().int().min(1).max(31);
	if (path_data.year) {
		return new Date(
			Date.UTC(
				path_data.year,
				path_data.month ? MonthConstraint.parse(path_data.month) - 1 : 0,
				path_data.day ? DayConstraint.parse(path_data.day) : 1
			)
		);
	}
	return undefined;
}

export async function parse_article(
	source: string,
	content: string,
	path_data: PostPathData
): Promise<BlogArticle> {
	const parsed1 = mdProcessor.parse(content);
	const parsed = (await mdProcessor.run(parsed1)) as Root;
	removePosition(parsed);

	const article = {
		meta: {
			slug: path_data.slug,
			title: path_data.slug,
			date: try_extract_date(path_data)
		},
		i: [] as ArticleElement[]
	} satisfies BlogArticle;

	article.i = await transform_node(source, article, article, parsed);

	return article;
}
