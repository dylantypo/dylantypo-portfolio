import type * as THREE from 'three';
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import type { Writable } from 'svelte/store';

// Audio Processing Types
export interface AudioData {
    frequencies: Float32Array;
    waveform: Float32Array;
    averageFrequency: number;
}

// Enhanced Fluid State with new fields from water.js
export interface FluidState {
    density: Float32Array;
    velocityX: Float32Array;
    velocityY: Float32Array;
    velocityZ: Float32Array;
    temp: Float32Array;
    pressure: Float32Array;
    temperature: Float32Array;
    normal: Float32Array;    // Added for normal mapping
    caustics: Float32Array;  // Added for caustics
}

// Enhanced config with water.js parameters
export interface SimulationConfig {
    gridSize: number;
    iterations: number;
    viscosity: number;
    diffusion: number;
    timeStep: number;
    useWebGL?: boolean;
    useSpatialIndex?: boolean;
    temperature: number;
    density: number;
    gravity: number;
    vorticityStrength: number;
    // New water.js specific configs
    wavelength?: number;     // Wave propagation parameter
    damping?: number;        // Wave damping factor
    causticStrength?: number; // Caustics intensity
    normalStrength?: number;  // Normal map intensity
    refractionRatio?: number; // Water refraction index
}

export interface ThreeContext {
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    controls: OrbitControls;
}

// Enhanced FluidStore with new fields
export interface FluidStore {
    density: Writable<Float32Array>;
    velocityX: Writable<Float32Array>;
    velocityY: Writable<Float32Array>;
    velocityZ: Writable<Float32Array>;
    temp: Writable<Float32Array>;
    pressure: Writable<Float32Array>;
    temperature: Writable<Float32Array>;
    // New observables for visualization
    normal: Writable<Float32Array>;
    caustics: Writable<Float32Array>;
}

export interface BufferPair {
    current: FluidState;
    next: FluidState;
}

// WebGL Types
export interface WebGLContext {
    gl: WebGLRenderingContext;
    computeProgram: WebGLProgram;
    normalProgram: WebGLProgram;
    causticsProgram: WebGLProgram;
    vertexBuffer: WebGLBuffer;
}

export interface FluidTextures {
    density: WebGLTexture;
    velocity: WebGLTexture;
    temperature: WebGLTexture;
    normal: WebGLTexture;
    caustics: WebGLTexture;
}

// Shader types for type safety
export interface ShaderUniforms {
    [key: string]: {
        type: string;
        value: number | number[] | THREE.Texture;
    };
}

// Audio-Fluid Interaction Types
export interface AudioFluidParams {
    frequencyInfluence: number;  // How much frequency data affects fluid
    waveformInfluence: number;   // How much waveform data affects fluid
    intensityThreshold: number;  // Minimum intensity to trigger fluid changes
    smoothingFactor: number;     // Temporal smoothing of audio influence
}

// Visualization Types
export interface FluidVisualizationParams {
    colorMap: THREE.Texture;
    normalMap: THREE.Texture;
    causticMap: THREE.Texture;
    opacity: number;
    refractionRatio: number;
    fresnelBias: number;
    fresnelScale: number;
    fresnelPower: number;
}

// Spatial Indexing Types
export interface SpatialCell {
    index: number;
    active: boolean;
    particles: number[];
    neighbors: number[];
}

export interface SpatialIndex {
    cells: Map<number, SpatialCell>;
    cellSize: number;
    gridSize: number;
}