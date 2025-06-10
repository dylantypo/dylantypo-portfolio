<footer id="footer-content" aria-label="Copyright and contact">
	<p class="footer">
		<span id="copyright" aria-label="Copyright">©</span> Dylan Posner 2025
	</p>
	<button class="headshot" aria-label="View contact information">
		<img
			srcset="/icons/profile-100.webp 100w, /icons/profile-200.webp 200w, /icons/profile-400.webp 400w"
			sizes="(max-width: 480px) 50px, (max-width: 925px) 75px, 95px"
			src="/icons/profile-200.webp"
			width="95"
			height="95"
			alt="Stylized avatar headshot created by Midjourney"
			loading="lazy"
		/>
	</button>
</footer>

<style>
	#footer-content {
		padding-bottom: calc(var(--vh, 1vh) * 10);
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}

	.headshot {
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
	}

	.headshot:focus-visible {
		border-radius: 50%;
		outline: 3px solid var(--color-focus);
		outline-offset: 2px;
	}

	.headshot img {
		width: 10vmin;
		height: auto;
		margin: 1em;
		border-radius: 50%;
		opacity: 0.6;
		box-shadow: 0 8px 10px rgba(0, 0, 0, 0.85);
		transition:
			transform var(--transition-speed),
			opacity var(--transition-speed),
			box-shadow var(--transition-speed);
	}

	.headshot img:hover {
		transform: scale(1.2);
		opacity: 1;
		box-shadow: 0 12px 16px rgba(0, 0, 0, 0.75);
	}

	.footer {
		width: max-content;
		padding-left: var(--content-padding-current);
		font-size: var(--font-size-lg);
		flex-shrink: 0;
		font-family: var(--font-family-base);
	}

	/* Accessibility */
	@media (prefers-reduced-motion: reduce) {
		.headshot img {
			transition: none;
		}
	}
</style>
