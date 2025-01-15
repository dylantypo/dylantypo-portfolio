// config.ts
import type { SimulationConfig } from './types';

export const DEFAULT_CONFIG: SimulationConfig = {
	// Simulation parameters
	gridSize: 256,
	iterations: 16,
	timeStep: 0.016,

	// Physics parameters
	viscosity: 0.000001,
	diffusion: 0.000001,
	gravity: -9.81,
	density: 0.0125,
	temperature: 0.25,

	// Fluid dynamics
	surfaceTension: 0.072,
	buoyancy: 9.81,
	vorticityStrength: 0.15,
	vorticityConfinement: 0.3,
	turbulenceFactor: 0.1,

	// Water effects
	wavelength: 4.0,
	damping: 0.985,
	causticStrength: 0.75,
	normalStrength: 1.0,
	refractionRatio: 0.98,
	foamThreshold: 0.65,

	// Optimization flags
	useWebGL: true,
	useSpatialIndex: true
} as const; // Make it readonly
