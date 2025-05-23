<script lang="ts">
	import { marked } from 'marked';
	import DOMPurify from 'dompurify';

	let { markdownContent = '', fileName = 'resume.md' } = $props<{
		markdownContent: string;
		fileName?: string;
	}>();

	// 🆕 Add dyslexia mode state
	let isDyslexiaMode = $state(false);

	let safeHtml = $derived(
		DOMPurify.sanitize(marked.parse(markdownContent, { async: false }) as string)
	);

	function handlePrint() {
		window.print();
	}

	function handleDownload() {
		const blob = new Blob([markdownContent], { type: 'text/markdown' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = fileName;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	}

	// 🆕 Toggle dyslexia mode
	function toggleDyslexiaMode() {
		isDyslexiaMode = !isDyslexiaMode;
	}
</script>

<div class="outer-container">
	<!-- Controls -->
	<div class="controls">
		<button onclick={handlePrint} class="control-button">
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
				<polyline points="6 9 6 2 18 2 18 9"></polyline>
				<path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
				<rect x="6" y="14" width="12" height="8"></rect>
			</svg>
			Print PDF
		</button>

		<button onclick={handleDownload} class="control-button">
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
				<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
				<polyline points="7 10 12 15 17 10"></polyline>
				<line x1="12" y1="15" x2="12" y2="3"></line>
			</svg>
			Download MD
		</button>

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

	<!-- Resume -->
	<div class="resume-scroll-container">
		<div class="resume-container" class:dyslexia-mode={isDyslexiaMode}>
			<div class="resume-content" class:dyslexia-mode={isDyslexiaMode}>
				{@html safeHtml}
			</div>
		</div>
	</div>
</div>

<style>
	/* 🆕 Add OpenDyslexic font face */
	@font-face {
		font-family: 'OpenDyslexicMono';
		src: url('/fonts/OpenDyslexicMono-Regular.otf') format('opentype');
		font-display: swap;
	}

	/* Base styles */
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

	.resume-scroll-container {
		width: 100%;
		max-width: calc(210mm + 4rem);
		margin: 0 auto;
		display: flex;
		justify-content: center;
		padding: 0 var(--spacing-lg);
		box-sizing: border-box;
	}

	.resume-container {
		width: 210mm;
		min-height: 297mm;
		background: white;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
		position: relative;
		margin: var(--spacing-lg) 0;
		border-radius: 1cqb;
	}

	/* 🆕 Dyslexia mode styles */
	.resume-container.dyslexia-mode {
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

	.resume-content {
		padding: 4cqmin;
		box-sizing: border-box;
	}

	/* 🆕 Conditional font family */
	.resume-content.dyslexia-mode {
		font-family: 'OpenDyslexicMono', monospace;
	}

	/* Typography styles */
	:global(.resume-content) {
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

	:global(.resume-content div[align='center'] p) {
		word-break: break-word;
		font-size: 1em;
	}

	:global(.resume-content.dyslexia-mode) {
		font-family: 'OpenDyslexicMono', monospace;
		line-height: 1.4; /* Slightly increased for better readability */
	}

	:global(.resume-content h1) {
		font-size: calc(var(--font-size-base) * 1.75);
		font-weight: 700;
		margin-bottom: var(--spacing-base);
		color: var(--color-primary);
		letter-spacing: -0.02em;
	}

	:global(.resume-content h2) {
		font-size: calc(var(--font-size-base) * 1.25);
		font-weight: 600;
		margin-bottom: calc(var(--spacing-base) * 0.75);
		margin-top: var(--spacing-lg);
		color: #1f2937;
		letter-spacing: -0.01em;
		page-break-after: avoid;
	}

	:global(.resume-content h3) {
		font-size: var(--font-size-base);
		font-weight: 600;
		margin-bottom: calc(var(--spacing-base) * 0.5);
		margin-top: var(--spacing-base);
		color: #374151;
		page-break-after: avoid;
	}

	:global(.resume-content p) {
		color: #4b5563;
		margin-bottom: var(--spacing-base);
		line-height: 1.6;
	}

	:global(.resume-content ul) {
		list-style-type: disc;
		margin-left: calc(var(--spacing-base) * 1.25);
		margin-bottom: var(--spacing-base);
	}

	:global(.resume-content li) {
		margin-bottom: calc(var(--spacing-base) * 0.5);
		color: #4b5563;
	}

	:global(.resume-content a) {
		color: var(--color-primary);
		text-decoration: none;
		border-bottom: 1px solid #d1d5db;
	}

	:global(.resume-content hr) {
		margin: var(--spacing-lg) 0;
		border: none;
		height: 1px;
		background-color: #e5e7eb;
	}

	/* Controls styling */
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
	}

	.control-button:hover {
		background: rgba(255, 255, 255, 1);
		transform: translateY(-1px);
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	}

	/* 🆕 Dyslexia button specific styles */
	.dyslexia-button {
		font-family: 'OpenDyslexicMono', monospace; /* Default font */
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

	/* Print styles */
	@media print {
		/* 🔧 STEP 1: Reset ALL devices to desktop sizing first */

		/* Force desktop viewport behavior */
		:global(html) {
			-webkit-text-size-adjust: 100% !important;
			text-size-adjust: 100% !important;
			background: white !important;
			margin: 0 !important;
			padding: 0 !important;
			width: 100% !important;
			height: auto !important;
		}

		:global(body) {
			background: white !important;
			margin: 0 !important;
			padding: 0 !important;
			width: 100% !important;
			height: auto !important;
			transform: none !important;
			-webkit-transform: none !important;
		}

		/* 🚫 Hide all UI controls */
		.controls {
			display: none !important;
			visibility: hidden !important;
		}

		/* 📱 RESET: Force mobile containers to desktop size */
		.outer-container {
			background: white !important;
			padding: 0 !important;
			margin: 0 !important;
			width: 100% !important;
			max-width: none !important;
			height: auto !important;
			min-height: auto !important;
			display: block !important;
			position: static !important;
			transform: none !important;
			-webkit-transform: none !important;
			overflow: visible !important;
		}

		.resume-scroll-container {
			background: white !important;
			padding: 0 !important;
			margin: 0 !important;
			width: 100% !important;
			max-width: none !important;
			height: auto !important;
			display: block !important;
			position: static !important;
			transform: none !important;
			-webkit-transform: none !important;
			overflow: visible !important;
		}

		/* 🔄 STEP 2: Force desktop resume container dimensions */
		.resume-container {
			/* Reset from mobile responsive sizing */
			width: 210mm !important; /* Force desktop width first */
			min-width: 210mm !important;
			max-width: 210mm !important;
			min-height: 297mm !important; /* A4 height */

			/* Then apply print sizing */
			width: 8.5in !important;
			min-width: 8.5in !important;
			max-width: 8.5in !important;
			min-height: 11in !important;

			/* Reset positioning and effects */
			margin: 0 auto !important;
			padding: 0 !important;
			background: white !important;
			position: static !important;
			display: block !important;
			transform: none !important;
			-webkit-transform: none !important;

			/* 🚫 Remove ALL visual effects */
			box-shadow: none !important;
			border: none !important;
			border-radius: 0 !important;
			animation: none !important;
			-webkit-animation: none !important;
			overflow: visible !important;
		}

		/* 🚫 Force remove dyslexia mode styling in print */
		.resume-container.dyslexia-mode {
			border: none !important;
			background: white !important;
			box-shadow: none !important;
			animation: none !important;
			-webkit-animation: none !important;
		}

		/* 📝 STEP 3: Force desktop content dimensions */
		.resume-content {
			/* Reset from mobile padding */
			padding: 4cqmin !important; /* Reset mobile first */

			/* Then apply consistent print sizing */
			width: 7.5in !important;
			min-width: 7.5in !important;
			max-width: 7.5in !important;
			margin: 0 auto !important;
			padding: 0.5in !important;

			/* Reset everything else */
			background: white !important;
			color: black !important;
			position: static !important;
			display: block !important;
			transform: none !important;
			-webkit-transform: none !important;

			/* Box model consistency */
			-webkit-box-sizing: border-box !important;
			box-sizing: border-box !important;

			/* Remove any effects */
			border: none !important;
			border-radius: 0 !important;
			box-shadow: none !important;
			overflow: visible !important;
			height: auto !important;
			min-height: auto !important;
			max-height: none !important;
		}

		/* 📱 MOBILE-SPECIFIC RESETS */
		@media screen and (max-width: 768px) {
			.resume-container {
				/* Extra force for mobile Chrome */
				-webkit-appearance: none !important;
				appearance: none !important;
				zoom: 1 !important;
				-webkit-zoom: 1 !important;
			}

			.resume-content {
				/* Mobile Safari specific */
				-webkit-overflow-scrolling: auto !important;
			}
		}

		/* 📏 Force exact same font rendering */
		:global(.resume-content *) {
			-webkit-font-smoothing: antialiased !important;
			-moz-osx-font-smoothing: grayscale !important;
			text-rendering: optimizeLegibility !important;
			background: transparent !important;
			border: none !important;
			box-shadow: none !important;
			transform: none !important;
			-webkit-transform: none !important;
		}

		/* 🎯 Consistent typography - desktop sizing */
		:global(.resume-content h1) {
			font-size: 18pt !important;
			line-height: 1.1 !important;
			margin: 0 0 8pt 0 !important;
			color: black !important;
			font-weight: bold !important;
		}

		:global(.resume-content h2) {
			font-size: 14pt !important;
			line-height: 1.1 !important;
			margin: 10pt 0 4pt 0 !important;
			color: black !important;
			font-weight: bold !important;
		}

		:global(.resume-content h3) {
			font-size: 12pt !important;
			line-height: 1.1 !important;
			margin: 5pt 0 3pt 0 !important;
			color: black !important;
			font-weight: bold !important;
		}

		:global(.resume-content p) {
			font-size: 12pt !important;
			line-height: 1.2 !important;
			margin: 0 0 4pt 0 !important;
			color: black !important;
		}

		:global(.resume-content ul) {
			margin: 2pt 0 4pt 20pt !important;
			padding: 0 !important;
			list-style-type: disc !important;
		}

		:global(.resume-content li) {
			font-size: 12pt !important;
			line-height: 1.2 !important;
			margin: 0 0 2pt 0 !important;
			color: black !important;
		}

		:global(.resume-content a) {
			color: black !important;
			text-decoration: underline !important;
		}

		/* 🚫 Remove all dyslexia mode font overrides in print */
		:global(.resume-content.dyslexia-mode),
		:global(.resume-content.dyslexia-mode *) {
			font-family: 'Times New Roman', serif !important;
		}

		/* 📃 Page setup */
		@page {
			size: 8.5in 11in;
			margin: 0.5in;
		}
	}

	/* Mobile styles */
	@media (max-width: 640px) {
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

		.resume-scroll-container {
			padding: 0 var(--spacing-base);
		}

		.resume-container {
			margin: var(--spacing-base) 0;
			width: 100%;
		}

		.resume-content {
			padding: 1.5cm;
		}

		.control-button {
			padding: calc(var(--spacing-base) * 0.5) calc(var(--spacing-base) * 0.75);
			font-size: 0.875rem;
		}
	}
</style>
