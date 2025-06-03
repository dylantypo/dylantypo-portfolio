<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import pkg from 'lodash';
	import { browser } from '$app/environment';

	const { debounce } = pkg;

	// 🎯 Type-safe interface for Three.js modules
	interface ThreeModules {
		THREE: typeof import('three');
		TextGeometry: typeof import('three/examples/jsm/geometries/TextGeometry.js').TextGeometry;
		FontLoader: typeof import('three/examples/jsm/loaders/FontLoader.js').FontLoader;
	}

	// 🎯 Nullable module references
	let modules: ThreeModules | null = null;

	// Component props and state
	let container: HTMLDivElement;
	let { hero_text } = $props<{ hero_text: string }>();

	// State management
	let focusedLocationName = $state<string | null>(null);
	let globeInitialized = $state(false);
	let animationFrameId: number | undefined;
	let CLOUDS_ROTATION_SPEED: number;

	// Event handler storage
	let cleanupFn: (() => void) | undefined;

	// Cache values
	let lastWidth = browser ? window.innerWidth : 0;
	let lastHeight = browser ? window.innerHeight : 0;

	type Region = {
		country: string;
		description: string;
		states: { name: string; description: string; lat: number; lng: number; years: number }[];
	};

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

	async function loadGlobeModules(): Promise<void> {
		if (modules) return; // ✅ Only check modules

		try {
			const [ThreeModule, { TextGeometry }, { FontLoader }] = await Promise.all([
				import('three'),
				import('three/examples/jsm/geometries/TextGeometry.js'),
				import('three/examples/jsm/loaders/FontLoader.js')
			]);

			modules = { THREE: ThreeModule, TextGeometry, FontLoader };
		} catch (error) {
			console.error('Failed to load globe modules:', error);
			throw error;
		}
	}

	function smoothScrollTo(element: HTMLElement, duration = 2000) {
		const start = window.scrollY;
		const end = element.getBoundingClientRect().top + window.scrollY;
		const startTime = performance.now();

		function easeInOutQuad(t: number) {
			return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
		}

		function scrollAnimation(currentTime: number) {
			const elapsed = currentTime - startTime;
			const progress = Math.min(elapsed / duration, 1);

			window.scrollTo({
				top: start + (end - start) * easeInOutQuad(progress),
				behavior: 'auto' // Use auto to prevent conflicts with native smooth scroll
			});

			if (progress < 1) {
				requestAnimationFrame(scrollAnimation);
			}
		}

		requestAnimationFrame(scrollAnimation);
	}

	let devicePixelCategory = 'low';

	function getOptimizedTexturePath(basePath: string) {
		// Extract file name and extension
		const pathParts = basePath.split('/');
		const fileName = pathParts[pathParts.length - 1];
		const baseName = fileName.split('.')[0].replace('_4k', '');

		// Determine resolution based on device capability
		let resolution = '1k';
		if (devicePixelCategory === 'high') {
			resolution = '4k';
		} else if (devicePixelCategory === 'medium') {
			resolution = '2k';
		}
		// Build new path with WebP extension
		return `/geo/${baseName}_${resolution}.webp`;
	}

	onMount(async () => {
		// Check if we are in the browser
		if (!browser) return;

		// Determine device capabilities once on mount
		if (browser) {
			const isMobile = window.innerWidth < 768;
			const isHighEnd = window.devicePixelRatio > 2 && !isMobile && window.innerWidth > 1600;
			const isMidRange = (window.devicePixelRatio > 1.5 && !isMobile) || window.innerWidth > 1200;

			devicePixelCategory = isHighEnd ? 'high' : isMidRange ? 'medium' : 'low';
		}

		loadGlobeModules();

		// Initialize accessibility attributes
		container.setAttribute('role', 'region');
		container.setAttribute('aria-label', "Interactive 3D Globe showing places I've lived");

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && !globeInitialized) {
					globeInitialized = true;
					initGlobe();
				}
			},
			{ rootMargin: '200px', threshold: 0.01 }
		);
		observer.observe(container);

		function getSharpFontSize() {
			const isMobile = window.innerWidth < 768;
			const pixelRatio = Math.min(window.devicePixelRatio, 2.5);
			return isMobile ? 0.45 * pixelRatio : 0.7 * pixelRatio;
		}

		async function initGlobe() {
			// 🚀 If modules aren't loaded yet, load them first
			if (!modules) await loadGlobeModules();
			if (!modules) throw new Error('Failed to load modules');

			const THREE = modules.THREE;
			const TextGeometry = modules.TextGeometry;
			const FontLoader = modules.FontLoader;

			// Remove any loading placeholder
			container.innerHTML = '';

			// Re-add accessibility instructions
			const instructions = document.createElement('div');
			instructions.className = 'sr-only';
			instructions.textContent = 'Use arrow keys to navigate between locations...';
			container.appendChild(instructions);

			// Set priority for loading
			if ('connection' in navigator) {
				const connection = navigator.connection as any;
				if (
					connection &&
					(connection.saveData ||
						connection.effectiveType === '2g' ||
						connection.effectiveType === '3g')
				) {
					// For low-end devices/connections, use even lower resolution
					devicePixelCategory = 'low';
				}
			}

			// Optimize for main thread performance
			const optimizeRendering = () => {
				// Reduce quality on slow devices
				if (devicePixelCategory === 'low') {
					renderer.setPixelRatio(1.0);
					// Use lower polygon count for mobile
					const simplifiedCloudsGeometry = new THREE.SphereGeometry(
						globe.getGlobeRadius() * (1 + CLOUDS_ALT),
						50,
						50
					);
					Clouds.geometry = simplifiedCloudsGeometry;
				}
			};

			// Add pointer event handling
			container.style.touchAction = 'none';
			container.style.userSelect = 'none';

			container.addEventListener('pointerdown', () => {
				(container as HTMLElement).style.cursor = 'grabbing';
			});

			container.addEventListener('pointerup', () => {
				(container as HTMLElement).style.cursor = 'grab';
			});

			container.addEventListener('pointerout', () => {
				(container as HTMLElement).style.cursor = 'grab';
			});

			// Dynamically import browser-only dependencies
			const [
				{ CSS2DRenderer },
				{ default: Globe },
				{ TrackballControls },
				{ gsap },
				{ CSSPlugin }
			] = await Promise.all([
				import('three/examples/jsm/renderers/CSS2DRenderer.js'),
				import('three-globe'),
				import('three/examples/jsm/controls/TrackballControls.js'),
				import('gsap'),
				import('gsap/CSSPlugin')
			]);

			gsap.registerPlugin(CSSPlugin);

			// Initialize scene
			const scene = new THREE.Scene();
			scene.background = new THREE.Color('#18181b');
			const camera = new THREE.PerspectiveCamera(
				60,
				window.innerWidth / window.innerHeight,
				0.1,
				1000
			);
			const renderer = new THREE.WebGLRenderer();
			const labelRenderer = new CSS2DRenderer();

			// Initialize renderers with optimized settings
			const renderers = [renderer, labelRenderer];
			renderers.forEach((r, idx) => {
				r.setSize(window.innerWidth, window.innerHeight);
				if ('setPixelRatio' in r) {
					r.setPixelRatio(Math.min(window.devicePixelRatio, 2));
				}
				if (r instanceof THREE.WebGLRenderer) {
					r.sortObjects = false;
				}
				if (idx > 0) {
					r.domElement.style.position = 'absolute';
					r.domElement.style.top = '0px';
					r.domElement.style.pointerEvents = 'none';
					r.domElement.style.left = '0px';
					r.domElement.style.width = '100%';
					r.domElement.style.height = '100%';
				}
				container.appendChild(r.domElement);
			});

			// Setup lighting
			const ambientLight = new THREE.AmbientLight('#ffffff', 0.35);
			const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.75);
			hemiLight.color.setHSL(0.6, 0.75, 0.5);
			hemiLight.groundColor.setHSL(0.095, 0.5, 0.5);
			hemiLight.position.set(0, -500, 0);

			const dirLight = new THREE.DirectionalLight(0xffffff, 1);
			dirLight.position.set(-1, 0.75, 1);
			dirLight.position.multiplyScalar(100);

			// Configure shadows
			dirLight.castShadow = true;
			dirLight.shadow.camera.near = 50;
			dirLight.shadow.camera.far = 3500;
			dirLight.shadow.camera.left = -650;
			dirLight.shadow.camera.right = 650;
			dirLight.shadow.camera.top = 650;
			dirLight.shadow.camera.bottom = -650;
			dirLight.shadow.mapSize.width = 2048;
			dirLight.shadow.mapSize.height = 2048;
			dirLight.shadow.bias = -0.0001;

			// Target light at globe center
			const targetObject = new THREE.Object3D();
			targetObject.position.set(0, 0, 0);
			scene.add(targetObject);
			dirLight.target = targetObject;

			scene.add(ambientLight, hemiLight, dirLight);

			// Add camera controls
			const controls = new TrackballControls(camera, renderer.domElement);
			// Better controls configuration
			controls.noZoom = true;
			controls.noPan = true;
			controls.rotateSpeed = 1.65; // Reduced for smoother rotation
			controls.dynamicDampingFactor = 0.1; // Increased for less "stickiness"

			controls.addEventListener('change', () => {
				globe.setPointOfView(camera);
			});

			let isUserInteracting = false;

			controls.addEventListener('start', () => {
				isUserInteracting = true;
			});

			controls.addEventListener('end', () => {
				isUserInteracting = false;
			});

			// Set up data
			const labData = regionsLived.flatMap((region) =>
				region.states.map((state) => ({
					lat: state.lat,
					lng: state.lng,
					name:
						region.country === 'United States' ? state.name : `${state.name}, ${region.country}`,
					description: state.description,
					years: state.years
				}))
			);

			// Min Point Altitude
			const MIN_ALTITUDE = 0.0125;

			// Create globe
			const globe = new Globe()
				.showAtmosphere(true)
				.atmosphereAltitude(0.1)
				.globeImageUrl(getOptimizedTexturePath('/geo/2_no_clouds_4k.jpg'))
				.bumpImageUrl(getOptimizedTexturePath('/geo/elev_bump_4k.jpg'))
				.pointsData(labData)
				.pointAltitude((d: any) => Math.max(MIN_ALTITUDE, d.years * 0.01))
				.pointColor(() => 'rgba(255, 255, 255, 0.55)')
				.pointRadius(() => 0.75)
				.pointsMerge(true);

			scene.add(globe);

			// Adding Labels using HTML Elements
			globe
				.htmlElementsData(labData)
				.htmlLat((d: any) => d.lat)
				.htmlLng((d: any) => d.lng)
				.htmlAltitude((d: any) => (window.innerWidth < 768 ? 0.03 : 0.055))
				.htmlElement((d: any) => {
					const wrapper = document.createElement('div');
					const div = document.createElement('div');

					wrapper.style.position = 'absolute';
					wrapper.style.pointerEvents = 'none';
					wrapper.style.transformStyle = 'preserve-3d';
					wrapper.style.margin = '0';
					wrapper.style.padding = '0';
					wrapper.style.border = 'none';
					wrapper.style.background = 'none';
					wrapper.style.willChange = 'transform';
					wrapper.style.backfaceVisibility = 'hidden';
					wrapper.style.perspective = '1000px';

					div.textContent = d.name;
					div.className = 'location-marker';
					div.style.pointerEvents = 'auto';
					div.style.cursor = 'pointer';
					div.style.position = 'relative';
					div.style.display = 'inline-block';
					div.style.margin = '0';
					div.style.padding = '0';
					div.style.border = 'none';
					div.style.willChange = 'transform';
					div.style.backfaceVisibility = 'hidden';
					div.style.transformOrigin = 'center center';
					div.style.fontSize = `${getSharpFontSize()}rem`;
					div.style.textRendering = 'optimizeLegibility';
					(div.style as any).webkitFontSmoothing = 'antialiased';

					div.onclick = (e) => {
						e.stopPropagation();
						e.preventDefault();
						document.querySelectorAll('.location-marker').forEach((marker) => {
							marker.classList.remove('location-focused');
						});
						const isNowFocused = !div.classList.contains('location-focused');
						if (isNowFocused) {
							div.classList.add('location-focused');
							focusedLocationName = d.name;
						} else {
							div.classList.remove('location-focused');
							focusedLocationName = null;
						}
					};

					div.onfocus = () => {
						document.querySelectorAll('.location-marker').forEach((marker) => {
							if (marker !== div) marker.classList.remove('location-focused');
						});
						div.classList.add('location-focused');
						focusedLocationName = d.name;
					};

					div.onblur = () => {
						div.classList.remove('location-focused');
						focusedLocationName = null;
					};

					div.setAttribute('role', 'button');
					div.setAttribute('tabindex', '0');
					div.setAttribute(
						'aria-label',
						`${d.name}: Lived here for ${d.years} ${d.years === 1 ? 'year' : 'years'}`
					);

					Object.assign(div.dataset, {
						lat: d.lat.toString(),
						lng: d.lng.toString(),
						years: d.years.toString()
					});

					wrapper.appendChild(div);
					return wrapper;
				});

			// Adding Clouds layer
			const CLOUDS_IMG_URL = getOptimizedTexturePath('/geo/fair_clouds_4k.png');
			const CLOUDS_ALT = 0.005;
			const calculateCloudsRotationSpeed = (isMobile: boolean) => {
				const BASE_SPEED = -0.015;
				return isMobile ? BASE_SPEED * 1.25 : BASE_SPEED;
			};

			// Initialize Clouds with optimized geometry for mobile
			const cloudsGeometry = new THREE.SphereGeometry(
				globe.getGlobeRadius() * (1 + CLOUDS_ALT),
				window.innerWidth < 768 ? 50 : 75,
				window.innerWidth < 768 ? 50 : 75
			);
			const Clouds = new THREE.Mesh(cloudsGeometry);
			new THREE.TextureLoader().load(CLOUDS_IMG_URL, (cloudsTexture: any) => {
				Clouds.material = new THREE.MeshPhongMaterial({
					map: cloudsTexture,
					transparent: true
				});
			});
			globe.add(Clouds);

			// Enhance globe appearance
			const globeMaterial = globe.globeMaterial();
			if (globeMaterial && 'specularMap' in globeMaterial) {
				new THREE.TextureLoader().load('/geo/earth-water.webp', (texture: any) => {
					(globeMaterial as any).specularMap = texture;
					(globeMaterial as any).specular = new THREE.Color('grey');
					(globeMaterial as any).shininess = 100;
				});
			}

			const tiltAxis = new THREE.Vector3(1, 0, 0);
			const tiltAngle = (Math.PI / 6) * -1;
			globe.setRotationFromAxisAngle(tiltAxis, tiltAngle);

			optimizeRendering();

			const calculateIdealDistance = (isMobile: boolean) => {
				const baseFactor = 1.95;
				const mobileAdjustment = isMobile ? 3 : 1.5;
				return (
					globe.getGlobeRadius() /
					Math.tan(THREE.MathUtils.degToRad(camera.fov / (baseFactor + mobileAdjustment)))
				);
			};

			const isMobile = window.innerWidth < 768;

			controls.maxDistance = calculateIdealDistance(isMobile) * 1.1; // Limit max distance
			controls.minDistance = calculateIdealDistance(isMobile) * 0.9; // Limit min distance

			// Utility functions
			const updateVH = () => {
				const vh = window.innerHeight * 0.01;
				document.documentElement.style.setProperty('--vh', `${vh}px`);
			};

			const updateCameraAspect = () => {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
			};

			const resizeRenderers = () => {
				const newWidth = window.innerWidth;
				const newHeight = window.innerHeight;

				renderers.forEach((r) => r.setSize(newWidth, newHeight));
				globe.rendererSize(new THREE.Vector2(newWidth, newHeight));

				updateCameraAspect();
			};

			const setCameraPosition = (lat: number, lng: number, idealDistance: number) => {
				const phi = (90 - lat) * (Math.PI / 180);
				const theta = (180 - lng) * (Math.PI / 180);

				camera.position.set(
					idealDistance * Math.sin(phi) * Math.cos(theta),
					idealDistance * Math.cos(phi),
					idealDistance * Math.sin(phi) * Math.sin(theta)
				);
				camera.lookAt(globe.getGlobeRadius(), 0, 100);
			};

			const adjustCamera = (isMobile: boolean, focusedCity?: { lat: number; lng: number }) => {
				const idealDistance = calculateIdealDistance(isMobile);

				if (focusedCity) {
					setCameraPosition(focusedCity.lat, focusedCity.lng, idealDistance);
				} else {
					camera.position.z = idealDistance;
				}

				updateCameraAspect();
			};

			// Resize handling
			const handleResizeImplementation = () => {
				const newWidth = window.innerWidth;
				const newHeight = window.innerHeight;

				if (newWidth === lastWidth && newHeight === lastHeight) return;

				// Change setTimeout delay based on device
				const resizeDelay = isMobile
					? window.devicePixelRatio > 2
						? 150
						: 100 // Higher delay for high DPI mobile devices
					: 50;

				setTimeout(() => {
					lastWidth = newWidth;
					lastHeight = newHeight;

					const isMobile = newWidth < 768;
					CLOUDS_ROTATION_SPEED = calculateCloudsRotationSpeed(isMobile);

					// Batch these operations together
					requestAnimationFrame(() => {
						updateVH();
						resizeRenderers();
						// toggleLabelRenderer(isMobile);
						adjustCamera(isMobile);
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

			const observer = new IntersectionObserver(handleIntersection, {
				root: null,
				rootMargin: '0px',
				threshold: 0.1
			});
			observer.observe(container);

			// Animation
			const animate = () => {
				animationFrameId = requestAnimationFrame(animate) as number;

				if (controls.enabled) {
					controls.update();
					globe.setPointOfView(camera);
				}

				// Only auto-rotate when user isn't interacting
				if (!isUserInteracting) {
					globe.rotation.y -= 0.00055;
					Clouds.rotation.y += (CLOUDS_ROTATION_SPEED * Math.PI) / 180;
				}

				renderers.forEach((r) => r.render(scene, camera));
			};

			// Initialize
			const focusedCity = regionsLived
				.flatMap((region) => region.states)
				.find((state) => state.name === 'Arlington');
			updateVH();
			resizeRenderers();
			adjustCamera(isMobile, focusedCity);
			CLOUDS_ROTATION_SPEED = calculateCloudsRotationSpeed(isMobile);

			// Add event listeners
			window.addEventListener('resize', handleResize);

			// Font loading and hero text
			const fontLoader = new FontLoader();
			fontLoader.load('/fonts/Kenney Future_Regular.json', function (font: any) {
				const group = new THREE.Group();
				const radiusOffset = globe.getGlobeRadius() * 0.6;

				for (let i = 0; i < hero_text.length; i++) {
					const char = hero_text[i];
					const charGeometry = new TextGeometry(char, {
						font: font,
						size: 24,
						depth: 2,
						curveSegments: 12,
						bevelEnabled: true,
						bevelThickness: 1.5,
						bevelSize: 0.8,
						bevelOffset: 0,
						bevelSegments: 128
					});

					const charMaterial = new THREE.MeshPhongMaterial({
						color: 0xffffff,
						specular: 0xffffff,
						shininess: 10,
						transparent: true,
						opacity: 0
					});

					charMaterial.side = THREE.DoubleSide;
					charMaterial.shadowSide = THREE.DoubleSide;

					const charMesh = new THREE.Mesh(charGeometry, charMaterial);
					charMesh.castShadow = true;
					charMesh.receiveShadow = true;

					charGeometry.computeBoundingBox();
					if (charGeometry.boundingBox) {
						const angle = ((i - hero_text.length / 2) / hero_text.length) * Math.PI;
						const centralIndex = Math.floor(hero_text.length / 2);
						const centralAngle =
							((centralIndex - hero_text.length / 2) / hero_text.length) * Math.PI;

						charMesh.position.set(
							Math.sin(angle - centralAngle) * (radiusOffset + 50),
							0,
							Math.cos(angle - centralAngle) * (radiusOffset + 50)
						);

						const outwardDirection = charMesh.position.clone().normalize();
						const outwardPoint = outwardDirection.multiplyScalar(radiusOffset + 100);
						charMesh.lookAt(outwardPoint);

						if (Math.cos(angle - centralAngle) < 0) {
							charMesh.rotation.y += Math.PI;
						}
					}

					group.add(charMesh);
				}

				group.position.set(0, 0, 0);
				group.visible = false;
				scene.add(group);

				gsap.to(
					{},
					{
						delay: 0.75,
						duration: 2.25,
						ease: 'power2.inOut',
						onStart: () => {
							group.visible = true;
							group.children.forEach((obj: any) => {
								const mesh = obj;
								if (mesh.material instanceof THREE.MeshPhongMaterial) {
									mesh.material.transparent = true;
									mesh.material.opacity = 0;
								}
							});
						},
						onUpdate: function () {
							const progress = this.progress();
							group.children.forEach((obj: any) => {
								const mesh = obj;
								if (mesh.material instanceof THREE.MeshPhongMaterial) {
									mesh.material.opacity = progress * 0.5;
								}
							});
						},
						onComplete: () => {
							group.children.forEach((obj: any) => {
								const mesh = obj;
								if (mesh.material instanceof THREE.MeshPhongMaterial) {
									mesh.material.opacity = 0.5;
								}
							});
						}
					}
				);

				gsap.to(group.rotation, {
					x: Math.PI * 0.12,
					y: Math.PI * 1.25,
					duration: 3,
					ease: 'power2.inOut'
				});
			});

			// Cleanup
			cleanupFn = () => {
				if (animationFrameId) {
					cancelAnimationFrame(animationFrameId);
				}

				window.removeEventListener('resize', handleResize);

				// Only clean up globe-specific resources if it was initialized
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

				// Clean up observers
				if (observer) observer.disconnect();
			};
		}
	});

	onDestroy(() => {
		if (cleanupFn) cleanupFn();
	});
</script>

<div class="globe-container">
	<div bind:this={container} aria-describedby="globe-description" class="globe-viewer">
		<span id="globe-description" class="sr-only">
			Interactive 3D globe showing locations I've lived around the world.
		</span>
	</div>

	<!-- Scroll indicator -->
	<button
		class="scroll-indicator"
		onclick={() => {
			const aboutSection = document.getElementById('aboutMe');
			if (aboutSection) {
				smoothScrollTo(aboutSection, 2000); // 2000ms = 2 seconds
			}
		}}
		aria-label="Scroll to About Me section"
	>
		<div class="scroll-icon">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path d="M12 5v14M19 12l-7 7-7-7" />
			</svg>
		</div>
	</button>
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

	/* Scroll indicator */
	.scroll-indicator {
		position: absolute;
		bottom: var(--spacing-lg);
		left: 50%;
		transform: translateX(-50%);
		color: var(--color-text-primary);
		opacity: 0.7;
		transition: opacity var(--transition-speed) ease;
		pointer-events: auto;
		z-index: var(--z-index-overlay);
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
		animation: float 3s ease-in-out infinite;
	}

	.scroll-icon {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-sm);
		background-color: var(--color-fill);
		padding: 0.75rem 1.5rem;
		border-radius: var(--spacing-lg);
		backdrop-filter: blur(4px);
		-webkit-backdrop-filter: blur(4px);
	}

	.scroll-indicator:hover,
	.scroll-indicator:focus-visible {
		opacity: 1;
		transform: translateX(-50%) translateY(-2px);
	}

	.scroll-indicator:active {
		transform: translateX(-50%) translateY(0);
	}

	.scroll-indicator:focus-visible {
		outline: 2px solid var(--color-focus);
		outline-offset: 2px;
	}

	/* Animations */
	@keyframes float {
		0%,
		100% {
			transform: translateX(-50%) translateY(0);
		}
		50% {
			transform: translateX(-50%) translateY(-10px);
		}
	}

	/* Navigation hints */
	:global(.navigation-hint) {
		position: absolute;
		bottom: var(--spacing-lg);
		right: var(--spacing-lg);
		color: var(--color-text-secondary);
		font-family: var(--font-family-base);
		font-size: 0.8rem;
		opacity: 0.7;
		padding: var(--spacing-base);
		background-color: rgba(0, 0, 0, 0.3);
		border-radius: 4px;
		transition: opacity var(--transition-speed) ease;
		backdrop-filter: blur(4px);
		-webkit-backdrop-filter: blur(4px);
	}

	:global(.navigation-hint:hover) {
		opacity: 1;
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

		:global(.navigation-hint) {
			bottom: var(--spacing-base);
			left: var(--spacing-base);
			font-size: 0.7rem;
			padding: var(--spacing-sm);
		}

		.scroll-indicator {
			bottom: 1.5rem;
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
		:global(.location-marker),
		:global(.navigation-hint),
		.scroll-indicator {
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
