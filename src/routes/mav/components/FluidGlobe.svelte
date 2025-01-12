<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import * as THREE from 'three';
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
    import { useFluidSimulation } from '../lib/fluidSimulation';
    import type { AudioData } from '../lib/types';

    // Props
    let { audioData = null } = $props<{
        audioData: AudioData | null
    }>();

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

    const FLUID_COLOR = new THREE.Color(0x006994);  // Deeper blue
    const LIGHT_COLOR = new THREE.Color(0x89CFF0);  // Light blue for foam/surface
    const CRYSTAL_COLOR = new THREE.Color(0xffffff); // Pure white for crystal
    const CRYSTAL_OPACITY = 0.08;  // Much more transparent 

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
        diffusion: 0.0001,
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
            baseOpacity: { value: CRYSTAL_OPACITY }
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
                vec3 normalized = normalize(vPosition);
                
                // More subtle Fresnel effect
                float fresnel = pow(1.0 - abs(dot(normal, vViewDirection)), 2.0);
                float rim = pow(1.0 - abs(dot(normal, normalized)), 5.0);
                
                // Softer refraction
                vec3 refraction = normalize(refract(-vViewDirection, normal, 0.94));
                float dispersion = pow(1.0 - abs(dot(refraction, vec3(0.0, 1.0, 0.0))), 4.0);
                
                // Very subtle surface detail
                float microDetail = sin(vWorldPosition.x * 30.0 + time * 0.2) * 
                                  cos(vWorldPosition.y * 30.0 + time * 0.15) * 
                                  sin(vWorldPosition.z * 30.0 + time * 0.25);
                float sparkle = pow(microDetail, 32.0) * 0.15;
                
                // Subtle chromatic aberration
                float blueShift = pow(fresnel, 3.0) * 0.02;
                vec3 glassColor = crystalColor + vec3(-blueShift, 0.0, blueShift);
                
                // Final glass effect
                vec3 finalColor = glassColor * (1.0 + sparkle) * (1.0 + dispersion * 0.2);
                float alpha = mix(baseOpacity, 0.2, fresnel + rim);
                
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
            lightColor: { value: LIGHT_COLOR }
        },
        vertexShader: `
            varying vec3 vPosition;
            varying vec3 vNormal;
            varying vec2 vUv;
            
            void main() {
                vPosition = position;
                vNormal = normalize(normalMatrix * normal);
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
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
            
            // Noise functions for water texture
            float hash(float n) {
                return fract(sin(n) * 43758.5453);
            }
            
            float noise(vec3 x) {
                vec3 p = floor(x);
                vec3 f = fract(x);
                f = f * f * (3.0 - 2.0 * f);
                float n = p.x + p.y * 57.0 + p.z * 113.0;
                return mix(mix(mix(hash(n), hash(n + 1.0), f.x),
                             mix(hash(n + 57.0), hash(n + 58.0), f.x), f.y),
                         mix(mix(hash(n + 113.0), hash(n + 114.0), f.x),
                             mix(hash(n + 170.0), hash(n + 171.0), f.x), f.y), f.z);
            }
            
            void main() {
                vec3 normalized = normalize(vPosition);
                vec3 texCoord = normalized * 0.5 + 0.5;
                
                // Sample fluid density
                float density = texture2D(fluidTexture, 
                    vec2(texCoord.x + texCoord.z * ${N}.0,
                        texCoord.y + texCoord.z * ${N}.0) / ${N}.0).r;
                
                // Ocean depth gradient
                float depth = (1.0 - texCoord.y) * 0.6;
                vec3 deepColor = fluidColor * 0.3;  // Darker deep water
                vec3 surfaceColor = mix(fluidColor, lightColor, 0.7); // Brighter surface
                
                // Generate foam pattern
                float foam = noise(vec3(vUv * 10.0 + time * 0.2, time * 0.1));
                foam = pow(foam, 3.0) * density;
                
                // Add wave motion
                float wave = sin(texCoord.y * 20.0 + time + noise(vec3(vUv * 5.0, time * 0.1))) * 0.1;
                
                // Mix colors based on density, depth, and foam
                vec3 waterColor = mix(deepColor, surfaceColor, density * (1.0 - depth) + wave);
                waterColor = mix(waterColor, lightColor, foam * 0.6);
                
                // Add caustics effect
                float caustics = pow(noise(vec3(vUv * 15.0 - time * 0.1, time * 0.2)), 4.0) * (1.0 - depth);
                waterColor += lightColor * caustics * 0.2;
                
                // Final opacity
                float alpha = mix(0.4, 0.9, density * (1.0 - depth * 0.5) + foam * 0.3);
                
                gl_FragColor = vec4(waterColor, alpha);
            }
        `,
        transparent: true,
        side: THREE.BackSide,
        depthWrite: true,
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
            isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
                .test(navigator.userAgent);

            // Renderer with optimized settings
            renderer = new THREE.WebGLRenderer({
                antialias: true,
                alpha: false,
                powerPreference: 'high-performance'
            });
            renderer.setClearColor(0x000510);
            console.log('Renderer created');
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(isMobile ? 
                Math.min(window.devicePixelRatio, 1.5) : 
                Math.min(window.devicePixelRatio, 2)
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
            const geometry = new THREE.IcosahedronGeometry(2, isMobile ? 2 : 3);  // Reduced tessellation
            const innerGeometry = new THREE.IcosahedronGeometry(1.95, isMobile ? 2 : 3);  // Slightly smaller radius

            // Create meshes
            globe = new THREE.Mesh(geometry, outerMaterial);
            innerGlobe = new THREE.Mesh(innerGeometry, innerMaterial);
            
            scene.add(globe);
            scene.add(innerGlobe);

            // Optimized lighting
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.35);
            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.75);
            directionalLight.position.set(1, 1, 2);
            
            // Add rim light for better glass edge definition
            const rimLight = new THREE.DirectionalLight(0x89CFF0, 0.3);
            rimLight.position.set(-1, 0, -1);
            
            scene.add(ambientLight);
            scene.add(directionalLight);
            scene.add(rimLight);

            // Event listeners
            window.addEventListener('resize', handleResize, { passive: true });

            if (isMobile) {
                // Prevent double-tap zoom
                container.addEventListener('touchend', (e) => {
                    const now = Date.now();
                    if (now - lastTouchEnd <= 300) {
                        e.preventDefault();
                    }
                    lastTouchEnd = now;
                }, { passive: false });
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
        const height = isMobile ? 
            window.innerHeight : 
            window.innerHeight;
        
        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
        renderer.setPixelRatio(isMobile ? 
            Math.min(window.devicePixelRatio, 1.5) : 
            Math.min(window.devicePixelRatio, 2)
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

    // Optimized audio processing
    function processAudio() {
        if (!audioData?.frequencies) {
            if (import.meta.env.DEV) {
                console.warn('No audio data available for fluid simulation');
            }
            return;
        }

        const { frequencies } = audioData;
        const binSize = frequencies.length / 4;
        const halfN = N / 2;
        const thirdN = N / 3;

        for (let band = 0; band < 4; band++) {
            let sum = 0;
            const bandStart = band * binSize;
            const bandEnd = bandStart + binSize;
            
            for (let i = bandStart; i < bandEnd; i++) {
                sum += frequencies[i];
            }
            
            const average = sum / binSize / 255;
            if (average <= 0.01) continue; // Skip low amplitudes

            const angle = (band / 4) * Math.PI * 2;
            const cos = Math.cos(angle);
            const sin = Math.sin(angle);
            
            const x = cos * thirdN + halfN;
            const y = sin * thirdN + halfN;
            const z = halfN;

            addForce(x, y, z, average * 100);
            addVelocity(
                x, y, z,
                cos * average * 50,
                sin * average * 50,
                (Math.random() - 0.5) * average * 20
            );
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
        updateSimulation();
        updateFluidTexture();

        controls.update();
        renderer.clear();
        renderer.render(scene, camera);
    }

    // Lifecycle hooks
    onMount(() => {
        initThree();
        animate(0);
    });

    onDestroy(() => {
        if (animationId) cancelAnimationFrame(animationId);
        window.removeEventListener('resize', handleResize);
        
        // Thorough cleanup
        [globe, innerGlobe].forEach(mesh => {
            if (!mesh) return;
            mesh.geometry.dispose();
            if (Array.isArray(mesh.material)) {
                mesh.material.forEach(mat => mat.dispose());
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
        background: radial-gradient(
            circle at center,
            #000510 0%,
            #000000 100%
        );
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

    .loading:not([style*="opacity: 1"]) + :global(canvas) {
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
    .loading:not([style*="opacity: 1"]) + :global(canvas) {
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
            background: radial-gradient(
                circle at center,
                #000305 0%,
                #000000 100%
            );
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