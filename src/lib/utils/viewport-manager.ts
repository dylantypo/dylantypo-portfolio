// src/lib/utils/viewport-manager.ts

class ViewportManager {
	private static instance: ViewportManager;
	private isInitialized = false;
	private bodyOverflowStack: string[] = [];
	private cleanupCallbacks: (() => void)[] = [];

	private constructor() {}

	static getInstance(): ViewportManager {
		if (!ViewportManager.instance) {
			ViewportManager.instance = new ViewportManager();
		}
		return ViewportManager.instance;
	}

	// 🎯 Initialize viewport management
	init() {
		if (this.isInitialized || typeof window === 'undefined') return;

		this.updateVH();
		this.setupResizeHandler();
		this.isInitialized = true;
	}

	// 📱 Update viewport height CSS variable
	private updateVH() {
		const vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// 🍎 iOS Safari fix - force layout recalculation
		if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
			document.documentElement.style.height = `${window.innerHeight}px`;
			setTimeout(() => {
				document.documentElement.style.height = '';
			}, 100);
		}
	}

	// 🔄 Setup optimized resize handler
	private setupResizeHandler() {
		let resizeTimer: number;
		let orientationTimer: number;

		const handleResize = () => {
			// 📱 Immediate VH update for mobile
			if (window.innerWidth < 768) {
				this.updateVH();
			}

			// 🎯 Debounced full resize handling
			clearTimeout(resizeTimer);
			resizeTimer = window.setTimeout(() => {
				this.updateVH();
				this.notifyResize();
			}, 150);
		};

		const handleOrientationChange = () => {
			// 📱 iOS orientation change fix
			clearTimeout(orientationTimer);
			orientationTimer = window.setTimeout(() => {
				this.updateVH();
				this.notifyResize();
			}, 500); // Longer delay for orientation
		};

		window.addEventListener('resize', handleResize, { passive: true });
		window.addEventListener('orientationchange', handleOrientationChange, { passive: true });

		this.cleanupCallbacks.push(() => {
			window.removeEventListener('resize', handleResize);
			window.removeEventListener('orientationchange', handleOrientationChange);
			clearTimeout(resizeTimer);
			clearTimeout(orientationTimer);
		});
	}

	// 📢 Notify components of resize
	private notifyResize() {
		window.dispatchEvent(
			new CustomEvent('viewport:resize', {
				detail: {
					width: window.innerWidth,
					height: window.innerHeight,
					isMobile: window.innerWidth < 768
				}
			})
		);
	}

	// 🔒 Manage body overflow (stack-based)
	setBodyOverflow(value: string, id: string) {
		if (typeof document === 'undefined') return;

		// Remove any existing entry for this id
		this.bodyOverflowStack = this.bodyOverflowStack.filter((entry) => !entry.startsWith(id));

		// Add new entry
		this.bodyOverflowStack.push(`${id}:${value}`);

		// Apply the latest overflow value
		const latest = this.bodyOverflowStack[this.bodyOverflowStack.length - 1];
		document.body.style.overflow = latest.split(':')[1];
		document.documentElement.style.overflow = latest.split(':')[1];
	}

	// 🔓 Remove body overflow for specific component
	removeBodyOverflow(id: string) {
		if (typeof document === 'undefined') return;

		this.bodyOverflowStack = this.bodyOverflowStack.filter((entry) => !entry.startsWith(id));

		if (this.bodyOverflowStack.length > 0) {
			// Apply previous overflow value
			const latest = this.bodyOverflowStack[this.bodyOverflowStack.length - 1];
			document.body.style.overflow = latest.split(':')[1];
			document.documentElement.style.overflow = latest.split(':')[1];
		} else {
			// Reset to default
			document.body.style.overflow = '';
			document.documentElement.style.overflow = '';
		}
	}

	// 🧹 Cleanup
	destroy() {
		this.cleanupCallbacks.forEach((cleanup) => cleanup());
		this.cleanupCallbacks = [];
		this.bodyOverflowStack = [];
		this.isInitialized = false;
	}

	// 📐 Get current viewport info
	getViewportInfo() {
		return {
			width: window.innerWidth,
			height: window.innerHeight,
			isMobile: window.innerWidth < 768,
			vh: window.innerHeight * 0.01
		};
	}
}

export const viewportManager = ViewportManager.getInstance();
