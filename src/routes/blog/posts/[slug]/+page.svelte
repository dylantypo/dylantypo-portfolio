<!-- src/routes/posts/[slug]/+page.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';

	type Post = {
		slug: string;
		title: string;
		date: string;
		readTime: string;
		excerpt: string;
		content: any;
	};

	let { data }: { data: { post: Post } } = $props();
	let post = data.post;

	onMount(() => {
		window.scrollTo(0, 0);
	});
</script>

<svelte:head>
	<title>{post.title} | Dylan Posner</title>
	<meta name="description" content={post.excerpt} />
	<meta property="og:title" content={post.title} />
	<meta property="og:description" content={post.excerpt} />
	<meta property="og:type" content="article" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={post.title} />
	<meta name="twitter:description" content={post.excerpt} />
</svelte:head>

<main class="post-container">
	<nav class="breadcrumb">
		<a href="/">🏠 Home</a>
		<span class="separator">→</span>
		<a href="/blog">📝 Blog</a>
		<span class="separator">→</span>
		<span class="current">📄 {post.title}</span>
	</nav>

	<article class="post-article">
		<header class="post-header">
			<h1 class="post-title">{post.title}</h1>
			<div class="post-meta">
				<time class="post-date">📅 {post.date?.split('T')[0] || post.date}</time>
				<span class="read-time">⏰ {post.readTime}</span>
			</div>
		</header>

		<div class="post-content">
			{@render post.content()}
		</div>
	</article>

	<footer class="post-footer">
		<div class="navigation">
			<a href="/blog" class="back-to-blog"> ← 📝 Back to Blog </a>
		</div>
	</footer>
</main>

<style>
	@font-face {
		font-family: 'Inter';
		src: url('/fonts/Inter-Regular.woff2') format('woff2');
		font-display: swap;
	}

	.post-container {
		min-height: 100vh;
		background-color: var(--color-primary);
		color: var(--color-text-primary);
		font-family: var(--font-family-base);
		padding: clamp(1rem, 4vw, 2rem);
		max-width: 100vw;
		overflow-x: hidden;
		box-sizing: border-box;
	}

	/* 🍞 Breadcrumb */
	.breadcrumb {
		max-width: min(90vw, 800px);
		margin: 0 auto clamp(1.5rem, 4vh, 2.5rem);
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: clamp(0.25rem, 1vw, 0.5rem);
		font-size: clamp(0.8rem, 2.5vw, 0.9rem);
		opacity: 0.8;
	}

	.breadcrumb a {
		color: var(--color-secondary);
		text-decoration: none;
		transition: opacity 0.2s ease;
	}

	.breadcrumb a:hover {
		opacity: 0.8;
	}

	.separator {
		color: rgba(255, 255, 255, 0.4);
		font-size: 0.8em;
	}

	.current {
		color: var(--color-text-primary);
		font-weight: 500;
	}

	/* 📄 Article */
	.post-article {
		font-family:
			'Inter',
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			sans-serif;
		max-width: min(90vw, 800px);
		margin: 0 auto;
		background: rgba(255, 255, 255, 0.02);
		border-radius: clamp(0.5rem, 2vw, 1rem);
		padding: clamp(1.5rem, 5vw, 3rem);
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
		backdrop-filter: blur(8px);
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	/* 🎯 Header */
	.post-header {
		margin-bottom: clamp(2rem, 5vh, 3rem);
		text-align: center;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		padding-bottom: clamp(1.5rem, 4vh, 2rem);
	}

	.post-title {
		font-size: clamp(1.8rem, 5vw, 3rem);
		margin-bottom: clamp(1rem, 3vh, 1.5rem);
		line-height: 1.1;
		color: var(--color-text-primary);
		word-wrap: break-word;
	}

	.post-meta {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: clamp(1rem, 4vw, 2rem);
		font-size: clamp(0.85rem, 2.5vw, 0.95rem);
		opacity: 0.7;
		flex-wrap: wrap;
	}

	/* 📝 Content */
	.post-content {
		line-height: 1.7;
		font-size: clamp(1rem, 3vw, 1.1rem);
	}

	/* Global content styling */
	:global(.post-content h1) {
		font-size: clamp(1.6rem, 4.5vw, 2.5rem);
		margin: clamp(2rem, 6vh, 3rem) 0 clamp(1rem, 3vh, 1.5rem);
		color: var(--color-text-primary);
		line-height: 1.2;
	}

	:global(.post-content h2) {
		font-size: clamp(1.4rem, 4vw, 2rem);
		margin: clamp(1.5rem, 5vh, 2.5rem) 0 clamp(0.75rem, 2.5vh, 1rem);
		color: var(--color-text-primary);
		line-height: 1.3;
	}

	:global(.post-content h3) {
		font-size: clamp(1.2rem, 3.5vw, 1.5rem);
		margin: clamp(1.25rem, 4vh, 2rem) 0 clamp(0.5rem, 2vh, 0.75rem);
		color: var(--color-text-primary);
	}

	:global(.post-content p) {
		margin-bottom: clamp(1rem, 3vh, 1.5rem);
		line-height: 1.7;
	}

	:global(.post-content strong) {
		color: var(--color-secondary);
		font-weight: 600;
	}

	:global(.post-content code) {
		background: rgba(255, 255, 255, 0.1);
		padding: 0.2em 0.4em;
		border-radius: 0.25rem;
		font-size: 0.9em;
		color: var(--color-secondary);
	}

	:global(.post-content pre) {
		background: rgba(0, 0, 0, 0.3);
		padding: clamp(1rem, 3vw, 1.5rem);
		border-radius: clamp(0.5rem, 2vw, 0.75rem);
		overflow-x: auto;
		margin: clamp(1rem, 3vh, 1.5rem) 0;
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	:global(.post-content pre code) {
		background: none;
		padding: 0;
		color: var(--color-text-primary);
	}

	:global(.post-content blockquote) {
		border-left: 3px solid var(--color-secondary);
		padding-left: clamp(1rem, 3vw, 1.5rem);
		margin: clamp(1rem, 3vh, 1.5rem) 0;
		font-style: italic;
		opacity: 0.9;
	}

	:global(.post-content ul, .post-content ol) {
		margin: clamp(1rem, 3vh, 1.5rem) 0;
		padding-left: clamp(1.5rem, 4vw, 2rem);
	}

	:global(.post-content li) {
		margin-bottom: clamp(0.5rem, 2vh, 0.75rem);
	}

	:global(.post-content a) {
		color: var(--color-secondary);
		text-decoration: underline;
		transition: opacity 0.2s ease;
	}

	:global(.post-content a:hover) {
		opacity: 0.8;
	}

	:global(.post-content table) {
		width: 100%;
		border-collapse: collapse;
		margin: clamp(1rem, 3vh, 1.5rem) 0;
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 0.5rem;
		overflow: hidden;
	}

	:global(.post-content th, .post-content td) {
		padding: clamp(0.5rem, 2vw, 0.75rem);
		text-align: left;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}

	:global(.post-content th) {
		background: rgba(255, 255, 255, 0.05);
		font-weight: 600;
		color: var(--color-secondary);
	}

	/* 🦶 Footer */
	.post-footer {
		max-width: min(90vw, 800px);
		margin: clamp(2rem, 5vh, 3rem) auto 0;
		text-align: center;
	}

	.back-to-blog {
		display: inline-block;
		color: var(--color-secondary);
		text-decoration: none;
		font-size: clamp(1rem, 3vw, 1.1rem);
		padding: clamp(0.75rem, 3vw, 1rem);
		border-radius: clamp(0.5rem, 2vw, 0.75rem);
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		transition: all 0.2s ease;
		backdrop-filter: blur(4px);
	}

	.back-to-blog:hover {
		background: rgba(255, 255, 255, 0.1);
		transform: translateY(-1px);
	}

	.back-to-blog:focus-visible {
		outline: 2px solid var(--color-focus);
		outline-offset: 2px;
	}

	/* 📱 Mobile Responsive */
	@media (max-width: 768px) {
		.breadcrumb {
			font-size: 0.8rem;
		}

		.post-meta {
			flex-direction: column;
			gap: 0.5rem;
		}

		:global(.post-content pre) {
			font-size: 0.85rem;
		}
	}

	/* 🎯 Accessibility */
	@media (prefers-reduced-motion: reduce) {
		.breadcrumb a,
		.back-to-blog {
			transition: none;
		}

		.back-to-blog:hover {
			transform: none;
		}
	}
</style>
