<script lang="ts">
	// This layout wraps all your .md blog posts

	let {
		title = 'Blog Post',
		date = '',
		readTime = '',
		excerpt = '',
		children
	} = $props<{
		title?: string;
		date?: string;
		readTime?: string;
		excerpt?: string;
		children?: any;
	}>();
</script>

<svelte:head>
	<title>{title} | Dylan Posner</title>
	<meta name="description" content={excerpt} />
</svelte:head>

<div class="blog-wrapper">
	<!-- Back to blog button -->
	<nav class="blog-nav">
		<a href="/blog" class="back-button">
			<svg
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
			>
				<path d="M19 12H5M12 19l-7-7 7-7" />
			</svg>
			Back to Blog
		</a>
	</nav>

	<!-- Blog post container -->
	<article class="blog-post">
		<header class="post-header">
			<h1 class="post-title">{title}</h1>
			{#if date || readTime}
				<div class="post-meta">
					{#if date}<time>📅 {date}</time>{/if}
					{#if readTime}<span>⏰ {readTime}</span>{/if}
				</div>
			{/if}
		</header>

		<!-- This is where your markdown content gets rendered -->
		<div class="post-content">
			{@render children()}
		</div>
	</article>
</div>

<style>
	@font-face {
		font-family: 'OpenDyslexicMono';
		src: url('/fonts/OpenDyslexicMono-Regular.woff2') format('woff2');
		font-display: swap;
	}

	.blog-wrapper {
		min-height: 100vh;
		background: linear-gradient(145deg, rgba(0, 0, 0, 0.97) 0%, rgba(0, 0, 0, 0.99) 100%);
		color: white;
		padding: 2rem;
	}

	.blog-nav {
		max-width: 800px;
		margin: 0 auto 2rem;
	}

	.back-button {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		color: #14b8a6;
		text-decoration: none;
		padding: 0.5rem 1rem;
		border-radius: 0.5rem;
		transition: background-color 0.2s ease;
	}

	.back-button:hover {
		background-color: rgba(20, 184, 166, 0.1);
	}

	.blog-post {
		max-width: 800px;
		margin: 0 auto;
		background: white;
		color: #1f2937;
		border-radius: 1rem;
		padding: 3rem;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}

	.post-header {
		text-align: center;
		margin-bottom: 3rem;
		border-bottom: 1px solid #e5e7eb;
		padding-bottom: 2rem;
	}

	.post-title {
		font-size: 2.5rem;
		font-weight: 700;
		margin-bottom: 1rem;
		color: #1f2937;
		line-height: 1.2;
	}

	.post-meta {
		display: flex;
		justify-content: center;
		gap: 1rem;
		opacity: 0.7;
		font-size: 0.9rem;
		color: #6b7280;
	}

	.post-content {
		line-height: 1.7;
	}

	/* Style the markdown content */
	:global(.post-content h1) {
		font-size: 2rem;
		font-weight: 700;
		margin: 2rem 0 1rem;
		color: #1f2937;
	}

	:global(.post-content h2) {
		font-size: 1.5rem;
		font-weight: 600;
		margin: 1.5rem 0 0.75rem;
		color: #374151;
	}

	:global(.post-content h3) {
		font-size: 1.25rem;
		font-weight: 600;
		margin: 1rem 0 0.5rem;
		color: #4b5563;
	}

	:global(.post-content p) {
		margin-bottom: 1rem;
		color: #4b5563;
	}

	:global(.post-content ul, .post-content ol) {
		margin: 1rem 0;
		padding-left: 1.5rem;
	}

	:global(.post-content li) {
		margin-bottom: 0.5rem;
		color: #4b5563;
	}

	:global(.post-content a) {
		color: #14b8a6;
		text-decoration: none;
		border-bottom: 1px solid transparent;
		transition: border-color 0.2s ease;
	}

	:global(.post-content a:hover) {
		border-bottom-color: #14b8a6;
	}

	:global(.post-content code) {
		background: #f3f4f6;
		padding: 0.2rem 0.4rem;
		border-radius: 0.25rem;
		font-size: 0.9em;
		color: #374151;
	}

	:global(.post-content pre) {
		background: #1f2937;
		color: #f9fafb;
		padding: 1.5rem;
		border-radius: 0.5rem;
		overflow-x: auto;
		margin: 1.5rem 0;
	}

	:global(.post-content pre code) {
		background: none;
		color: inherit;
		padding: 0;
	}

	:global(.post-content blockquote) {
		border-left: 4px solid #14b8a6;
		padding-left: 1rem;
		margin: 1.5rem 0;
		color: #6b7280;
		font-style: italic;
	}

	:global(.post-content table) {
		width: 100%;
		border-collapse: collapse;
		margin: 1.5rem 0;
	}

	:global(.post-content th, .post-content td) {
		border: 1px solid #e5e7eb;
		padding: 0.75rem;
		text-align: left;
	}

	:global(.post-content th) {
		background: #f9fafb;
		font-weight: 600;
	}

	:global(.post-content hr) {
		border: none;
		height: 1px;
		background: #e5e7eb;
		margin: 2rem 0;
	}

	/* Mobile responsive */
	@media (max-width: 768px) {
		.blog-wrapper {
			padding: 1rem;
		}

		.blog-post {
			padding: 2rem 1.5rem;
		}

		.post-title {
			font-size: 2rem;
		}

		.post-meta {
			flex-direction: column;
			gap: 0.5rem;
		}
	}
</style>
