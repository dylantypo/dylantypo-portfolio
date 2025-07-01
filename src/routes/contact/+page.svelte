<script lang="ts">
	import { onMount } from 'svelte';
	import Starfield from '$lib/components/starfield.svelte';

	// Form state using Svelte 5 runes
	let formData = $state({
		name: '',
		contact: '',
		service: '',
		details: ''
	});

	let isSubmitting = $state(false);
	let submitMessage = $state('');
	let messageType = $state<'success' | 'error' | ''>('');

	// Custom dropdown state
	let dropdownOpen = $state(false);

	// Service options
	const services = ['📸 Portraits', '🐕 Pet Pictures', '🎉 Events', '✨ Other'];

	// Form validation
	const isValid = $derived(
		formData.name.trim() !== '' && formData.contact.trim() !== '' && formData.service !== ''
	);

	async function handleSubmit(event: Event) {
		event.preventDefault();

		if (!isValid) {
			submitMessage = '⚠️ Please fill in required fields';
			messageType = 'error';
			return;
		}

		isSubmitting = true;
		submitMessage = '';

		try {
			const form = new FormData();
			form.append('name', formData.name);
			form.append('email', formData.contact);
			form.append('service', formData.service);
			form.append('message', formData.details);
			form.append('_subject', `Photography Inquiry: ${formData.service} - ${formData.name}`);

			const response = await fetch('https://formspree.io/f/mrbkjvly', {
				method: 'POST',
				headers: {
					Accept: 'application/json'
				},
				body: form
			});

			if (response.status >= 200 && response.status < 400) {
				submitMessage = '✅ Message sent successfully!';
				messageType = 'success';
				formData = { name: '', contact: '', service: '', details: '' };
			} else {
				throw new Error('Failed to send');
			}
		} catch (error) {
			submitMessage = '❌ Failed to send. Please try again.';
			messageType = 'error';
		} finally {
			isSubmitting = false;
		}
	}

	// Close dropdown when clicking outside
	function handleClickOutside(event: Event) {
		const target = event.target as HTMLElement;
		if (!target.closest('.custom-select')) {
			dropdownOpen = false;
		}
	}

	// Handle keyboard navigation
	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			dropdownOpen = false;
		}
	}

	// Dropdown effect
	$effect(() => {
		if (dropdownOpen) {
			document.addEventListener('click', handleClickOutside);
			document.addEventListener('keydown', handleKeydown);
		}

		return () => {
			document.removeEventListener('click', handleClickOutside);
			document.removeEventListener('keydown', handleKeydown);
		};
	});

	onMount(() => {
		window.scrollTo(0, 0);
	});
</script>

<svelte:head>
	<title>Contact | Dylan Posner</title>
	<meta
		name="description"
		content="Book a photography session with Dylan Posner. Professional portraits, pet photos, events, and custom shoots in Chicago."
	/>
	<meta property="og:title" content="Contact | Dylan Posner" />
	<meta
		property="og:description"
		content="Professional photography services - portraits, pets, events & more"
	/>
</svelte:head>

<!-- Stars background like homepage -->
<Starfield />

<main class="pics-container">
	<nav class="breadcrumb">
		<a href="/">🏠 Home</a>
		<span class="separator">→</span>
		<span class="current">📸 Photography</span>
	</nav>

	<section class="form-section">
		<div class="form-container">
			<h2 class="form-title">📋 Let's Plan Your Shoot</h2>

			<form onsubmit={handleSubmit} class="contact-form">
				<div class="form-group">
					<label for="name" class="form-label">
						Name <span class="required">*</span>
					</label>
					<input
						type="text"
						id="name"
						bind:value={formData.name}
						class="form-input"
						placeholder="Preferred Name"
						required
						autocomplete="name"
					/>
				</div>

				<div class="form-group">
					<label for="contact" class="form-label">
						Email or Phone Number<span class="required">*</span>
					</label>
					<input
						type="text"
						id="contact"
						bind:value={formData.contact}
						class="form-input"
						placeholder="Preferred Contact"
						required
					/>
				</div>

				<div class="form-group">
					<label for="service" class="form-label">
						Service Type <span class="required">*</span>
					</label>

					<div class="custom-select" class:open={dropdownOpen}>
						<button
							type="button"
							class="select-button"
							onclick={() => (dropdownOpen = !dropdownOpen)}
							aria-haspopup="listbox"
							aria-expanded={dropdownOpen}
							aria-labelledby="service-label"
							id="service"
						>
							<span class="select-text">
								{formData.service || 'Select a service...'}
							</span>
							<svg
								class="select-arrow"
								class:rotated={dropdownOpen}
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
							>
								<polyline points="6 9 12 15 18 9"></polyline>
							</svg>
						</button>

						{#if dropdownOpen}
							<div class="select-options" role="listbox">
								{#each services as service}
									<button
										type="button"
										class="select-option"
										class:selected={formData.service === service}
										onclick={() => {
											formData.service = service;
											dropdownOpen = false;
										}}
										role="option"
										aria-selected={formData.service === service}
										tabindex="0"
									>
										{service}
									</button>
								{/each}
							</div>
						{/if}
					</div>
				</div>

				<div class="form-group">
					<label for="details" class="form-label">💭 Details</label>
					<textarea
						id="details"
						bind:value={formData.details}
						class="form-textarea"
						placeholder="date, location, special requests, etc."
						rows="2"
					></textarea>
				</div>

				<button type="submit" class="submit-button" disabled={!isValid || isSubmitting}>
					{#if isSubmitting}
						⏳ Sending...
					{:else}
						📤 Send Inquiry
					{/if}
				</button>

				{#if submitMessage}
					<div class="form-message {messageType}">
						{submitMessage}
					</div>
				{/if}
			</form>
		</div>
	</section>

	<footer class="pics-footer">
		<div class="footer-content">
			<p>
				📸 My Work: <a href="https://www.instagram.com/dylanposnerphoto/" target="_blank"
					>@dylanposnerphoto</a
				>
			</p>
			<p>📧 My Email: <a href="mailto:dylantylerposner@gmail.com">dylantylerposner@gmail.com</a></p>
		</div>
	</footer>
</main>

<style>
	.pics-container {
		min-height: 100vh;
		width: 100%;
		max-width: 100vw;
		color: var(--color-text-primary);
		font-family: var(--font-family-base);
		overflow-x: hidden;
		box-sizing: border-box;
		padding: var(--spacing-base) 0;
	}

	/* Breadcrumb */
	.breadcrumb {
		max-width: min(90vw, 800px);
		margin: 0 auto var(--spacing-xl);
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: var(--spacing-sm);
		font-size: var(--font-size-base);
		opacity: 0.8;
		padding: 0 var(--spacing-lg);
	}

	.breadcrumb a {
		color: var(--color-secondary);
		text-decoration: none;
		transition: opacity var(--transition-speed) ease;
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

	/* Form Section */
	.form-section {
		width: 100%;
		padding-bottom: var(--spacing-base) - 50px;
	}

	.form-container {
		max-width: min(90vw, 600px);
		margin: 0 auto;
		padding: 0 var(--spacing-lg);
		box-sizing: border-box;
	}

	.form-title {
		font-size: var(--font-size-lg);
		margin-bottom: var(--spacing-xl);
		text-align: center;
		color: var(--color-text-primary);
	}

	.contact-form {
		border-radius: var(--spacing-base);
		padding: var(--spacing-xl);
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
		backdrop-filter: blur(1px);
		border: 1px solid rgba(255, 255, 255, 0.1);
		width: 100%;
		max-width: 100%;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-lg);
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: calc(var(--spacing-base) * 0.5);
		width: 100%;
		max-width: 100%;
	}

	.form-label {
		font-size: var(--font-size-base);
		font-weight: 500;
		color: var(--color-text-primary);
	}

	.required {
		color: var(--color-secondary);
	}

	.form-input,
	.form-textarea,
	.select-button {
		width: 100%;
		padding: var(--spacing-base);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: calc(var(--spacing-base) * 0.75);
		background: var(--color-hover);
		backdrop-filter: blur(8px);
		color: var(--color-text-primary);
		font-family: var(--font-family-base);
		font-size: var(--font-size-base);
		box-sizing: border-box;
	}

	.form-input,
	.select-button {
		transition: all var(--transition-speed) ease;
	}

	.form-input:focus,
	.form-textarea:focus {
		outline: none;
		border-color: var(--color-secondary);
		box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.1);
		background: rgba(255, 255, 255, 0.15);
	}

	.form-input::placeholder,
	.form-textarea::placeholder {
		color: rgba(255, 255, 255, 0.5);
	}

	.form-textarea {
		resize: vertical;
		min-height: 100px;
	}

	/* Custom Select Styles */
	.custom-select {
		position: relative;
		width: 100%;
	}

	.select-button {
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: space-between;
		text-align: left;
	}

	.select-button:focus {
		outline: none;
		border-color: var(--color-secondary);
		box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.1);
		background: rgba(255, 255, 255, 0.15);
	}

	.select-text {
		color: var(--color-text-primary);
		opacity: 1;
	}

	.select-button:not([aria-expanded='true']) .select-text {
		opacity: 0.7;
	}

	.custom-select.open .select-button {
		border-color: var(--color-secondary);
		background: rgba(255, 255, 255, 0.15);
	}

	.select-arrow {
		width: 20px;
		height: 20px;
		transition: transform var(--transition-speed) ease;
		color: var(--color-text-primary);
		opacity: 0.7;
	}

	.select-arrow.rotated {
		transform: rotate(180deg);
	}

	.select-options {
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		z-index: 100;
		background: var(--color-primary);
		backdrop-filter: blur(12px);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: calc(var(--spacing-base) * 0.75);
		margin-top: 4px;
		overflow: hidden;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);

		animation: dropdownFadeIn 0.2s ease-out;
	}

	@keyframes dropdownFadeIn {
		from {
			opacity: 0;
			transform: translateY(-8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.select-option {
		width: 100%;
		padding: var(--spacing-base);
		border: none;
		background: var(--color-hover);
		color: var(--color-text-primary);
		font-family: var(--font-family-base);
		font-size: var(--font-size-base);
		text-align: left;
		cursor: pointer;
		transition: all var(--transition-speed) ease;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}

	.select-option:last-child {
		border-bottom: none;
	}

	.select-option:hover,
	.select-option:focus {
		background: rgba(255, 255, 255, 0.1);
		outline: none;
	}

	.select-option.selected {
		background: rgba(20, 184, 166, 0.2);
		color: var(--color-secondary);
	}

	.submit-button {
		background: var(--color-secondary);
		color: white;
		border: none;
		border-radius: calc(var(--spacing-base) * 0.75);
		padding: var(--spacing-base) var(--spacing-lg);
		font-family: var(--font-family-base);
		font-size: var(--font-size-base);
		font-weight: 500;
		cursor: pointer;
		transition: all var(--transition-speed) ease;
		margin-top: var(--spacing-base);
		width: 100%;
		box-sizing: border-box;
	}

	.submit-button:hover:not(:disabled) {
		opacity: 0.8;
		transform: translateY(-1px);
	}

	.submit-button:disabled {
		opacity: 0.6;
		cursor: not-allowed;
		transform: none;
	}

	.form-message {
		text-align: center;
		padding: var(--spacing-base);
		border-radius: calc(var(--spacing-base) * 0.75);
		font-size: var(--font-size-base);
		margin-top: var(--spacing-base);
		backdrop-filter: blur(8px);
	}

	.form-message.success {
		background: rgba(16, 185, 129, 0.1);
		border: 1px solid rgba(16, 185, 129, 0.3);
		color: #10b981;
	}

	.form-message.error {
		background: rgba(239, 68, 68, 0.1);
		border: 1px solid rgba(239, 68, 68, 0.3);
		color: #ef4444;
	}

	/* Footer */
	.pics-footer {
		text-align: center;
		padding: var(--spacing-xl) var(--spacing-lg);
		margin-top: auto;
	}

	.footer-content {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-base);
		opacity: 0.7;
		font-size: var(--font-size-base);
	}

	.footer-content a {
		color: var(--color-secondary);
		text-decoration: none;
		transition: opacity var(--transition-speed) ease;
		display: inline-block;
	}

	.footer-content a:hover {
		opacity: 0.8;
	}

	.back-home {
		padding: calc(var(--spacing-base) * 0.75);
		background: var(--color-fill);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: calc(var(--spacing-base) * 0.75);
		backdrop-filter: blur(4px);
		transition: all var(--transition-speed) ease;
		margin-top: var(--spacing-base);
	}

	.back-home:hover {
		background: var(--color-hover);
		transform: translateY(-1px);
	}

	.back-home:focus-visible {
		outline: 2px solid var(--color-focus);
		outline-offset: 2px;
	}

	/* Responsive adjustments using existing breakpoints */
	@media (max-width: 925px) {
		.form-container {
			padding: 0 var(--content-padding-current);
		}

		.contact-form {
			padding: var(--spacing-lg);
		}

		.breadcrumb {
			padding: 0 var(--content-padding-current);
		}
	}

	@media (max-width: 610px) {
		.breadcrumb {
			font-size: 0.8rem;
		}

		.contact-form {
			padding: var(--spacing-base);
		}
	}

	/* Mobile optimizations */
	@media (max-width: 768px) {
		.select-options {
			box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
		}
	}

	/* Accessibility */
	@media (prefers-reduced-motion: reduce) {
		.submit-button,
		.form-input,
		.form-textarea,
		.select-arrow,
		.select-button,
		.select-option {
			transition: none;
		}

		.submit-button:hover {
			transform: none;
		}

		.select-options {
			animation: none;
		}
	}
</style>
