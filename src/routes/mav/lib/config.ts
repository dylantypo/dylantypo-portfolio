// config.ts
import type { SimulationConfig } from './types';

export const DEFAULT_CONFIG: SimulationConfig = {
	// Simulation parameters
	gridSize: 6,
	iterations: 6,
	timeStep: 1/60,

	// Physics parameters
	viscosity: 0.0000001,
	diffusion: 0.0000001,
	gravity: -9.81,
	density: 0.008,
	temperature: 0.4,

	// Fluid dynamics
	surfaceTension: 0.2,
	buoyancy: 15.0,
	vorticityStrength: 0.4,
	vorticityConfinement: 0.5,
	turbulenceFactor: 0.25,

	// Water effects
	wavelength: 8.5,
	damping: 0.95,
	causticStrength: 0.9,
	normalStrength: 1.5,
	refractionRatio: 0.95,
	foamThreshold: 0.2,

	// Optimization flags
	useWebGL: true,
	useSpatialIndex: true
} as const; // Make it readonly
