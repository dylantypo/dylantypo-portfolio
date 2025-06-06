import { getAllPosts } from '$lib/utils';

export async function load() {
	const allPosts = await getAllPosts();

	const posts = allPosts.map((post) => ({
		slug: post.postPath,
		title: post.metadata.title || 'Untitled',
		excerpt: post.metadata.excerpt || 'No excerpt',
		date: post.metadata.date?.split('T')[0] || new Date().toISOString().split('T')[0],
		readTime: post.metadata.readTime || '5 min read'
	}));

	return { posts };
}
