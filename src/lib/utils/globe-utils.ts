export type Region = {
	country: string;
	description: string;
	states: { name: string; description: string; lat: number; lng: number; years: number }[];
};

export type ProcessedLocationData = {
	lat: number;
	lng: number;
	name: string;
	description: string;
	years: number;
};

/**
 * 🌍 Process regions data for globe consumption
 */
export function processRegionsData(regionsLived: Region[]): ProcessedLocationData[] {
	return regionsLived.flatMap((region) =>
		region.states.map((state) => ({
			lat: state.lat,
			lng: state.lng,
			name: region.country === 'United States' ? state.name : `${state.name}, ${region.country}`,
			description: state.description,
			years: state.years
		}))
	);
}

/**
 * ☁️ Calculate clouds rotation speed based on device
 */
export function calculateCloudsRotationSpeed(isMobile: boolean): number {
	const BASE_SPEED = -0.015;
	return isMobile ? BASE_SPEED * 1.25 : BASE_SPEED;
}

/**
 * 📷 Calculate ideal camera distance for globe viewing
 */
export function calculateIdealDistance(
	globeRadius: number,
	cameraFov: number,
	isMobile: boolean,
	viewportManager?: any
): number {
	const baseFactor = 1.95;
	const mobileAdjustment = isMobile ? 3 : 1.5;

	// 🎯 Get viewport info (fallback to window if no manager)
	let width, height;
	if (viewportManager) {
		const viewport = viewportManager.getViewportInfo();
		width = viewport.width;
		height = viewport.height;
	} else if (typeof window !== 'undefined') {
		width = window.innerWidth;
		height = window.innerHeight;
	} else {
		return globeRadius * 2.5; // SSR fallback
	}

	// 📱 Extra boost for landscape mobile
	const isLandscape = height < 500 && width > height;
	const landscapeBoost = isLandscape ? 0.75 : 1;

	// 📐 Aspect ratio adjustment for very tall screens
	const aspectRatio = width / height;
	const aspectBoost = aspectRatio < 0.7 ? 1.3 : 1;

	return (
		(globeRadius / Math.tan(((cameraFov / (baseFactor + mobileAdjustment)) * Math.PI) / 180)) *
		landscapeBoost *
		aspectBoost
	);
}

/**
 * 📍 Set camera position based on latitude and longitude
 */
export function setCameraPosition(
	camera: any,
	lat: number,
	lng: number,
	idealDistance: number,
	globeRadius: number
): void {
	const phi = (90 - lat) * (Math.PI / 180);
	const theta = (180 - lng) * (Math.PI / 180);

	camera.position.set(
		idealDistance * Math.sin(phi) * Math.cos(theta),
		idealDistance * Math.cos(phi),
		idealDistance * Math.sin(phi) * Math.sin(theta)
	);
	camera.lookAt(globeRadius, 0, 100);
}

/**
 * 📷 Update camera aspect ratio
 */
export function updateCameraAspect(camera: any): void {
	if (typeof window === 'undefined') return;
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
}
