<script lang="ts">
	import { page } from '$app/state';
	import { marked } from 'marked';
	import DOMPurify from 'dompurify';
	import { onMount } from 'svelte';

	// Get the slug from the URL
	let { slug } = page.params;

	// Post state
	let markdownContent = $state('');
	let postMeta = $state({
		title: '',
		date: '',
		readTime: '',
		excerpt: ''
	});
	let isLoading = $state(true);
	let error = $state<string | null>(null);

	// 🆕 Add dyslexia mode state (copying from ResumeViewer)
	let isDyslexiaMode = $state(false);

	let safeHtml = $derived(
		DOMPurify.sanitize(marked.parse(markdownContent, { async: false }) as string)
	);

	// 🆕 Toggle dyslexia mode
	function toggleDyslexiaMode() {
		isDyslexiaMode = !isDyslexiaMode;
	}

	async function loadPost() {
		isLoading = true;
		error = null;

		try {
			const response = await fetch(`/blog/posts/${slug}.md`);
			if (!response.ok) {
				throw new Error(`Post not found (${response.status})`);
			}

			const content = await response.text();

			// Parse frontmatter (basic implementation)
			const lines = content.split('\n');
			let frontmatterEnd = 0;
			let meta: Record<string, string> = {};

			if (lines[0] === '---') {
				for (let i = 1; i < lines.length; i++) {
					if (lines[i] === '---') {
						frontmatterEnd = i + 1;
						break;
					}
					const [key, ...value] = lines[i].split(':');
					if (key && value.length) {
						meta[key.trim()] = value.join(':').trim();
					}
				}
			}

			postMeta = {
				title: meta['title'] || 'Untitled Post',
				date: meta['date'] || '',
				readTime: meta['readTime'] || '',
				excerpt: meta['excerpt'] || ''
			};

			markdownContent = lines.slice(frontmatterEnd).join('\n');
		} catch (err) {
			error = err instanceof Error ? err.message : 'Failed to load post';
			markdownContent = '# Error\nPost not found.';
		} finally {
			isLoading = false;
		}
	}

	onMount(() => {
		loadPost();
	});
</script>

<svelte:head>
	<title>{postMeta.title} | Dylan Posner</title>
	<meta name="description" content={postMeta.excerpt} />
</svelte:head>

<div class="post-container">
	<!-- Controls (copying from ResumeViewer) -->
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

		<!-- 🆕 Dyslexia Mode Button -->
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

	{#if isLoading}
		<div class="loading">
			<div class="spinner"></div>
			<p>Loading post...</p>
		</div>
	{:else if error}
		<div class="error">
			<h1>❌ {error}</h1>
			<a href="/blog">← Back to Blog</a>
		</div>
	{:else}
		<!-- Post -->
		<article class="post-scroll-container">
			<div class="post-wrapper" class:dyslexia-mode={isDyslexiaMode}>
				<header class="post-header">
					<h1 class="post-title">{postMeta.title}</h1>
					{#if postMeta.date || postMeta.readTime}
						<div class="post-meta">
							{#if postMeta.date}<time>{postMeta.date}</time>{/if}
							{#if postMeta.readTime}<span>{postMeta.readTime}</span>{/if}
						</div>
					{/if}
				</header>

				<div class="post-content" class:dyslexia-mode={isDyslexiaMode}>
					{@html safeHtml}
				</div>
			</div>
		</article>
	{/if}
</div>

<style>
	/* 🆕 Add OpenDyslexic font face (copying from ResumeViewer) */
	@font-face {
		font-family: 'OpenDyslexicMono';
		src: url('/fonts/OpenDyslexicMono-Regular.woff2') format('woff2');
		font-display: swap;
	}

	/* Base styles */
	:global(body) {
		margin: 0;
		padding: 0;
		background-color: var(--color-background);
		min-height: 100%;
		height: auto;
	}

	.post-container {
		width: 100vw;
		min-height: 100vh;
		background-color: var(--color-background);
		color: var(--color-text-primary);
		font-family: var(--font-family-base);
	}

	.loading {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 50vh;
		gap: var(--spacing-base);
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
		text-align: center;
		padding: var(--spacing-xl);
		color: #ef4444;
	}

	.error a {
		color: var(--color-secondary);
		text-decoration: none;
	}

	.post-scroll-container {
		max-width: 800px;
		margin: 0 auto;
		padding: var(--spacing-xl) var(--content-padding-current);
	}

	.post-wrapper {
		background: rgba(255, 255, 255, 0.05);
		border-radius: 0.5rem;
		padding: var(--spacing-xl);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}

	/* 🆕 Dyslexia mode styles */
	.post-wrapper.dyslexia-mode {
		border: 3px solid transparent;
		background:
			linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)) padding-box,
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

	.post-header {
		margin-bottom: var(--spacing-xl);
		text-align: center;
	}

	.post-title {
		font-size: 2.5rem;
		margin-bottom: var(--spacing-base);
		line-height: 1.2;
	}

	.post-meta {
		display: flex;
		justify-content: center;
		gap: var(--spacing-base);
		opacity: 0.7;
		font-size: 0.9rem;
	}

	.post-content {
		line-height: 1.6;
	}

	/* 🆕 Conditional font family */
	.post-content.dyslexia-mode {
		font-family: 'OpenDyslexicMono', monospace;
		line-height: 1.8;
	}

	/* Typography styles for markdown content */
	:global(.post-content h1) {
		font-size: 2rem;
		margin: 2rem 0 1rem;
	}
	:global(.post-content h2) {
		font-size: 1.5rem;
		margin: 1.5rem 0 0.75rem;
	}
	:global(.post-content h3) {
		font-size: 1.25rem;
		margin: 1.25rem 0 0.5rem;
	}
	:global(.post-content p) {
		margin-bottom: 1rem;
	}
	:global(.post-content ul, .post-content ol) {
		margin-bottom: 1rem;
		padding-left: 1.5rem;
	}
	:global(.post-content li) {
		margin-bottom: 0.5rem;
	}
	:global(.post-content a) {
		color: var(--color-secondary);
		text-decoration: none;
		border-bottom: 1px solid rgba(20, 184, 166, 0.3);
	}
	:global(.post-content a:hover) {
		border-bottom-color: var(--color-secondary);
	}
	:global(.post-content code) {
		background: var(--color-fill);
		padding: 0.2rem 0.4rem;
		border-radius: 0.25rem;
		font-size: 0.9em;
	}
	:global(.post-content pre) {
		background: var(--color-fill);
		padding: 1rem;
		border-radius: 0.5rem;
		overflow-x: auto;
		margin: 1rem 0;
	}

	/* Controls styling (copying from ResumeViewer) */
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

	/* 🆕 Dyslexia button specific styles */
	.dyslexia-button.active {
		background:
			linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95)) padding-box,
			linear-gradient(45deg, #ff0080, #ff8c00, #40e0d0, #ff0080) border-box;
		border: 2px solid transparent;
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

	@media (max-width: 768px) {
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

		.post-scroll-container {
			padding-bottom: 7rem;
		}

		.post-title {
			font-size: 2rem;
		}
	}
</style>
