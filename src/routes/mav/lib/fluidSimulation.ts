// fluidSimulation.ts
import { DEFAULT_CONFIG } from './config';
import { FluidRenderer } from './renderer';
import { FluidPhysics } from './physics';
import type { FluidState, SimulationConfig, FluidStore, BufferPair } from './types';
import { writable, type Writable } from 'svelte/store';

export function useFluidSimulation(config: Partial<SimulationConfig> = {}) {
	const cfg = { ...DEFAULT_CONFIG, ...config };
	const { gridSize: N } = cfg;
	let time = 0;

	// Initialize renderer and physics
	const renderer = new FluidRenderer();
	const physics = new FluidPhysics(cfg);

	// Spatial indexing setup
	const cellSize = Math.max(1, Math.floor(N / 8));
	const cellCount = Math.ceil(N / cellSize);
	const activeRegions = new Uint8Array(cellCount * cellCount * cellCount);
	const spatialIndex = new Set<number>();

	function createFluidState(size: number): FluidState {
		const totalSize = size * size * size;
		return {
			density: new Float32Array(totalSize),
			velocityX: new Float32Array(totalSize),
			velocityY: new Float32Array(totalSize),
			velocityZ: new Float32Array(totalSize),
			temp: new Float32Array(totalSize),
			pressure: new Float32Array(totalSize),
			temperature: new Float32Array(totalSize),
			vorticity: new Float32Array(totalSize),
			divergence: new Float32Array(totalSize),
			normal: new Float32Array(totalSize),
			caustics: new Float32Array(totalSize),
			foam: new Float32Array(totalSize),
			turbulence: new Float32Array(totalSize)
		};
	}

	// Initialize buffers
	const buffers: BufferPair = {
		current: createFluidState(N),
		next: createFluidState(N)
	};

	// Initialize stores
	const stores = {
		density: writable(buffers.current.density),
		velocityX: writable(buffers.current.velocityX),
		velocityY: writable(buffers.current.velocityY),
		velocityZ: writable(buffers.current.velocityZ),
		temp: writable(buffers.current.temp),
		temperature: writable(buffers.current.temperature),
		pressure: writable(buffers.current.pressure),
		normal: writable(buffers.current.normal),
		caustics: writable(buffers.current.caustics),
		vorticity: writable(buffers.current.vorticity),
		divergence: writable(buffers.current.divergence),
		foam: writable(buffers.current.foam),
		turbulence: writable(buffers.current.turbulence)
	};

	// Core update function
	function updateSimulation(): void {
		time += cfg.timeStep;

		if (cfg.useWebGL && renderer.isInitialized()) {
			renderer.updateSimulation(buffers.current, time);
		} else {
			// Copy current state to next buffer before modifications
			for (const key in buffers.next) {
				if (Object.prototype.hasOwnProperty.call(buffers.next, key)) {
					const nextArray = buffers.next[key as keyof FluidState] as Float32Array;
					const currentArray = buffers.current[key as keyof FluidState] as Float32Array;
					nextArray.set(currentArray);
				}
			}

			physics.updateSimulation(buffers.next, buffers.current, time, activeRegions, spatialIndex);
			swapBuffers();
		}

		updateStores();
	}

	// Function to swap current and next buffers
	function swapBuffers(): void {
		const temp = buffers.current;
		buffers.current = buffers.next;
		buffers.next = temp;
	}

	// Public methods
	function addForce(x: number, y: number, z: number, amount: number): void {
		physics.addForce(buffers.current, spatialIndex, x, y, z, amount);
		updateStores();
	}

	function addVelocity(x: number, y: number, z: number, vx: number, vy: number, vz: number): void {
		physics.addVelocity(buffers.current, spatialIndex, x, y, z, vx, vy, vz);
		if (renderer.isInitialized()) {
			renderer.updateVelocityTexture(x, y, z, vx, vy, vz);
		}
	}

	function reset(): void {
		time = 0;
		// Reset buffers
		for (const key in buffers.current) {
			if (Object.prototype.hasOwnProperty.call(buffers.current, key)) {
				(buffers.current[key as keyof FluidState] as Float32Array).fill(0);
				(buffers.next[key as keyof FluidState] as Float32Array).fill(0);
			}
		}

		// Reset spatial indexing
		spatialIndex.clear();
		activeRegions.fill(0);

		updateStores();
		renderer.reset();
	}

	function dispose(): void {
		renderer.dispose();
		// Clear buffers
		for (const key in buffers) {
			if (Object.prototype.hasOwnProperty.call(buffers, key)) {
				const buffer = buffers[key as keyof typeof buffers];
				for (const field in buffer) {
					if (Object.prototype.hasOwnProperty.call(buffer, field)) {
						(buffer[field as keyof FluidState] as Float32Array).fill(0);
					}
				}
			}
		}
		// Clear spatial indexing
		spatialIndex.clear();
		activeRegions.fill(0);
	}

	// Helper functions
	function updateStores(): void {
		for (const key in stores) {
			if (Object.prototype.hasOwnProperty.call(stores, key)) {
				(stores[key as keyof FluidStore] as Writable<Float32Array>).set(
					buffers.current[key as keyof FluidState]
				);
			}
		}
	}

	// Return public interface
	return {
		// Properties
		density: stores.density,
		velocityX: stores.velocityX,
		velocityY: stores.velocityY,
		velocityZ: stores.velocityZ,
		temperature: stores.temperature,
		pressure: stores.pressure,
		normal: stores.normal,
		caustics: stores.caustics,
		vorticity: stores.vorticity,
		divergence: stores.divergence,
		foam: stores.foam,
		turbulence: stores.turbulence,
		config: cfg,

		// Methods
		updateSimulation,
		addForce,
		addVelocity,
		reset,
		dispose,

		// Debug/Development Methods (can be removed in production)
		getTime: () => time,
		getActiveRegions: () => activeRegions,
		getSpatialIndex: () => spatialIndex
	};
}
