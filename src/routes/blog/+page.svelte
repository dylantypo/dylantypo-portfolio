<script lang="ts">
	import { onMount } from 'svelte';
	import Search from '$lib/icons/Search.svelte';
	import X from '$lib/icons/X.svelte';

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

	// 🛡️ Safe data handling with defaults
	let { data = { posts: [] } }: { data?: PageData } = $props();
	let posts = $state<BlogPost[]>(Array.isArray(data?.posts) ? data.posts : []);

	let searchTerm = $state('');

	let filteredPosts = $derived.by(() => {
		if (!searchTerm || !Array.isArray(posts)) return posts;
		return posts.filter(
			(post: BlogPost) =>
				post?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
				post?.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
		);
	});

	onMount(() => {
		window.scrollTo(0, 0);

		// 🚫 Prevent horizontal scroll
		document.body.style.overflowX = 'hidden';
		document.documentElement.style.overflowX = 'hidden';

		return () => {
			// Cleanup on unmount
			document.body.style.overflowX = '';
			document.documentElement.style.overflowX = '';
		};
	});
</script>

<svelte:head>
	<title>Blog | Dylan Posner</title>
	<meta name="description" content="Latest thoughts and updates from Dylan Posner" />
</svelte:head>

<main class="blog-container">
	<header class="blog-header">
		<div class="header-content">
			<h1 class="title">📝 Blog</h1>
			<p class="subtitle">💭 Latest thoughts & updates</p>

			{#if posts && posts.length > 0}
				<div class="search-container">
					<div class="search-wrapper">
						<div class="search-icon">
							<Search size={20} />
						</div>
						<input
							type="text"
							placeholder="Search posts..."
							bind:value={searchTerm}
							class="search-input"
						/>
						{#if searchTerm}
							<button
								class="clear-button"
								onclick={() => (searchTerm = '')}
								aria-label="Clear search"
							>
								<X size={16} />
							</button>
						{/if}
					</div>

					{#if posts.length !== filteredPosts.length}
						<p class="search-results">
							📊 Showing {filteredPosts.length} of {posts.length} posts
						</p>
					{/if}
				</div>
			{/if}
		</div>
	</header>

	<section class="posts-section">
		<div class="posts-container">
			{#if !filteredPosts || filteredPosts.length === 0}
				<div class="empty-state">
					{#if searchTerm}
						<div class="empty-icon">🔍</div>
						<h2>No posts found</h2>
						<p>❌ No posts match "{searchTerm}"</p>
						<button onclick={() => (searchTerm = '')} class="clear-search-btn">
							🗑️ Clear Search
						</button>
					{:else}
						<div class="empty-icon">📝</div>
						<h2>No posts yet</h2>
						<p>⏰ Check back soon for new content!</p>
					{/if}
				</div>
			{:else}
				<div class="posts-grid">
					{#each filteredPosts as post (post?.slug || Math.random())}
						{#if post && post.slug}
							<article class="post-card" tabindex="-1">
								<a href="/blog/posts/{post.slug}" class="post-link">
									<div class="post-content">
										<h2 class="post-title">📄 {post.title || 'Untitled'}</h2>
										<p class="post-excerpt">💡 {post.excerpt || 'No excerpt'}</p>
										<div class="post-meta">
											<time class="post-date">📅 {post.date?.split('T')[0] || post.date}</time>
											<span class="read-time">⏰ {post.readTime || '5 min read'}</span>
										</div>
									</div>
								</a>
							</article>
						{/if}
					{/each}
				</div>
			{/if}
		</div>
	</section>

	<footer class="blog-footer">
		<a href="/" class="back-home">🏠 Back to Home</a>
	</footer>
</main>

<style>
	/* 🚫 Prevent horizontal overflow globally */
	:global(html, body) {
		overflow-x: hidden !important;
		width: 100%;
		max-width: 100vw;
	}

	.blog-container {
		min-height: 100vh;
		width: 100%;
		max-width: 100vw;
		background-color: var(--color-primary);
		color: var(--color-text-primary);
		font-family: var(--font-family-base);
		overflow-x: hidden;
		box-sizing: border-box;
	}

	.blog-header {
		width: 100%;
		padding: clamp(2rem, 5vh, 4rem) 0;
		box-sizing: border-box;
		position: relative;
	}

	.header-content {
		max-width: min(90vw, 1200px);
		margin: 0 auto;
		padding: 0 clamp(1rem, 4vw, 2rem);
		text-align: center;
		box-sizing: border-box;
	}

	.title {
		font-size: clamp(2.5rem, 6vw, 4rem);
		margin-bottom: clamp(0.5rem, 2vh, 1rem);
		color: var(--color-text-primary);
		line-height: 1.1;
	}

	.subtitle {
		font-size: clamp(1.2rem, 3vw, 1.8rem);
		opacity: 0.8;
		margin: 0 0 clamp(2rem, 4vh, 3rem);
		line-height: 1.3;
	}

	/* 🎯 Enhanced Search Container */
	.search-container {
		max-width: min(100%, 500px);
		margin: 0 auto;
		width: 100%;
	}

	.search-wrapper {
		position: relative;
		display: flex;
		align-items: center;
		width: 100%;
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: clamp(0.5rem, 2vw, 1rem);
		transition: all 0.3s ease;
		backdrop-filter: blur(8px);
	}

	.search-wrapper:focus-within {
		border-color: var(--color-secondary);
		box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.1);
		background: rgba(255, 255, 255, 0.15);
	}

	.search-icon {
		position: absolute;
		top: 50%;
		left: clamp(0.75rem, 3vw, 1rem);
		transform: translateY(-50%);
		color: rgba(255, 255, 255, 0.6);
		pointer-events: none;
		z-index: 2;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.search-input {
		width: 100%;
		padding: clamp(0.75rem, 3vw, 1rem) clamp(2.5rem, 6vw, 3rem);
		border: none;
		border-radius: inherit;
		background: transparent;
		color: white;
		font-size: clamp(0.9rem, 3vw, 1rem);
		font-family: var(--font-family-base);
		outline: none;
		box-sizing: border-box;
	}

	.search-input::placeholder {
		color: rgba(255, 255, 255, 0.5);
	}

	.clear-button {
		position: absolute;
		right: clamp(0.5rem, 2vw, 0.75rem);
		background: rgba(255, 255, 255, 0.1);
		border: none;
		border-radius: 50%;
		width: clamp(1.5rem, 4vw, 2rem);
		height: clamp(1.5rem, 4vw, 2rem);
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		color: rgba(255, 255, 255, 0.7);
		transition: all 0.2s ease;
	}

	.clear-button:hover {
		background: rgba(255, 255, 255, 0.2);
		color: white;
		transform: scale(1.1);
	}

	.search-results {
		text-align: center;
		margin-top: clamp(0.5rem, 2vh, 1rem);
		opacity: 0.7;
		font-size: clamp(0.8rem, 2.5vw, 0.9rem);
	}

	/* 📱 Posts Section */
	.posts-section {
		width: 100%;
		flex: 1;
		padding-bottom: clamp(2rem, 5vh, 4rem);
	}

	.posts-container {
		max-width: min(90vw, 1200px);
		margin: 0 auto;
		padding: 0 clamp(1rem, 4vw, 2rem);
		box-sizing: border-box;
	}

	.posts-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 350px), 1fr));
		gap: clamp(1rem, 3vw, 2rem);
		width: 100%;
		contain: layout;
	}

	/* 🎭 Empty State */
	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: clamp(300px, 40vh, 500px);
		gap: clamp(0.75rem, 3vh, 1.5rem);
		text-align: center;
		opacity: 0.7;
		padding: clamp(1rem, 4vw, 2rem);
	}

	.empty-icon {
		font-size: clamp(3rem, 8vw, 5rem);
		opacity: 0.5;
	}

	.empty-state h2 {
		font-size: clamp(1.5rem, 4vw, 2rem);
		margin: 0;
	}

	.empty-state p {
		font-size: clamp(1rem, 3vw, 1.2rem);
		margin: 0;
	}

	.clear-search-btn {
		background: var(--color-secondary);
		color: white;
		border: none;
		border-radius: clamp(0.5rem, 2vw, 0.75rem);
		padding: clamp(0.5rem, 2vw, 0.75rem) clamp(1rem, 3vw, 1.5rem);
		cursor: pointer;
		font-family: var(--font-family-base);
		font-size: clamp(0.9rem, 2.5vw, 1rem);
		transition: all 0.2s ease;
		margin-top: clamp(0.5rem, 2vh, 1rem);
	}

	.clear-search-btn:hover {
		opacity: 0.8;
		transform: translateY(-1px);
	}

	/* 🎴 Post Cards */
	.post-card {
		background-color: var(--color-fill);
		border-radius: clamp(0.5rem, 2vw, 1rem);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		transition: all var(--transition-speed) ease;
	}

	.post-card:hover {
		background-color: var(--color-hover);
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
	}

	.post-link {
		display: block;
		text-decoration: none;
		color: inherit;
		padding: clamp(1rem, 4vw, 1.5rem);
	}

	.post-content {
		display: flex;
		flex-direction: column;
	}

	/* Remove ALL focus styles */
	.post-card:focus,
	.post-card:focus-visible,
	.post-link:focus,
	.post-link:focus-visible {
		outline: none !important;
	}

	.post-title {
		font-size: clamp(1.2rem, 3.5vw, 1.5rem);
		margin-bottom: clamp(0.5rem, 2vh, 1rem);
		color: var(--color-text-primary);
		line-height: 1.3;
		word-wrap: break-word;
		overflow-wrap: break-word;
	}

	.post-excerpt {
		font-size: clamp(0.9rem, 2.5vw, 1rem);
		opacity: 0.75;
		margin-bottom: clamp(0.75rem, 3vh, 1rem);
		line-height: 1.5;
		color: var(--color-text-primary);
		word-wrap: break-word;
		overflow-wrap: break-word;
	}

	.post-meta {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: clamp(0.5rem, 2vw, 1rem);
		font-size: clamp(0.75rem, 2vw, 0.875rem);
		opacity: 0.6;
		color: var(--color-text-primary);
		flex-wrap: wrap;
	}

	/* 🦶 Footer */
	.blog-footer {
		text-align: center;
		padding: clamp(2rem, 5vh, 3rem) clamp(1rem, 4vw, 2rem);
		margin-top: auto;
	}

	.back-home {
		color: var(--color-secondary);
		text-decoration: none;
		font-size: clamp(1rem, 3vw, 1.2rem);
		transition: opacity var(--transition-speed) ease;
		display: inline-block;
		padding: clamp(0.5rem, 2vw, 0.75rem);
	}

	.back-home:hover {
		opacity: 0.8;
		transform: translateY(-1px);
	}

	.back-home:focus-visible {
		outline: 2px solid var(--color-focus);
		outline-offset: 2px;
		border-radius: 0.25rem;
	}

	/* 📱 Mobile Responsive */
	@media (max-width: 768px) {
		.posts-grid {
			grid-template-columns: 1fr;
			gap: clamp(1rem, 4vw, 1.5rem);
		}

		.post-meta {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.25rem;
		}

		.search-wrapper {
			border-radius: 0.75rem;
		}
	}

	/* 🖥️ Large screens */
	@media (min-width: 1400px) {
		.posts-grid {
			grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
		}
	}

	/* 🎯 Accessibility */
	@media (prefers-reduced-motion: reduce) {
		.post-card,
		.clear-button,
		.search-wrapper,
		.clear-search-btn,
		.back-home {
			transition: none;
		}

		.post-card:hover {
			transform: none;
		}
	}
</style>
