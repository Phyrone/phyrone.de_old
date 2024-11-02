import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { minify as minify_html } from '@swc/html';
import { dev } from '$app/environment';

export const minify_html_handler: Handle = async ({ event, resolve }) => {
	if (dev) return resolve(event);
	else {
		console.log('[Minify Html] Minify:', event.request.url);
		let buffer = '';
		return resolve(event, {
			preload(): boolean {
				return true;
			},
			async transformPageChunk({
				html,
				done
			}: {
				html: string;
				done: boolean;
			}): Promise<string | undefined> {
				buffer += html;
				if (!done) return '';
				const { code, errors } = await minify_html(buffer, {
					removeComments: !dev,
					collapseWhitespaces: 'conservative',
					normalizeAttributes: true,
					selfClosingVoidElements: true,
					forceSetHtml5Doctype: true,
					minifyJs: true,
					minifyCss: true,
					minifyJson: true,
					quotes: false,
					filename: event.request.url
				});
				if (errors && errors.length > 0) {
					console.error('Error minifying html', errors);
					throw new Error('Error minifying html');
				} else return code;
			}
		});
	}
};

export const handle: Handle = sequence(minify_html_handler);
