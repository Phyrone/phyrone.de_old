import { z } from 'zod';
import { BlogArticleMeta } from '$lib/schema/blog-article-meta';
import { PictureData } from '$lib/schema/picture-data';

export const ElementBase = z.object({
	t: z.string()
});

export const ParentElement = z.object({
	i: z.array(
		z.lazy<any>(() => ArticleElement),
		{
			description: 'Array of child elements',
			message: 'Invalid child element'
		}
	)
});
export type ParentElement = z.infer<typeof ParentElement>;

export const ParagraphElement = ParentElement.extend({
	t: z.literal('p')
});
export type ParagraphElement = z.infer<typeof ParagraphElement>;

export const HeadingElement = ParentElement.extend({
	t: z.literal('h'),
	a: z.string().optional(),
	l: z.number().min(1).max(6)
});
export type HeadingElement = z.infer<typeof HeadingElement>;

export const FormatText = ParentElement.extend({
	t: z.literal('§'),
	f: z.union([z.literal('b'), z.literal('u'), z.literal('d'), z.literal('i')])
});
export type FormatText = z.infer<typeof FormatText>;

export const CodeElement = z.object({
	t: z.literal('>'),
	l: z.string().optional(),
	i: z.boolean(),
	c: z.string()
});
export type CodeElement = z.infer<typeof CodeElement>;

export const RawHtmlElement = z.object({
	t: z.literal('!'),
	v: z.string()
});
export type RawHtmlElement = z.infer<typeof RawHtmlElement>;

export const PictureElement = z.object({
	t: z.literal('@'),
	a: z.string().optional(),
	d: PictureData
});
export type PictureElement = z.infer<typeof PictureElement>;

export const PictureNotFountElement = z.object({
	t: z.literal('*'),
});
export type PictureNotFountElement = z.infer<typeof PictureNotFountElement>;

export const LinkElement = ParentElement.extend({
	t: z.literal('a'),
	l: z.string()
});
export type LinkElement = z.infer<typeof LinkElement>;

export const ListElement = ParentElement.extend({
	t: z.literal('l')
});
export type ListElement = z.infer<typeof ListElement>;

export const ListItemElement = ParentElement.extend({
	t: z.literal('-')
});
export type ListItemElement = z.infer<typeof ArticleElement>;

export const UnkownElement = ElementBase.extend({
	t: z.literal('?'),
	v: z.unknown()
});
export type UnkownElement = z.infer<typeof UnkownElement>;

export const ArticleElement = z
	.discriminatedUnion('t', [
		ParagraphElement,
		HeadingElement,
		FormatText,
		PictureElement,
		PictureNotFountElement,
		CodeElement,
		RawHtmlElement,
		LinkElement,
		ListElement,
		ListItemElement,
		UnkownElement
	])
	.and(ElementBase)
	.or(z.string());

export type ArticleElement = z.infer<typeof ArticleElement>;

export const BlogArticle = ParentElement.extend({
	meta: BlogArticleMeta,
	i: z.array(ArticleElement)
});

export type BlogArticle = z.infer<typeof BlogArticle>;
