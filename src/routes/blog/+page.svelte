<script lang="ts">
	import { onMount } from 'svelte';

	type BlogPost = {
		slug: string;
		title: string;
		excerpt: string;
		date: string;
		readTime: string;
	};

	// Dynamic posts loaded from files
	let posts = $state<BlogPost[]>([]);
	let isLoading = $state(true);
	let error = $state<string | null>(null);

	async function loadPosts() {
		isLoading = true;
		error = null;

		try {
			// Get all markdown files from posts directory
			const postFiles = import.meta.glob('/static/blog/posts/*.md', {
				query: '?raw',
				import: 'default'
			});

			const loadedPosts: BlogPost[] = [];

			for (const [path, moduleLoader] of Object.entries(postFiles)) {
				try {
					// Extract filename from path
					const filename = path.split('/').pop()?.replace('.md', '') || '';

					// Load the markdown content
					const content = (await moduleLoader()) as string;

					// Parse frontmatter
					const lines = content.split('\n');
					let meta: Record<string, string> = {};

					if (lines[0] === '---') {
						for (let i = 1; i < lines.length; i++) {
							if (lines[i] === '---') break;
							const [key, ...value] = lines[i].split(':');
							if (key && value.length) {
								meta[key.trim()] = value.join(':').trim();
							}
						}
					}

					// Create post object
					const post: BlogPost = {
						slug: filename,
						title: meta['title'] || 'Untitled Post',
						excerpt: meta['excerpt'] || 'No description available',
						date: meta['date'] || '',
						readTime: meta['readTime'] || 'Unknown'
					};

					loadedPosts.push(post);
				} catch (err) {
					console.warn(`Failed to load post ${path}:`, err);
				}
			}

			// Sort posts by date (newest first)
			posts = loadedPosts.sort((a, b) => {
				const dateA = new Date(a.date);
				const dateB = new Date(b.date);
				return dateB.getTime() - dateA.getTime();
			});
		} catch (err) {
			error = err instanceof Error ? err.message : 'Failed to load posts';
			console.error('Error loading posts:', err);
		} finally {
			isLoading = false;
		}
	}

	onMount(() => {
		window.scrollTo(0, 0);
	});
</script>

<svelte:head>
	<title>Blog | Dylan Posner</title>
	<meta name="description" content="Latest thoughts and updates from Dylan Posner" />
</svelte:head>

<main class="blog-container">
	<header class="blog-header">
		<h1 class="title">Blog 📝</h1>
		<p class="subtitle">Latest thoughts & updates</p>
	</header>

	<section class="posts-grid">
		{#if isLoading}
			<div class="loading">
				<div class="spinner"></div>
				<p>Loading...</p>
			</div>
		{:else if error}
			<div class="error">
				<h2>❌ {error}</h2>
				<p>Failed to load blog posts. Check console for details.</p>
			</div>
		{:else if posts.length === 0}
			<div class="empty">
				<h2>📝 No posts yet</h2>
				<p>Check back soon for new content!</p>
			</div>
		{:else}
			{#each posts as post}
				<article class="post-card">
					<a href="/blog/{post.slug}" class="post-link">
						<div class="post-content">
							<h2 class="post-title">{post.title}</h2>
							<p class="post-excerpt">{post.excerpt}</p>
							<div class="post-meta">
								<time class="post-date">{post.date}</time>
								<span class="read-time">{post.readTime}</span>
							</div>
						</div>
					</a>
				</article>
			{/each}
		{/if}
	</section>

	<footer class="blog-footer">
		<a href="/" class="back-home">← Back to Home</a>
	</footer>
</main>

<style>
	.blog-container {
		min-height: 100vh;
		background-color: var(--color-background);
		color: var(--color-text-primary);
		padding: var(--spacing-xl) var(--content-padding-current);
		font-family: var(--font-family-base);
	}

	.blog-header {
		text-align: center;
		margin-bottom: var(--spacing-xl);
	}

	.title {
		font-size: var(--font-size-xl);
		margin-bottom: var(--spacing-base);
		color: var(--color-text-primary);
	}

	.subtitle {
		font-size: var(--font-size-lg);
		opacity: 0.8;
		margin: 0;
	}

	.posts-grid {
		display: grid;
		gap: var(--spacing-lg);
		max-width: 800px;
		margin: 0 auto var(--spacing-xl);
	}

	.loading,
	.error,
	.empty {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 40vh;
		gap: var(--spacing-base);
		text-align: center;
	}

	.spinner {
		width: 2rem;
		height: 2rem;
		border: 2px solid var(--color-fill);
		border-top: 2px solid var(--color-secondary);
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.error {
		color: #ef4444;
	}

	.empty {
		opacity: 0.7;
	}

	.post-card {
		background-color: var(--color-fill);
		border-radius: 0.5rem;
		overflow: hidden;
		transition: transform var(--transition-speed) ease;
	}

	.post-card:hover {
		transform: translateY(-2px);
		background-color: var(--color-hover);
	}

	.post-link {
		display: block;
		text-decoration: none;
		color: inherit;
		padding: var(--spacing-lg);
	}

	.post-title {
		font-size: 1.5rem;
		margin-bottom: var(--spacing-base);
		color: var(--color-text-primary);
		line-height: 1.3;
	}

	.post-excerpt {
		font-size: 1rem;
		opacity: 0.8;
		margin-bottom: var(--spacing-base);
		line-height: 1.5;
	}

	.post-meta {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 0.875rem;
		opacity: 0.6;
	}

	.blog-footer {
		text-align: center;
		margin-top: var(--spacing-xl);
	}

	.back-home {
		color: var(--color-secondary);
		text-decoration: none;
		font-size: 1rem;
		transition: opacity var(--transition-speed) ease;
	}

	.back-home:hover {
		opacity: 0.8;
	}

	.back-home:focus-visible {
		outline: 2px solid var(--color-focus);
		outline-offset: 2px;
	}

	@media (max-width: 768px) {
		.blog-container {
			padding: var(--spacing-lg) var(--content-padding-current);
		}

		.post-meta {
			flex-direction: column;
			gap: 0.25rem;
			align-items: flex-start;
		}
	}
</style>
