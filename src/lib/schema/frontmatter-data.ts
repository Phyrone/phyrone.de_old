import { z } from 'zod';

export const FrontmatterData = z.object({
	title: z.string().optional(),
	thumbnail: z.string().optional()
});

export type FrontmatterData = z.infer<typeof FrontmatterData>;
