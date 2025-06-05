// src/routes/blog/+page.server.ts
import { readdir, readFile } from 'fs/promises';
import { join } from 'path';

type BlogPost = {
	slug: string;
	title: string;
	excerpt: string;
	date: string;
	readTime: string;
};

type Frontmatter = {
	[key: string]: string;
};

export async function load() {
	try {
		const postsDir = join(process.cwd(), 'src/routes/blog');
		const files = await readdir(postsDir);

		const posts: BlogPost[] = [];

		for (const file of files) {
			if (file.endsWith('.md') && file !== '+page.md') {
				const filePath = join(postsDir, file);
				let content = await readFile(filePath, 'utf-8');

				// Remove BOM and normalize
				content = content.replace(/^\uFEFF/, '');
				content = content.replace(/\r\n/g, '\n');
				content = content.trim();

				const lines = content.split('\n');
				const meta: Frontmatter = {};

				// Parse frontmatter
				if (lines[0].trim() === '---') {
					for (let i = 1; i < lines.length; i++) {
						const line = lines[i].trim();
						if (line === '---') break;
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

				const slug = file.replace('.md', '');
				posts.push({
					slug,
					title: meta.title || 'Untitled',
					excerpt: meta.excerpt || '',
					date: meta.date || new Date().toISOString().split('T')[0],
					readTime: meta.readTime || '5 min read'
				});
			}
		}

		posts.sort((a, b) => {
			const dateA = new Date(a.date);
			const dateB = new Date(b.date);
			return dateB.getTime() - dateA.getTime();
		});

		return { posts };
	} catch (error) {
		console.error('Failed to load posts:', error);
		return { posts: [] };
	}
}
