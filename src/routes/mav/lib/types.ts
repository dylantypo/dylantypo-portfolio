import type * as THREE from 'three';
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import type { Writable } from 'svelte/store';

// WebGL Context Extensions
declare global {
	interface WebGLRenderingContext {
		RGBA32F?: number;
	}

	interface WebGL2RenderingContext {
		RGBA32F: number;
	}
}

// Enhanced Texture Configuration
export interface TextureConfig {
	size: number;
	width: number;
	height: number;
	format: number;
	type: number;
	minFilter?: number;
	magFilter?: number;
	wrapS?: number;
	wrapT?: number;
	anisotropy?: number;
	generateMipmaps?: boolean;
	flipY?: boolean;
	unpackAlignment?: number;
}

export interface DropUniforms {
    center: WebGLUniformLocation | null;
    radius: WebGLUniformLocation | null;
    strength: WebGLUniformLocation | null;
}

export interface UpdateUniforms {
    delta: WebGLUniformLocation | null;
    texture: WebGLUniformLocation | null;
}

// Organized Uniform Locations
export interface UniformLocations {
	compute: ComputeUniforms;
	normal: NormalUniforms;
	caustics: CausticUniforms;
    drop: DropUniforms;
    update: UpdateUniforms;
}

export interface ComputeUniforms {
	position: number | null;
	uTexture: WebGLUniformLocation | null;
	uDeltaTime: WebGLUniformLocation | null;
	uTemperature: WebGLUniformLocation | null;
	texelSize: WebGLUniformLocation | null;
	uTime: WebGLUniformLocation | null;
}

export interface NormalUniforms {
	position: number | null;
	uTexture: WebGLUniformLocation | null;
	texelSize: WebGLUniformLocation | null;
    delta: WebGLUniformLocation | null;
}

export interface CausticUniforms {
	position: number | null;
	uTexture: WebGLUniformLocation | null;
	uTime: WebGLUniformLocation | null;
}

// Enhanced Audio Processing Types
export interface FrequencyBand {
	readonly low: number;
	readonly high: number;
	readonly centerFrequency: number;
	readonly bandwidth: number;
}

export interface AudioBands {
	readonly bass: number;
	readonly midLow: number;
	readonly midHigh: number;
	readonly treble: number;
	readonly fullSpectrum: number;
}

export interface WaveformAnalysis {
	readonly rms: number;
	readonly crest: number;
	readonly zeroCrossings: number;
	readonly spectralCentroid: number;
	readonly spectralFlatness: number;
}

export interface AudioData {
	readonly frequencies: Float32Array;
	readonly bands: AudioBands;
	readonly waveform: Float32Array;
	readonly energy: number;
	readonly peaks: Float32Array;
	readonly waveformAnalysis: WaveformAnalysis;
	readonly timestamp: number;
}

export interface AudioSettings {
	readonly fftSize: number;
	readonly smoothingTimeConstant: number;
	readonly minDecibels: number;
	readonly maxDecibels: number;
	readonly sampleRate: number;
	readonly frameCap: number;
	readonly gain: number;
	readonly noiseFloor: number;
	readonly peakDecay: number;
	readonly energyDistribution: number;
	readonly bandSplitFrequencies: number[];
}

// Enhanced Fluid State Types with ReadonlyArrays for immutability
export interface FluidState {
	readonly density: Float32Array;
	readonly velocityX: Float32Array;
	readonly velocityY: Float32Array;
	readonly velocityZ: Float32Array;
	readonly temp: Float32Array;
	readonly pressure: Float32Array;
	readonly temperature: Float32Array;
	readonly vorticity: Float32Array;
	readonly divergence: Float32Array;
	readonly normal: Float32Array;
	readonly caustics: Float32Array;
	readonly foam: Float32Array;
	readonly turbulence: Float32Array;
}

// Enhanced Configuration with Validation
export interface SimulationConfig {
	readonly gridSize: number;
	readonly iterations: number;
	readonly viscosity: number;
	readonly diffusion: number;
	readonly timeStep: number;
	readonly useWebGL: boolean;
	readonly useSpatialIndex: boolean;
	readonly temperature: number;
	readonly density: number;
	readonly gravity: number;
	readonly vorticityStrength: number;
	readonly wavelength: number;
	readonly damping: number;
	readonly causticStrength: number;
	readonly normalStrength: number;
	readonly refractionRatio: number;
	readonly surfaceTension: number;
	readonly buoyancy: number;
	readonly turbulenceFactor: number;
	readonly foamThreshold: number;
	readonly vorticityConfinement: number;
	readonly maxParticles?: number;
	readonly particleSize?: number;
}

// Enhanced Three.js Context with Performance Monitoring
export interface ThreeContext {
	readonly scene: THREE.Scene;
	readonly camera: THREE.PerspectiveCamera;
	readonly renderer: THREE.WebGLRenderer;
	readonly controls: OrbitControls;
	readonly clock: THREE.Clock;
	readonly raycaster: THREE.Raycaster;
	readonly stats?: {
		fps: number;
		drawCalls: number;
		triangles: number;
		points: number;
	};
}

// Enhanced Fluid Store with Type Safety
export type FluidStore = {
	[K in keyof FluidState]: Writable<FluidState[K]>;
};

export interface BufferPair {
	current: FluidState;
	next: FluidState;
}

// Enhanced WebGL Context with Resource Management
export interface WebGLContext {
	readonly gl: WebGLRenderingContext | WebGL2RenderingContext;
	readonly programs: {
		compute: WebGLProgram;
		normal: WebGLProgram;
		caustics: WebGLProgram;
		vorticity: WebGLProgram;
		divergence: WebGLProgram;
		pressure: WebGLProgram;
		turbulence: WebGLProgram;
		foam: WebGLProgram;
	};
	readonly buffers: {
		vertex: WebGLBuffer;
		index: WebGLBuffer;
		frame: Map<string, WebGLFramebuffer>;
	};
	readonly extensions: {
		[key: string]: any;
	};
}

// Enhanced Fluid Textures with Resource Management
export interface FluidTextures {
	readonly density: WebGLTexture;
	readonly velocity: WebGLTexture;
	readonly temperature: WebGLTexture;
	readonly pressure: WebGLTexture;
	readonly vorticity: WebGLTexture;
	readonly divergence: WebGLTexture;
	readonly normal: WebGLTexture;
	readonly caustics: WebGLTexture;
	readonly foam: WebGLTexture;
	readonly turbulence: WebGLTexture;
}

// Enhanced Shader Types with Validation
export interface ShaderUniforms {
	readonly [key: string]: {
		readonly type: string;
		value: number | number[] | THREE.Texture | THREE.Matrix4 | THREE.Vector3;
		readonly needsUpdate?: boolean;
		readonly validate?: (value: any) => boolean;
	};
}

// Enhanced Audio-Fluid Interaction with Validation
export interface AudioFluidParams {
	readonly frequencyInfluence: number;
	readonly waveformInfluence: number;
	readonly intensityThreshold: number;
	readonly smoothingFactor: number;
	readonly bandWeights: {
		readonly bass: number;
		readonly midLow: number;
		readonly midHigh: number;
		readonly treble: number;
	};
	readonly energyToForce: number;
	readonly peakMultiplier: number;
	readonly turbulenceInfluence: number;
	readonly foamGeneration: number;
	validate(): boolean;
}

// Enhanced Visualization Parameters with Defaults
export interface FluidVisualizationParams {
	readonly colorMap: THREE.Texture;
	readonly normalMap: THREE.Texture;
	readonly causticMap: THREE.Texture;
	readonly foamMap: THREE.Texture;
	readonly turbulenceMap: THREE.Texture;
	readonly opacity: number;
	readonly refractionRatio: number;
	readonly fresnelBias: number;
	readonly fresnelScale: number;
	readonly fresnelPower: number;
	readonly emissiveIntensity: number;
	readonly roughness: number;
	readonly metalness: number;
	readonly envMapIntensity: number;
	getDefaults(): FluidVisualizationParams;
}

// Enhanced Spatial Indexing with Optimization
export interface SpatialCell {
	readonly index: number;
	active: boolean;
	readonly particles: Float32Array; // Using typed array for better performance
	readonly neighbors: Float32Array; // Using typed array for better performance
	readonly density: number;
	readonly temperature: number;
	readonly pressure: number;
	readonly vorticity: number;
	readonly turbulence: number;
	readonly bounds: {
		readonly min: THREE.Vector3;
		readonly max: THREE.Vector3;
	};
}

export interface SpatialIndex {
	readonly cells: Map<number, SpatialCell>;
	readonly cellSize: number;
	readonly gridSize: number;
	readonly activeCount: number;
	readonly maxParticlesPerCell: number;
	readonly rebuildThreshold: number;
	readonly octreeDepth: number;
	update(dt: number): void;
	query(position: THREE.Vector3, radius: number): SpatialCell[];
}

// Enhanced Performance Monitoring
export interface PerformanceMetrics {
	readonly fps: number;
	readonly frameTime: number;
	readonly simulationTime: number;
	readonly renderTime: number;
	readonly particleCount: number;
	readonly activeCells: number;
	readonly memoryUsage: number;
	readonly gpuMemoryUsage?: number;
	readonly drawCalls: number;
	readonly triangles: number;
	readonly textureMemory: number;
}

// Enhanced Interaction Types with Validation
export interface InteractionEvent {
	readonly position: THREE.Vector3;
	readonly force: THREE.Vector3;
	readonly radius: number;
	readonly type: 'touch' | 'mouse' | 'audio' | 'external';
	readonly intensity: number;
	readonly timestamp: number;
	readonly pressure?: number;
	validate(): boolean;
}
