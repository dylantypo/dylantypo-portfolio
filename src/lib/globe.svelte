<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import ScrollIndicator from '$lib/components/ScrollIndicator.svelte';
	import {
		debounce,
		categorizeDevice,
		checkNetworkConditions,
		getOptimizedTexturePath,
		getSharpFontSize,
		processRegionsData,
		calculateCloudsRotationSpeed,
		calculateIdealDistance,
		setCameraPosition,
		updateVH,
		updateCameraAspect,
		findFocusedCity,
		setupLighting,
		setupRenderers,
		createCloudsGeometry,
		setupCameraControls,
		connectControlsToGlobe,
		optimizeRendering,
		enhanceGlobeMaterial,
		setupGlobeTilt,
		loadThreeModules,
		loadGlobeModules,
		createHeroText,
		type DeviceCategory,
		type Region,
		type ThreeModules,
		type GlobeModules
	} from '$lib/utils';

	// Component props and state
	let container: HTMLDivElement;
	let { hero_text } = $props<{ hero_text: string }>();

	// State management
	let focusedLocationName = $state<string | null>(null);
	let globeInitialized = $state(false);
	let animationFrameId: number | undefined;
	let CLOUDS_ROTATION_SPEED: number;

	// Module references
	let threeModules: ThreeModules | null = null;
	let globeModules: GlobeModules | null = null;

	// Event handler storage - FIXED: Added proper cleanup tracking
	let cleanupFn: (() => void) | undefined;
	let intersectionObserver: IntersectionObserver | undefined;
	let animationObserver: IntersectionObserver | undefined;

	// Cache values
	let lastWidth = browser ? window.innerWidth : 0;
	let lastHeight = browser ? window.innerHeight : 0;
	let devicePixelCategory: DeviceCategory = 'low';

	// Regions data
	const regionsLived: Region[] = [
		{
			country: 'United States',
			description: 'Lived in California, Maine, Virginia, Illinois, and Georgia',
			states: [
				{
					name: 'Palo Alto',
					description: 'Lived in Palo Alto',
					lat: 37.4419,
					lng: -122.143,
					years: 0.5
				},
				{
					name: 'Aliso Viejo',
					description: 'Lived in Aliso Viejo',
					lat: 33.5686,
					lng: -117.7267,
					years: 6
				},
				{ name: 'Bangor', description: 'Lived in Bangor', lat: 44.8012, lng: -68.7778, years: 0.5 },
				{
					name: 'Arlington',
					description: 'Lived in Arlington',
					lat: 38.8797,
					lng: -77.1057,
					years: 8
				},
				{
					name: 'Blacksburg',
					description: 'Lived in Blacksburg',
					lat: 37.2296,
					lng: -80.4139,
					years: 4
				},
				{
					name: 'Chicago',
					description: 'Lived in Chicago',
					lat: 41.8781,
					lng: -87.6298,
					years: 0.5
				},
				{ name: 'Atlanta', description: 'Lived in Atlanta', lat: 33.749, lng: -84.388, years: 4 }
			]
		},
		{
			country: 'Brazil',
			description: 'Lived in São Paulo',
			states: [
				{
					name: 'São Paulo',
					description: 'Lived in São Paulo',
					lat: -23.5505,
					lng: -46.6333,
					years: 2
				}
			]
		},
		{
			country: 'Latvia',
			description: 'Lived in Rīga',
			states: [{ name: 'Rīga', description: 'Lived in Rīga', lat: 56.9496, lng: 24.1052, years: 2 }]
		}
	];

	const setFocusedLocationName = (name: string | null) => {
		focusedLocationName = name;
	};

	function createLocationMarker(data: any, setFocused: (name: string | null) => void): HTMLElement {
		const wrapper = document.createElement('div');
		const div = document.createElement('div');

		// Setup wrapper styles
		Object.assign(wrapper.style, {
			position: 'absolute',
			pointerEvents: 'none',
			transformStyle: 'preserve-3d',
			margin: '0',
			padding: '0',
			border: 'none',
			background: 'none',
			willChange: 'transform',
			backfaceVisibility: 'hidden',
			perspective: '1000px'
		});

		// Setup marker div
		div.textContent = data.name;
		div.className = 'location-marker';
		Object.assign(div.style, {
			pointerEvents: 'auto',
			cursor: 'pointer',
			position: 'relative',
			display: 'inline-block',
			margin: '0',
			padding: '0',
			border: 'none',
			willChange: 'transform',
			backfaceVisibility: 'hidden',
			transformOrigin: 'center center',
			fontSize: `${getSharpFontSize()}rem`,
			textRendering: 'optimizeLegibility',
			webkitFontSmoothing: 'antialiased'
		});

		// Event handlers
		div.onclick = (e) => {
			e.stopPropagation();
			e.preventDefault();
			document.querySelectorAll('.location-marker').forEach((marker) => {
				marker.classList.remove('location-focused');
			});
			const isNowFocused = !div.classList.contains('location-focused');
			if (isNowFocused) {
				div.classList.add('location-focused');
				setFocused(data.name);
			} else {
				div.classList.remove('location-focused');
				setFocused(null);
			}
		};

		div.onfocus = () => {
			document.querySelectorAll('.location-marker').forEach((marker) => {
				if (marker !== div) marker.classList.remove('location-focused');
			});
			div.classList.add('location-focused');
			setFocused(data.name);
		};

		div.onblur = () => {
			div.classList.remove('location-focused');
			setFocused(null);
		};

		// Accessibility
		div.setAttribute('role', 'button');
		div.setAttribute('tabindex', '0');
		div.setAttribute(
			'aria-label',
			`${data.name}: Lived here for ${data.years} ${data.years === 1 ? 'year' : 'years'}`
		);

		Object.assign(div.dataset, {
			lat: data.lat.toString(),
			lng: data.lng.toString(),
			years: data.years.toString()
		});

		wrapper.appendChild(div);
		return wrapper;
	}

	onMount(async () => {
		if (!browser) return;

		// Determine device capabilities
		devicePixelCategory = categorizeDevice();
		const networkCategory = checkNetworkConditions();
		if (networkCategory === 'low') devicePixelCategory = 'low';

		// Load modules
		threeModules = await loadThreeModules();
		globeModules = await loadGlobeModules();

		// Initialize accessibility
		container.setAttribute('role', 'region');
		container.setAttribute('aria-label', "Interactive 3D Globe showing places I've lived");

		// Setup intersection observer - FIXED: Store reference for cleanup
		intersectionObserver = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && !globeInitialized) {
					globeInitialized = true;
					initGlobe();
				}
			},
			{ rootMargin: '200px', threshold: 0.01 }
		);
		intersectionObserver.observe(container);

		async function initGlobe() {
			if (!threeModules || !globeModules) return;

			const { THREE, FontLoader, TextGeometry } = threeModules;
			const { CSS2DRenderer, Globe, TrackballControls, gsap } = globeModules;

			// Clear container
			container.innerHTML = '';

			// Add accessibility instructions
			const instructions = document.createElement('div');
			instructions.className = 'sr-only';
			instructions.textContent = 'Use arrow keys to navigate between locations...';
			container.appendChild(instructions);

			// Setup pointer events
			Object.assign(container.style, {
				touchAction: 'none',
				userSelect: 'none'
			});

			container.addEventListener('pointerdown', () => {
				container.style.cursor = 'grabbing';
			});
			container.addEventListener('pointerup', () => {
				container.style.cursor = 'grab';
			});
			container.addEventListener('pointerout', () => {
				container.style.cursor = 'grab';
			});

			// Initialize scene
			const scene = new THREE.Scene();
			scene.background = new THREE.Color('#18181b');
			const camera = new THREE.PerspectiveCamera(
				60,
				window.innerWidth / window.innerHeight,
				0.1,
				1000
			);

			// FIXED: Setup renderers - only use what we need
			const { renderer, renderers } = setupRenderers(THREE, CSS2DRenderer, container);

			// Setup lighting
			setupLighting(THREE, scene);

			// Setup controls (without globe reference)
			const controls = setupCameraControls(TrackballControls, camera, renderer);
			let isUserInteracting = false;

			controls.addEventListener('start', () => {
				isUserInteracting = true;
			});
			controls.addEventListener('end', () => {
				isUserInteracting = false;
			});

			// Process data
			const labData = processRegionsData(regionsLived);
			const MIN_ALTITUDE = 0.0125;

			// Create globe
			const globe = new Globe()
				.showAtmosphere(true)
				.atmosphereAltitude(0.1)
				.globeImageUrl(getOptimizedTexturePath('/geo/2_no_clouds_4k.jpg', devicePixelCategory))
				.bumpImageUrl(getOptimizedTexturePath('/geo/elev_bump_4k.jpg', devicePixelCategory))
				.pointsData(labData)
				.pointAltitude((d: any) => Math.max(MIN_ALTITUDE, d.years * 0.01))
				.pointColor(() => 'rgba(255, 255, 255, 0.55)')
				.pointRadius(() => 0.75)
				.pointsMerge(true);

			scene.add(globe);

			// Connect controls to globe (AFTER globe creation)
			connectControlsToGlobe(controls, globe, camera);

			// Add location markers
			globe
				.htmlElementsData(labData)
				.htmlLat((d: any) => d.lat)
				.htmlLng((d: any) => d.lng)
				.htmlAltitude((d: any) => (window.innerWidth < 768 ? 0.03 : 0.055))
				.htmlElement((data: any) => createLocationMarker(data, setFocusedLocationName));

			// Add clouds
			const isMobile = window.innerWidth < 768;
			const cloudsGeometry = createCloudsGeometry(THREE, globe.getGlobeRadius(), isMobile);
			const Clouds = new THREE.Mesh(cloudsGeometry);

			new THREE.TextureLoader().load(
				getOptimizedTexturePath('/geo/fair_clouds_4k.png', devicePixelCategory),
				(cloudsTexture: any) => {
					Clouds.material = new THREE.MeshPhongMaterial({
						map: cloudsTexture,
						transparent: true
					});
				}
			);
			globe.add(Clouds);

			// Enhance globe material
			enhanceGlobeMaterial(THREE, globe);

			// Setup globe tilt
			setupGlobeTilt(THREE, globe);

			// Optimize rendering
			optimizeRendering(renderer, devicePixelCategory);

			// Create hero text
			createHeroText(THREE, FontLoader, TextGeometry, scene, globe, gsap, hero_text);

			// Setup camera
			const idealDistance = calculateIdealDistance(globe.getGlobeRadius(), camera.fov, isMobile);
			controls.maxDistance = idealDistance * 1.1;
			controls.minDistance = idealDistance * 0.9;

			// Utility functions
			const resizeRenderers = () => {
				const newWidth = window.innerWidth;
				const newHeight = window.innerHeight;
				renderers.forEach((r) => r.setSize(newWidth, newHeight));
				globe.rendererSize(new THREE.Vector2(newWidth, newHeight));
				updateCameraAspect(camera);
			};

			const adjustCamera = (isMobile: boolean, focusedCity?: { lat: number; lng: number }) => {
				const idealDistance = calculateIdealDistance(globe.getGlobeRadius(), camera.fov, isMobile);
				if (focusedCity) {
					setCameraPosition(
						camera,
						focusedCity.lat,
						focusedCity.lng,
						idealDistance,
						globe.getGlobeRadius()
					);
				} else {
					camera.position.z = idealDistance;
				}
				updateCameraAspect(camera);
			};

			// Resize handling
			const handleResizeImplementation = () => {
				const newWidth = window.innerWidth;
				const newHeight = window.innerHeight;

				if (newWidth === lastWidth && newHeight === lastHeight) return;

				const resizeDelay = isMobile ? (window.devicePixelRatio > 2 ? 150 : 100) : 50;

				setTimeout(() => {
					lastWidth = newWidth;
					lastHeight = newHeight;
					const currentMobile = newWidth < 768;
					CLOUDS_ROTATION_SPEED = calculateCloudsRotationSpeed(currentMobile);

					requestAnimationFrame(() => {
						updateVH();
						resizeRenderers();
						adjustCamera(currentMobile);
					});
				}, resizeDelay);
			};

			const handleResize = debounce(
				() => {
					if (!window.requestAnimationFrame) {
						handleResizeImplementation();
						return;
					}

					window.requestAnimationFrame(handleResizeImplementation);
					document.querySelectorAll('.location-marker').forEach((marker) => {
						(marker as HTMLElement).style.fontSize = `${getSharpFontSize()}rem`;
					});
				},
				isMobile ? 250 : 100
			);

			// Animation intersection observer - FIXED: Store reference
			const handleIntersection = (entries: IntersectionObserverEntry[]) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						if (!animationFrameId) animate();
					} else {
						if (animationFrameId) {
							cancelAnimationFrame(animationFrameId);
							animationFrameId = 0;
						}
					}
				});
			};

			animationObserver = new IntersectionObserver(handleIntersection, {
				root: null,
				rootMargin: '0px',
				threshold: 0.1
			});
			animationObserver.observe(container);

			// Animation loop
			const animate = () => {
				animationFrameId = requestAnimationFrame(animate) as number;

				if (controls.enabled) {
					controls.update();
				}

				if (!isUserInteracting) {
					globe.rotation.y -= 0.00055;
					Clouds.rotation.y += (CLOUDS_ROTATION_SPEED * Math.PI) / 180;
				}

				renderers.forEach((r) => r.render(scene, camera));
			};

			// Initialize everything
			const focusedCity = findFocusedCity(regionsLived, 'Arlington');
			updateVH();
			resizeRenderers();
			adjustCamera(isMobile, focusedCity);
			CLOUDS_ROTATION_SPEED = calculateCloudsRotationSpeed(isMobile);

			// Add event listeners
			window.addEventListener('resize', handleResize);

			// FIXED: Improved cleanup with proper observer tracking
			cleanupFn = () => {
				if (animationFrameId) cancelAnimationFrame(animationFrameId);
				window.removeEventListener('resize', handleResize);

				if (globeInitialized) {
					scene.traverse((object: any) => {
						if (object instanceof THREE.Mesh) {
							object.geometry.dispose();
							if (Array.isArray(object.material)) {
								object.material.forEach((material: any) => material.dispose());
							} else {
								object.material.dispose();
							}
						}
					});
					renderers.forEach((r) => {
						if (r instanceof THREE.WebGLRenderer) r.dispose();
						if (r.domElement?.parentNode) r.domElement.parentNode.removeChild(r.domElement);
					});
					controls.dispose();
					scene.clear();
				}

				if (container) container.innerHTML = '';
			};
		}
	});

	onDestroy(() => {
		// FIXED: Proper cleanup of all observers
		if (intersectionObserver) intersectionObserver.disconnect();
		if (animationObserver) animationObserver.disconnect();
		if (cleanupFn) cleanupFn();
	});
</script>

<div class="globe-container">
	<div bind:this={container} aria-describedby="globe-description" class="globe-viewer">
		<span id="globe-description" class="sr-only">
			Interactive 3D globe showing locations I've lived around the world.
		</span>
	</div>

	<ScrollIndicator />
</div>

<style>
	/* Base containers */
	.globe-container {
		position: relative;
		width: 100%;
		min-height: 100vh;
		min-height: 100svh;
		height: 100dvh;
		overflow: hidden;
		background-color: var(--color-background);
		will-change: transform;
		touch-action: pan-y;
		-webkit-overflow-scrolling: touch;
		transition: height var(--transition-speed) cubic-bezier(0.4, 0, 0.2, 1);
		contain: paint layout;
	}

	.globe-viewer {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		backface-visibility: hidden;
		touch-action: none;
		-webkit-user-select: none;
		user-select: none;
		-webkit-tap-highlight-color: transparent;
	}

	/* Canvas layering */
	:global(canvas),
	:global(.css2d-renderer) {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		transform: translateZ(0);
		backface-visibility: hidden;
		contain: paint layout;
		will-change: transform;
	}

	:global(canvas) {
		pointer-events: auto;
		touch-action: none;
	}

	/* Location markers */
	:global(.location-marker) {
		color: rgba(255, 255, 255, 0.5) !important;
		font-family: var(--font-family-base) !important;
		padding: 4px 8px !important;
		border-radius: 4px !important;
		opacity: 1 !important;
		transition: transform 0.15s ease !important;
		margin: 0 !important;
		border: none !important;
		background: transparent !important;
		text-rendering: optimizeLegibility !important;
		-webkit-font-smoothing: antialiased !important;
		-moz-osx-font-smoothing: grayscale !important;
		font-weight: 500 !important;
	}

	:global(.location-marker.location-focused),
	:global(.location-marker:focus-visible),
	:global(.location-marker:focus) {
		transform: scale(1.65) !important;
		background-color: rgba(0, 0, 0, 0.3) !important;
		color: var(--color-text-primary) !important;
		z-index: 100 !important;
		outline: 2px solid var(--color-focus) !important;
		outline-offset: 2px !important;
		transform-origin: center center !important;
	}

	:global(.location-marker.location-hidden) {
		opacity: 0 !important;
		visibility: hidden !important;
		pointer-events: none !important;
	}

	/* Mobile responsive */
	@media (max-width: 768px) {
		.globe-container {
			overscroll-behavior-y: none;
		}

		.globe-viewer {
			height: 100%;
		}

		:global(.location-marker) {
			padding: var(--spacing-sm);
		}

		:global(.location-marker.location-focused),
		:global(.location-marker:focus-visible),
		:global(.location-marker:focus) {
			transform: scale(2) !important;
		}
	}

	@media (max-height: 500px) {
		:global(.location-marker) {
			font-size: 0.25rem !important;
		}

		:global(.location-marker.location-focused),
		:global(.location-marker:focus-visible),
		:global(.location-marker:focus) {
			transform: scale(2) !important;
		}
	}

	/* Accessibility */
	@media (prefers-reduced-motion: reduce) {
		.globe-viewer,
		:global(.location-marker) {
			transition: none;
			animation: none;
		}
	}

	@media (forced-colors: active) {
		:global(.location-marker:focus-visible) {
			outline: 2px solid CanvasText;
		}
	}
</style>
