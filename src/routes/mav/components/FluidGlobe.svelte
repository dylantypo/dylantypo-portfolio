<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import * as THREE from 'three';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
	import { useFluidSimulation } from '../lib/fluidSimulation';
	import { DEFAULT_CONFIG } from '../lib/config';
	import { FluidPhysics } from '../lib/physics';
	import type { AudioData } from '../lib/types';
	import {
		installOESTextureFloatLinearPolyfill,
		isOESTextureFloatLinearSupported
	} from '../lib/OESTextureFloatLinear';

	// Create reference to AudioAnalyzer component
	let {
		audioData = null,
		hasAudioPermission = false // Add this to control audio-dependent features
	} = $props<{
		audioData: AudioData | null;
		hasAudioPermission: boolean;
	}>();

	// Near your other state declarations, add:
	let isAudioActive = $derived(hasAudioPermission && audioData !== null);

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
	const TEXTURE_SIZE = 6;
	const RAF_THROTTLE = 1 / 60; // 60 FPS cap
	let lastRAFTime = 0;
	let isMobile = $state(false);
	let lastTouchEnd = 0;

	// Animation state with reactive declarations
	let animationId = $state<number | null>(null);
	let isInitialized = $state(false);

	let lastRotation = new THREE.Quaternion();
	let currentRotation = new THREE.Quaternion();
	let rotationVelocity = new THREE.Vector3();
	let lastUpdateTime = performance.now();

	const FLUID_COLOR = new THREE.Color(0x3a8fbd); // Brighter blue-teal, more saturated
	const LIGHT_COLOR = new THREE.Color(0x6fbcd1); // Lighter, more translucent blue-green
	const FLUID_RADIUS = 1.999;

	const CRYSTAL_COLOR = new THREE.Color(0xffffff); // Pure white for crystal
	const CRYSTAL_OPACITY = 0.005;
	const CRYSTAL_REFRACTION = 0.55;
	const CRYSTAL_RADIUS = 2;

	// Fluid fill animation parameters
	let fillStartTime = 0;
	const FILL_DURATION = 3000; // 3 seconds to fill
	const FILL_START = -0.9 * FLUID_RADIUS; // Start at bottom of sphere
	const FILL_END = -0.15 * FLUID_RADIUS; // Fill to near top

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
		useWebGL: true
	});

	const physics = new FluidPhysics({
		gridSize: TEXTURE_SIZE
	});

	// Enhanced outer shell material
	const outerMaterial = new THREE.ShaderMaterial({
		uniforms: {
			time: { value: 0 },
			crystalColor: { value: CRYSTAL_COLOR },
			baseOpacity: { value: CRYSTAL_OPACITY },
			refractionStrength: { value: CRYSTAL_REFRACTION }
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
			time: { value: 0 },
			fluidColor: { value: FLUID_COLOR },
			lightColor: { value: LIGHT_COLOR },
			fluidLevel: { value: FILL_START },
			lightPositions: {
				value: [
					new THREE.Vector3(0, 3, 2).normalize(),  // Main light from top-front
					new THREE.Vector3(-2, 2, -1).normalize() // Secondary from side
				]
			},
			lightColors: {
				value: [
					new THREE.Color(0xffffff).multiplyScalar(0.9),  // Increased brightness
					new THREE.Color(0x89cff0).multiplyScalar(0.6)   // Added blue tint
				]
			},
			lightIntensities: { value: [0.9, 0.6] },
			// Adding audio-reactive uniforms using existing data
			audioEnergy: { value: 0.0 },
			waveAmplitude: { value: 0.0 }
		},
		vertexShader: `
			uniform float time;
			uniform float audioEnergy;
			uniform float waveAmplitude;
			varying vec3 vPosition;
			varying vec3 vNormal;
			varying vec3 vViewDir;
			
			void main() {
				vPosition = position;
				vNormal = normalize(normalMatrix * normal);
				vec4 worldPos = modelMatrix * vec4(position, 1.0);
				vViewDir = normalize(cameraPosition - worldPos.xyz);
				
				// Enhanced wave motion using audio
				vec3 pos = position;
				float wave = sin(position.x * 5.0 + time * 2.0) * 0.03 * 
							smoothstep(-2.0, 1.0, position.y) * (1.0 + audioEnergy) +
							cos(position.z * 5.0 + time * 1.5) * 0.03 * 
							smoothstep(-2.0, 1.0, position.y) * waveAmplitude;
				pos.y += wave;
				
				gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
			}
		`,
		fragmentShader: `
			uniform float time;
			uniform vec3 fluidColor;
			uniform vec3 lightColor;
			uniform float fluidLevel;
			uniform vec3 lightPositions[2];
			uniform vec3 lightColors[2];
			uniform float lightIntensities[2];
			uniform float audioEnergy;
			uniform float waveAmplitude;
			
			varying vec3 vPosition;
			varying vec3 vNormal;
			varying vec3 vViewDir;
			
			void main() {
				vec3 normal = normalize(vNormal);
				float height = vPosition.y;
				float waterMask = smoothstep(fluidLevel - 0.1, fluidLevel + 0.1, height);
				
				// Enhanced wave pattern with audio reactivity
				float wave = sin(vPosition.x * 5.0 + time + audioEnergy) * 0.5 + 
							cos(vPosition.z * 5.0 + time * 1.2 + waveAmplitude) * 0.5;
				
				// Enhanced fresnel with audio reactivity
				float fresnel = pow(1.0 - max(dot(normal, vViewDir), 0.0), 3.0) * (1.0 + audioEnergy * 0.5);
				
				vec3 baseColor = fluidColor * (0.7 + wave * 0.3 + audioEnergy * 0.2);
				vec3 finalColor = baseColor * 0.3; // Ambient
				
				// Enhanced lighting with audio reactivity
				for(int i = 0; i < 2; i++) {
					vec3 lightDir = normalize(lightPositions[i]);
					float diff = max(dot(normal, lightDir), 0.0);
					// Add specular highlight
					vec3 halfDir = normalize(lightDir + vViewDir);
					float spec = pow(max(dot(normal, halfDir), 0.0), 32.0);
					float intensity = lightIntensities[i] * (1.0 + audioEnergy * 0.3);
					finalColor += baseColor * lightColors[i] * (diff * 0.8 + spec * 0.4) * intensity;
				}

				// Enhance rim lighting
				float rim = pow(1.0 - max(dot(normal, vViewDir), 0.0), 2.0);
				finalColor += rim * vec3(0.3, 0.4, 0.5) * (0.3 + audioEnergy * 0.2);
				
				// Enhanced foam with audio reactivity
				float foam = 1.0 - smoothstep(0.0, 0.1 + audioEnergy * 0.05, abs(height - fluidLevel));
				finalColor += foam * vec3(1.0) * (0.2 + waveAmplitude * 0.1);
				
				float opacity = (1.0 - waterMask) * (0.6 + fresnel * 0.3 + foam * 0.1);
				
				gl_FragColor = vec4(finalColor, opacity);
			}
		`,
		transparent: true,
		side: THREE.FrontSide,
		depthWrite: false,
		blending: THREE.CustomBlending,
		blendSrc: THREE.SrcAlphaFactor,
		blendDst: THREE.OneMinusSrcAlphaFactor
	});

	function updateFluidLevel(currentTime: number) {
		if (fillStartTime === 0) {
			fillStartTime = currentTime;
		}
		const elapsed = currentTime - fillStartTime;
		const progress = Math.min(elapsed / FILL_DURATION, 1.0);
		const t = progress < 0.5 ? 4 * Math.pow(progress, 3) : 1 - Math.pow(-2 * progress + 2, 3) / 2;

		if (innerMaterial instanceof THREE.ShaderMaterial && camera) {
			const baseFluidLevel = FILL_START + (FILL_END - FILL_START) * t;

			// Get camera-relative position
			const localCameraPosition = new THREE.Vector3();
			localCameraPosition.copy(camera.position);
			if (globe) {
				const inverseMatrix = new THREE.Matrix4();
				inverseMatrix.copy(globe.matrixWorld).invert();
				localCameraPosition.applyMatrix4(inverseMatrix);
			}

			// Calculate fluid level adjustments
			const upVector = new THREE.Vector3(0, 1, 0);
			const cameraAngle = localCameraPosition.angleTo(upVector);
			const tiltAdjustment = Math.sin(cameraAngle) * 0.15;
			const heightAdjustment = (localCameraPosition.y / 10) * 0.1;

			// Update fluid level uniform
			const finalFluidLevel = Math.max(
				FILL_START,
				Math.min(FILL_END, baseFluidLevel + tiltAdjustment + heightAdjustment)
			);
			innerMaterial.uniforms.fluidLevel.value = finalFluidLevel;
		}

		return t; // Return progress for use in updateFluidBoundaries
	}

	function updateFluidBoundaries() {
		const radius = FLUID_RADIUS;
		const { surfaceTension, damping, vorticityStrength } = DEFAULT_CONFIG;
		const currentTime = performance.now();

		// Get fill progress from updateFluidLevel
		const t = updateFluidLevel(currentTime);

		// Update fluid forces
		for (let i = 0; i < N; i++) {
			for (let j = 0; j < N; j++) {
				for (let k = 0; k < N; k++) {
					const pos = new THREE.Vector3(
						(i / N - 0.5) * radius * 2,
						(j / N - 0.5) * radius * 2,
						(k / N - 0.5) * radius * 2
					);

					const dist = pos.length();
					if (dist > radius * 0.8) {
						const normal = pos.clone().normalize();
						const strength = (dist - radius * 0.8) / (radius * 0.2);

						const densityValue = $density[i + j * N + k * N * N];
						if (densityValue > 0.1) {
							// Surface tension for droplet formation
							const tensionForce = surfaceTension * strength * densityValue * t; // Scale with fill progress
							addForce(i, j, k, -tensionForce);

							// Vorticity and curl
							const vortexStrength = vorticityStrength * (1.0 - strength);
							const curl = new THREE.Vector3(
								(Math.random() - 0.5) * vortexStrength,
								(Math.random() - 0.5) * vortexStrength,
								(Math.random() - 0.5) * vortexStrength
							);

							addVelocity(
								i,
								j,
								k,
								curl.x - normal.x * strength * damping,
								curl.y - normal.y * strength * damping,
								curl.z - normal.z * strength * damping
							);
						}
					}
				}
			}
		}
	}

	function initializeFluid() {
		// Initialize base fluid level
		const halfN = N / 2;
		const quarterN = N / 4;

		for (let i = 0; i < N; i++) {
			for (let j = 0; j < N / 2; j++) {
				// Fill bottom half initially
				for (let k = 0; k < N; k++) {
					const idx = i + j * N + k * N * N;
					$density[idx] = 1.0;
					// Add some initial movement
					$velocityX[idx] = (Math.random() - 0.5) * 0.1;
					$velocityY[idx] = Math.abs(Math.random()) * 0.1;
					$velocityZ[idx] = (Math.random() - 0.5) * 0.1;
				}
			}
		}

		// Add some initial forces
		for (let i = 0; i < 4; i++) {
			const angle = (i / 4) * Math.PI * 2;
			addForce(halfN + Math.cos(angle) * quarterN, N / 4, halfN + Math.sin(angle) * quarterN, 1.0);
		}
	}

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
			alpha: true,
			preserveDrawingBuffer: false,
			powerPreference: 'high-performance'
		});
		renderer.setClearColor(0x000000, 0); // Set to transparent
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setPixelRatio(
			isMobile ? Math.min(window.devicePixelRatio, 1.5) : Math.min(window.devicePixelRatio, 2)
		);
		renderer.autoClear = false;
		container.appendChild(renderer.domElement);
	}

	function initScene() {
		scene = new THREE.Scene();
		scene.background = null;
	}

	function initCamera() {
		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		camera.position.z = 8;
	}

	function initControls() {
		controls = new OrbitControls(camera, renderer.domElement);
		controls.enableDamping = true;
		controls.dampingFactor = isMobile ? 0.2 : 0.05;
		controls.rotateSpeed = isMobile ? 1.0 : 0.8;
		controls.zoomSpeed = isMobile ? 1.2 : 0.8;
		controls.minDistance = 2;
		controls.maxDistance = 10;
		controls.autoRotate = !isMobile;
		controls.autoRotateSpeed = 0.75;

		controls.addEventListener('end', (e) => {
			if (controls.target.lengthSq() > 0.1) {  // If target has moved away from center
				const startTarget = controls.target.clone();
				const endTarget = new THREE.Vector3(0, 0, 0);  // Reset position
				const duration = 1000; // 1 second transition
				
				const startPos = camera.position.clone();
				const endPos = camera.position.clone().sub(startTarget);  // Keep same relative position
				
				let progress = 0;
				const animate = () => {
					progress = Math.min(progress + 0.02, 1);  // Increment by 0.02 each frame
					
					// Ease function (cubic)
					const t = progress < 0.5 ? 
						4 * progress * progress * progress : 
						1 - Math.pow(-2 * progress + 2, 3) / 2;
					
					// Interpolate target and camera position
					controls.target.lerpVectors(startTarget, endTarget, t);
					camera.position.lerpVectors(startPos, endPos, t);
					
					if (progress < 1) {
						requestAnimationFrame(animate);
					}
				};
				
				animate();
			}
		});

		// Add rotation tracking
		controls.addEventListener('change', () => {
			if (!globe) return;

			const currentTime = performance.now();
			const deltaTime = (currentTime - lastUpdateTime) / 1000;

			if (deltaTime > 0) {
				currentRotation.setFromEuler(globe.rotation);
				rotationVelocity.set(
					(currentRotation.x - lastRotation.x) / deltaTime,
					(currentRotation.y - lastRotation.y) / deltaTime,
					(currentRotation.z - lastRotation.z) / deltaTime
				);
				lastRotation.copy(currentRotation);
				lastUpdateTime = currentTime;
			}
		});
	}

	function initMeshes() {
		// Create base geometries
		const perfectSphereGeometry = new THREE.SphereGeometry(CRYSTAL_RADIUS, 64, 64);
		const oceanGeometry = new THREE.SphereGeometry(FLUID_RADIUS, 64, 64); // Reduced segments since we're doing simpler rendering

		// Create reflection camera setup
		cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256);
		cubeCamera = new THREE.CubeCamera(1, 1000, cubeRenderTarget);
		scene.add(cubeCamera);

		// Create meshes
		globe = new THREE.Mesh(perfectSphereGeometry, outerMaterial);
		innerGlobe = new THREE.Mesh(oceanGeometry, innerMaterial);

		// Configure both meshes for proper rendering
		globe.renderOrder = 0; // Render outer shell first
		innerGlobe.renderOrder = 1; // Then render water

		globe.frustumCulled = false; // Always render the outer shell
		innerGlobe.frustumCulled = false; // Always render the water

		// Add to scene in correct order
		scene.add(globe);
		scene.add(innerGlobe);
	}

	function initLights() {
		const lights = {
			// Hemisphere light for ambient illumination from sky and ground
			hemisphere: new THREE.HemisphereLight(0x89cff0, 0x404040, 0.3),

			// Main directional lights for key lighting
			mainLight: new THREE.DirectionalLight(0xffffff, 0.7),
			secondaryLight: new THREE.DirectionalLight(0xffffff, 0.4),

			// Spot lights for caustics and water highlights
			causticPrimary: new THREE.SpotLight(0x89cff0, 0.5),
			causticSecondary: new THREE.SpotLight(0x89cff0, 0.4),

			// Rim lights for edge definition
			rimLight1: new THREE.DirectionalLight(0xadd8e6, 0.3),
			rimLight2: new THREE.DirectionalLight(0xadd8e6, 0.2)
		};

		// Position main lights
		lights.mainLight.position.set(0, 3, 2);
		lights.secondaryLight.position.set(-2, 2, 1);

		// Setup caustic lights
		lights.causticPrimary.position.set(2, 4, 2);
		lights.causticPrimary.angle = Math.PI / 2;
		lights.causticPrimary.penumbra = 0.9;
		lights.causticPrimary.decay = 1.1;
		lights.causticPrimary.distance = 20;

		lights.causticSecondary.position.set(-2, 3, -2);
		lights.causticSecondary.angle = Math.PI / 2.2;
		lights.causticSecondary.penumbra = 0.85;
		lights.causticSecondary.decay = 1.2;
		lights.causticSecondary.distance = 18;

		// Position rim lights for edge highlighting
		lights.rimLight1.position.set(-1, 1, -1);
		lights.rimLight2.position.set(1, 0, 1);

		// Add shadow capabilities
		const shadowLights = [lights.mainLight, lights.secondaryLight];
		shadowLights.forEach((light) => {
			light.castShadow = true;
			light.shadow.mapSize.width = 1024;
			light.shadow.mapSize.height = 1024;
			light.shadow.camera.near = 0.1;
			light.shadow.camera.far = 15;
			light.shadow.bias = -0.0005;
		});

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
			initLights();
			setupEventListeners();
			initializeFluid();

			isInitialized = true;
		} catch (error) {
			console.error('Failed to initialize WebGL:', error);
			showError('Failed to initialize 3D visualization');
		}
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

	// Enhanced audio processing with better fluid interaction
	function processAudio() {
		if (!audioData?.frequencies || !hasAudioPermission) {
			if (import.meta.env.DEV) {
				console.warn('No active audio data for fluid simulation');
			}
			return;
		}

		const { frequencies, waveform, averageFrequency } = audioData;

		// Enhanced frequency analysis for color manipulation
		const bassFreq = frequencies.slice(0, 10).reduce((a: number, b: number) => a + b, 0) / 2550; // 0-1
		const midFreq = frequencies.slice(10, 30).reduce((a: number, b: number) => a + b, 0) / 5100; // 0-1
		const highFreq = frequencies.slice(30).reduce((a: number, b: number) => a + b, 0) / 
			((frequencies.length - 30) * 255); // 0-1
		
		// Create dynamic colors based on audio characteristics
		const baseHue = (bassFreq * 360) % 360;
		const fluidSaturation = 0.5 + midFreq * 0.5;  // 0.5 - 1.0
		const fluidLightness = 0.3 + highFreq * 0.3;  // 0.3 - 0.6
		
		// Create complementary colors with smoother transitions
		const targetFluidColor = new THREE.Color().setHSL(baseHue / 360, fluidSaturation, fluidLightness);
		const targetCrystalColor = new THREE.Color().setHSL(
			((baseHue + 180) % 360) / 360, 
			fluidSaturation * 0.5,  // Less saturated
			0.7 + highFreq * 0.2    // Brighter
		);

		// Update material colors with smooth transitions
		if (innerMaterial instanceof THREE.ShaderMaterial) {
			// Smooth color transition
			innerMaterial.uniforms.fluidColor.value.lerp(targetFluidColor, 0.1);
			innerMaterial.uniforms.lightColor.value.lerp(targetFluidColor, highFreq * 0.3);
			
			// Update audio-reactive uniforms
			innerMaterial.uniforms.audioEnergy.value = (bassFreq + midFreq + highFreq) / 3;
			innerMaterial.uniforms.waveAmplitude.value = Math.max(...waveform) / 255;
			
			// Enhanced light intensities based on frequencies
			innerMaterial.uniforms.lightIntensities.value = [
				0.7 + bassFreq * 0.3,
				0.4 + midFreq * 0.2
			];
		}
		if (outerMaterial instanceof THREE.ShaderMaterial) {
			outerMaterial.uniforms.crystalColor.value.lerp(targetCrystalColor, 0.1);
		}

		// Process audio for fluid simulation
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

			// Use frequency characteristics for force scaling
			const fluidScale = Math.min(1.0, 0.3 + bassFreq * 0.7);

			// Combine frequency and waveform for force with scaled influence
			const forceStrength = (freqAvg * 120 + waveAvg * 30) * averageFrequency * fluidScale;
			addForce(x, y, z, forceStrength);

			// Enhanced splashing behavior based on high frequencies
			if (forceStrength > 0.6) {
				const splashRadius = Math.min(N / 4, Math.floor(forceStrength * 5));
				const splashIntensity = highFreq * 1.5 + 0.5; // Scale splash based on high frequencies
				
				for (let sx = -splashRadius; sx <= splashRadius; sx++) {
					for (let sz = -splashRadius; sz <= splashRadius; sz++) {
						const dist = Math.sqrt(sx * sx + sz * sz);
						if (dist <= splashRadius) {
							const splash = forceStrength * (1 - dist / splashRadius) * splashIntensity;
							const splashX = Math.floor(x + sx);
							const splashZ = Math.floor(z + sz);
							if (splashX >= 0 && splashX < N && splashZ >= 0 && splashZ < N) {
								addForce(splashX, y + Math.random() * 2, splashZ, splash * 0.5);
								addVelocity(
									splashX,
									y + Math.random() * 2,
									splashZ,
									(Math.random() - 0.5) * splash * 20,
									splash * 30,
									(Math.random() - 0.5) * splash * 20
								);
							}
						}
					}
				}
			}

			// Add velocity with waveform influence
			addVelocity(
				x,
				y,
				z,
				cos * freqAvg * 60 * (1 + waveAvg) * fluidScale,
				sin * freqAvg * 60 * (1 + waveAvg) * fluidScale,
				(Math.random() - 0.5) * freqAvg * 25 * (1 + waveAvg) * fluidScale
			);

			// Temperature influence through force and velocity
			if (freqAvg > 0.5) {
				const tempForce = freqAvg * 0.2 * fluidScale;
				const x = cos * thirdN + halfN;
				const y = sin * thirdN + halfN;
				const z = halfN;

				// Add stronger vertical force and temperature at high frequencies
				addForce(x, y, z, tempForce * 75);
				addVelocity(x, y, z, 0, tempForce * 30, 0);

				// Update temperature based on audio intensity with color influence
				if (innerMaterial instanceof THREE.ShaderMaterial) {
					innerMaterial.uniforms.temperature.value = 
						Math.min(1.0, (averageFrequency / 255.0) * (1 + highFreq * 0.5));
				}
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

			// Update both materials with time and ensure proper phasing
			outerMaterial.uniforms.time.value = timeInSeconds;
			innerMaterial.uniforms.time.value = timeInSeconds * 0.5; // Slightly slower for inner fluid

			// Update scene
			cubeCamera.position.copy(globe.position);
			cubeCamera.update(renderer, scene);

			// Process updates
			if (hasAudioPermission) {
				processAudio();
			}

			if (globe && rotationVelocity.lengthSq() > 0.001) {
				// Apply rotational forces to the fluid
				physics.applyRotationalForces(
					$velocityX,
					$velocityY,
					$velocityZ,
					rotationVelocity,
					globe.rotation
				);
			}

			// Update fluid boundaries and forces
			updateFluidBoundaries();
			if (innerMaterial instanceof THREE.ShaderMaterial && innerMaterial.uniforms.vorticityStrength) {
				innerMaterial.uniforms.vorticityStrength.value = DEFAULT_CONFIG.vorticityStrength;
			}

			// Update simulation
			updateSimulation();

			// Constant Motion
			const halfN = N / 2;
			const quarterN = N / 4;

			// Add gentle swirling motion
			for (let i = 0; i < 4; i++) {
				const angle = (i / 4) * Math.PI * 2 + timeInSeconds;
				const x = halfN + Math.cos(angle) * quarterN;
				const z = halfN + Math.sin(angle) * quarterN;

				addForce(x, quarterN, z, 0.1);
				addVelocity(
					x,
					quarterN,
					z,
					Math.cos(angle) * 0.5,
					Math.sin(timeInSeconds) * 0.2,
					Math.sin(angle) * 0.5
				);
			}

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

	function isShaderMaterial(material: THREE.Material | null): material is THREE.ShaderMaterial {
		return material !== null && material instanceof THREE.ShaderMaterial;
	}

	function cleanup() {
		// Cancel animation frame
		if (animationId) {
			cancelAnimationFrame(animationId);
			animationId = null;
		}

		// Remove event listeners with proper reference cleanup
		const visibilityHandler = () => {
			if (document.hidden) controls.autoRotate = false;
			else if (!isMobile) controls.autoRotate = true;
		};
		const orientationHandler = () => {
			handleResize();
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			controls.reset();
		};

		window.removeEventListener('resize', handleResize);
		document.removeEventListener('visibilitychange', visibilityHandler);
		screen?.orientation?.removeEventListener('change', orientationHandler);

		if (isMobile && container) {
			container.removeEventListener('touchend', () => {
				const now = Date.now();
				if (now - lastTouchEnd <= 300) {
					return;
				}
				lastTouchEnd = now;
			});
		}

		[globe, innerGlobe].forEach((mesh) => {
			if (!mesh) return;
			mesh.geometry?.dispose();

			// Handle materials with proper type checking
			if (Array.isArray(mesh.material)) {
				mesh.material.forEach((mat) => {
					if (mat instanceof THREE.ShaderMaterial) {
						// Safely access shader material uniforms
						if ('audioIntensity' in mat.uniforms) {
							mat.uniforms.audioIntensity.value = 0;
						}
						if ('audioDeformation' in mat.uniforms) {
							mat.uniforms.audioDeformation.value.set(0, 0, 0);
						}
					}
					mat.dispose();
				});
			} else if (mesh.material instanceof THREE.ShaderMaterial) {
				// Safely access shader material uniforms
				if ('audioIntensity' in mesh.material.uniforms) {
					mesh.material.uniforms.audioIntensity.value = 0;
				}
				if ('audioDeformation' in mesh.material.uniforms) {
					mesh.material.uniforms.audioDeformation.value.set(0, 0, 0);
				}
				mesh.material.dispose();
			}
		});

		// Dispose of materials with proper cleanup of uniforms
		[outerMaterial, innerMaterial].forEach((material) => {
			if (!material) return;
			// Clear uniform references and textures
			Object.values(material.uniforms || {}).forEach((uniform) => {
				if (uniform.value && uniform.value.dispose) {
					uniform.value.dispose();
				}
				uniform.value = null;
			});
			material.dispose();
		});

		// Reset scene transforms
		if (globe) {
			globe.scale.set(1, 1, 1);
			globe.position.set(0, 0, 0);
		}

		// Clean up renderer with context handling
		if (renderer) {
			// Ensure WebGL context is properly lost
			const gl = renderer.getContext();
			if (gl && 'getExtension' in gl) {
				gl.getExtension('WEBGL_lose_context')?.loseContext();
			}
			renderer.dispose();
			renderer.forceContextLoss();
			renderer.domElement.remove();
		}

		// Clear scene and dispose controls
		if (scene) {
			scene.traverse((object) => {
				if (object instanceof THREE.Mesh) {
					object.geometry?.dispose();
					if (object.material.isMaterial) {
						cleanMaterial(object.material);
					} else {
						for (const material of object.material) {
							cleanMaterial(material);
						}
					}
				}
			});
			scene.clear();
		}

		controls?.dispose();

		// Helper function to clean materials
		function cleanMaterial(material: THREE.Material) {
			material.dispose();
			// Clean up material's textures
			if ('uniforms' in material) {
				Object.values(material.uniforms || {}).forEach((uniform) => {
					if (uniform.value && uniform.value.dispose) {
						uniform.value.dispose();
					}
				});
			}
		}
	}

	// Enhanced lifecycle hooks
	onMount(() => {
		// Check for mobile device
		isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

		// Initialize scene with proper error handling
		try {
			initThree();
			animate(0);
		} catch (error) {
			console.error('Failed to initialize 3D scene:', error);
			showError('Failed to initialize visualization. Please reload the page.');
		}
	});

	onDestroy(() => {
		// Ensure animation is stopped before cleanup
		if (animationId) {
			cancelAnimationFrame(animationId);
			animationId = null;
		}
		// Run cleanup with error handling
		try {
			cleanup();
		} catch (error) {
			console.error('Error during cleanup:', error);
		}
	});
</script>

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
		touch-action: none;
		-webkit-touch-callout: none;
		-webkit-tap-highlight-color: transparent;
		user-select: none;
		background: 
			/* Layered, offset deep blue gradient base with ocean tones */
			radial-gradient(
				ellipse at 30% 50%,
				rgba(30, 96, 160, 0.4) 0%,
				rgba(44, 130, 190, 0.6) 50%,
				rgba(30, 96, 160, 0.2) 100%
			),
			radial-gradient(
				ellipse at 70% 40%,
				rgba(44, 130, 190, 0.3) 0%,
				rgba(30, 96, 160, 0.2) 60%,
				transparent 80%
			),
			/* Randomized soft light shafts */
				repeating-linear-gradient(
					-45deg,
					rgba(44, 130, 190, 0.05) 0%,
					rgba(58, 150, 210, 0.1) 10%,
					rgba(30, 96, 160, 0.02) 20%,
					rgba(58, 150, 210, 0.1) 30%,
					rgba(44, 130, 190, 0.05) 40%
				),
			/* Wavy caustic light patterns */
				radial-gradient(
					ellipse at 50% 60%,
					rgba(44, 200, 210, 0.07) 0%,
					rgba(30, 150, 200, 0.05) 10%,
					transparent 30%
				),
			radial-gradient(
				ellipse at 20% 80%,
				rgba(44, 200, 210, 0.05) 0%,
				rgba(30, 150, 200, 0.03) 15%,
				transparent 25%
			);
		background-size:
			100%,
			100%,
			300% 300%,
			400% 400%,
			300% 300%;
		background-position:
			0 0,
			0 0,
			50% 50%,
			25% 75%,
			75% 25%;
		animation:
			oceanFlow 45s ease infinite,
			causticShimmer 20s cubic-bezier(0.4, 0, 0.2, 1) infinite,
			lightShafts 60s ease-in-out infinite;
	}

	@keyframes oceanFlow {
		0%,
		100% {
			background-position:
				0 0,
				0 0,
				50% 50%,
				25% 75%,
				75% 25%;
		}
		50% {
			background-position:
				50% 50%,
				50% 50%,
				30% 70%,
				75% 25%,
				20% 80%;
		}
	}

	@keyframes causticShimmer {
		0%,
		100% {
			background-size:
				100%,
				100%,
				300% 300%,
				400% 400%,
				300% 300%;
			opacity: 0.8;
		}
		25% {
			background-size:
				100%,
				100%,
				320% 320%,
				420% 420%,
				320% 320%;
			opacity: 0.9;
		}
		50% {
			background-size:
				100%,
				100%,
				310% 310%,
				430% 430%,
				310% 310%;
			opacity: 0.7;
		}
		75% {
			background-size:
				100%,
				100%,
				340% 340%,
				440% 440%,
				340% 340%;
			opacity: 0.85;
		}
	}

	/* Loading state */
	.loading {
		position: absolute;
		inset: 0;
		opacity: 1;
		transition: opacity 0.5s ease-out;
		pointer-events: none;
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
		mix-blend-mode: luminosity;
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