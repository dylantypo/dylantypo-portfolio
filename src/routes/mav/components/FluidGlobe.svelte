<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import * as THREE from 'three';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
	import { useFluidSimulation } from '../lib/fluidSimulation';
	import AudioAnalyzer from './AudioAnalyzer.svelte';
	import type { AudioData } from '../lib/types';
	import {
		installOESTextureFloatLinearPolyfill,
		isOESTextureFloatLinearSupported
	} from '../lib/OESTextureFloatLinear';

	// Create reference to AudioAnalyzer component
	let audioAnalyzer: AudioAnalyzer;
	let { audioData = null } = $props<{
		audioData: AudioData | null;
	}>();
	let isAudioActive = $state(false);

	// Audio handling functions
	async function startAudio() {
		if (audioAnalyzer) {
			isAudioActive = await audioAnalyzer.startAudioAnalysis();
		}
	}

	function stopAudio() {
		if (audioAnalyzer) {
			audioAnalyzer.stopAudioAnalysis();
			isAudioActive = false;
		}
	}

	// Handle audio data updates
	function handleAudioData(event: CustomEvent<AudioData>) {
		audioData = event.detail;
	}

	// Refs with explicit types
	let container: HTMLDivElement;
	let renderer: THREE.WebGLRenderer;
	let scene: THREE.Scene;
	let camera: THREE.PerspectiveCamera;
	let controls: OrbitControls;
	let globe: THREE.Mesh;
	let innerGlobe: THREE.Mesh;
	let cubeCamera: THREE.CubeCamera;
	let cubeRenderTarget: THREE.WebGLCubeRenderTarget;

	// Performance optimizations
	const TEXTURE_SIZE = 64;
	const RAF_THROTTLE = 1000 / 60; // 60 FPS cap
	let lastRAFTime = 0;
	let isMobile = $state(false);
	let lastTouchEnd = 0;

	// Animation state with reactive declarations
	let animationId = $state<number | null>(null);
	let isInitialized = $state(false);

	// Constants for fluid simulation
	const IOR_AIR = 1.0;
	const IOR_WATER = 1.333;

	const FLUID_COLOR = new THREE.Color(0x006994); // Deeper blue
	const LIGHT_COLOR = new THREE.Color(0x89cff0); // Light blue for foam/surface
	const CRYSTAL_COLOR = new THREE.Color(0xffffff); // Pure white for crystal
	const CRYSTAL_OPACITY = 0.001; // Much more transparent

	// Simulation setup
	const {
		density,
		velocityX,
		velocityY,
		velocityZ,
		updateSimulation,
		addForce,
		addVelocity,
		config: { gridSize: N }
	} = useFluidSimulation({
		gridSize: TEXTURE_SIZE,
		iterations: 4,
		viscosity: 0.0008,
		diffusion: 0.0001
	});

	// Create optimized fluid texture
	const fluidTexture = new THREE.DataTexture(
		new Float32Array(N * N * N * 4),
		N,
		N * N,
		THREE.RGBAFormat,
		THREE.FloatType
	);
	fluidTexture.minFilter = THREE.LinearFilter;
	fluidTexture.magFilter = THREE.LinearFilter;

	const velocityTexture = new THREE.DataTexture(
		new Float32Array(N * N * 4),
		N,
		N,
		THREE.RGBAFormat,
		THREE.FloatType
	);
	velocityTexture.minFilter = THREE.LinearFilter;
	velocityTexture.magFilter = THREE.LinearFilter;

	// Enhanced outer shell material
	const outerMaterial = new THREE.ShaderMaterial({
		uniforms: {
			fluidTexture: { value: fluidTexture },
			time: { value: 0 },
			crystalColor: { value: CRYSTAL_COLOR },
			baseOpacity: { value: 0.05 },
			refractionStrength: { value: 0.1 }
		},
		vertexShader: `
			uniform float time;
			varying vec3 vPosition;
			varying vec3 vNormal;
			varying vec3 vViewDir;
			
			void main() {
				vPosition = position;
				vNormal = normalize(normalMatrix * normal);
				vec4 worldPosition = modelMatrix * vec4(position, 1.0);
				vViewDir = normalize(cameraPosition - worldPosition.xyz);
				gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
			}
		`,
		fragmentShader: `
			uniform vec3 crystalColor;
			uniform float refractionStrength;
			uniform float time;
			uniform float baseOpacity;
			
			varying vec3 vPosition;
			varying vec3 vNormal;
			varying vec3 vViewDir;
			
			void main() {
				float fresnel = pow(1.0 - abs(dot(vNormal, vViewDir)), 3.0);
				vec3 refraction = refract(-vViewDir, vNormal, 0.98);
				
				float internalReflection = pow(max(0.0, dot(refraction, vec3(0.0, 1.0, 0.0))), 2.0);
				
				vec3 finalColor = mix(
					crystalColor * 0.5,
					crystalColor,
					fresnel * internalReflection
				);
				
				gl_FragColor = vec4(finalColor, baseOpacity + fresnel * 0.1);
			}
		`,
		transparent: true,
		side: THREE.DoubleSide,
		depthWrite: false,
		blending: THREE.AdditiveBlending
	});

	// Inner sphere material for fluid visualization
	const innerMaterial = new THREE.ShaderMaterial({
		uniforms: {
			fluidTexture: { value: fluidTexture },
			time: { value: 0 },
			fluidColor: { value: new THREE.Color(0x006994) }, // Deep blue
			lightColor: { value: new THREE.Color(0x89cff0) }, // Light blue
			heightField: { value: null },
			iorAir: { value: 1.0 },
			iorWater: { value: 1.333 },
			lightPosition: { value: new THREE.Vector3(2, 2, -1).normalize() },
			sphereCenter: { value: new THREE.Vector3(0, 0, 0) },
			sphereRadius: { value: 2.0 },
			poolHeight: { value: 0.25 },
			velocityTexture: { value: null }
		},
		vertexShader: `
			uniform float time;
			varying vec3 vPosition;
			varying vec3 vNormal;
			varying vec2 vUv;
			varying vec3 vViewDir;
			varying vec3 vWorldPos;
			
			void main() {
				vUv = uv;
				vNormal = normalize(normalMatrix * normal);
				
				// Calculate position with wave displacement
				vec3 newPosition = position;
				vec4 worldPos = modelMatrix * vec4(newPosition, 1.0);
				vWorldPos = worldPos.xyz;
				
				vViewDir = normalize(cameraPosition - worldPos.xyz);
				vPosition = newPosition;
				
				gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
			}
		`,
		fragmentShader: `
			uniform sampler2D fluidTexture;
			uniform float time;
			uniform vec3 fluidColor;
			uniform vec3 lightColor;
			uniform vec3 lightPosition;
			uniform float iorAir;
			uniform float iorWater;
			uniform vec3 sphereCenter;
			uniform float sphereRadius;
			
			varying vec3 vPosition;
			varying vec3 vNormal;
			varying vec2 vUv;
			varying vec3 vViewDir;
			varying vec3 vWorldPos;

			float intersectSphere(vec3 origin, vec3 ray) {
				vec3 toSphere = origin - sphereCenter;
				float a = dot(ray, ray);
				float b = 2.0 * dot(toSphere, ray);
				float c = dot(toSphere, toSphere) - sphereRadius * sphereRadius;
				float discriminant = b*b - 4.0*a*c;
				if (discriminant > 0.0) {
					float t = (-b - sqrt(discriminant)) / (2.0 * a);
					if (t > 0.0) return t;
				}
				return 1.0e6;
			}

			vec3 getSurfaceRayColor(vec3 origin, vec3 ray, vec3 waterColor) {
				vec3 color;
				float q = intersectSphere(origin, ray);
				if (q < 1.0e6) {
					vec3 point = origin + ray * q;
					float caustic = pow(max(0.0, dot(
						normalize(refract(-lightPosition, vec3(0.0, 1.0, 0.0), iorAir / iorWater)),
						normalize(point - sphereCenter)
					)), 5.0);
					color = waterColor * (0.5 + caustic * 0.5);
				} else if (ray.y < 0.0) {
					color = waterColor * 0.5;
				} else {
					color = waterColor + vec3(pow(max(0.0, dot(lightPosition, ray)), 5000.0)) * 0.5;
				}
				return color;
			}
			
			// Schlick's approximation for Fresnel
			float fresnel(float cosTheta) {
				float R0 = pow((iorAir - iorWater) / (iorAir + iorWater), 2.0);
				return R0 + (1.0 - R0) * pow(1.0 - cosTheta, 5.0);
			}
			
			// Calculate caustics contribution
			float caustics(vec3 pos) {
				vec3 lightDir = normalize(lightPosition);
				vec3 normalizedPos = normalize(pos);
				float causticPattern = sin(normalizedPos.x * 10.0 + time) * 
									cos(normalizedPos.z * 10.0 + time * 0.7) * 
									sin(normalizedPos.y * 8.0 + time * 1.3);
				return pow(max(0.0, causticPattern), 3.0) * 0.5;
			}
			
			// Calculate underwater lighting
			vec3 underwaterEffect(vec3 pos, vec3 normal, vec3 viewDir) {
				vec3 refractedLight = refract(-lightPosition, vec3(0.0, 1.0, 0.0), iorAir / iorWater);
				float diffuse = max(0.0, dot(-refractedLight, normal));
				
				// Add depth-based attenuation
				float depth = length(pos) * 0.5;
				vec3 attenuatedColor = fluidColor * exp(-depth * 0.2);
				
				// Add caustics
				float causticIntensity = caustics(pos);
				vec3 causticColor = lightColor * causticIntensity * diffuse;
				
				return mix(attenuatedColor, causticColor, 0.5);
			}
			
			void main() {
				vec3 normal = normalize(vNormal);
				float cosTheta = max(0.0, dot(normal, vViewDir));
				
				vec3 reflectedRay = reflect(vViewDir, normal);
				vec3 refractedRay = refract(vViewDir, normal, iorAir / iorWater);
				
				float fresnelTerm = fresnel(cosTheta);
				
				// Get both reflection and refraction colors
				vec3 reflectedColor = getSurfaceRayColor(vWorldPos, reflectedRay, fluidColor);
				vec3 refractedColor = getSurfaceRayColor(vWorldPos, refractedRay, fluidColor);
				
				// Final color blend with everything
				vec3 finalColor = mix(refractedColor, reflectedColor, fresnelTerm);
				
				// Add foam at edges
				float foam = 1.0 - smoothstep(0.2, 0.5, length(normal.xz));
				finalColor += lightColor * foam * 0.5;
				
				gl_FragColor = vec4(finalColor, 0.9);
			}
		`,
		transparent: true,
		side: THREE.BackSide,
		blending: THREE.AdditiveBlending
	});

	function showError(message: string) {
		const warning = document.createElement('div');
		warning.style.position = 'absolute';
		warning.style.top = '50%';
		warning.style.left = '50%';
		warning.style.transform = 'translate(-50%, -50%)';
		warning.style.color = '#ffffff';
		warning.style.padding = '1rem';
		warning.style.background = 'rgba(0,0,0,0.8)';
		warning.style.borderRadius = '4px';
		warning.textContent = message;
		container.appendChild(warning);
	}

	function initRenderer() {
		renderer = new THREE.WebGLRenderer({
			antialias: true,
			alpha: false,
			powerPreference: 'high-performance'
		});
		renderer.setClearColor(0x000510);
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setPixelRatio(
			isMobile ? Math.min(window.devicePixelRatio, 1.5) : Math.min(window.devicePixelRatio, 2)
		);
		renderer.autoClear = false;
		container.appendChild(renderer.domElement);
	}

	function initScene() {
		scene = new THREE.Scene();
		scene.background = new THREE.Color(0x000510);
	}

	function initCamera() {
		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		camera.position.z = 5;
	}

	function initControls() {
		controls = new OrbitControls(camera, renderer.domElement);
		controls.enableDamping = true;
		controls.dampingFactor = isMobile ? 0.2 : 0.05;
		controls.rotateSpeed = isMobile ? 1.0 : 0.8;
		controls.zoomSpeed = isMobile ? 1.2 : 0.8;
		controls.minDistance = 3;
		controls.maxDistance = 10;
		controls.autoRotate = !isMobile;
		controls.autoRotateSpeed = 0.5;
	}

	function initMeshes() {
		const perfectSphereGeometry = new THREE.SphereGeometry(2, 64, 64);
		const oceanGeometry = new THREE.IcosahedronGeometry(1.98, 2);

		cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256);
		cubeCamera = new THREE.CubeCamera(1, 1000, cubeRenderTarget);
		scene.add(cubeCamera);

		globe = new THREE.Mesh(perfectSphereGeometry, outerMaterial);
		innerGlobe = new THREE.Mesh(oceanGeometry, innerMaterial);

		globe.castShadow = true;
		globe.receiveShadow = true;
		innerGlobe.castShadow = true;
		innerGlobe.receiveShadow = true;

		scene.add(globe);
		scene.add(innerGlobe);
	}

	function initLights() {
		const lights = {
			ambient: new THREE.AmbientLight(0xffffff, 0.2),
			directional: new THREE.DirectionalLight(0xffffff, 0.8),
			caustic: new THREE.SpotLight(0x89cff0, 0.6),
			rimLight: new THREE.DirectionalLight(0xadd8e6, 0.3)
		};

		lights.directional.position.set(2, 2, -1);
		lights.caustic.position.set(2, 3, 2);
		lights.caustic.angle = Math.PI / 3;
		lights.caustic.penumbra = 0.4;
		lights.caustic.decay = 1.5;
		lights.caustic.distance = 15;
		lights.rimLight.position.set(-1, 0.5, -1);

		Object.values(lights).forEach((light) => scene.add(light));
	}

	function setupEventListeners() {
		window.addEventListener('resize', handleResize, { passive: true });

		if (isMobile) {
			container.addEventListener(
				'touchend',
				(e) => {
					const now = Date.now();
					if (now - lastTouchEnd <= 300) {
						e.preventDefault();
					}
					lastTouchEnd = now;
				},
				{ passive: false }
			);
		}

		document.addEventListener('visibilitychange', () => {
			controls.autoRotate = !document.hidden && !isMobile;
		});

		screen?.orientation?.addEventListener('change', () => {
			handleResize();
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			controls.reset();
		});
	}

	// Initialize Three.js scene with optimizations
	function initThree() {
		console.log('Initializing Three.js scene');

		try {
			// Check WebGL support and setup polyfill
			const supported = isOESTextureFloatLinearSupported();
			installOESTextureFloatLinearPolyfill();

			// Verify WebGL context
			const canvas = document.createElement('canvas');
			const context = canvas.getContext('webgl2') || canvas.getContext('webgl');
			if (!context) {
				showError('WebGL is not supported by your browser');
				return;
			}

			// Initialize core components
			initRenderer();
			initScene();
			initCamera();
			initControls();
			initMeshes();
			initShaderUniforms(); // New function to initialize uniforms
			initLights();
			setupEventListeners();

			isInitialized = true;
		} catch (error) {
			console.error('Failed to initialize WebGL:', error);
			showError('Failed to initialize 3D visualization');
		}
	}

	function initShaderUniforms() {
		// Update outer material uniforms
		outerMaterial.uniforms.time.value = 0;
		outerMaterial.uniforms.crystalColor.value = CRYSTAL_COLOR;
		outerMaterial.uniforms.baseOpacity.value = 0.05;
		outerMaterial.uniforms.refractionStrength.value = 0.1;
		outerMaterial.needsUpdate = true;

		// Update inner material uniforms
		innerMaterial.uniforms.time.value = 0;
		innerMaterial.uniforms.fluidColor.value = FLUID_COLOR;
		innerMaterial.uniforms.lightColor.value = LIGHT_COLOR;
		innerMaterial.uniforms.heightField.value = heightFieldTexture;
		innerMaterial.uniforms.iorAir.value = IOR_AIR;
		innerMaterial.uniforms.iorWater.value = IOR_WATER;
		innerMaterial.uniforms.lightPosition.value = new THREE.Vector3(2, 2, -1).normalize();
		innerMaterial.uniforms.sphereCenter.value = new THREE.Vector3(0, 0, 0);
		innerMaterial.uniforms.sphereRadius.value = 2.0;
		innerMaterial.uniforms.poolHeight.value = 1.0;
		innerMaterial.uniforms.velocityTexture.value = velocityTexture;
		innerMaterial.needsUpdate = true;
	}

	// Optimized resize handler
	function handleResize() {
		const width = window.innerWidth;
		const height = isMobile ? window.innerHeight : window.innerHeight;

		camera.aspect = width / height;
		camera.updateProjectionMatrix();

		renderer.setSize(width, height);
		renderer.setPixelRatio(
			isMobile ? Math.min(window.devicePixelRatio, 1.5) : Math.min(window.devicePixelRatio, 2)
		);
	}

	// Efficient texture update
	const textureData = new Float32Array(N * N * N * 4);
	function updateFluidTexture() {
		const densityValue = $density;
		const velocityXValue = $velocityX;
		const velocityYValue = $velocityY;
		const velocityZValue = $velocityZ;

		// Update main fluid texture
		for (let i = 0; i < N * N * N; i++) {
			const i4 = i * 4;
			textureData[i4] = densityValue[i];
			textureData[i4 + 1] = velocityXValue[i];
			textureData[i4 + 2] = velocityYValue[i];
			textureData[i4 + 3] = velocityZValue[i];
		}
		fluidTexture.image.data = textureData;
		fluidTexture.needsUpdate = true;

		// Update velocity texture
		const velocityData = new Float32Array(N * N * 4);
		for (let i = 0; i < N * N; i++) {
			const i4 = i * 4;
			velocityData[i4] = velocityXValue[i];
			velocityData[i4 + 1] = velocityYValue[i];
			velocityData[i4 + 2] = velocityZValue[i];
			velocityData[i4 + 3] = 1.0;
		}
		velocityTexture.image.data = velocityData;
		velocityTexture.needsUpdate = true;
		innerMaterial.uniforms.velocityTexture.value = velocityTexture;
	}

	const heightFieldSize = 64;
	const heightFieldData = new Float32Array(heightFieldSize * heightFieldSize * 4);
	const heightFieldTexture = new THREE.DataTexture(
		heightFieldData,
		heightFieldSize,
		heightFieldSize,
		THREE.RGBAFormat,
		THREE.FloatType
	);
	heightFieldTexture.minFilter = THREE.LinearFilter;
	heightFieldTexture.magFilter = THREE.LinearFilter;

	// Update heightfield based on audio data
	function updateHeightField() {
		if (!audioData?.frequencies) return;

		const { frequencies } = audioData;
		const binSize = frequencies.length / heightFieldSize;

		for (let i = 0; i < heightFieldSize; i++) {
			for (let j = 0; j < heightFieldSize; j++) {
				const idx = (i * heightFieldSize + j) * 4;

				// Sample audio frequencies in a circular pattern
				const angle = (Math.PI * 2 * j) / heightFieldSize;
				const radius = i / heightFieldSize;
				const freqIndex = Math.floor((radius * frequencies.length) / 4);

				// Calculate height based on audio frequency and distance from center
				let height = frequencies[freqIndex] / 255.0;
				height *= Math.exp(-radius * 3); // Fade out from center

				// Store height in red channel
				heightFieldData[idx] = height;
				heightFieldData[idx + 1] = 0;
				heightFieldData[idx + 2] = 0;
				heightFieldData[idx + 3] = 1;
			}
		}

		heightFieldTexture.needsUpdate = true;
		innerMaterial.uniforms.heightField.value = heightFieldTexture;
	}

	// Enhanced audio processing with better fluid interaction
	function processAudio() {
		if (!audioData?.frequencies || !isAudioActive) {
			if (import.meta.env.DEV) {
				console.warn('No active audio data for fluid simulation');
			}
			return;
		}

		const { frequencies, waveform, averageFrequency } = audioData;
		const binSize = frequencies.length / 4;
		const halfN = N / 2;
		const thirdN = N / 3;

		// Use both frequency and waveform data for richer fluid behavior
		for (let band = 0; band < 4; band++) {
			let freqSum = 0;
			let waveSum = 0;
			const bandStart = band * binSize;
			const bandEnd = bandStart + binSize;

			for (let i = bandStart; i < bandEnd; i++) {
				freqSum += frequencies[i];
				waveSum += Math.abs(waveform[i]);
			}

			const freqAvg = freqSum / binSize;
			const waveAvg = waveSum / binSize;

			if (freqAvg <= 0.01 && waveAvg <= 0.01) continue;

			const angle = (band / 4) * Math.PI * 2;
			const cos = Math.cos(angle);
			const sin = Math.sin(angle);

			const x = cos * thirdN + halfN;
			const y = sin * thirdN + halfN;
			const z = halfN;

			// Combine frequency and waveform for force
			const forceStrength = (freqAvg * 80 + waveAvg * 20) * averageFrequency;
			addForce(x, y, z, forceStrength);

			// Add velocity with waveform influence
			addVelocity(
				x,
				y,
				z,
				cos * freqAvg * 40 * (1 + waveAvg),
				sin * freqAvg * 40 * (1 + waveAvg),
				(Math.random() - 0.5) * freqAvg * 15 * (1 + waveAvg)
			);

			// Instead of directly accessing buffers, pass the temperature influence
			// through the force and velocity
			if (freqAvg > 0.5) {
				// Add temperature influence through additional force
				const tempForce = freqAvg * 0.1;
				addForce(x, y, z, tempForce * 50);
				addVelocity(x, y, z, 0, tempForce * 20, 0);
			}
		}
	}

	// Optimized animation loop
	function animate(currentTime: number) {
		try {
			animationId = requestAnimationFrame(animate);

			if (!scene || !camera || !renderer) {
				console.warn('Scene not fully initialized');
				return;
			}

			// FPS throttling
			if (currentTime - lastRAFTime < (isMobile ? RAF_THROTTLE * 1.5 : RAF_THROTTLE)) {
				return;
			}
			lastRAFTime = currentTime;

			// Convert to seconds and update materials
			const timeInSeconds = currentTime * 0.001;
			outerMaterial.uniforms.time.value = timeInSeconds;
			innerMaterial.uniforms.time.value = timeInSeconds;

			// Update scene
			cubeCamera.position.copy(globe.position);
			cubeCamera.update(renderer, scene);

			// Process updates
			if (isAudioActive) {
				processAudio();
				updateHeightField();
			}
			updateSimulation();
			updateFluidTexture();

			// Render
			controls.update();
			renderer.clear();
			renderer.render(scene, camera);
		} catch (error) {
			console.error('Animation loop error:', error);
			if (animationId) {
				cancelAnimationFrame(animationId);
				animationId = null;
			}
		}
	}

	function cleanup() {
		// Cancel animation
		if (animationId) {
			cancelAnimationFrame(animationId);
			animationId = null;
		}

		// Stop audio processing
		stopAudio();

		// Remove event listeners
		window.removeEventListener('resize', handleResize);
		document.removeEventListener('visibilitychange', () => {
			if (document.hidden) controls.autoRotate = false;
			else if (!isMobile) controls.autoRotate = true;
		});
		screen?.orientation?.removeEventListener('change', () => {
			handleResize();
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			controls.reset();
		});
		if (isMobile) {
			container.removeEventListener('touchend', () => {});
		}

		// Dispose of meshes and materials
		[globe, innerGlobe].forEach((mesh) => {
			if (!mesh) return;
			mesh.geometry?.dispose();
			if (Array.isArray(mesh.material)) {
				mesh.material.forEach((mat) => mat?.dispose());
			} else {
				mesh.material?.dispose();
			}
		});

		// Dispose of textures
		[fluidTexture, velocityTexture, heightFieldTexture, cubeRenderTarget].forEach((texture) => {
			texture?.dispose();
		});

		// Dispose of materials
		[outerMaterial, innerMaterial].forEach((material) => {
			material?.dispose();
		});

		// Clean up renderer
		if (renderer) {
			renderer.dispose();
			renderer.forceContextLoss();
		}

		// Clear scene and dispose controls
		scene?.clear();
		controls?.dispose();
	}

	// Update existing lifecycle hooks
	onMount(() => {
		initThree();
		animate(0);
	});

	onDestroy(() => {
		if (animationId) {
			cancelAnimationFrame(animationId);
			animationId = null;
		}
		cleanup();
	});
</script>

<AudioAnalyzer
	bind:this={audioAnalyzer}
	on:audioData={handleAudioData}
	on:error={(e) => console.error('Audio error:', e.detail)}
/>

<div
	class="container"
	bind:this={container}
	role="region"
	aria-label="Interactive 3D fluid visualization"
>
	<div class="loading" class:initialized={isInitialized} aria-hidden="true"></div>
</div>

<style>
	/* Base container with GPU acceleration */
	.container {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		overflow: hidden;
		transform: translateZ(0);
		will-change: transform;
		backface-visibility: hidden;
		perspective: 1000;
		background: radial-gradient(circle at center, #000510 0%, #000000 100%);
		touch-action: none;
		-webkit-touch-callout: none;
		-webkit-tap-highlight-color: transparent;
		user-select: none;
	}

	/* Loading state */
	.loading {
		position: absolute;
		inset: 0;
		background: #000510;
		opacity: 1;
		transition: opacity 0.5s ease-out;
		pointer-events: none;
		z-index: 0;
	}

	.loading:not([style*='opacity: 1']) + :global(canvas) {
		opacity: 1;
	}

	.loading.initialized {
		opacity: 0;
		visibility: hidden;
	}

	/* Canvas styling - using :global for canvas element */
	:global(.container > canvas) {
		opacity: 0;
		transition: opacity 0.5s ease-in;
		width: 100% !important;
		height: 100% !important;
	}

	/* Loading state transitions */
	.loading:not([style*='opacity: 1']) + :global(canvas) {
		opacity: 1;
	}

	/* Mobile orientation handling */
	@media screen and (orientation: portrait) {
		.container {
			height: 100dvh;
		}
	}

	@media screen and (orientation: landscape) {
		.container {
			height: 100lvh;
		}
	}

	/* iOS height fix */
	@supports (-webkit-touch-callout: none) {
		.container {
			height: -webkit-fill-available;
		}
	}

	/* Mobile optimizations */
	@media (max-width: 768px) {
		.container {
			perspective: none;
			will-change: auto;
			overscroll-behavior: none;
			-webkit-overflow-scrolling: auto;
		}

		/* Optimize touch interactions */
		:global(.container > canvas) {
			touch-action: manipulation;
		}
	}

	/* Battery saving on low-power mode */
	@media (prefers-reduced-motion: reduce) {
		.container,
		.loading,
		:global(.container > canvas) {
			transition: none !important;
			animation: none !important;
		}
	}

	/* High contrast mode support */
	@media (forced-colors: active) {
		.container {
			forced-color-adjust: none;
		}
	}

	/* Dark mode optimization */
	@media (prefers-color-scheme: dark) {
		.container {
			background: radial-gradient(circle at center, #000305 0%, #000000 100%);
		}
	}

	/* Accessibility class - only add when needed */
	:global(.sr-only) {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}
</style>
