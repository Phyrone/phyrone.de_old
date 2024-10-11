import { sveltekit } from '@sveltejs/kit/vite';
import { imagetools } from 'vite-imagetools';
import blurhash_plugin from './vite-blurhash';
//import legacy from '@vitejs/plugin-legacy';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit(),
		blurhash_plugin(),
		imagetools({
			cache: {
				enabled: true,
			},
			removeMetadata: true
		})
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
