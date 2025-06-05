// src/routes/blog/+page.ts
import { getAllPosts } from '$lib/post-handlers';
import type { PostLink } from '$lib/post-handlers';

export async function load() {
	const allPosts = await getAllPosts();

	// Convert to your expected format
	const posts = allPosts.map((post: PostLink) => ({
		slug: post.postPath,
		title: post.metadata.title || 'Untitled',
		excerpt: post.metadata.excerpt || 'No excerpt',
		date: post.metadata.date || new Date().toISOString().split('T')[0],
		readTime: post.metadata.readTime || '5 min read'
	}));

	return { posts };
}
