// src/routes/blog/[slug]/+page.server.ts
import { readFile } from 'fs/promises';
import { join } from 'path';
import { error } from '@sveltejs/kit';

type Frontmatter = {
	[key: string]: string;
};

export async function load({ params }) {
	try {
		const filePath = join(process.cwd(), 'src/routes/blog', `${params.slug}.md`);
		let content = await readFile(filePath, 'utf-8');

		// Clean content
		content = content
			.replace(/^\uFEFF/, '')
			.replace(/\r\n/g, '\n')
			.trim();
		const lines = content.split('\n');

		// Parse frontmatter with proper typing
		const meta: Frontmatter = {};
		let contentStart = 0;

		if (lines[0].trim() === '---') {
			for (let i = 1; i < lines.length; i++) {
				const line = lines[i].trim();
				if (line === '---') {
					contentStart = i + 1;
					break;
				}
				if (!line) continue;

				const colonIndex = line.indexOf(':');
				if (colonIndex > 0) {
					const key = line.substring(0, colonIndex).trim();
					const value = line.substring(colonIndex + 1).trim();
					if (key && value) {
						meta[key] = value;
					}
				}
			}
		}

		return {
			post: {
				slug: params.slug,
				title: meta.title || 'Untitled',
				date: meta.date || '',
				readTime: meta.readTime || '',
				excerpt: meta.excerpt || '',
				content: lines.slice(contentStart).join('\n').trim()
			}
		};
	} catch (err) {
		throw error(404, 'Post not found');
	}
}
