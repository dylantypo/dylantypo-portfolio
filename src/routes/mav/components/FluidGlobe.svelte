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
	const TEXTURE_SIZE = 16;
	const RAF_THROTTLE = 1000 / 60; // 60 FPS cap
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

	// Constants for fluid simulation
	const IOR_AIR = 1.0;
	const IOR_WATER = 1.333;

	const FLUID_COLOR = new THREE.Color(0x3a8fbd); // Brighter blue-teal, more saturated
	const LIGHT_COLOR = new THREE.Color(0x6fbcd1); // Lighter, more translucent blue-green
	const FLUID_RADIUS = 1.95;

	const CRYSTAL_COLOR = new THREE.Color(0xffffff); // Pure white for crystal
	const CRYSTAL_OPACITY = 0.025;
	const CRYSTAL_REFRACTION = 0.15;
	const CRYSTAL_RADIUS = 2;

	// Fluid fill animation parameters
	let fillStartTime = 0;
	const FILL_DURATION = 2500; // 2.5 seconds to fill
	const FILL_START = -2.5; // Start at bottom of sphere
	const FILL_END = -0.35; // Fill to near top

	// Simulation setup
	const {
		density,
		velocityX,
		velocityY,
		velocityZ,
		temperature,
		updateSimulation,
		addForce,
		addVelocity,
		config: { gridSize: N }
	} = useFluidSimulation({
		gridSize: TEXTURE_SIZE,
		iterations: 6,
		viscosity: 0.0000001,
		diffusion: 0.0000001,
		useWebGL: true
	});

	const physics = new FluidPhysics({
		gridSize: TEXTURE_SIZE,
		iterations: 6,
		viscosity: 0.0000001,
		diffusion: 0.0000001,
		timeStep: 1 / 60,
		temperature: 0.4,
		density: 0.008,
		gravity: -12.0,
		vorticityStrength: 0.3
	});

	const textureConfig = {
		size: N,
		format: THREE.RGBAFormat,
		type: THREE.FloatType,
		minFilter: THREE.LinearFilter,
		magFilter: THREE.LinearFilter
	};

	// Create optimized fluid texture
	const fluidTexture = new THREE.DataTexture(
		new Float32Array(N * N * N * 4),
		N,
		N * N,
		THREE.RGBAFormat,
		THREE.FloatType
	);
	fluidTexture.minFilter = textureConfig.minFilter;
	fluidTexture.magFilter = textureConfig.magFilter;

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
			baseOpacity: { value: CRYSTAL_OPACITY },
			refractionStrength: { value: CRYSTAL_REFRACTION },
			audioIntensity: { value: 0.5 },
			audioDeformation: { value: new THREE.Vector3(0, 0, 0) }
		},
		vertexShader: `
			uniform float time;
			uniform float audioIntensity;
			uniform vec3 audioDeformation;
			varying vec3 vPosition;
			varying vec3 vNormal;
			varying vec3 vViewDir;
			
			void main() {
				// Apply audio-driven deformation
				vec3 pos = position;
				float deformationAmount = audioIntensity * 0.2;
				pos += normal * (sin(position.y * 10.0 + time) * audioDeformation.x +
							cos(position.x * 8.0 + time * 0.7) * audioDeformation.y +
							sin(position.z * 12.0 + time * 1.3) * audioDeformation.z) * deformationAmount;
				
				vPosition = pos;
				vNormal = normalize(normalMatrix * normal);
				vec4 worldPosition = modelMatrix * vec4(pos, 1.0);
				vViewDir = normalize(cameraPosition - worldPosition.xyz);
				gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
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
			fluidColor: { value: FLUID_COLOR }, // Deep blue
			lightColor: { value: LIGHT_COLOR }, // Light blue
			heightField: { value: null },
			iorAir: { value: IOR_AIR },
			iorWater: { value: IOR_WATER },
			sphereCenter: { value: new THREE.Vector3(0, 0, 0) },
			sphereRadius: { value: FLUID_RADIUS },
			fluidLevel: { value: FILL_START },
			velocityTexture: { value: null },
			lightPositions: {
				value: [
					new THREE.Vector3(0, 2, 2).normalize(), // Main light
					new THREE.Vector3(-2, 1, -1).normalize(), // Secondary light
					new THREE.Vector3(1, 2, 1).normalize(), // Caustic primary
					new THREE.Vector3(-1, 1.5, -1).normalize() // Caustic secondary
				]
			},
			lightColors: {
				value: [
					new THREE.Color(0xffffff).multiplyScalar(1.2),
					new THREE.Color(0xffffff),
					new THREE.Color(0x89cff0).multiplyScalar(1.1),
					new THREE.Color(0x89cff0)
				]
			},
			lightIntensities: { value: [1.2, 0.8, 1.0, 0.7] }
		},
		vertexShader: `
			uniform float time;
			varying vec3 vPosition;
			varying vec3 vNormal;
			varying vec2 vUv;
			varying vec3 vViewDir;
			varying vec3 vWorldPos;
			varying mat4 vModelMatrix;
			varying vec3 vViewPosition;
			
			void main() {
				vUv = uv;
				vNormal = normalize(normalMatrix * normal);
				vPosition = position;
				
				vec3 newPosition = position;
				float wave = sin(position.x * 5.0 + time * 2.0) * 0.03 * 
							smoothstep(-2.0, 1.0, position.y) +
							cos(position.z * 5.0 + time * 1.5) * 0.03 * 
							smoothstep(-2.0, 1.0, position.y);
							
				newPosition.y += wave;
				
				vec4 worldPos = modelMatrix * vec4(newPosition, 1.0);
				vec4 viewPos = viewMatrix * worldPos;  // Calculate view space position
				
				vWorldPos = worldPos.xyz;
				vViewPosition = viewPos.xyz;  // Store view space position
				vViewDir = normalize(cameraPosition - worldPos.xyz);
				vModelMatrix = modelMatrix;
				
				gl_Position = projectionMatrix * viewPos;
			}`,
		fragmentShader: `
			uniform sampler2D fluidTexture;
			uniform float time;
			uniform vec3 fluidColor;
			uniform vec3 lightColor;
			uniform float iorAir;
			uniform float iorWater;
			uniform vec3 sphereCenter;
			uniform float sphereRadius;
			uniform float fluidLevel;
			uniform vec3 lightPositions[4];
			uniform vec3 lightColors[4];
			uniform float lightIntensities[4];
			
			varying vec3 vPosition;
			varying vec3 vNormal;
			varying vec2 vUv;
			varying vec3 vViewDir;
			varying vec3 vWorldPos;
			varying mat4 vModelMatrix;
			varying vec3 vViewPosition;
			
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

			vec3 calculateLighting(vec3 normal, vec3 viewDir, vec3 baseColor) {
				vec3 finalColor = vec3(0.0);
				
				// Adjusted ambient contribution
				vec3 ambient = baseColor * 0.2;  // Reduced ambient
				finalColor += ambient;

				// Calculate contribution from each light
				for(int i = 0; i < 4; i++) {
					vec3 lightDir = normalize(lightPositions[i]);
					vec3 lightColor = lightColors[i];
					float intensity = lightIntensities[i];
					
					// Enhanced diffuse with view-dependent falloff
					float diff = max(dot(normal, lightDir), 0.0);
					float viewFactor = pow(max(dot(viewDir, lightDir), 0.0), 0.5);
					vec3 diffuse = diff * lightColor * baseColor * mix(0.7, 1.0, viewFactor);
					
					// Adjusted specular for water surface
					vec3 halfwayDir = normalize(lightDir + viewDir);
					float spec = pow(max(dot(normal, halfwayDir), 0.0), 64.0);  // Increased shininess
					vec3 specular = spec * lightColor * 0.8;  // Increased specular intensity
					
					// Enhanced fresnel effect
					float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 4.0);
					
					// Combine with intensity and view-dependent factors
					float viewDist = length(vViewPosition);
					float distanceFalloff = 1.0 - smoothstep(0.0, 8.0, viewDist);
					
					finalColor += (diffuse + specular * fresnel) * intensity * mix(0.8, 1.0, distanceFalloff);
				}

				// Enhanced rim lighting
				float rim = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.0);
				finalColor += rim * vec3(0.2, 0.3, 0.4) * 0.4;

				return finalColor;
			}

			vec3 getSurfaceRayColor(vec3 origin, vec3 ray, vec3 waterColor) {
				vec3 color;
				float q = intersectSphere(origin, ray);
				
				if (q < 1.0e6) {
					vec3 point = origin + ray * q;
					vec3 normal = normalize(point - sphereCenter);
					vec3 viewDir = -ray;
					
					// Use new lighting calculation
					color = calculateLighting(normal, viewDir, waterColor);
					
					// Add caustics
					float causticIntensity = 0.0;
					for(int i = 2; i < 4; i++) { // Only use caustic lights
						vec3 lightDir = normalize(lightPositions[i]);
						causticIntensity += pow(max(0.0, dot(
							normalize(refract(-lightDir, vec3(0.0, 1.0, 0.0), iorAir / iorWater)),
							normal
						)), 5.0) * lightIntensities[i];
					}
					
					color += waterColor * causticIntensity * 0.5;
				} else {
					color = waterColor * 0.3;
				}
				
				return color;
			}
			
			float fresnel(float cosTheta) {
				float R0 = pow((iorAir - iorWater) / (iorAir + iorWater), 2.0);
				return R0 + (1.0 - R0) * pow(1.0 - cosTheta, 3.0);
			}
			
			float caustics(vec3 pos, vec3 lightDir) {
				vec3 normalizedPos = normalize(pos);
				float causticPattern = sin(normalizedPos.x * 10.0 + time) * 
									cos(normalizedPos.z * 10.0 + time * 0.7) * 
									sin(normalizedPos.y * 8.0 + time * 1.3);
				return pow(max(0.0, causticPattern), 3.0) * 0.5;
			}
			
			void main() {
				vec3 normal = normalize(vNormal);
				
				// Use view space Y coordinate for fluid level check
				float viewHeight = vViewPosition.y;
				
				// Adjust fluid level check to view space
				if (viewHeight < (fluidLevel + sin(vViewPosition.x * 0.5 + time) * 0.1)) {
					float cosTheta = max(0.0, dot(normal, vViewDir));
					vec3 reflectedRay = reflect(vViewDir, normal);
					vec3 refractedRay = refract(vViewDir, normal, iorAir / iorWater);
					float fresnelTerm = fresnel(cosTheta);
					
					vec3 reflectedColor = getSurfaceRayColor(vWorldPos, reflectedRay, fluidColor);
					vec3 refractedColor = getSurfaceRayColor(vWorldPos, refractedRay, fluidColor);
					
					// Adjust mix ratio to favor reflections while maintaining transparency
					float reflectionStrength = mix(0.3, 0.7, fresnelTerm);
					vec3 finalColor = mix(refractedColor, reflectedColor, reflectionStrength);
					
					// Add underwater depth effect
					float depth = abs(viewHeight - fluidLevel);
					float underwaterFactor = exp(-depth * 0.5);
					finalColor = mix(fluidColor * 0.5, finalColor, underwaterFactor);
					
					// Enhance specular highlights
					vec3 specularColor = vec3(0.0);
					for(int i = 0; i < 4; i++) {
						vec3 lightDir = normalize(lightPositions[i]);
						vec3 halfwayDir = normalize(lightDir + vViewDir);
						float spec = pow(max(dot(normal, halfwayDir), 0.0), 64.0);
						specularColor += lightColors[i] * spec * lightIntensities[i] * 0.5;
					}
					finalColor += specularColor;
					
					// Add foam with adjusted transparency
					float waterLevelDist = abs(viewHeight - fluidLevel);
					float foam = 1.0 - smoothstep(0.0, 0.1, waterLevelDist);
					float waveOffset = sin(vViewPosition.x * 5.0 + time * 2.0) * 0.05 + 
									cos(vViewPosition.z * 5.0 + time * 1.5) * 0.05;
					foam *= 1.0 + waveOffset;
					
					// View-dependent foam
					float viewFoamFactor = 1.0 - abs(dot(normal, vec3(0.0, 1.0, 0.0)));
					foam *= viewFoamFactor * 0.5;
					
					vec3 foamLight = vec3(0.0);
					for(int i = 0; i < 4; i++) {
						vec3 lightDir = normalize(lightPositions[i]);
						float diff = max(dot(normal, lightDir), 0.0);
						foamLight += lightColors[i] * diff * lightIntensities[i];
					}
					
					finalColor += foam * foamLight * 0.5;
					
					// View and depth-dependent transparency
					float baseTransparency = 0.7;  // Increased base transparency
					float depthFactor = exp(-depth * 0.3);  // Slower depth falloff
					float viewFactor = pow(1.0 - abs(dot(normal, vViewDir)), 2.0);
					float transparency = mix(baseTransparency, 0.95, viewFactor * depthFactor);
					
					gl_FragColor = vec4(finalColor, transparency);
				} else {
					gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
				}
			}`,
		transparent: true,
		side: THREE.BackSide,
		blending: THREE.AdditiveBlending
	});

	function updateFluidLevel(currentTime: number) {
		if (fillStartTime === 0) {
			fillStartTime = currentTime;
		}

		const elapsed = currentTime - fillStartTime;
		const progress = Math.min(elapsed / FILL_DURATION, 1.0);

		// Smoother easing function
		const t = progress < 0.5 ? 4 * Math.pow(progress, 3) : 1 - Math.pow(-2 * progress + 2, 3) / 2;

		if (innerMaterial instanceof THREE.ShaderMaterial && camera) {
			// Add subtle adjustment based on camera angle
			const cameraAngle = Math.atan2(camera.position.z, camera.position.x);
			const fluidAdjustment = Math.sin(cameraAngle) * 0.1;

			innerMaterial.uniforms.fluidLevel.value =
				FILL_START + (FILL_END - FILL_START) * t + fluidAdjustment;
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
		renderer.setClearColor(0x000000, 0.1); // Set to transparent
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
		const perfectSphereGeometry = new THREE.SphereGeometry(CRYSTAL_RADIUS, 64, 64);
		const oceanGeometry = new THREE.SphereGeometry(FLUID_RADIUS, 64, 64);

		cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256);
		cubeCamera = new THREE.CubeCamera(1, 1000, cubeRenderTarget);
		scene.add(cubeCamera);

		globe = new THREE.Mesh(perfectSphereGeometry, outerMaterial);
		innerGlobe = new THREE.Mesh(oceanGeometry, innerMaterial);

		globe.castShadow = true;
		globe.receiveShadow = true;
		innerGlobe.castShadow = true;
		innerGlobe.receiveShadow = true;

		// Proper rendering order
		globe.renderOrder = 1;
		innerGlobe.renderOrder = 2;

		scene.add(globe);
		scene.add(innerGlobe);
	}

	function initLights() {
		const lights = {
			// Hemisphere light for ambient illumination from sky and ground
			hemisphere: new THREE.HemisphereLight(0x89cff0, 0x404040, 0.5),

			// Main directional lights for key lighting
			mainLight: new THREE.DirectionalLight(0xffffff, 0.85),
			secondaryLight: new THREE.DirectionalLight(0xffffff, 0.5),

			// Spot lights for caustics and water highlights
			causticPrimary: new THREE.SpotLight(0x89cff0, 0.8),
			causticSecondary: new THREE.SpotLight(0x89cff0, 0.6),

			// Rim lights for edge definition
			rimLight1: new THREE.DirectionalLight(0xadd8e6, 0.4),
			rimLight2: new THREE.DirectionalLight(0xadd8e6, 0.3)
		};

		// Position main lights
		lights.mainLight.position.set(0, 2, 2);
		lights.secondaryLight.position.set(-2, 1, 2);

		// Setup caustic lights
		lights.causticPrimary.position.set(2, 3, 2);
		lights.causticPrimary.angle = Math.PI / 3;
		lights.causticPrimary.penumbra = 0.4;
		lights.causticPrimary.decay = 1.5;
		lights.causticPrimary.distance = 15;

		lights.causticSecondary.position.set(-2, 2, -2);
		lights.causticSecondary.angle = Math.PI / 4;
		lights.causticSecondary.penumbra = 0.5;
		lights.causticSecondary.decay = 1.8;
		lights.causticSecondary.distance = 12;

		// Position rim lights for edge highlighting
		lights.rimLight1.position.set(-1, 0.5, -1);
		lights.rimLight2.position.set(1, -0.5, 1);

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
		outerMaterial.uniforms.baseOpacity.value = CRYSTAL_OPACITY;
		outerMaterial.uniforms.refractionStrength.value = CRYSTAL_REFRACTION;
		outerMaterial.needsUpdate = true;

		// Update inner material uniforms
		innerMaterial.uniforms.time.value = 0;
		innerMaterial.uniforms.fluidColor.value = FLUID_COLOR;
		innerMaterial.uniforms.lightColor.value = LIGHT_COLOR;
		innerMaterial.uniforms.heightField.value = heightFieldTexture;
		innerMaterial.uniforms.iorAir.value = IOR_AIR;
		innerMaterial.uniforms.iorWater.value = IOR_WATER;
		innerMaterial.uniforms.sphereCenter.value = new THREE.Vector3(0, 0, 0);
		innerMaterial.uniforms.sphereRadius.value = 1.95;
		innerMaterial.uniforms.fluidLevel.value = FILL_START; // Start at bottom
		innerMaterial.uniforms.fluidTexture.value = fluidTexture;
		innerMaterial.uniforms.velocityTexture.value = velocityTexture;
		innerMaterial.uniforms.temperature = { value: 0.5 };
		innerMaterial.needsUpdate = true;
		innerMaterial.uniforms.lightPositions = {
			value: [
				new THREE.Vector3(0, 2, 2).normalize(), // Main light
				new THREE.Vector3(-2, 1, -1).normalize(), // Secondary light
				new THREE.Vector3(1, 2, 1).normalize(), // Caustic primary
				new THREE.Vector3(-1, 1.5, -1).normalize() // Caustic secondary
			]
		};
		innerMaterial.uniforms.lightColors = {
			value: [
				new THREE.Color(0xffffff).multiplyScalar(1.2),
				new THREE.Color(0xffffff),
				new THREE.Color(0x89cff0).multiplyScalar(1.1),
				new THREE.Color(0x89cff0)
			]
		};
		innerMaterial.uniforms.lightIntensities = {
			value: [1.2, 0.8, 1.0, 0.7]
		};
		innerMaterial.blending = THREE.CustomBlending;
		innerMaterial.blendSrc = THREE.SrcAlphaFactor;
		innerMaterial.blendDst = THREE.OneMinusSrcAlphaFactor;
		innerMaterial.transparent = true;
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
		if (!fluidTexture || !velocityTexture) return;

		const densityValue = $density;
		const velocityXValue = $velocityX;
		const velocityYValue = $velocityY;
		const velocityZValue = $velocityZ;
		const temperatureValue = $temperature;

		// Update main fluid texture
		for (let i = 0; i < N * N * N; i++) {
			const i4 = i * 4;
			textureData[i4] = densityValue[i];
			textureData[i4 + 1] = velocityXValue[i];
			textureData[i4 + 2] = velocityYValue[i];
			textureData[i4 + 3] = temperatureValue[i];
		}

		// Set texture data with correct typing
		fluidTexture.image = {
			data: textureData,
			width: N,
			height: N * N
		};
		fluidTexture.needsUpdate = true;

		// Update velocity texture with proper typing
		const velocityData = new Float32Array(N * N * 4);
		for (let i = 0; i < N * N; i++) {
			const i4 = i * 4;
			velocityData[i4] = velocityXValue[i];
			velocityData[i4 + 1] = velocityYValue[i];
			velocityData[i4 + 2] = velocityZValue[i];
			velocityData[i4 + 3] = 1.0;
		}

		velocityTexture.image = {
			data: velocityData,
			width: N,
			height: N
		};
		velocityTexture.needsUpdate = true;

		if (innerMaterial instanceof THREE.ShaderMaterial) {
			innerMaterial.uniforms.velocityTexture.value = velocityTexture;
		}
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

	// Set texture data with correct typing
	heightFieldTexture.image = {
		data: heightFieldData,
		width: heightFieldSize,
		height: heightFieldSize
	};
	heightFieldTexture.minFilter = THREE.LinearFilter;
	heightFieldTexture.magFilter = THREE.LinearFilter;
	heightFieldTexture.needsUpdate = true;

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

				// Map angle and radius to frequency bins
				const angularBin = Math.floor((angle / (Math.PI * 2)) * binSize);
				const radialBin = Math.floor(radius * binSize);

				// Combine angular and radial components for final frequency index
				const freqIndex = Math.min(
					Math.floor(angularBin + radialBin * binSize),
					frequencies.length - 1
				);

				// Calculate height based on audio frequency and distance from center
				let height = frequencies[freqIndex] / 255.0;
				height *= Math.exp(-radius * 3); // Fade out from center

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
		if (!audioData?.frequencies || !hasAudioPermission) {
			if (import.meta.env.DEV) {
				console.warn('No active audio data for fluid simulation');
			}
			return;
		}

		const { frequencies, waveform, averageFrequency } = audioData;

		// Process audio for the outer globe deformation
		const bassFreq = frequencies.slice(0, 10).reduce((a: number, b: number) => a + b, 0) / 10;
		const midFreq = frequencies.slice(10, 30).reduce((a: number, b: number) => a + b, 0) / 20;
		const highFreq =
			frequencies.slice(30).reduce((a: number, b: number) => a + b, 0) / (frequencies.length - 30);

		// Update globe deformation based on audio
		outerMaterial.uniforms.audioIntensity.value = averageFrequency;
		outerMaterial.uniforms.audioDeformation.value.set(
			(bassFreq / 255) * 0.1,
			(midFreq / 255) * 0.05,
			(highFreq / 255) * 0.025
		);

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

			// Scale down fluid forces when globe deformation is high
			const globeDeformation = outerMaterial.uniforms.audioIntensity.value;
			const fluidScale = 1.0 - Math.min(globeDeformation * 0.5, 0.7);

			// Combine frequency and waveform for force with scaled influence
			const forceStrength = (freqAvg * 120 + waveAvg * 30) * averageFrequency * fluidScale;
			addForce(x, y, z, forceStrength);

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

				// Optionally update global temperature based on audio intensity
				if (innerMaterial instanceof THREE.ShaderMaterial) {
					innerMaterial.uniforms.temperature.value = Math.min(1.0, averageFrequency / 255.0);
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
			innerMaterial.uniforms.time.value = timeInSeconds * 0.8; // Slightly slower for inner fluid

			updateFluidLevel(currentTime);

			// Update scene
			cubeCamera.position.copy(globe.position);
			cubeCamera.update(renderer, scene);

			// Process updates
			if (hasAudioPermission) {
				processAudio();
				updateHeightField();
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

			// Update simulation and textures
			updateSimulation();
			updateFluidTexture();

			// Apply secondary deformations based on audio
			if (isAudioActive && globe) {
				const deformation = outerMaterial.uniforms.audioDeformation.value;
				globe.scale.set(1 + deformation.x * 0.1, 1 + deformation.y * 0.1, 1 + deformation.z * 0.1);
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