export interface ThreeModules {
	THREE: typeof import('three');
	TextGeometry: typeof import('three/examples/jsm/geometries/TextGeometry.js').TextGeometry;
	FontLoader: typeof import('three/examples/jsm/loaders/FontLoader.js').FontLoader;
}

export interface GlobeModules {
	CSS2DRenderer: any;
	Globe: any;
	TrackballControls: any;
	gsap: any;
	CSSPlugin: any;
}

/**
 * 🚀 Load Three.js core modules
 */
export async function loadThreeModules(): Promise<ThreeModules> {
	try {
		const [ThreeModule, { TextGeometry }, { FontLoader }] = await Promise.all([
			import('three'),
			import('three/examples/jsm/geometries/TextGeometry.js'),
			import('three/examples/jsm/loaders/FontLoader.js')
		]);

		return { THREE: ThreeModule, TextGeometry, FontLoader };
	} catch (error) {
		console.error('❌ Failed to load Three.js modules:', error);
		throw error;
	}
}

/**
 * 🌍 Load globe-specific modules
 */
export async function loadGlobeModules(): Promise<GlobeModules> {
	try {
		const [{ CSS2DRenderer }, { default: Globe }, { TrackballControls }, { gsap }, { CSSPlugin }] =
			await Promise.all([
				import('three/examples/jsm/renderers/CSS2DRenderer.js'),
				import('three-globe'),
				import('three/examples/jsm/controls/TrackballControls.js'),
				import('gsap'),
				import('gsap/CSSPlugin')
			]);

		gsap.registerPlugin(CSSPlugin);

		return { CSS2DRenderer, Globe, TrackballControls, gsap, CSSPlugin };
	} catch (error) {
		console.error('❌ Failed to load globe modules:', error);
		throw error;
	}
}
