// src/lib/post-handlers.ts
export type BlogPostMetadata = {
	title: string;
	date: string;
	excerpt: string;
	readTime: string;
};

export type PostLink = {
	metadata: BlogPostMetadata;
	postPath: string;
};

export type ResolvedBlogPost = {
	metadata: BlogPostMetadata;
	content: any;
	slug: string;
};

export async function getAllPosts(): Promise<PostLink[]> {
	const allPostFiles = import.meta.glob('../posts/*.md');
	const iterablePostFiles = Object.entries(allPostFiles);

	const postJobs = iterablePostFiles.map(async ([path, resolver]) => {
		const { metadata } = (await resolver()) as { metadata: BlogPostMetadata };
		const postPath = path.replace('../posts/', '').replace('.md', '');
		return { metadata, postPath };
	});

	const posts = await Promise.all(postJobs);

	// Sort by date (newest first)
	posts.sort((a, b) => {
		const dateA = new Date(a.metadata.date);
		const dateB = new Date(b.metadata.date);
		return dateB.getTime() - dateA.getTime();
	});

	return posts;
}

// 🎯 Get single post by slug
export async function getPostBySlug(slug: string): Promise<ResolvedBlogPost> {
	try {
		const post = await import(/* @vite-ignore */ `../posts/${slug}.md`);
		const content = post.default;

		return {
			metadata: post.metadata,
			content,
			slug
		};
	} catch (error) {
		throw new Error(`Post not found: ${slug}`);
	}
}
