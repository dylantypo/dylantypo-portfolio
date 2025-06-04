import { readFile } from 'fs/promises';
import { join } from 'path';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const { slug } = params;

	try {
		const filePath = join(process.cwd(), 'static/blog/posts', `${slug}.md`);
		const content = await readFile(filePath, 'utf-8');

		// Parse frontmatter with regex for better reliability
		const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
		const match = content.match(frontmatterRegex);

		let meta: Record<string, string> = {};
		let markdownContent = content;

		if (match) {
			const [, frontmatter, markdown] = match;

			// Parse YAML-like frontmatter
			frontmatter.split('\n').forEach((line) => {
				const [key, ...value] = line.split(':');
				if (key && value.length) {
					meta[key.trim()] = value.join(':').trim();
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
