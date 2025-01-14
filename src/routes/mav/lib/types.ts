import type * as THREE from 'three';
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import type { Writable } from 'svelte/store';

// Enhanced Audio Processing Types
export interface FrequencyBand {
	low: number;
	high: number;
}

export interface AudioBands {
	bass: number;
	midLow: number;
	midHigh: number;
	treble: number;
}

export interface WaveformAnalysis {
	rms: number; // Root Mean Square (overall energy)
	crest: number; // Crest factor (peak-to-RMS ratio)
	zeroCrossings: number; // Number of zero crossings (frequency estimation)
}

export interface AudioData {
	frequencies: Float32Array;
	bands: AudioBands;
	waveform: Float32Array;
	energy: number;
	peaks: Float32Array;
	waveformAnalysis: WaveformAnalysis;
}

export interface AudioSettings {
	fftSize: number;
	smoothingTimeConstant: number;
	minDecibels: number;
	maxDecibels: number;
	sampleRate: number;
	frameCap: number;
	gain: number;
	noiseFloor: number;
	peakDecay: number;
	energyDistribution: number;
}

// Enhanced Fluid State Types
export interface FluidState {
	density: Float32Array;
	velocityX: Float32Array;
	velocityY: Float32Array;
	velocityZ: Float32Array;
	temp: Float32Array;
	pressure: Float32Array;
	temperature: Float32Array;
	vorticity: Float32Array; // Added for vorticity confinement
	divergence: Float32Array; // Added for pressure solving
	normal: Float32Array;
	caustics: Float32Array;
	foam: Float32Array; // Added for foam/bubble simulation
	turbulence: Float32Array; // Added for turbulence modeling
}

// Enhanced Simulation Configuration
export interface SimulationConfig {
	gridSize: number;
	iterations: number;
	viscosity: number;
	diffusion: number;
	timeStep: number;
	useWebGL: boolean;
	useSpatialIndex: boolean;
	temperature: number;
	density: number;
	gravity: number;
	vorticityStrength: number;
	wavelength: number;
	damping: number;
	causticStrength: number;
	normalStrength: number;
	refractionRatio: number;
	// Added fluid dynamics parameters
	surfaceTension: number;
	buoyancy: number;
	turbulenceFactor: number;
	foamThreshold: number;
	vorticityConfinement: number;
}

// Three.js Context
export interface ThreeContext {
	scene: THREE.Scene;
	camera: THREE.PerspectiveCamera;
	renderer: THREE.WebGLRenderer;
	controls: OrbitControls;
	clock: THREE.Clock; // Added for consistent time tracking
	raycaster: THREE.Raycaster; // Added for interaction
}

// Enhanced Fluid Store
export interface FluidStore {
	density: Writable<Float32Array>;
	velocityX: Writable<Float32Array>;
	velocityY: Writable<Float32Array>;
	velocityZ: Writable<Float32Array>;
	temp: Writable<Float32Array>;
	pressure: Writable<Float32Array>;
	temperature: Writable<Float32Array>;
	vorticity: Writable<Float32Array>;
	divergence: Writable<Float32Array>;
	normal: Writable<Float32Array>;
	caustics: Writable<Float32Array>;
	foam: Writable<Float32Array>;
	turbulence: Writable<Float32Array>;
}

export interface BufferPair {
	current: FluidState;
	next: FluidState;
}

// Enhanced WebGL Types
export interface WebGLContext {
	gl: WebGLRenderingContext;
	computeProgram: WebGLProgram;
	normalProgram: WebGLProgram;
	causticsProgram: WebGLProgram;
	vorticityProgram: WebGLProgram; // Added for vorticity computation
	divergenceProgram: WebGLProgram; // Added for divergence computation
	pressureProgram: WebGLProgram; // Added for pressure solving
	turbulenceProgram: WebGLProgram; // Added for turbulence
	foamProgram: WebGLProgram; // Added for foam generation
	vertexBuffer: WebGLBuffer;
	frameBuffers: Map<string, WebGLFramebuffer>;
}

// Enhanced Fluid Textures
export interface FluidTextures {
	density: WebGLTexture;
	velocity: WebGLTexture;
	temperature: WebGLTexture;
	pressure: WebGLTexture;
	vorticity: WebGLTexture;
	divergence: WebGLTexture;
	normal: WebGLTexture;
	caustics: WebGLTexture;
	foam: WebGLTexture;
	turbulence: WebGLTexture;
}

// Enhanced Shader Types
export interface ShaderUniforms {
	[key: string]: {
		type: string;
		value: number | number[] | THREE.Texture | THREE.Matrix4 | THREE.Vector3;
		needsUpdate?: boolean;
	};
}

// Enhanced Audio-Fluid Interaction
export interface AudioFluidParams {
	frequencyInfluence: number;
	waveformInfluence: number;
	intensityThreshold: number;
	smoothingFactor: number;
	bandWeights: {
		// Weights for different frequency bands
		bass: number;
		midLow: number;
		midHigh: number;
		treble: number;
	};
	energyToForce: number; // Convert audio energy to fluid force
	peakMultiplier: number; // Amplification for peak detection
	turbulenceInfluence: number; // How much audio affects turbulence
	foamGeneration: number; // How much audio generates foam
}

// Enhanced Visualization Parameters
export interface FluidVisualizationParams {
	colorMap: THREE.Texture;
	normalMap: THREE.Texture;
	causticMap: THREE.Texture;
	foamMap: THREE.Texture; // Added for foam texture
	turbulenceMap: THREE.Texture; // Added for turbulence visualization
	opacity: number;
	refractionRatio: number;
	fresnelBias: number;
	fresnelScale: number;
	fresnelPower: number;
	emissiveIntensity: number;
	roughness: number;
	metalness: number;
	envMapIntensity: number;
}

// Enhanced Spatial Indexing
export interface SpatialCell {
	index: number;
	active: boolean;
	particles: number[];
	neighbors: number[];
	density: number; // Local density
	temperature: number; // Local temperature
	pressure: number; // Local pressure
	vorticity: number; // Local vorticity
	turbulence: number; // Local turbulence
}

export interface SpatialIndex {
	cells: Map<number, SpatialCell>;
	cellSize: number;
	gridSize: number;
	activeCount: number; // Number of active cells
	maxParticlesPerCell: number;
	rebuildThreshold: number; // When to rebuild the index
}

// Performance Monitoring
export interface PerformanceMetrics {
	fps: number;
	frameTime: number;
	simulationTime: number;
	renderTime: number;
	particleCount: number;
	activeCells: number;
	memoryUsage: number;
}

// Interaction Types
export interface InteractionEvent {
	position: THREE.Vector3;
	force: THREE.Vector3;
	radius: number;
	type: 'touch' | 'mouse' | 'audio' | 'external';
	intensity: number;
}
