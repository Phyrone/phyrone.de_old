import adapter_static from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const preCompress = process.env.BUILD_PRECOMPRESS !== 'false';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [vitePreprocess()],
	compilerOptions: {
		immutable: true
	},
	kit: {
		paths: {
			relative: false
		},
		embedded: false,
		adapter: adapter_static({
			precompress: preCompress,
			strict: true,
			fallback: '404.html'
		}),
		alias: {
			$lib: './src/lib',
			$assets: './src/assets'
		}
		/*adapter: adapter_cloudflare({
			fallback: 'spa'
		})*/
	}
};

export default config;
