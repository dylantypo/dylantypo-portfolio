<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import * as THREE from 'three';
    import { gsap } from 'gsap';
    import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
    import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
    import ScrollTrigger from 'gsap/ScrollTrigger';

    gsap.registerPlugin(ScrollTrigger);

    let container: HTMLDivElement;

    type Region = {
        country: string;
        description: string;
        lat: number;
        lng: number;
        states: { name: string; description: string }[];
    };

    export let hero_text: string;

    const regionsLived: Region[] = [
        {
            country: "United States",
            description: "Lived in California, Maine, Virginia, Illinois, and Georgia",
            lat: 37.0902,
            lng: -95.7129,
            states: [
                { name: "California", description: "Palo Alto and Aliso Viejo" },
                { name: "Maine", description: "Bangor" },
                { name: "Virginia", description: "Arlington and Blacksburg" },
                { name: "Illinois", description: "Chicago" },
                { name: "Georgia", description: "Atlanta" }
            ]
        },
        {
            country: "Brazil",
            description: "Lived in Sao Paulo",
            lat: -14.2350,
            lng: -51.9253,
            states: [
                { name: "Sao Paulo", description: "Sao Paulo" }
            ]
        },
        {
            country: "Latvia",
            description: "Lived in Riga",
            lat: 56.8796,
            lng: 24.6032,
            states: [
                { name: "Latvia", description: "Riga" }
            ]
        }
    ];

    onMount(async () => {
        // Check if we are in the browser
        if (typeof window === 'undefined') return;
        
        // Dynamically import browser-only dependencies
        const { default: Globe } = await import('three-globe');
        const { TrackballControls } = await import('three/examples/jsm/controls/TrackballControls.js');

        // Fetch country data
        const response = await fetch('/geo/ne_110m_admin_0_countries.geojson');
        const countries = await response.json();

        // Filter for countries lived in
        const countriesLivedIn = countries.features.filter((d: any) => {
            return ['USA', 'BRA', 'LVA'].includes(d.properties.ISO_A2);
        });

        // Initialize scene, camera, and renderer
        const scene = new THREE.Scene();
        scene.background = new THREE.Color('#004643');

        const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        // Add light
        const ambientLight = new THREE.AmbientLight('#ffffff', 1); // Even lighting
        // const directionalLight = new THREE.DirectionalLight('#f9bc60', 0.8); // Highlight
        // directionalLight.position.set(5, 3, 5);
        scene.add(ambientLight);

        // Create globe
        const globe = new Globe()
            .showAtmosphere(false)
            .globeImageUrl('//unpkg.com/three-globe/example/img/earth-day.jpg')
            .polygonsData(countriesLivedIn)
            .polygonCapColor(() => 'rgba(249, 188, 96, 0.7)') // Highlight color for polygons
            .polygonSideColor(() => 'rgba(171, 209, 198, 0.3)') // Mid-tone color
            .polygonStrokeColor(() => '#111')
            .polygonAltitude(() => 0.5);

        scene.add(globe);

        // Position the camera close to a random region
        const randomRegion = regionsLived[Math.floor(Math.random() * regionsLived.length)];
        camera.position.set(randomRegion.lng * 5, randomRegion.lat * 5, 50);

        // Enhance globe appearance
        const globeMaterial = globe.globeMaterial() as THREE.MeshPhongMaterial;
        if (globeMaterial instanceof THREE.MeshPhongMaterial) {
            new THREE.TextureLoader().load('//unpkg.com/three-globe/example/img/earth-water.png', texture => {
                globeMaterial.specularMap = texture;
                globeMaterial.specular = new THREE.Color('grey');
                globeMaterial.shininess = 15;
            });
        } else {
            console.warn('globeMaterial is not a MeshPhongMaterial. Custom properties are not applied.');
        }

        // Add hero text
        const fontLoader = new FontLoader();
        fontLoader.load('/Kenney Future_Regular.json', function (font: any) {
            const group = new THREE.Group(); // Group for the text
            const radiusOffset = 55; // Base radius offset

            for (let i = 0; i < hero_text.length; i++) {
                const char = hero_text[i];
                const charGeometry = new TextGeometry(char, {
                    font: font,
                    size: 11,
                    depth: 0,
                    curveSegments: 24,
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
                delay: 1,
                duration: 2,
                opacity: 1,
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

        });

        // Add camera controls
        const controls = new TrackballControls(camera, renderer.domElement);
        controls.minDistance = 350;
        controls.maxDistance = 500;
        controls.rotateSpeed = 2;
        controls.zoomSpeed = 0.85;

        // Restrict globe rotation to one axis
        globe.rotation.x = 0;
        globe.rotation.z = 0;

        const resizeRendererToDisplaySize = (renderer: THREE.WebGLRenderer) => {
            const canvas = renderer.domElement;
            const pixelRatio = window.devicePixelRatio;
            const width = Math.floor(canvas.clientWidth * pixelRatio);
            const height = Math.floor(canvas.clientHeight * pixelRatio);
            const needResize = canvas.width !== width || canvas.height !== height;
            if (needResize) {
                renderer.setSize(width, height, false);
            }
            return needResize;
        };

        const animate = () => {
            requestAnimationFrame(animate);

            if (resizeRendererToDisplaySize(renderer)) {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
            }

            globe.rotation.y -= 0.001; // Rotate globe on one axis

            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        const onWindowResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', onWindowResize);

        // Cleanup on destroy
        onDestroy(() => {
            window.removeEventListener('resize', onWindowResize);
            renderer.dispose();
        });
    });
</script>

<div bind:this={container} style="width: 100%; height: 100%;"></div>

<style>
    div {
        position: relative;
        width: 100%;
        height: 100%;
    }
</style>
