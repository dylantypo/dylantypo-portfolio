<script lang="ts">
	import { marked } from 'marked';
	import DOMPurify from 'dompurify';

	type PostData = {
		slug: string;
		title: string;
		date: string;
		readTime: string;
		excerpt: string;
		content: string;
	};

	// Get server-loaded data
	let { data } = $props<{ data: { post: PostData } }>();
	let isDyslexiaMode = $state(false);

	// Process markdown on client
	let safeHtml = $derived(
		DOMPurify.sanitize(marked.parse(data.post.content, { async: false }) as string)
	);

	function toggleDyslexiaMode() {
		isDyslexiaMode = !isDyslexiaMode;
	}
</script>

<svelte:head>
	<title>{data.post.title} | Dylan Posner</title>
	<meta name="description" content={data.post.excerpt} />
</svelte:head>

<div class="outer-container">
	<!-- Controls -->
	<div class="controls">
		<a href="/blog" class="control-button">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path d="M19 12H5M12 19l-7-7 7-7" />
			</svg>
			Back to Blog
		</a>

		<button
			onclick={toggleDyslexiaMode}
			class="control-button dyslexia-button"
			class:active={isDyslexiaMode}
			aria-pressed={isDyslexiaMode}
			title={isDyslexiaMode ? 'Disable dyslexia-friendly font' : 'Enable dyslexia-friendly font'}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path
					d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"
				></path>
			</svg>
			Dyslexia Mode
		</button>
	</div>

	<!-- Blog Post -->
	<div class="blog-scroll-container">
		<div class="blog-container" class:dyslexia-mode={isDyslexiaMode}>
			<div class="blog-content" class:dyslexia-mode={isDyslexiaMode}>
				<header class="post-header">
					<h1 class="post-title">{data.post.title}</h1>
					{#if data.post.date || data.post.readTime}
						<div class="post-meta">
							{#if data.post.date}<time>📅 {data.post.date}</time>{/if}
							{#if data.post.readTime}<span>⏰ {data.post.readTime}</span>{/if}
						</div>
					{/if}
				</header>

				<div class="post-content">
					{@html safeHtml}
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	/* Add OpenDyslexic font face */
	@font-face {
		font-family: 'OpenDyslexicMono';
		src: url('/fonts/OpenDyslexicMono-Regular.woff2') format('woff2');
		font-display: swap;
	}

	/* Base styles - same as resume viewer */
	:global(body) {
		margin: 0;
		padding: 0;
		background: linear-gradient(145deg, rgba(0, 0, 0, 0.97) 0%, rgba(0, 0, 0, 0.99) 100%);
		min-height: 100%;
		height: auto;
	}

	.outer-container {
		width: 100vw;
		min-height: 100vh;
		height: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: var(--spacing-base) 0;
		box-sizing: border-box;
		background: linear-gradient(145deg, rgba(0, 0, 0, 0.97) 0%, rgba(0, 0, 0, 0.99) 100%);
	}

	.blog-scroll-container {
		width: 100%;
		max-width: calc(210mm + 4rem);
		margin: 0 auto;
		display: flex;
		justify-content: center;
		padding: 0 var(--spacing-lg);
		box-sizing: border-box;
	}

	.blog-container {
		width: 210mm;
		min-height: 297mm;
		background: white;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
		position: relative;
		margin: var(--spacing-lg) 0;
		border-radius: 1cqb;
	}

	/* Dyslexia mode styles - same as resume viewer */
	.blog-container.dyslexia-mode {
		border: 3px solid transparent;
		background:
			linear-gradient(white, white) padding-box,
			linear-gradient(45deg, #ff0080, #ff8c00, #40e0d0, #ff0080) border-box;
		animation: rainbow-glow 3s ease-in-out infinite alternate;
	}

	@keyframes rainbow-glow {
		0% {
			box-shadow: 0 0 20px rgba(255, 0, 128, 0.5);
		}
		33% {
			box-shadow: 0 0 20px rgba(255, 140, 0, 0.5);
		}
		66% {
			box-shadow: 0 0 20px rgba(64, 224, 208, 0.5);
		}
		100% {
			box-shadow: 0 0 20px rgba(255, 0, 128, 0.5);
		}
	}

	.blog-content {
		padding: 4cqmin;
		box-sizing: border-box;
	}

	/* Conditional font family - same as resume viewer */
	.blog-content.dyslexia-mode {
		font-family: 'OpenDyslexicMono', monospace;
	}

	/* Typography styles for blog content */
	:global(.blog-content) {
		font-family:
			'Inter',
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			sans-serif;
		line-height: 1.25;
		font-size: var(--font-size-base);
	}

	:global(.blog-content.dyslexia-mode) {
		font-family: 'OpenDyslexicMono', monospace;
		line-height: 1.4;
	}

	.post-header {
		margin-bottom: var(--spacing-xl);
		text-align: center;
	}

	.post-title {
		font-size: calc(var(--font-size-base) * 2);
		font-weight: 700;
		margin-bottom: var(--spacing-base);
		color: var(--color-primary);
		letter-spacing: -0.02em;
	}

	.post-meta {
		display: flex;
		justify-content: center;
		gap: var(--spacing-base);
		opacity: 0.7;
		font-size: 0.9rem;
		color: #4b5563;
	}

	.post-content {
		line-height: 1.6;
		color: #4b5563;
	}

	/* Blog post specific typography */
	:global(.post-content h1) {
		font-size: calc(var(--font-size-base) * 1.75);
		font-weight: 700;
		margin-bottom: var(--spacing-base);
		margin-top: var(--spacing-lg);
		color: var(--color-primary);
		letter-spacing: -0.02em;
	}

	:global(.post-content h2) {
		font-size: calc(var(--font-size-base) * 1.25);
		font-weight: 600;
		margin-bottom: calc(var(--spacing-base) * 0.75);
		margin-top: var(--spacing-lg);
		color: #1f2937;
		letter-spacing: -0.01em;
	}

	:global(.post-content h3) {
		font-size: var(--font-size-base);
		font-weight: 600;
		margin-bottom: calc(var(--spacing-base) * 0.5);
		margin-top: var(--spacing-base);
		color: #374151;
	}

	:global(.post-content p) {
		color: #4b5563;
		margin-bottom: var(--spacing-base);
		line-height: 1.6;
	}

	:global(.post-content ul) {
		list-style-type: disc;
		margin-left: calc(var(--spacing-base) * 1.25);
		margin-bottom: var(--spacing-base);
	}

	:global(.post-content ol) {
		list-style-type: decimal;
		margin-left: calc(var(--spacing-base) * 1.25);
		margin-bottom: var(--spacing-base);
	}

	:global(.post-content li) {
		margin-bottom: calc(var(--spacing-base) * 0.5);
		color: #4b5563;
	}

	:global(.post-content a) {
		color: var(--color-primary);
		text-decoration: none;
		border-bottom: 1px solid #d1d5db;
	}

	:global(.post-content a:hover) {
		border-bottom-color: var(--color-primary);
	}

	:global(.post-content code) {
		background: #f3f4f6;
		padding: 0.2rem 0.4rem;
		border-radius: 0.25rem;
		font-size: 0.9em;
		color: #374151;
	}

	:global(.post-content pre) {
		background: #f3f4f6;
		padding: 1rem;
		border-radius: 0.5rem;
		overflow-x: auto;
		margin: 1rem 0;
		border: 1px solid #e5e7eb;
	}

	:global(.post-content blockquote) {
		border-left: 4px solid var(--color-primary);
		padding-left: 1rem;
		margin: 1rem 0;
		color: #6b7280;
		font-style: italic;
	}

	:global(.post-content hr) {
		margin: var(--spacing-lg) 0;
		border: none;
		height: 1px;
		background-color: #e5e7eb;
	}

	:global(.post-content table) {
		width: 100%;
		border-collapse: collapse;
		margin: var(--spacing-base) 0;
	}

	:global(.post-content th, .post-content td) {
		border: 1px solid #e5e7eb;
		padding: 0.5rem;
		text-align: left;
	}

	:global(.post-content th) {
		background: #f9fafb;
		font-weight: 600;
	}

	/* Controls styling - same as resume viewer */
	.controls {
		position: fixed;
		padding: var(--spacing-base);
		z-index: var(--z-index-modal);
		display: flex;
		gap: var(--spacing-base);
		top: var(--spacing-lg);
		right: var(--spacing-lg);
	}

	.control-button {
		background: rgba(255, 255, 255, 0.95);
		color: var(--color-primary);
		padding: calc(var(--spacing-base) * 0.75) calc(var(--spacing-base) * 1.25);
		border-radius: 0.375rem;
		display: flex;
		align-items: center;
		gap: calc(var(--spacing-base) * 0.5);
		font-weight: 500;
		transition: all var(--transition-speed) ease;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		border: none;
		cursor: pointer;
		text-decoration: none;
		font-family: var(--font-family-base);
	}

	.control-button:hover {
		background: rgba(255, 255, 255, 1);
		transform: translateY(-1px);
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	}

	/* Dyslexia button specific styles - same as resume viewer */
	.dyslexia-button {
		font-family: 'OpenDyslexicMono', monospace;
		border: 2px solid transparent;
		transition: all var(--transition-speed) ease;
	}

	.dyslexia-button.active {
		background:
			linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95)) padding-box,
			linear-gradient(45deg, #ff0080, #ff8c00, #40e0d0, #ff0080) border-box;
		animation: button-rainbow 2s linear infinite;
	}

	@keyframes button-rainbow {
		0% {
			background-position: 0% 50%;
		}
		100% {
			background-position: 100% 50%;
		}
	}

	/* Mobile styles */
	@media (max-width: 1880px) {
		.controls {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			top: auto;
			background: linear-gradient(180deg, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 1) 100%);
			backdrop-filter: blur(2px);
			justify-content: center;
			flex-wrap: wrap;
		}

		.outer-container {
			padding-bottom: 7.5rem;
		}

		.blog-scroll-container {
			padding: 0 var(--spacing-base);
		}

		.blog-container {
			margin: var(--spacing-base) 0;
			width: 100%;
		}

		.blog-content {
			padding: 1.5cm;
		}

		.post-title {
			font-size: calc(var(--font-size-base) * 1.5);
		}

		.post-meta {
			flex-direction: column;
			gap: 0.25rem;
		}

		.control-button {
			padding: calc(var(--spacing-base) * 0.5) calc(var(--spacing-base) * 0.75);
			font-size: 0.875rem;
		}
	}
</style>
