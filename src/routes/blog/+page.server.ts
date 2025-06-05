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

// 🛡️ Safe frontmatter parser with fallbacks
function safeParseFrontmatter(content: string): { meta: Frontmatter; contentStart: number } {
	try {
		// Clean and normalize content
		const cleaned = content
			.replace(/^\uFEFF/, '') // Remove BOM
			.replace(/\r\n/g, '\n') // Normalize line endings
			.replace(/\r/g, '\n') // Handle old Mac line endings
			.trim();

		const lines = cleaned.split('\n');
		const meta: Frontmatter = {};
		let contentStart = 0;

		// Check for frontmatter
		if (lines[0]?.trim() === '---') {
			for (let i = 1; i < lines.length; i++) {
				const line = lines[i];

				// End of frontmatter
				if (line?.trim() === '---') {
					contentStart = i + 1;
					break;
				}

				// Skip empty lines
				if (!line || !line.trim()) continue;

				// Parse key-value pairs safely
				const colonIndex = line.indexOf(':');
				if (colonIndex > 0) {
					const key = line.substring(0, colonIndex).trim();
					let value = line.substring(colonIndex + 1).trim();

					// Remove quotes if present
					if (
						(value.startsWith('"') && value.endsWith('"')) ||
						(value.startsWith("'") && value.endsWith("'"))
					) {
						value = value.slice(1, -1);
					}

					if (key && value) {
						meta[key] = value;
					}
				}
			}
		}

		return { meta, contentStart };
	} catch (error) {
		console.warn('Frontmatter parsing error:', error);
		return { meta: {}, contentStart: 0 };
	}
}

// 🛡️ Safe file reader with multiple fallbacks
async function safeReadFile(filePath: string): Promise<string | null> {
	try {
		return await readFile(filePath, 'utf-8');
	} catch (error) {
		console.warn(`Failed to read ${filePath}:`, error);
		return null;
	}
}

export async function load() {
	try {
		const postsDir = join(process.cwd(), 'src/routes/blog');
		let files: string[] = [];

		// 🛡️ Safe directory reading
		try {
			files = await readdir(postsDir);
		} catch (error) {
			console.error('Failed to read posts directory:', error);
			return { posts: [] };
		}

		const posts: BlogPost[] = [];

		// Process each file with individual error handling
		for (const file of files) {
			if (!file.endsWith('.md') || file === '+page.md') continue;

			const filePath = join(postsDir, file);
			const content = await safeReadFile(filePath);

			if (!content) continue; // Skip failed reads

			try {
				const { meta } = safeParseFrontmatter(content);
				const slug = file.replace('.md', '');

				// Create post with safe defaults
				const post: BlogPost = {
					slug,
					title: meta.title || `Post: ${slug}`,
					excerpt: meta.excerpt || 'No excerpt available',
					date: meta.date || new Date().toISOString().split('T')[0],
					readTime: meta.readTime || '5 min read'
				};

				// 🛡️ Validate post data before adding
				if (post.slug && post.title) {
					posts.push(post);
				}
			} catch (error) {
				console.warn(`Failed to process ${file}:`, error);
				// Continue processing other files
			}
		}

		// Sort posts safely
		posts.sort((a, b) => {
			try {
				const dateA = new Date(a.date);
				const dateB = new Date(b.date);
				return dateB.getTime() - dateA.getTime();
			} catch {
				return 0; // Keep original order if dates are invalid
			}
		});

		return { posts };
	} catch (error) {
		console.error('Critical error in blog loader:', error);
		// Return empty array instead of throwing
		return { posts: [] };
	}
}
