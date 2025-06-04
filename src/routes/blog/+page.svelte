<script lang="ts">
	import { onMount } from 'svelte';

	type BlogPost = {
		slug: string;
		title: string;
		excerpt: string;
		date: string;
		readTime: string;
	};

	// Use server-loaded data instead of client-side loading
	let { data } = $props<{ data: { posts: BlogPost[] } }>();

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
		{#if data.posts.length === 0}
			<div class="empty">
				<h2>📝 No posts yet</h2>
				<p>Check back soon for new content!</p>
			</div>
		{:else}
			{#each data.posts as post}
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
