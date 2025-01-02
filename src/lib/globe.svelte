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
        states: { name: string; description: string; lat: number; lng: number }[];
    };

    export let hero_text: string;

    const regionsLived: Region[] = [
        {
            country: "United States",
            description: "Lived in California, Maine, Virginia, Illinois, and Georgia",
            states: [
                { name: "Palo Alto", description: "Lived in Palo Alto", lat: 37.4419, lng: -122.1430 },
                { name: "Aliso Viejo", description: "Lived in Aliso Viejo", lat: 33.5686, lng: -117.7267 },
                { name: "Bangor", description: "Lived in Bangor", lat: 44.8012, lng: -68.7778 },
                { name: "Arlington", description: "Lived in Arlington", lat: 38.8797, lng: -77.1057 },
                { name: "Blacksburg", description: "Lived in Blacksburg", lat: 37.2296, lng: -80.4139 },
                { name: "Chicago", description: "Lived in Chicago", lat: 41.8781, lng: -87.6298 },
                { name: "Atlanta", description: "Lived in Atlanta", lat: 33.7490, lng: -84.3880 }
            ]
        },
        {
            country: "Brazil",
            description: "Lived in Sao Paulo",
            states: [
                { name: "Sao Paulo", description: "Lived in Sao Paulo", lat: -23.5505, lng: -46.6333 }
            ]
        },
        {
            country: "Latvia",
            description: "Lived in Riga",
            states: [
                { name: "Riga", description: "Lived in Riga", lat: 56.9496, lng: 24.1052 }
            ]
        }
    ];


    function getCityCoordinates(cityName: string) {
        const cityCoordinates: Record<string, { lat: number; lng: number }> = {
            "Palo Alto": { lat: 37.4419, lng: -122.1430 },
            "Aliso Viejo": { lat: 33.5686, lng: -117.7267 },
            "Bangor": { lat: 44.8012, lng: -68.7778 },
            "Arlington": { lat: 38.8797, lng: -77.1057 },
            "Blacksburg": { lat: 37.2296, lng: -80.4139 },
            "Chicago": { lat: 41.8781, lng: -87.6298 },
            "Atlanta": { lat: 33.7490, lng: -84.3880 },
            "Sao Paulo": { lat: -23.5505, lng: -46.6333 },
            "Riga": { lat: 56.9496, lng: 24.1052 }
        };

        return cityCoordinates[cityName] || { lat: 0, lng: 0 }; // Default to 0,0 if not found
    }

    onMount(async () => {
        // Check if we are in the browser
        if (typeof window === 'undefined') return;
        
        // Dynamically import browser-only dependencies
        const { default: Globe } = await import('three-globe');
        const { TrackballControls } = await import('three/examples/jsm/controls/TrackballControls.js');

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
        const directionalLight = new THREE.DirectionalLight('#f9bc60', 0.8); // Highlight
        directionalLight.position.set(5, 3, 5);
        scene.add(ambientLight, directionalLight);

        // Create globe
        const globe = new Globe()
            .showAtmosphere(true)
            .atmosphereColor('rgb(171, 209, 198)')
            .globeImageUrl('//unpkg.com/three-globe/example/img/earth-day.jpg')
            .pointsData(regionsLived.flatMap(region =>
                region.states.map(state => ({
                    lat: state.lat,
                    lng: state.lng,
                    name: `${state.name}, ${region.country}`,
                    description: state.description
                }))
            ))
            .labelText((d: any) => d.name) // Or use type casting as shown above
            .pointAltitude(() => 0.025)
            .pointColor(() => '#FFFFFF')
            .pointRadius(() => 1)
            .labelSize(() => 1.5)
            .labelDotRadius(() => 1)
            .labelColor(() => '#FFFFFF');

        scene.add(globe);

        // // Position the camera close to a random region
        // const randomRegion = regionsLived[Math.floor(Math.random() * regionsLived.length)];
        
        // Calculate and apply the ideal distance for consistent globe sizing
        const globeRadius = globe.getGlobeRadius();
        const fov = camera.fov;
        const idealDistance = globeRadius / Math.tan(THREE.MathUtils.degToRad(fov / 2));

        // camera.position.set(idealDistance * 2, 0, 0); // Center the globe

        // Select a city to focus on
        const cityName = "Arlington"; // Replace with the city of your choice
        const selectedCity = regionsLived
            .flatMap(region => region.states)
            .find(state => state.name === cityName);

        if (selectedCity) {
            const phi = (90 - selectedCity.lat) * (Math.PI / 180); // Latitude to spherical
            const theta = (180 - selectedCity.lng) * (Math.PI / 180); // Longitude to spherical

            const globeRadius = globe.getGlobeRadius(); // Approximate radius of the globe
            const fov = camera.fov;
            const idealDistance = globeRadius / Math.tan(THREE.MathUtils.degToRad(fov / 2)) * 1.5;

            // Set camera position based on city coordinates
            camera.position.set(
                idealDistance * Math.sin(phi) * Math.cos(theta),
                idealDistance * Math.cos(phi),
                idealDistance * Math.sin(phi) * Math.sin(theta)
            );

            camera.lookAt(globeRadius, 0, 100); // Focus on the globe's center
        } else {
            console.warn(`City "${cityName}" not found in the regionsLived data.`);
        }


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
            const radiusOffset = globeRadius * 0.6; // Base radius offset

            for (let i = 0; i < hero_text.length; i++) {
                const char = hero_text[i];
                const charGeometry = new TextGeometry(char, {
                    font: font,
                    size: 26,
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

            // Animate the text orbiting around the globe into the camera's frame
            gsap.to(group.rotation, {
                y: Math.PI * 1.25, // Move text 270 degrees into view
                delay: 0.65,
                duration: 3,
                ease: "power2.inOut",
            });
        });

        // Add camera controls
        const controls = new TrackballControls(camera, renderer.domElement);
        controls.noZoom = true;
        controls.noPan = true;
        controls.rotateSpeed = 2;
        controls.dynamicDampingFactor = 0.05;

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

            globe.rotation.y -= 0.002; // Rotate globe on one axis

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

<div bind:this={container}></div>

<style>
    div {
        position: relative;
        width: 100%;
        height: 100%;
    }
</style>
