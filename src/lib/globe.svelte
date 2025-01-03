<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import * as THREE from 'three';
    import { gsap } from 'gsap';
    import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
    import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
    import ScrollTrigger from 'gsap/ScrollTrigger';

    gsap.registerPlugin(ScrollTrigger);

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


    onMount(async () => {
        // Check if we are in the browser
        if (typeof window === 'undefined') return;
        
        // Dynamically import browser-only dependencies
        const { CSS2DRenderer } = await import('three/examples/jsm/renderers/CSS2DRenderer.js');
        const { default: Globe } = await import('three-globe');
        const { TrackballControls } = await import('three/examples/jsm/controls/TrackballControls.js');

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
        const ambientLight = new THREE.AmbientLight('#ffffff', 1); // Even lighting
        const directionalLight = new THREE.DirectionalLight('#ffffff', 1); // Highlight
        // directionalLight.position.set(5, 3, 5);
        directionalLight.position.set(100, 200, 100); // Position the light in the sky
        directionalLight.castShadow = true; // Enable shadows

        // Configure shadow properties (optional)
        directionalLight.shadow.mapSize.width = 1024; // Shadow map resolution (higher = better quality)
        directionalLight.shadow.mapSize.height = 1024;
        directionalLight.shadow.camera.near = 0.5; // Adjust near plane
        directionalLight.shadow.camera.far = 500; // Adjust far plane
        directionalLight.shadow.camera.left = -50; // Adjust shadow frustum
        directionalLight.shadow.camera.right = 50;
        directionalLight.shadow.camera.top = 50;
        directionalLight.shadow.camera.bottom = -50;
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

        // Create globe
        const globe = new Globe()
            .showAtmosphere(true)
            .atmosphereAltitude(0.15)
            .atmosphereColor('rgb(171, 209, 198)')
            .globeImageUrl('/geo/2_no_clouds_4k.jpg')
            .bumpImageUrl('/geo/elev_bump_4k.jpg')
            // Adding Loction Markers
            .pointsData(labData)
            .pointAltitude((d: any) => Math.max(0.015, d.years * 0.01)) // Use years to calculate altitude
            .pointColor(() => 'rgba(255, 255, 255, 0.55)')
            .pointRadius(() => 0.75)
            .pointsMerge(true);

        scene.add(globe);

        // Adding Labels using HTML Elements
        globe
            .htmlElementsData(labData) // Set the label data
            .htmlLat((d: any) => d.lat) // Use latitude from data
            .htmlLng((d: any) => d.lng) // Use longitude from data
            .htmlAltitude(() => 0.055) // Set altitude
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
        const CLOUDS_ROTATION_SPEED = -0.015; // deg/frame

        const Clouds = new THREE.Mesh(new THREE.SphereGeometry(globe.getGlobeRadius() * (1 + CLOUDS_ALT), 75, 75));
        new THREE.TextureLoader().load(CLOUDS_IMG_URL, cloudsTexture => {
        Clouds.material = new THREE.MeshPhongMaterial({ map: cloudsTexture, transparent: true });
        });

        globe.add(Clouds);

        (function rotateClouds() {
        Clouds.rotation.y += CLOUDS_ROTATION_SPEED * Math.PI / 180;
        requestAnimationFrame(rotateClouds);
        })();

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

        // After initializing the globe
        globe.rendererSize(new THREE.Vector2(window.innerWidth, window.innerHeight));

        // Select a city to focus on
        const cityName = "Arlington"; // Replace with the city of your choice
        const selectedCity = regionsLived
            .flatMap(region => region.states)
            .find(state => state.name === cityName);

        if (selectedCity) {
            const phi = (90 - selectedCity.lat) * (Math.PI / 180); // Latitude to spherical
            const theta = (180 - selectedCity.lng) * (Math.PI / 180); // Longitude to spherical

            const idealDistance =
                globe.getGlobeRadius() /
                Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) *
                (window.innerWidth < 768 ? 2.5 : 1.5); // Adjust scaling for smaller screens

            // Set camera position based on city coordinates
            camera.position.set(
                idealDistance * Math.sin(phi) * Math.cos(theta),
                idealDistance * Math.cos(phi),
                idealDistance * Math.sin(phi) * Math.sin(theta)
            );

            camera.lookAt(globe.getGlobeRadius(), 0, 100); // Focus on the globe's center
        } else {
            console.warn(`City "${cityName}" not found in the regionsLived data.`);
        }

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
                    curveSegments: 64,
                    bevelEnabled: true,
                    bevelThickness: 0.75,
                    bevelSize: 0.5,
                    bevelOffset: 0,
                    bevelSegments: 100
                });

                const charMaterial = new THREE.MeshPhongMaterial({
                    color: 0xfffffe,
                    specular: 0xffffff,
                    shininess: 10
                });

                const charMesh = new THREE.Mesh(charGeometry, charMaterial);

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
        
            // Add delay for text to appear
            gsap.to(group.children, {
                duration: 4,
                opacity: 0.85,
                ease: "power2.inOut",
                onStart: () => { group.visible = true; },
                onUpdate: () => {
                    group.children.forEach((charMesh: any) => {
                        if (charMesh.material instanceof THREE.MeshPhongMaterial) {
                            charMesh.material.opacity = gsap.getProperty(charMesh, "opacity");
                            charMesh.material.transparent = true;
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

        const animate = () => {
            requestAnimationFrame(animate);

            globe.rotation.y -= 0.00055; // Rotate globe on one axis

            controls.update();
            renderer.render(scene, camera);
            labelRenderer.render(scene, camera); // Render HTML elements
        };
        animate();

        let resizeTimeout: number;
        const onWindowResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = window.setTimeout(() => {
                if (window.innerWidth < 768) {
                    labelRenderer.domElement.style.display = 'none'; // Hide labels on mobile
                } else {
                    labelRenderer.domElement.style.display = 'flex';
                    labelRenderer.setSize(window.innerWidth, window.innerHeight);
                }
                renderer.setSize(window.innerWidth, window.innerHeight);

                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();

                // Update globe renderer size
                globe.rendererSize(new THREE.Vector2(window.innerWidth, window.innerHeight));

                // Adjust camera distance dynamically for smaller screens
                const idealDistance =
                    globe.getGlobeRadius() /
                    Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) *
                    (window.innerWidth < 768 ? 2.5 : 1.5);

                camera.position.z = idealDistance;
            }, 200); // Delay to allow scrolling to stabilize
        };
        window.addEventListener('resize', onWindowResize);

        const updateVh = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };
        updateVh();
        window.addEventListener('resize', updateVh);

        // Cleanup on destroy
        onDestroy(() => {
            window.removeEventListener('resize', onWindowResize);
            window.removeEventListener('resize', updateVh);
            renderer.dispose();
        });
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
