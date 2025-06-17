<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import ScrollIndicator from '$lib/components/ScrollIndicator.svelte';
	import {
		categorizeDevice,
		checkNetworkConditions,
		getOptimizedTexturePath,
		getSharpFontSize,
		processRegionsData,
		calculateCloudsRotationSpeed,
		calculateIdealDistance,
		setCameraPosition,
		updateCameraAspect,
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
		viewportManager,
		type DeviceCategory,
		type Region,
		type ThreeModules,
		type GlobeModules
	} from '$lib/utils';

	let container: HTMLDivElement;
	let { hero_text } = $props<{ hero_text: string }>();

	let focusedLocationName = $state<string | null>(null);
	let globeInitialized = $state(false);
	let animationFrameId: number | undefined;
	let CLOUDS_ROTATION_SPEED: number;

	let threeModules: ThreeModules | null = null;
	let globeModules: GlobeModules | null = null;

	let cleanupFn: (() => void) | undefined;
	let intersectionObserver: IntersectionObserver | undefined;
	let animationObserver: IntersectionObserver | undefined;

	let devicePixelCategory: DeviceCategory = 'low';

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

	function hideOverlappingMarkers() {
		const markers = Array.from(document.querySelectorAll('.location-marker')) as HTMLElement[];
		if (markers.length === 0) return;

		// Reset all markers to visible first
		markers.forEach((marker) => {
			marker.style.display = '';
			marker.classList.remove('location-hidden');
		});

		// Wait for render to complete
		requestAnimationFrame(() => {
			const sorted = markers
				.filter((marker) => {
					const rect = marker.getBoundingClientRect();
					return rect.width > 0 && rect.height > 0; // Only process visible markers
				})
				.sort((a, b) => {
					const yearsA = parseFloat(a.dataset.years || '0');
					const yearsB = parseFloat(b.dataset.years || '0');
					if (yearsA !== yearsB) return yearsB - yearsA;
					return (a.textContent || '').localeCompare(b.textContent || '');
				});

			const visible: HTMLElement[] = [];
			const buffer =
				window.innerWidth < 768
					? 35
					: window.innerWidth < 1200
						? 18
						: window.innerWidth < 1600
							? 12
							: 10;

			for (const marker of sorted) {
				const rect = marker.getBoundingClientRect();
				const center = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };

				const tooClose = visible.some((v) => {
					const vRect = v.getBoundingClientRect();
					const vCenter = { x: vRect.left + vRect.width / 2, y: vRect.top + vRect.height / 2 };
					const distance = Math.sqrt(
						Math.pow(center.x - vCenter.x, 2) + Math.pow(center.y - vCenter.y, 2)
					);
					return distance < buffer;
				});

				if (!tooClose) {
					visible.push(marker);
				} else {
					marker.classList.add('location-hidden');
				}
			}
		});
	}

	onMount(async () => {
		if (!browser) return;

		viewportManager.init();

		devicePixelCategory = categorizeDevice();
		const networkCategory = checkNetworkConditions();
		if (networkCategory === 'low') devicePixelCategory = 'low';

		threeModules = await loadThreeModules();
		globeModules = await loadGlobeModules();

		container.setAttribute('role', 'region');
		container.setAttribute('aria-label', "Interactive 3D Globe showing places I've lived");

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

			container.innerHTML = '';

			const instructions = document.createElement('div');
			instructions.className = 'sr-only';
			instructions.textContent = 'Use arrow keys to navigate between locations...';
			container.appendChild(instructions);

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

			const scene = new THREE.Scene();
			scene.background = null;
			const camera = new THREE.PerspectiveCamera(
				60,
				window.innerWidth / window.innerHeight,
				0.1,
				1000
			);

			const { renderer, renderers } = setupRenderers(THREE, CSS2DRenderer, container);

			setupLighting(THREE, scene);

			const controls = setupCameraControls(TrackballControls, camera, renderer);
			let isUserInteracting = false;

			controls.addEventListener('start', () => {
				isUserInteracting = true;
			});
			controls.addEventListener('end', () => {
				isUserInteracting = false;
			});

			const waitForLayout = (callback: () => void) => {
				requestAnimationFrame(() => {
					requestAnimationFrame(() => {
						requestAnimationFrame(callback);
					});
				});
			};

			const labData = processRegionsData(regionsLived);
			const MIN_ALTITUDE = 0.0125;

			const globe = new Globe()
				.showAtmosphere(true)
				.atmosphereAltitude(0.1)
				.globeImageUrl(getOptimizedTexturePath('/geo/2_no_clouds_4k.webp', devicePixelCategory))
				.bumpImageUrl(getOptimizedTexturePath('/geo/elev_bump_4k.webp', devicePixelCategory))
				.pointsData(labData)
				.pointAltitude((d: any) => Math.max(MIN_ALTITUDE, d.years * 0.01))
				.pointColor(() => 'rgba(255, 255, 255, 0.55)')
				.pointRadius(() => 0.75)
				.pointsMerge(true);

			scene.add(globe);

			connectControlsToGlobe(controls, globe, camera);

			globe
				.htmlElementsData(labData)
				.htmlLat((d: any) => d.lat)
				.htmlLng((d: any) => d.lng)
				.htmlAltitude((d: any) => (window.innerWidth < 768 ? 0.055 : 0.085))
				.htmlElement((data: any) => createLocationMarker(data, setFocusedLocationName));

			const isMobile = window.innerWidth < 768;
			const cloudsGeometry = createCloudsGeometry(THREE, globe.getGlobeRadius(), isMobile);
			const Clouds = new THREE.Mesh(cloudsGeometry);

			new THREE.TextureLoader().load(
				getOptimizedTexturePath('/geo/fair_clouds_4k.webp', devicePixelCategory),
				(cloudsTexture: any) => {
					Clouds.material = new THREE.MeshPhongMaterial({
						map: cloudsTexture,
						transparent: true
					});
				}
			);
			globe.add(Clouds);

			enhanceGlobeMaterial(THREE, globe);
			setupGlobeTilt(THREE, globe);
			optimizeRendering(renderer, devicePixelCategory);
			createHeroText(THREE, FontLoader, TextGeometry, scene, globe, gsap, hero_text);

			const initialIdealDistance = calculateIdealDistance(
				globe.getGlobeRadius(),
				camera.fov,
				isMobile
			);
			controls.maxDistance = initialIdealDistance * 1.1;
			controls.minDistance = initialIdealDistance * 0.9;

			const resizeRenderers = () => {
				const viewport = viewportManager.getViewportInfo();
				renderers.forEach((r) => r.setSize(viewport.width, viewport.height));
				globe.rendererSize(new THREE.Vector2(viewport.width, viewport.height));
				updateCameraAspect(camera);
			};

			const adjustCamera = (viewport: any, focusedCity?: { lat: number; lng: number }) => {
				const idealDistance = calculateIdealDistance(
					globe.getGlobeRadius(),
					camera.fov,
					viewport.isMobile
				);

				controls.maxDistance = idealDistance * 1.1;
				controls.minDistance = idealDistance * 0.9;

				if (focusedCity) {
					setCameraPosition(
						camera,
						focusedCity.lat,
						focusedCity.lng,
						idealDistance,
						globe.getGlobeRadius()
					);
				} else {
					const currentDistance = camera.position.length();
					if (Math.abs(currentDistance - idealDistance) > idealDistance * 0.1) {
						camera.position.normalize().multiplyScalar(idealDistance);
					}
				}
				updateCameraAspect(camera);
			};

			const handleViewportChange = (event: CustomEvent) => {
				const viewport = event.detail;

				CLOUDS_ROTATION_SPEED = calculateCloudsRotationSpeed(viewport.isMobile);

				document.querySelectorAll('.location-marker').forEach((marker) => {
					(marker as HTMLElement).style.fontSize = `${getSharpFontSize()}rem`;
				});

				requestAnimationFrame(() => {
					resizeRenderers();
					adjustCamera(viewport);
					waitForLayout(hideOverlappingMarkers);
				});
			};

			window.addEventListener('viewport:resize', handleViewportChange as EventListener);

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

			cleanupFn = () => {
				if (animationFrameId) cancelAnimationFrame(animationFrameId);
				window.removeEventListener('viewport:resize', handleViewportChange as EventListener);

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

			const initialViewport = viewportManager.getViewportInfo();
			const focusedCity = regionsLived
				.flatMap((region) => region.states)
				.find((state) => state.name === 'Arlington');
			resizeRenderers();
			adjustCamera(initialViewport, focusedCity);
			CLOUDS_ROTATION_SPEED = calculateCloudsRotationSpeed(initialViewport.isMobile);
			waitForLayout(() => {
				setTimeout(() => hideOverlappingMarkers(), 200);
			});
		}
	});

	onDestroy(() => {
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
		height: 100vh;
		height: calc(var(--vh, 1vh) * 100);
		overflow: hidden;
		touch-action: pan-y;
		-webkit-overflow-scrolling: touch;
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
			height: calc(var(--vh, 1vh) * 100);
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

	/* Landscape mobile */
	@media (max-height: 500px) and (orientation: landscape) {
		.globe-container {
			height: calc(var(--vh, 1vh) * 100);
		}

		:global(.location-marker.location-focused),
		:global(.location-marker:focus-visible),
		:global(.location-marker:focus) {
			transform: scale(2) !important;
		}
	}

	/* Accessibility */
	@media (prefers-reduced-motion: reduce) {
		.globe-container {
			transition: none;
		}

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
