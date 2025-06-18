export type DeviceCategory = 'low' | 'medium' | 'high';

/**
 * 📱 Categorize device performance capability
 */
export function categorizeDevice(): DeviceCategory {
	if (typeof window === 'undefined') return 'low';

	const isMobile = window.innerWidth < 768;
	const isHighEnd = window.devicePixelRatio > 2 && !isMobile && window.innerWidth > 1600;
	const isMidRange = (window.devicePixelRatio > 1.5 && !isMobile) || window.innerWidth > 1200;

	return isHighEnd ? 'high' : isMidRange ? 'medium' : 'low';
}

/**
 * 🌐 Check network conditions for performance optimization
 */
export function checkNetworkConditions(): DeviceCategory {
	if (typeof navigator === 'undefined' || !('connection' in navigator)) return 'medium';

	const connection = (navigator as any).connection;
	if (
		connection &&
		(connection.saveData || connection.effectiveType === '2g' || connection.effectiveType === '3g')
	) {
		return 'low';
	}

	return 'medium';
}

/**
 * 📏 Get optimized texture path based on device capability
 */
export function getOptimizedTexturePath(basePath: string, category: DeviceCategory): string {
	const pathParts = basePath.split('/');
	const fileName = pathParts[pathParts.length - 1];
	const baseName = fileName.split('.')[0].replace('_4k', '');

	let resolution = '1k';
	if (category === 'high') resolution = '4k';
	else if (category === 'medium') resolution = '2k';

	return `/geo/${baseName}_${resolution}.webp`;
}

/**
 * 🎯 Calculate sharp font size based on viewport and DPR
 */
export function getSharpFontSize(): number {
	if (typeof window === 'undefined') return 0.7;

	const width = window.innerWidth;
	const height = window.innerHeight;
	const smallestDimension = Math.min(width, height);

	// 📱 Device detection
	// const isLandscape = width > height;
	const isMobile = width < 768;
	const isTablet = width >= 768 && width < 1024;

	let baseFontSize: number;

	if (isMobile) {
		// 📱 Mobile portrait - medium text
		baseFontSize = smallestDimension < 400 ? 0.65 : 0.85;
	} else if (isTablet) {
		// 📱 Tablet - balanced size
		baseFontSize = 0.9;
	} else {
		// 🖥️ Desktop - standard size
		baseFontSize = smallestDimension < 1200 ? 0.7 : 0.85;
	}

	return baseFontSize;
}
