import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { minify as minify_html } from '@swc/html';
import { dev } from '$app/environment';
import { appendFile } from 'fs/promises';

export const minify_html_handler: Handle = async ({ event, resolve }) => {
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
				collapseWhitespaces: 'all',
				normalizeAttributes: true,
				selfClosingVoidElements: true,
				forceSetHtml5Doctype: true,
				minifyJs: true,
				minifyCss: true,
				minifyJson: true,
				quotes: false
			});
			if (errors && errors.length > 0) {
				console.error('Error minifying html', errors);
				if (!dev) {
					await appendFile(
						'minify_html_errors.log',
						'Error minifying html: ' +
							event.url.pathname +
							'\n' +
							'Errors: \n' +
							errors.map((e) => JSON.stringify(e)).join('\n') +
							+'\n\n Html: \n' +
							buffer +
							'\n\n'
					);
					throw new Error('Error minifying html');
				} else return buffer;
			} else return code;
		}
	});
};

export const handle: Handle = sequence(minify_html_handler);
