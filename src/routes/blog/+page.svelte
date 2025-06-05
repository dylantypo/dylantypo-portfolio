<script lang="ts">
	import { onMount } from 'svelte';

	// 🎯 Define types
	type BlogPost = {
		slug: string;
		title: string;
		excerpt: string;
		date: string;
		readTime: string;
	};

	type PageData = {
		posts: BlogPost[];
	};

	// 🔥 Now posts come from the server automatically!
	let { data }: { data: PageData } = $props();
	let posts = $state<BlogPost[]>(data.posts || []);

	let searchTerm = $state('');

	let filteredPosts = $derived.by(() => {
		if (!searchTerm) return posts;
		return posts.filter(
			(post: BlogPost) =>
				post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
				post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
		);
	});

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
		<h1 class="title">📝 Blog</h1>
		<p class="subtitle">💭 Latest thoughts & updates</p>

		{#if posts.length > 0}
			<div class="search-container">
				<input
					type="text"
					placeholder="🔍 Search posts..."
					bind:value={searchTerm}
					class="search-input"
				/>
				{#if posts.length !== filteredPosts.length}
					<p class="search-results">
						📊 Showing {filteredPosts.length} of {posts.length} posts
					</p>
				{/if}
			</div>
		{/if}
	</header>

	<section class="posts-grid">
		{#if filteredPosts.length === 0}
			<div class="empty">
				{#if searchTerm}
					<h2>🔍 No posts found</h2>
					<p>❌ No posts match "{searchTerm}"</p>
					<button onclick={() => (searchTerm = '')} class="clear-search"> 🗑️ Clear Search </button>
				{:else}
					<h2>📝 No posts yet</h2>
					<p>⏰ Check back soon for new content!</p>
				{/if}
			</div>
		{:else}
			{#each filteredPosts as post (post.slug)}
				<article class="post-card">
					<a href="/blog/{post.slug}" class="post-link">
						<div class="post-content">
							<h2 class="post-title">📄 {post.title}</h2>
							<p class="post-excerpt">💡 {post.excerpt}</p>
							<div class="post-meta">
								<time class="post-date">📅 {post.date}</time>
								<span class="read-time">⏰ {post.readTime}</span>
							</div>
						</div>
					</a>
				</article>
			{/each}
		{/if}
	</section>

	<footer class="blog-footer">
		<a href="/" class="back-home">🏠 Back to Home</a>
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
		margin: 0 0 2rem;
	}

	.search-container {
		max-width: 400px;
		margin: 0 auto;
	}

	.search-input {
		width: 100%;
		padding: 0.75rem 1rem;
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 0.5rem;
		background: rgba(255, 255, 255, 0.1);
		color: white;
		font-size: 1rem;
		font-family: var(--font-family-base);
	}

	.search-input::placeholder {
		color: rgba(255, 255, 255, 0.5);
	}

	.search-input:focus {
		outline: 2px solid var(--color-secondary);
		outline-offset: 2px;
	}

	.search-results {
		text-align: center;
		margin-top: 0.5rem;
		opacity: 0.7;
		font-size: 0.9rem;
	}

	.posts-grid {
		display: grid;
		gap: var(--spacing-lg);
		max-width: 800px;
		margin: 0 auto var(--spacing-xl);
	}

	.empty {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 40vh;
		gap: var(--spacing-base);
		text-align: center;
		opacity: 0.7;
	}

	.clear-search {
		background: var(--color-secondary);
		color: white;
		border: none;
		border-radius: 0.5rem;
		padding: 0.5rem 1rem;
		cursor: pointer;
		font-family: var(--font-family-base);
		transition: opacity 0.2s ease;
	}

	.clear-search:hover {
		opacity: 0.8;
	}

	.post-card {
		background-color: var(--color-fill);
		border-radius: 0.5rem;
		overflow: hidden;
		transition:
			background-color var(--transition-speed) ease,
			box-shadow var(--transition-speed) ease;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.post-card:hover {
		background-color: var(--color-hover);
		box-shadow:
			inset 0 2px 0 rgba(20, 184, 166, 0.3),
			inset 0 -2px 0 rgba(20, 184, 166, 0.2),
			inset 2px 0 0 rgba(20, 184, 166, 0.2),
			inset -2px 0 0 rgba(20, 184, 166, 0.2);
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
		opacity: 0.75;
		margin-bottom: var(--spacing-base);
		line-height: 1.5;
		color: var(--color-text-primary);
	}

	.post-meta {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 0.875rem;
		opacity: 0.6;
		color: var(--color-text-primary);
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
