import { getAllPosts } from '$lib/post-handlers';
import { redirect } from '@sveltejs/kit';

const POSTS_PER_PAGE = 6;

export async function load({ params }) {
	const allPosts = await getAllPosts();
	const currentPage = Number(params.currentPage);
	const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);

	if (currentPage < 1) throw redirect(308, '/blog/page/1');
	if (currentPage > totalPages) throw redirect(308, `/blog/page/${totalPages}`);

	const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
	const posts = allPosts.slice(startIndex, startIndex + POSTS_PER_PAGE).map((post) => ({
		slug: post.postPath,
		title: post.metadata.title || 'Untitled',
		excerpt: post.metadata.excerpt || 'No excerpt',
		date: post.metadata.date || new Date().toISOString().split('T')[0],
		readTime: post.metadata.readTime || '5 min read'
	}));

	return { posts, currentPage, totalPages };
}
