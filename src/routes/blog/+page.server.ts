import { readdir, readFile } from 'fs/promises';
import { join } from 'path';

type BlogPost = {
	slug: string;
	title: string;
	excerpt: string;
	date: string;
	readTime: string;
};

export async function load() {
	try {
		const postsDir = join(process.cwd(), 'static/blog/posts');
		const files = await readdir(postsDir);
		const posts: BlogPost[] = [];

		for (const file of files) {
			if (file.endsWith('.md')) {
				try {
					const filePath = join(postsDir, file);
					const content = await readFile(filePath, 'utf-8');
					
					// Parse frontmatter
					const lines = content.split('\n');
					const meta: Record<string, string> = {};
					
					if (lines[0] === '---') {
						for (let i = 1; i < lines.length; i++) {
							if (lines[i] === '---') break;
							const [key, ...value] = lines[i].split(':');
							if (key && value.length) {
								meta[key.trim()] = value.join(':').trim();
							}
						}
					}

					posts.push({
						slug: file.replace('.md', ''),
						title: meta['title'] || 'Untitled Post',
						excerpt: meta['excerpt'] || 'No description available',
						date: meta['date'] || '',
						readTime: meta['readTime'] || 'Unknown'
					});
				} catch (err) {
					console.warn(`Failed to read ${file}:`, err);
				}
			}
		}

		// Sort by date (newest first)
		posts.sort((a, b) => {
			const dateA = new Date(a.date);
			const dateB = new Date(b.date);
			return dateB.getTime() - dateA.getTime();
		});

		return { posts };
	} catch (error) {
		console.warn('Failed to load posts directory:', error);
		return { posts: [] };
	}
}