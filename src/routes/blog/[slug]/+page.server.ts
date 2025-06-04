import { readFile } from 'fs/promises';
import { join } from 'path';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const { slug } = params;

	try {
		const filePath = join(process.cwd(), 'static/blog/posts', `${slug}.md`);
		let content = await readFile(filePath, 'utf-8');

		content = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

		// Parse frontmatter with regex for better reliability
		const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
		const match = content.match(frontmatterRegex);

		let meta: Record<string, string> = {};
		let markdownContent = content;

		if (match) {
			const [, frontmatter, markdown] = match;

			// Parse YAML-like frontmatter
			frontmatter.split('\n').forEach((line) => {
				const colonIndex = line.indexOf(':');
				if (colonIndex > 0) {
					const key = line.substring(0, colonIndex).trim();
					const value = line.substring(colonIndex + 1).trim();
					meta[key] = value;
				}
			});
			markdownContent = markdown.trim();
		}

		return {
			post: {
				slug,
				title: meta['title'] || 'Untitled Post',
				date: meta['date'] || '',
				readTime: meta['readTime'] || '',
				excerpt: meta['excerpt'] || '',
				content: markdownContent
			}
		};
	} catch (err) {
		console.error(`Failed to load post ${slug}:`, err);
		throw error(404, `Post "${slug}" not found`);
	}
}
