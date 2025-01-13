<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import * as THREE from 'three';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
	import { useFluidSimulation } from '../lib/fluidSimulation';
	import AudioAnalyzer from './AudioAnalyzer.svelte';
	import type { AudioData } from '../lib/types';

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

	function handleAudioError(event: CustomEvent<string>) {
		console.error('Audio error:', event.detail);
		isAudioActive = false;
	}

	// Refs with explicit types
	let container: HTMLDivElement;
	let renderer: THREE.WebGLRenderer;
	let scene: THREE.Scene;
	let camera: THREE.PerspectiveCamera;
	let controls: OrbitControls;
	let globe: THREE.Mesh;
	let innerGlobe: THREE.Mesh;

	// Performance optimizations
	const TEXTURE_SIZE = 64;
	const RAF_THROTTLE = 1000 / 60; // 60 FPS cap
	let lastRAFTime = 0;
	let isMobile = $state(false);
	let lastTouchEnd = 0;

	// Animation state with reactive declarations
	let animationId = $state<number | null>(null);
	let time = $state(0);
	let isInitialized = $state(false);

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

	// Enhanced outer shell material
	const outerMaterial = new THREE.ShaderMaterial({
        uniforms: {
            fluidTexture: { value: fluidTexture },
            time: { value: 0 },
            crystalColor: { value: CRYSTAL_COLOR },
            baseOpacity: { value: 0.05 }  // Increased base opacity
        },
        vertexShader: `
            varying vec3 vNormal;
            varying vec3 vPosition;
            varying vec3 vWorldPosition;
            varying vec3 vViewDirection;
            
            void main() {
                vNormal = normalize(normalMatrix * normal);
                vPosition = position;
                vec4 worldPosition = modelMatrix * vec4(position, 1.0);
                vWorldPosition = worldPosition.xyz;
                vViewDirection = normalize(cameraPosition - worldPosition.xyz);
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform sampler2D fluidTexture;
            uniform float time;
            uniform vec3 crystalColor;
            uniform float baseOpacity;
            
            varying vec3 vNormal;
            varying vec3 vPosition;
            varying vec3 vWorldPosition;
            varying vec3 vViewDirection;
            
            void main() {
                vec3 normal = normalize(vNormal);
                
                // Enhanced Fresnel effect for glass
                float fresnel = pow(1.0 - abs(dot(normal, vViewDirection)), 3.0);
                
                // Simpler, smoother refraction
                vec3 refraction = refract(-vViewDirection, normal, 0.98);
                float dispersion = pow(1.0 - abs(dot(refraction, vec3(0.0, 1.0, 0.0))), 2.0);
                
                // Very subtle surface detail
                float microDetail = sin(vWorldPosition.x * 10.0 + time * 0.1) * 
                                cos(vWorldPosition.y * 10.0 + time * 0.08) * 
                                sin(vWorldPosition.z * 10.0 + time * 0.12) * 0.002;
                
                // Subtle chromatic aberration
                float blueShift = pow(fresnel, 2.0) * 0.01;
                vec3 glassColor = crystalColor + vec3(-blueShift * 0.5, 0.0, blueShift);
                
                // Smoother glass effect
                vec3 finalColor = glassColor * (1.0 + dispersion * 0.1 + microDetail);
                float alpha = mix(baseOpacity, 0.15, fresnel);
                
                gl_FragColor = vec4(finalColor, alpha);
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
			fluidColor: { value: FLUID_COLOR },
			lightColor: { value: LIGHT_COLOR },
			heightField: { value: null } // Will be updated by audio data
		},
		vertexShader: `
            varying vec3 vPosition;
            varying vec3 vNormal;
            varying vec2 vUv;
            varying vec3 vRefract;
            varying vec3 vReflect;
            uniform sampler2D heightField;
            
            void main() {
                vUv = uv;
                
                // Calculate height offset based on audio data
                float height = texture2D(heightField, vUv).r;
                vec3 newPosition = position + normal * height * 0.2;
                
                // Calculate surface normal for reflections/refractions
                vec3 worldNormal = normalize(mat3(modelMatrix) * normal);
                vec3 eyeVector = normalize(cameraPosition - (modelMatrix * vec4(position, 1.0)).xyz);
                
                // Calculate reflection and refraction vectors
                vRefract = refract(eyeVector, worldNormal, 0.75);
                vReflect = reflect(eyeVector, worldNormal);
                
                vPosition = newPosition;
                vNormal = normalize(normalMatrix * normal);
                
                gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
            }
        `,
		fragmentShader: `
            uniform sampler2D fluidTexture;
            uniform float time;
            uniform vec3 fluidColor;
            uniform vec3 lightColor;
            varying vec3 vPosition;
            varying vec3 vNormal;
            varying vec2 vUv;
            varying vec3 vRefract;
            varying vec3 vReflect;
            
            // Fresnel approximation
            float fresnel(vec3 normal, vec3 viewDir) {
                return pow(1.0 - clamp(dot(normal, viewDir), 0.0, 1.0), 4.0);
            }
            
            // Improved noise function for dynamic ripples
            float noise(vec3 p) {
                vec3 i = floor(p);
                vec3 f = fract(p);
                f = f * f * (3.0 - 2.0 * f);
                
                float n = i.x + i.y * 157.0 + 113.0 * i.z;
                vec4 v = fract(sin(vec4(n + 0.0, n + 1.0, n + 157.0, n + 158.0)) * 43758.5453123);
                
                return mix(
                    mix(mix(v.x, v.y, f.x), mix(v.z, v.w, f.x), f.y),
                    mix(mix(v.x, v.y, f.x), mix(v.z, v.w, f.x), f.y + 1.0),
                    f.z
                );
            }
            
            // Dynamic ripple pattern
            float ripples(vec3 p) {
                float d = 0.0;
                float s = 1.0;
                for(int i = 0; i < 4; i++) {
                    d += noise(p * s + time) / s;
                    s *= 2.0;
                    p = p * 1.2 + vec3(1.3, 1.7, 2.1);
                }
                return d;
            }
            
            void main() {
                vec3 viewDir = normalize(cameraPosition - vPosition);
                
                // Sample fluid density with ripple distortion
                vec3 rippleOffset = vec3(ripples(vPosition * 2.0 + time));
                vec3 texCoord = normalize(vPosition + rippleOffset * 0.02) * 0.5 + 0.5;
                
                float density = texture2D(fluidTexture, 
                    vec2(texCoord.x + texCoord.z * ${N}.0,
                        texCoord.y + texCoord.z * ${N}.0) / ${N}.0).r;
                
                // Calculate water depth and color
                float depth = (1.0 - texCoord.y) * 0.6;
                vec3 deepColor = fluidColor * 0.3;
                vec3 shallowColor = mix(fluidColor, lightColor, 0.7);
                
                // Add dynamic ripples and waves
                float ripplePattern = ripples(vPosition * 4.0 + time * 0.5);
                float waveHeight = ripplePattern * 0.1;
                
                // Mix colors with reflections and refractions
                vec3 waterColor = mix(deepColor, shallowColor, density * (1.0 - depth) + waveHeight);
                
                // Add caustics and specular highlights
                float causticIntensity = pow(max(dot(normalize(vRefract), vec3(0.0, 1.0, 0.0)), 0.0), 4.0);
                waterColor += lightColor * causticIntensity * (1.0 - depth) * 0.4;
                
                // Calculate fresnel term for reflection blend
                float fresnelTerm = fresnel(normalize(vNormal), viewDir);
                
                // Blend with reflections
                vec3 reflectionColor = lightColor * pow(fresnelTerm, 2.0);
                waterColor = mix(waterColor, reflectionColor, fresnelTerm * 0.5);
                
                // Dynamic opacity based on depth and waves
                float alpha = mix(0.6, 0.9, density * (1.0 - depth * 0.5) + fresnelTerm);
                alpha += waveHeight * 0.2;
                
                gl_FragColor = vec4(waterColor, alpha);
            }
        `,
		transparent: true,
		side: THREE.BackSide,
		depthWrite: false,
		blending: THREE.AdditiveBlending
	});

	// Initialize Three.js scene with optimizations
	function initThree() {
		console.log('Initializing Three.js scene');

		try {
			const canvas = document.createElement('canvas');
			const context = canvas.getContext('webgl2') || canvas.getContext('webgl');
			if (!context) {
				const warning = document.createElement('div');
				warning.style.position = 'absolute';
				warning.style.top = '50%';
				warning.style.left = '50%';
				warning.style.transform = 'translate(-50%, -50%)';
				warning.style.color = '#ffffff';
				warning.style.padding = '1rem';
				warning.style.background = 'rgba(0,0,0,0.8)';
				warning.style.borderRadius = '4px';
				warning.textContent = 'WebGL is not supported by your browser';
				container.appendChild(warning);
				return;
			}

			// Check for mobile device
			isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
				navigator.userAgent
			);

			// Renderer with optimized settings
			renderer = new THREE.WebGLRenderer({
				antialias: true,
				alpha: false,
				powerPreference: 'high-performance'
			});
			renderer.setClearColor(0x000510);
			console.log('Renderer created');
			renderer.setSize(window.innerWidth, window.innerHeight);
			renderer.setPixelRatio(
				isMobile ? Math.min(window.devicePixelRatio, 1.5) : Math.min(window.devicePixelRatio, 2)
			);
			renderer.autoClear = false;
			container.appendChild(renderer.domElement);
			console.log('Renderer added to container');

			// Scene setup
			scene = new THREE.Scene();
			scene.background = new THREE.Color(0x000510);

			// Optimized camera setup
			camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
			camera.position.z = 5;

			// Enhanced controls with mobile optimization
			controls = new OrbitControls(camera, renderer.domElement);
			controls.enableDamping = true;
			controls.dampingFactor = isMobile ? 0.2 : 0.05;
			controls.rotateSpeed = isMobile ? 1.0 : 0.8;
			controls.zoomSpeed = isMobile ? 1.2 : 0.8;
			controls.minDistance = 3;
			controls.maxDistance = 10;
			controls.autoRotate = !isMobile;
			controls.autoRotateSpeed = 0.5;

			// Create optimized geometries
			const geometry = new THREE.IcosahedronGeometry(2, isMobile ? 4 : 5);
			const innerGeometry = new THREE.IcosahedronGeometry(1.98, isMobile ? 2 : 3);

			// Create meshes
			globe = new THREE.Mesh(geometry, outerMaterial);
			innerGlobe = new THREE.Mesh(innerGeometry, innerMaterial);

			scene.add(globe);
			scene.add(innerGlobe);

			// Optimized lighting
			// Enhanced lighting for caustics
			const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
			const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
			mainLight.position.set(1, 1, 2);

			// Add focused light for caustics
			const causticLight = new THREE.SpotLight(0x89cff0, 0.5);
			causticLight.position.set(2, 3, 2);
			causticLight.angle = Math.PI / 4;
			causticLight.penumbra = 0.3;

			// Add subtle rim light
			const rimLight = new THREE.DirectionalLight(0x89cff0, 0.2);
			rimLight.position.set(-1, 0.5, -1);

			scene.add(ambientLight);
			scene.add(mainLight);
			scene.add(causticLight);
			scene.add(rimLight);

			// Event listeners
			window.addEventListener('resize', handleResize, { passive: true });

			if (isMobile) {
				// Prevent double-tap zoom
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

			// Handle visibility changes
			document.addEventListener('visibilitychange', () => {
				if (document.hidden) {
					controls.autoRotate = false;
				} else if (!isMobile) {
					controls.autoRotate = true;
				}
			});

			// Handle orientation changes
			screen?.orientation?.addEventListener('change', () => {
				handleResize();
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				controls.reset();
			});
			isInitialized = true;
		} catch (error) {
			console.error('Failed to initialize WebGL:', error);
			const warning = document.createElement('div');
			warning.style.position = 'absolute';
			warning.style.top = '50%';
			warning.style.left = '50%';
			warning.style.transform = 'translate(-50%, -50%)';
			warning.style.color = '#ffffff';
			warning.style.padding = '1rem';
			warning.style.background = 'rgba(0,0,0,0.8)';
			warning.style.borderRadius = '4px';
			warning.textContent = 'Failed to initialize 3D visualization';
			container.appendChild(warning);
			return;
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

	// Efficient texture update
	const textureData = new Float32Array(N * N * N * 4);
	function updateFluidTexture() {
		const densityValue = $density;
		const velocityXValue = $velocityX;
		const velocityYValue = $velocityY;
		const velocityZValue = $velocityZ;

		for (let i = 0; i < N * N * N; i++) {
			const i4 = i * 4;
			textureData[i4] = densityValue[i];
			textureData[i4 + 1] = velocityXValue[i];
			textureData[i4 + 2] = velocityYValue[i];
			textureData[i4 + 3] = velocityZValue[i];
		}

		fluidTexture.image.data = textureData;
		fluidTexture.needsUpdate = true;
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
            x, y, z,
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
		animationId = requestAnimationFrame(animate);

		// FPS throttling
		if (currentTime - lastRAFTime < (isMobile ? RAF_THROTTLE * 1.5 : RAF_THROTTLE)) return;
		lastRAFTime = currentTime;

		time += 0.016;
		outerMaterial.uniforms.time.value = time;
		innerMaterial.uniforms.time.value = time;

		processAudio();
		updateHeightField();
		updateSimulation();
		updateFluidTexture();

		controls.update();
		renderer.clear();
		renderer.render(scene, camera);
	}

	// Update existing lifecycle hooks
	onMount(() => {
		initThree();
		animate(0);
		startAudio(); // Automatically start audio when component mounts
	});

	onDestroy(() => {
		if (animationId) cancelAnimationFrame(animationId);
		stopAudio(); // Stop audio processing

		if (animationId) cancelAnimationFrame(animationId);
		window.removeEventListener('resize', handleResize);

		// Thorough cleanup
		[globe, innerGlobe].forEach((mesh) => {
			if (!mesh) return;
			mesh.geometry.dispose();
			if (Array.isArray(mesh.material)) {
				mesh.material.forEach((mat) => mat.dispose());
			} else {
				mesh.material.dispose();
			}
		});

		// Dispose of textures and materials
		fluidTexture.dispose();
		outerMaterial.dispose();
		innerMaterial.dispose();

		// Dispose renderer and other resources
		renderer?.dispose();
		renderer?.forceContextLoss();
		scene?.clear();
		controls?.dispose();

		// Remove additional event listeners
		document.removeEventListener('visibilitychange', () => {});
		screen?.orientation?.removeEventListener('change', () => {});
		if (isMobile) {
			container.removeEventListener('touchend', () => {});
		}
	});
</script>

<AudioAnalyzer
	bind:this={audioAnalyzer}
	on:audioData={handleAudioData}
	on:error={handleAudioError}
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
