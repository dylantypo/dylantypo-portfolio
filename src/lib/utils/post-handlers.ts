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

const posts = import.meta.glob('../../posts/*.md');

export async function getAllPosts(): Promise<PostLink[]> {
	const iterablePostFiles = Object.entries(posts);

	const postJobs = iterablePostFiles.map(async ([path, resolver]) => {
		const { metadata } = (await resolver()) as { metadata: BlogPostMetadata };
		const postPath = path.replace('../../posts/', '').replace('.md', '');
		return { metadata, postPath };
	});

	const allPosts = await Promise.all(postJobs);

	// Sort by date (newest first)
	allPosts.sort((a, b) => {
		const dateA = new Date(a.metadata.date);
		const dateB = new Date(b.metadata.date);
		return dateB.getTime() - dateA.getTime();
	});

	return allPosts;
}

export async function getPostBySlug(slug: string): Promise<ResolvedBlogPost> {
	const postPath = `../../posts/${slug}.md`;

	if (!(postPath in posts)) {
		throw new Error(`Post not found: ${slug}`);
	}

	try {
		const post = await posts[postPath]();

		return {
			metadata: (post as any).metadata,
			content: (post as any).default,
			slug
		};
	} catch (error) {
		throw new Error(`Failed to load post: ${slug}`);
	}
}
