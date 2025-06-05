// src/routes/blog/[slug]/+page.server.ts
import { readFile } from 'fs/promises';
import { join } from 'path';
import { error } from '@sveltejs/kit';

type Frontmatter = {
	[key: string]: string;
};

// 🛡️ Safe frontmatter parser (same as blog page)
function safeParseFrontmatter(content: string): { meta: Frontmatter; contentStart: number } {
	try {
		const cleaned = content
			.replace(/^\uFEFF/, '') // Remove BOM
			.replace(/\r\n/g, '\n') // Normalize line endings
			.replace(/\r/g, '\n') // Handle old Mac line endings
			.trim();

		const lines = cleaned.split('\n');
		const meta: Frontmatter = {};
		let contentStart = 0;

		if (lines[0]?.trim() === '---') {
			for (let i = 1; i < lines.length; i++) {
				const line = lines[i];

				if (line?.trim() === '---') {
					contentStart = i + 1;
					break;
				}

				if (!line || !line.trim()) continue;

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
	} catch (parseError) {
		console.warn('Frontmatter parsing error:', parseError);
		return { meta: {}, contentStart: 0 };
	}
}

export async function load({ params }) {
	try {
		const filePath = join(process.cwd(), 'src/routes/blog', `${params.slug}.md`);

		// 🛡️ Safe file reading
		let content: string;
		try {
			content = await readFile(filePath, 'utf-8');
		} catch (readError) {
			console.error(`File not found: ${params.slug}`, readError);
			throw error(404, 'Post not found');
		}

		// 🛡️ Safe frontmatter parsing
		const { meta, contentStart } = safeParseFrontmatter(content);

		// Get post content safely
		const lines = content.split('\n');
		const postContent = lines.slice(contentStart).join('\n').trim();

		// 🛡️ Create post with safe defaults
		const post = {
			slug: params.slug,
			title: meta.title || `Post: ${params.slug}`,
			date: meta.date || new Date().toISOString().split('T')[0],
			readTime: meta.readTime || '5 min read',
			excerpt: meta.excerpt || 'No excerpt available',
			content: postContent || '# Content not available'
		};

		return { post };
	} catch (err) {
		console.error('Error loading post:', err);
		throw error(404, 'Post not found');
	}
}
