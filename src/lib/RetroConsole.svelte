<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import * as THREE from 'three';
    import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
    import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
    import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
    import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
    import { gsap } from 'gsap';

    // Declare variables
    let container;
    let resize;
    let object;
    let targetRotation = 0;
    const minRotation = -Math.PI / 8.5; // minimum rotation
    const maxRotation = Math.PI / 8.5; // maximum rotation
    let animationFinished = false; // flag to check if animation is finished

    // change camera position based on window width
    function getZValue() {
        const width = window.innerWidth;
        if (width <= 480) {
            return 350;
        } else if (width <= 610) {
            return 250;
        } else if (width <= 925) {
            return 210;
        } else if (width <= 1052) {
            return 195;
        } else {
            return 175;
        }
    }

    onMount(async () => {
        // Check if we are in the browser
        if (typeof window === 'undefined') return;

        // Initialize scene, camera, and renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({antialiasing:true});

        // Set scene background color
        scene.background = new THREE.Color(0x004643);

        // Add lights to the scene
        const pointLight = new THREE.PointLight( 0x404040, 0.25, 800 );
        pointLight.position.set( 0, 0, 50 );
        scene.add( pointLight );
        scene.add(new THREE.AmbientLight(0x404040));
        const directionalLightFront = new THREE.DirectionalLight(0xffffff, 0.45);
        directionalLightFront.position.set( 0, -1, 1 );
        scene.add( directionalLightFront );
        scene.add(new THREE.DirectionalLight(0xfffffb, 0.65))

        // Configure renderer
        renderer.setPixelRatio( window.devicePixelRatio * 2.5 );
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        // Load materials and object
        const mtlLoader = new MTLLoader();
        mtlLoader.load('Retro_Console.mtl', (materials) => {
            materials.preload();

            const objLoader = new OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.load('Retro_Console.obj', (objectLoader) => {
                // Set object position and add to scene
                object = objectLoader
                object.position.set(0, 500, 0);
                scene.add(object);

                // GSAP timeline
                const tl = gsap.timeline();

                // Animate the object falling down
                tl.to(object.position, { y: -25, duration: 1, ease: "bounce" });

                // Set camera position and look at center of scene
                camera.position.set(0, 0, 800); // position camera
                camera.lookAt(scene.position);

                // After the object has landed, move the camera closer
                tl.to(camera.position, { y: 75, z: getZValue(), duration: 1, onUpdate: () => camera.lookAt(scene.position), ease: "slow" }, "+=0.5");

                const fontLoader = new FontLoader();

                fontLoader.load('/Kenney Future_Regular.json', function(font) {
                    let textGeometry = new TextGeometry('Dylan P.', {
                        font: font,
                        size: 18,  // size of the text
                        height: 3,  // thickness to extrude text
                        curveSegments: 24,  // number of points on the curves
                        bevelEnabled: true,  // turn on bevel
                        bevelThickness: 0.75,  // how deep into text bevel goes
                        bevelSize: 0.5,  // how far from text outline is bevel
                        bevelOffset: 0,  // how far from text outline bevel starts
                        bevelSegments: 100  // number of bevel segments
                    });

                    // compute the bounding box of the text geometry
                    textGeometry.computeBoundingBox();

                    // get the bounding box dimensions
                    const { min, max } = textGeometry.boundingBox;

                    // calculate offsets for each dimension
                    const offsetX = (max.x - min.x) / 2;

                    let textMaterial = new THREE.MeshPhongMaterial({
                        color: 0xfffffe,
                        specular: 0xffffff,
                        shininess: 2
                    });

                    let textMesh = new THREE.Mesh(textGeometry, textMaterial);

                    textMesh.position.set(-offsetX, 400, 900);

                    object.add(textMesh);

                    tl.to(textMesh.position, { y: 45, z: 0, duration: 0.75, ease: "power4" });
                });

                // Set flag when animation is completed
                tl.eventCallback("onComplete", () => {
                    animationFinished = true;
                });
            });
        });

        // Resize function
        resize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();

            renderer.setSize(width, height);

            // Reset the camera position
            camera.position.z = getZValue();
        };

        // Add event listeners
        window.addEventListener('resize', resize);

        // Initialize the previous mouse position
        let prevMouseX = null;

        // Update target rotation based on mouse movement
        window.addEventListener('mousemove', (event) => {
            if (object) {
                if (prevMouseX !== null) {
                    // Calculate the difference in mouse position
                    const mouseXDiff = -(event.clientX - prevMouseX);

                    // Update the target rotation based on the mouse movement direction
                    // The multiplier can be adjusted to control the speed of rotation
                    targetRotation += mouseXDiff * 0.0025;

                    // Enforce the minimum and maximum rotation
                    targetRotation = Math.max(minRotation, Math.min(maxRotation, targetRotation));
                }

                // Update the previous mouse position
                prevMouseX = event.clientX;
            }
        });

        const animate = function () {
            requestAnimationFrame(animate);

            // Update object rotation if animation is finished
            if (object && animationFinished) {
                object.rotation.y += (targetRotation - object.rotation.y) * 0.02;
            }

            // Render scene
            renderer.render(scene, camera);
        };

        animate();

    });

    // Remove event listener on component destruction
    onDestroy(() => {
        if (typeof window === 'undefined') return; // Check if we are in the browser

        window.removeEventListener('resize', resize);
    });
</script>

<div class="container" bind:this={container}></div>

<style>
    .container {
        width: 100vw; /* viewport width */
        height: 100vh; /* viewport height */
        margin-bottom: 2rem;
    }

    @media (max-width: 1052px) {
        .container {
            margin-bottom: 12vh;
        }
    }

    @media (max-width: 925px) {
        .container {
            margin-bottom: 14vh;
        }
    }

    @media (max-width: 610px) {
        .container {
            margin-bottom: 16vh;
        }
    }

    @media (max-width: 480px) {
        .container {
            margin-bottom: 18vh;
        }
    }
</style>