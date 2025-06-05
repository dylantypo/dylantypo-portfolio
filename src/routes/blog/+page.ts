import { getAllPosts } from '$lib/post-handlers';

export async function load() {
	const allPosts = await getAllPosts();

	const posts = allPosts.map((post) => ({
		slug: post.postPath,
		title: post.metadata.title || 'Untitled',
		excerpt: post.metadata.excerpt || 'No excerpt',
		date: post.metadata.date || new Date().toISOString(),
		readTime: post.metadata.readTime || '5 min read'
	}));

	return { posts };
}
