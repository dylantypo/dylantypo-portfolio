import type { DeviceCategory } from './device-utils';

/**
 * 💡 Setup Three.js scene lighting
 */
export function setupLighting(THREE: any, scene: any): void {
	const ambientLight = new THREE.AmbientLight('#ffffff', 0.35);
	const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.75);
	hemiLight.color.setHSL(0.6, 0.75, 0.5);
	hemiLight.groundColor.setHSL(0.095, 0.5, 0.5);
	hemiLight.position.set(0, -500, 0);

	const dirLight = new THREE.DirectionalLight(0xffffff, 1);
	dirLight.position.set(-1, 0.75, 1);
	dirLight.position.multiplyScalar(100);

	// Configure shadows
	dirLight.castShadow = true;
	dirLight.shadow.camera.near = 50;
	dirLight.shadow.camera.far = 3500;
	dirLight.shadow.camera.left = -650;
	dirLight.shadow.camera.right = 650;
	dirLight.shadow.camera.top = 650;
	dirLight.shadow.camera.bottom = -650;
	dirLight.shadow.mapSize.width = 2048;
	dirLight.shadow.mapSize.height = 2048;
	dirLight.shadow.bias = -0.0001;

	// Target light at globe center
	const targetObject = new THREE.Object3D();
	targetObject.position.set(0, 0, 0);
	scene.add(targetObject);
	dirLight.target = targetObject;

	scene.add(ambientLight, hemiLight, dirLight);
}

/**
 * 🖥️ Setup and configure renderers - FIXED: Only return what's used
 */
export function setupRenderers(
	THREE: any,
	CSS2DRenderer: any,
	container: HTMLElement
): { renderer: any; renderers: any[] } {
	const renderer = new THREE.WebGLRenderer({
		alpha: true,
		premultipliedAlpha: false
	});
	renderer.setClearColor(0x000000, 0);
	const labelRenderer = new CSS2DRenderer();
	const renderers = [renderer, labelRenderer];

	renderers.forEach((r, idx) => {
		r.setSize(window.innerWidth, window.innerHeight);
		if ('setPixelRatio' in r) {
			r.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		}
		if (r instanceof THREE.WebGLRenderer) {
			r.sortObjects = false;
		}
		if (idx > 0) {
			r.domElement.style.position = 'absolute';
			r.domElement.style.top = '0px';
			r.domElement.style.pointerEvents = 'none';
			r.domElement.style.left = '0px';
			r.domElement.style.width = '100%';
			r.domElement.style.height = '100%';
		}
		container.appendChild(r.domElement);
	});

	// Return only renderer and renderers array (labelRenderer not needed separately)
	return { renderer, renderers };
}

/**
 * ☁️ Create optimized clouds geometry
 */
export function createCloudsGeometry(THREE: any, globeRadius: number, isMobile: boolean): any {
	const CLOUDS_ALT = 0.005;
	return new THREE.SphereGeometry(
		globeRadius * (1 + CLOUDS_ALT),
		isMobile ? 50 : 75,
		isMobile ? 50 : 75
	);
}

/**
 * 🎮 Setup camera controls (without globe reference)
 */
export function setupCameraControls(TrackballControls: any, camera: any, renderer: any) {
	const controls = new TrackballControls(camera, renderer.domElement);
	controls.noZoom = true;
	controls.noPan = true;
	controls.rotateSpeed = 1.65;
	controls.dynamicDampingFactor = 0.1;

	return controls;
}

/**
 * 🔗 Connect controls to globe (call after globe creation)
 */
export function connectControlsToGlobe(controls: any, globe: any, camera: any) {
	controls.addEventListener('change', () => {
		if (globe) globe.setPointOfView(camera);
	});
}

/**
 * ⚡ Optimize rendering for device performance
 */
export function optimizeRendering(renderer: any, deviceCategory: DeviceCategory): void {
	if (deviceCategory === 'low') {
		renderer.setPixelRatio(1.0);
	}
}

/**
 * 🌍 Enhance globe material with water effects
 */
export function enhanceGlobeMaterial(THREE: any, globe: any): void {
	const globeMaterial = globe.globeMaterial();
	if (globeMaterial && 'specularMap' in globeMaterial) {
		new THREE.TextureLoader().load('/geo/earth-water.webp', (texture: any) => {
			(globeMaterial as any).specularMap = texture;
			(globeMaterial as any).specular = new THREE.Color('grey');
			(globeMaterial as any).shininess = 100;
		});
	}
}

/**
 * 🎲 Setup globe tilt and rotation
 */
export function setupGlobeTilt(THREE: any, globe: any): void {
	const tiltAxis = new THREE.Vector3(1, 0, 0);
	const tiltAngle = (Math.PI / 6) * -1;
	globe.setRotationFromAxisAngle(tiltAxis, tiltAngle);
}

/**
 * ✨ Create and animate hero text around the globe
 */
export function createHeroText(
	THREE: any,
	FontLoader: any,
	TextGeometry: any,
	scene: any,
	globe: any,
	gsap: any,
	heroText: string
): void {
	const fontLoader = new FontLoader();
	fontLoader.load('/fonts/Kenney Future_Regular.json', (font: any) => {
		const group = new THREE.Group();
		const radiusOffset = globe.getGlobeRadius() * 0.6;

		for (let i = 0; i < heroText.length; i++) {
			const char = heroText[i];
			const charGeometry = new TextGeometry(char, {
				font: font,
				size: 24,
				depth: 2,
				curveSegments: 12,
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
				transparent: true,
				opacity: 0
			});

			charMaterial.side = THREE.DoubleSide;
			charMaterial.shadowSide = THREE.DoubleSide;

			const charMesh = new THREE.Mesh(charGeometry, charMaterial);
			charMesh.castShadow = true;
			charMesh.receiveShadow = true;

			charGeometry.computeBoundingBox();
			if (charGeometry.boundingBox) {
				const angle = ((i - heroText.length / 2) / heroText.length) * Math.PI;
				const centralIndex = Math.floor(heroText.length / 2);
				const centralAngle = ((centralIndex - heroText.length / 2) / heroText.length) * Math.PI;

				charMesh.position.set(
					Math.sin(angle - centralAngle) * (radiusOffset + 50),
					0,
					Math.cos(angle - centralAngle) * (radiusOffset + 50)
				);

				const outwardDirection = charMesh.position.clone().normalize();
				const outwardPoint = outwardDirection.multiplyScalar(radiusOffset + 100);
				charMesh.lookAt(outwardPoint);

				if (Math.cos(angle - centralAngle) < 0) {
					charMesh.rotation.y += Math.PI;
				}
			}

			group.add(charMesh);
		}

		group.position.set(0, 0, 0);
		group.visible = false;
		scene.add(group);

		// Animate text appearance
		gsap.to(
			{},
			{
				delay: 0.75,
				duration: 2.25,
				ease: 'power2.inOut',
				onStart: () => {
					group.visible = true;
					group.children.forEach((obj: any) => {
						const mesh = obj;
						if (mesh.material instanceof THREE.MeshPhongMaterial) {
							mesh.material.transparent = true;
							mesh.material.opacity = 0;
						}
					});
				},
				onUpdate: function () {
					const progress = this.progress();
					group.children.forEach((obj: any) => {
						const mesh = obj;
						if (mesh.material instanceof THREE.MeshPhongMaterial) {
							mesh.material.opacity = progress * 0.5;
						}
					});
				},
				onComplete: () => {
					group.children.forEach((obj: any) => {
						const mesh = obj;
						if (mesh.material instanceof THREE.MeshPhongMaterial) {
							mesh.material.opacity = 0.5;
						}
					});
				}
			}
		);

		gsap.to(group.rotation, {
			x: Math.PI * 0.12,
			y: Math.PI * 1.25,
			duration: 3,
			ease: 'power2.inOut'
		});
	});
}
