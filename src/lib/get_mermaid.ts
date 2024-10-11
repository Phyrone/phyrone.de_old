import type { Mermaid } from 'mermaid';

async function get_mermaid(): Promise<Mermaid> {
	const mermaid = await import('mermaid').then((module) => module.default);

	return mermaid;
}

export const mermaid_init = get_mermaid();
