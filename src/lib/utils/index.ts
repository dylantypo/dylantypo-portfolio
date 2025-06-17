// src/lib/utils/index.ts

export {
	categorizeDevice,
	checkNetworkConditions,
	getOptimizedTexturePath,
	getSharpFontSize,
	type DeviceCategory
} from './device-utils';

export {
	processRegionsData,
	calculateCloudsRotationSpeed,
	calculateIdealDistance,
	setCameraPosition,
	updateCameraAspect,
	findFocusedCity,
	type Region,
	type ProcessedLocationData
} from './globe-utils';

export {
	setupLighting,
	setupRenderers,
	createCloudsGeometry,
	setupCameraControls,
	connectControlsToGlobe,
	optimizeRendering,
	enhanceGlobeMaterial,
	setupGlobeTilt,
	createHeroText
} from './three-helpers';

export {
	loadThreeModules,
	loadGlobeModules,
	type ThreeModules,
	type GlobeModules
} from './module-loader';

export { viewportManager } from './viewport-manager';

export {
	getAllPosts,
	getPostBySlug,
	type BlogPostMetadata,
	type PostLink,
	type ResolvedBlogPost
} from './post-handlers';
