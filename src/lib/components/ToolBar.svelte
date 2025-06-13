<script lang="ts">
	import gsap from 'gsap';
	import { Draggable } from 'gsap/Draggable';
	import { onMount, onDestroy } from 'svelte';

	let expandedTool = $state(false);
	let isTouchDevice = $state(false);

	let toolbar: HTMLElement;
	let draggableInstance: any;

	function toggleToolbar() {
		expandedTool = !expandedTool;
		updateDraggable();
	}

	function handleCloseToolbar() {
		expandedTool = false;
		updateDraggable();
	}

	function handleKeydown(event: { key: string }) {
		if (event.key === 'Enter' || event.key === ' ') {
			toggleToolbar();
		}
	}

	function handleOutsideClick(event: Event) {
		if (toolbar && expandedTool && !toolbar.contains(event.target as Node)) {
			expandedTool = false;
			updateDraggable();
		}
	}

	function updateDraggable() {
		if (draggableInstance) {
			if (expandedTool) {
				draggableInstance.disable();
			} else {
				draggableInstance.enable();
			}
		}
	}

	onMount(async () => {
		gsap.registerPlugin(Draggable);

		isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

		// Original animation
		gsap.fromTo(
			toolbar,
			{ x: '200' },
			{
				delay: 1.05,
				duration: 2,
				x: '0',
				ease: 'back',
				onComplete: () => {
					// Create proxy for consistent positioning
					const proxy = document.createElement('div');
					gsap.set(proxy, { x: 0, y: 0 });

					draggableInstance = Draggable.create(proxy, {
						type: 'x,y',
						trigger: toolbar,
						dragResistance: 0.75,
						edgeResistance: 1,
						cursor: 'grab',
						activeCursor: 'grabbing',
						minimumMovement: 3,
						clickableTest: function (element) {
							// Make toolbar-content and its children clickable (not draggable)
							return element.closest('.toolbar-content') !== null;
						},
						onClick: function () {
							// Only toggle if clicking the main toolbar (gear), not content
							if (!expandedTool) {
								toggleToolbar();
							}
						},
						onDrag: function () {
							gsap.set(toolbar, { x: this.x, y: this.y });
						},
						onDragEnd: function () {
							gsap.set(this.target, { x: 0, y: 0 });
							gsap.to(toolbar, {
								x: 0,
								y: 0,
								duration: 0.5,
								ease: 'elastic.out(1, 0.5)'
							});
						},
						snap: {
							x: function (value: number) {
								return 0;
							},
							y: function (value: number) {
								return 0;
							}
						},
						enabled: !expandedTool
					})[0];
				}
			}
		);

		document.addEventListener('click', handleOutsideClick);
		if (isTouchDevice) {
			document.addEventListener('touchstart', handleOutsideClick);
		}
	});

	onDestroy(() => {
		document.removeEventListener('click', handleOutsideClick);
		if (isTouchDevice) {
			document.removeEventListener('touchstart', handleOutsideClick);
		}
		if (draggableInstance) {
			draggableInstance.kill();
		}
	});
</script>

<!-- Toolbar -->
<div
	bind:this={toolbar}
	class="toolbar {expandedTool ? 'expandedTool' : ''}"
	onkeydown={handleKeydown}
	onmouseleave={isTouchDevice ? undefined : handleCloseToolbar}
	tabindex="0"
	role="button"
	aria-pressed={expandedTool}
	aria-label={expandedTool ? 'Collapse toolbar menu' : 'Expand toolbar menu'}
>
	<div class="toolbar-content">
		<a
			href="https://www.linkedin.com/in/dylan-posner-3a0034152/"
			target="_blank"
			class="toolbar-link"
			aria-label="Visit Dylan's LinkedIn profile"
		>
			<div class="wrapper"><i class="fab fa-linkedin-in fa-2xl" aria-hidden="true"></i></div>
		</a>
		<a
			href="https://github.com/dylantypo/dylantypo.github.io"
			target="_blank"
			class="toolbar-link"
			aria-label="Visit Dylan's GitHub repository"
		>
			<div class="wrapper"><i class="fab fa-github fa-2xl" aria-hidden="true"></i></div>
		</a>
		<a href="/resume" target="_blank" class="toolbar-link" aria-label="Download Dylan's Resume">
			<div class="wrapper"><i class="fa-solid fa-file fa-2xl" aria-hidden="true"></i></div>
		</a>
		<button class="close-button" onclick={toggleToolbar} aria-label="Close toolbar">
			<div class="wrapper">
				<i
					class="fa-solid fa-angle-down fa-beat-fade fa-2xl"
					style="--fa-animation-delay: 3s"
					aria-hidden="true"
				></i>
			</div>
		</button>
	</div>
	{#if !expandedTool}
		<i
			class="fa-solid fa-gear fa-spin fa-2xl"
			style="--fa-animation-duration: 10s"
			aria-hidden="true"
		></i>
	{/if}
</div>

<style>
	.wrapper {
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 40px;
		width: 40px;
	}

	.toolbar {
		position: fixed;
		bottom: 10vh;
		right: 5vw;
		background: var(--color-secondary);
		opacity: 65%;
		border-radius: 50%;
		width: 50px;
		height: 50px;
		transition:
			height 0.6s var(--transition-ease),
			border-radius 1s var(--transition-ease),
			opacity 1s var(--transition-speed);
		color: var(--color-primary);
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		z-index: var(--z-index-toolbar);
	}

	.toolbar.expandedTool {
		height: 228px;
		border-radius: 25px;
	}

	.toolbar-content {
		display: none;
	}

	.toolbar.expandedTool .toolbar-content {
		display: flex;
		flex-direction: column;
		align-content: space-around;
	}

	.toolbar-link {
		padding-bottom: var(--spacing-base);
		color: var(--color-primary);
		text-decoration: none;
	}

	.toolbar-link:focus-visible {
		border-radius: 50%;
		outline: 3px solid var(--color-focus);
		outline-offset: 2px;
	}

	.close-button {
		background: none;
		border: none;
		padding: 0;
		color: var(--color-primary);
		cursor: pointer;
	}

	.close-button:focus-visible {
		border-radius: 50%;
		outline: 3px solid var(--color-focus);
		outline-offset: 2px;
	}

	@media (max-width: 1030px) {
		.toolbar {
			opacity: 50%;
			bottom: 12vh;
			right: 8vw;
			width: 45px;
			height: 45px;
		}

		.toolbar.expandedTool {
			opacity: 100%;
		}
	}
</style>
