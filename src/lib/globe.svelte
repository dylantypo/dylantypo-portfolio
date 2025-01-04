<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import * as THREE from 'three';
    import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
    import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';

    let container: HTMLDivElement;
    export let hero_text: string;

    type Region = {
        country: string;
        description: string;
        states: { name: string; description: string; lat: number; lng: number; years: number; }[];
    };

    const regionsLived: Region[] = [
        {
            country: "United States",
            description: "Lived in California, Maine, Virginia, Illinois, and Georgia",
            states: [
                { name: "Palo Alto", description: "Lived in Palo Alto", lat: 37.4419, lng: -122.1430, years: 0.5 },
                { name: "Aliso Viejo", description: "Lived in Aliso Viejo", lat: 33.5686, lng: -117.7267, years: 6 },
                { name: "Bangor", description: "Lived in Bangor", lat: 44.8012, lng: -68.7778, years: 0.5 },
                { name: "Arlington", description: "Lived in Arlington", lat: 38.8797, lng: -77.1057, years: 8 },
                { name: "Blacksburg", description: "Lived in Blacksburg", lat: 37.2296, lng: -80.4139, years: 4 },
                { name: "Chicago", description: "Lived in Chicago", lat: 41.8781, lng: -87.6298, years: 0.5 },
                { name: "Atlanta", description: "Lived in Atlanta", lat: 33.7490, lng: -84.3880, years: 4 }
            ]
        },
        {
            country: "Brazil",
            description: "Lived in São Paulo",
            states: [
                { name: "São Paulo", description: "Lived in São Paulo", lat: -23.5505, lng: -46.6333, years: 2 }
            ]
        },
        {
            country: "Latvia",
            description: "Lived in Rīga",
            states: [
                { name: "Rīga", description: "Lived in Rīga", lat: 56.9496, lng: 24.1052, years: 2 }
            ]
        }
    ];
    
    let cleanupFn: (() => void) | undefined;

    onMount(async () => {
        // Check if we are in the browser
        if (typeof window === 'undefined') return;
        
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

        gsap.registerPlugin(CSSPlugin)

        // Initialize scene, camera, and renderer
        const scene = new THREE.Scene();
        scene.background = new THREE.Color('#004643');
        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        const labelRenderer = new CSS2DRenderer();

        const renderers = [renderer, labelRenderer];
        renderers.forEach((r, idx) => {
            r.setSize(window.innerWidth, window.innerHeight);
            if (idx > 0) {
                r.domElement.style.position = 'absolute';
                r.domElement.style.top = '0px';
                r.domElement.style.pointerEvents = 'none';
            }
            container.appendChild(r.domElement);
        });

        // Add light
        const ambientLight = new THREE.AmbientLight('#ffffff', 1); // Slightly dimmed ambient light
        const directionalLight = new THREE.DirectionalLight('#ffffff', 0.95); // Sunlight-like directional light
        directionalLight.position.set(-200, 200, 100); // Place the light in the "sky"

        // Set the light target (where it points to)
        const targetObject = new THREE.Object3D(); // Create an object as the target
        targetObject.position.set(0,0,0); // Focus on the globe's center
        scene.add(targetObject);
        directionalLight.target = targetObject;

        // Adjust shadow camera to control spread
        directionalLight.castShadow = true; // Enable shadows
        directionalLight.shadow.camera.near = 50; // Start of shadow projection
        directionalLight.shadow.camera.far = 500; // End of shadow projection
        directionalLight.shadow.camera.left = -500; // Left boundary of shadow projection
        directionalLight.shadow.camera.right = 500; // Right boundary of shadow projection
        directionalLight.shadow.camera.top = 500; // Top boundary of shadow projection
        directionalLight.shadow.camera.bottom = -500; // Bottom boundary of shadow projection
        directionalLight.shadow.mapSize.width = 2048; // Default is 512
        directionalLight.shadow.mapSize.height = 2048;

        // FOR DEBUGGING: Add helpers to visualize the light
        // const lightHelper = new THREE.DirectionalLightHelper(directionalLight, 10); // Visualize light direction
        // const shadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera); // Visualize shadow bounds
        // scene.add(lightHelper, shadowHelper);

        // Add lights to the scene
        scene.add(ambientLight, directionalLight);

        // Add camera controls
        const controls = new TrackballControls(camera, renderer.domElement);
        controls.noZoom = true;
        controls.noPan = true;
        controls.rotateSpeed = 2;
        controls.dynamicDampingFactor = 0.05;

        controls.addEventListener('change', () => {
            globe.setPointOfView(camera);
        })

        // 
        const labData = regionsLived.flatMap(region =>
            region.states.map(state => ({
                lat: state.lat,
                lng: state.lng,
                name: region.country === "United States" ? state.name : `${state.name}, ${region.country}`,
                description: state.description,
                years: state.years
            }))
        );

        // Min Point Altitude
        const MIN_ALTITUDE = 0.0125;

        // Create globe
        const globe = new Globe()
            .showAtmosphere(true)
            .atmosphereAltitude(0.15)
            .atmosphereColor('rgb(171, 209, 198)')
            .globeImageUrl('/geo/2_no_clouds_4k.jpg')
            .bumpImageUrl('/geo/elev_bump_4k.jpg')
            // Adding Loction Markers
            .pointsData(labData)
            .pointAltitude((d: any) => Math.max(MIN_ALTITUDE, d.years * 0.01)) // Use years to calculate altitude
            .pointColor(() => 'rgba(255, 255, 255, 0.55)')
            .pointRadius(() => 0.75)
            .pointsMerge(true);

        scene.add(globe);

        // Adding Labels using HTML Elements
        globe
            .htmlElementsData(labData) // Set the label data
            .htmlLat((d: any) => d.lat) // Use latitude from data
            .htmlLng((d: any) => d.lng) // Use longitude from data
            .htmlAltitude((d: any) => (window.innerWidth < 768 ? 0.03 : 0.055)) // Set altitude
            .htmlElement((d: any) => {
                const div = document.createElement('div');
                div.textContent = d.name;
                div.style.color = 'rgba(255, 255, 255, 0.5)';
                div.style.fontSize = '0.5rem';
                div.style.position = 'absolute';
                div.style.transition = 'opacity 0.5s ease-in-out';
                return div;
            });


        // Adding CLouds layer
        const CLOUDS_IMG_URL = '/geo/fair_clouds_4k.png'; // from https://github.com/turban/webgl-earth
        const CLOUDS_ALT = 0.005;
        const calculateCloudsRotationSpeed = (isMobile: boolean) => {
            const BASE_SPEED = -0.015; // Base speed for desktop
            return isMobile ? BASE_SPEED * 1.25 : BASE_SPEED; // Faster on mobile
        };
        const Clouds = new THREE.Mesh(new THREE.SphereGeometry(globe.getGlobeRadius() * (1 + CLOUDS_ALT), 75, 75));
        new THREE.TextureLoader().load(CLOUDS_IMG_URL, cloudsTexture => {
            Clouds.material = new THREE.MeshPhongMaterial({ map: cloudsTexture, transparent: true });
        });
        globe.add(Clouds);

        // Enhance globe appearance
        const globeMaterial = globe.globeMaterial() as THREE.MeshPhongMaterial;
        if (globeMaterial instanceof THREE.MeshPhongMaterial) {
            new THREE.TextureLoader().load('//unpkg.com/three-globe/example/img/earth-water.png', texture => {
                globeMaterial.specularMap = texture;
                globeMaterial.specular = new THREE.Color('grey');
                globeMaterial.shininess = 100;
            });
        } else {
            console.warn('globeMaterial is not a MeshPhongMaterial. Custom properties are not applied.');
        }

        const tiltAxis = new THREE.Vector3(1, 0, 0); // Tilt along the X-axis
        const tiltAngle = (Math.PI / 6) * -1; // Tilt by 30 degrees
        globe.setRotationFromAxisAngle(tiltAxis, tiltAngle);

        let lastWidth = window.innerWidth;
        let lastHeight = window.innerHeight;

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

            renderers.forEach(r => r.setSize(newWidth, newHeight));
            globe.rendererSize(new THREE.Vector2(newWidth, newHeight));

            updateCameraAspect();
        };

        const toggleLabelRenderer = (isMobile: boolean) => {
            labelRenderer.domElement.style.display = isMobile ? 'none' : 'flex';
        };

        const calculateIdealDistance = (isMobile: boolean) => {
            const baseFactor = 1.95;
            const mobileAdjustment = isMobile ? 3 : 1.5;
            return globe.getGlobeRadius() /
                Math.tan(THREE.MathUtils.degToRad(camera.fov / (baseFactor + mobileAdjustment)));
        };

        const setCameraPosition = (lat: number, lng: number, idealDistance: number) => {
            const phi = (90 - lat) * (Math.PI / 180); // Latitude to spherical
            const theta = (180 - lng) * (Math.PI / 180); // Longitude to spherical

            camera.position.set(
                idealDistance * Math.sin(phi) * Math.cos(theta),
                idealDistance * Math.cos(phi),
                idealDistance * Math.sin(phi) * Math.sin(theta)
            );
            camera.lookAt(globe.getGlobeRadius(), 0, 100); // Focus on the globe's center
        };

        let cachedIsMobile: boolean | null = null;
        let cachedIdealDistance: number | null = null;
        
        const adjustCamera = (isMobile: boolean, focusedCity?: { lat: number; lng: number }) => {
            const idealDistance = calculateIdealDistance(isMobile);

            if (idealDistance === cachedIdealDistance && isMobile === cachedIsMobile) return;

            cachedIsMobile = isMobile;
            cachedIdealDistance = idealDistance;

            if (focusedCity) {
                setCameraPosition(focusedCity.lat, focusedCity.lng, idealDistance);
            } else {
                camera.position.z = idealDistance;
            }

            updateCameraAspect();
        };

        const handleResize = () => {
            const newWidth = window.innerWidth;
            const newHeight = window.innerHeight;

            if (newWidth === lastWidth && newHeight === lastHeight) return;

            lastWidth = newWidth;
            lastHeight = newHeight;

            const isMobile = newWidth < 768;

            CLOUDS_ROTATION_SPEED = calculateCloudsRotationSpeed(isMobile);

            updateVH();
            resizeRenderers();
            toggleLabelRenderer(isMobile);
            adjustCamera(isMobile);
        };

        // Initialize
        const focusedCity = regionsLived.flatMap(region => region.states).find(state => state.name === "Arlington");
        const isMobile = window.innerWidth < 768;

        updateVH();
        resizeRenderers();
        toggleLabelRenderer(isMobile);
        adjustCamera(isMobile, focusedCity);
        let CLOUDS_ROTATION_SPEED = calculateCloudsRotationSpeed(isMobile);

        window.addEventListener('resize', handleResize);

        // Add hero text
        const fontLoader = new FontLoader();
        fontLoader.load('/Kenney Future_Regular.json', function (font: any) {
            const group = new THREE.Group(); // Group for the text
            const radiusOffset = globe.getGlobeRadius() * 0.6; // Base radius offset

            for (let i = 0; i < hero_text.length; i++) {
                const char = hero_text[i];
                const charGeometry = new TextGeometry(char, {
                    font: font,
                    size: 24,
                    depth: 2,
                    curveSegments: 256,
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
                    transparent: true, // Enable transparency
                    opacity: 0 // Start fully transparent
                });

                charMaterial.side = THREE.DoubleSide; // Render both sides
                // Enable high quality shadows if you're using them
                charMaterial.shadowSide = THREE.DoubleSide;

                const charMesh = new THREE.Mesh(charGeometry, charMaterial);

                // Enable shadow casting/receiving if you're using shadows
                charMesh.castShadow = true;
                charMesh.receiveShadow = true;

                charGeometry.computeBoundingBox();
                if (charGeometry.boundingBox) {
                    const angle = ((i - hero_text.length / 2) / hero_text.length) * Math.PI;

                    const centralIndex = Math.floor(hero_text.length / 2);
                    const centralAngle = ((centralIndex - hero_text.length / 2) / hero_text.length) * Math.PI;

                    charMesh.position.set(
                        Math.sin(angle - centralAngle) * (radiusOffset + 50), // Position along X-axis
                        0, // Keep Y-axis constant
                        Math.cos(angle - centralAngle) * (radiusOffset + 50) // Position in depth
                    );

                    // Calculate the outward direction based on position
                    const outwardDirection = charMesh.position.clone().normalize();
                    const outwardPoint = outwardDirection.multiplyScalar(radiusOffset + 100);

                    // Make the mesh look at the outward point
                    charMesh.lookAt(outwardPoint);

                    // Ensure text is properly oriented if necessary
                    if (Math.cos(angle - centralAngle) < 0) {
                        charMesh.rotation.y += Math.PI;
                    }  
                }

                group.add(charMesh);
            }
        
            group.position.set(0, 0, 0);
            group.visible = false; // Initially hide the text
            scene.add(group);

            // Animate text opacity
            gsap.to({}, {
                duration: 3.5,
                ease: "power2.inOut",
                onStart: () => {
                    group.visible = true;
                    group.children.forEach((obj: THREE.Object3D) => {
                        const mesh = obj as THREE.Mesh;
                        if (mesh.material instanceof THREE.MeshPhongMaterial) {
                            mesh.material.transparent = true;
                            mesh.material.opacity = 0;
                        }
                    });
                },
                onUpdate: function() {
                    const progress = this.progress()
                    group.children.forEach((obj: THREE.Object3D) => {
                        const mesh = obj as THREE.Mesh;
                        if (mesh.material instanceof THREE.MeshPhongMaterial) {
                            mesh.material.opacity = progress * 0.5;
                        }
                    });
                },
                onComplete: () => {
                    group.children.forEach((obj: THREE.Object3D) => {
                        const mesh = obj as THREE.Mesh;
                        if (mesh.material instanceof THREE.MeshPhongMaterial) {
                            mesh.material.opacity = 0.5; // Ensure opacity is exactly 0.85 at the end
                        }
                    });
                }
            });

            // Animate the text orbiting around the globe into the camera's frame
            gsap.to(group.rotation, {
                x: Math.PI * 0.12,
                y: Math.PI * 1.25,
                duration: 3,
                ease: "power2.inOut",
            });
        });

        let animationFrameId: number;
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);

            globe.rotation.y -= 0.00055;
            Clouds.rotation.y += CLOUDS_ROTATION_SPEED * Math.PI / 180;
            controls.update();
            renderers.forEach(r => r.render(scene, camera));
        };
        
        animate();

        // Set up the cleanup function
        cleanupFn = () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
            renderers.forEach(r => {
                if (r instanceof THREE.WebGLRenderer) r.dispose();
                if (r.domElement?.parentNode) r.domElement.parentNode.removeChild(r.domElement);
            });
            controls.dispose();
            scene.clear();
            if (container) container.innerHTML = "";
        };
    });
    
    onDestroy(() => {
        if (cleanupFn) cleanupFn();
    });
</script>

<div bind:this={container}></div>

<style>
    div {
        position: relative;
        width: 100vw;
        height: calc(var(--vh, 1vh) * 100);
        overflow: hidden;
    }
</style>
