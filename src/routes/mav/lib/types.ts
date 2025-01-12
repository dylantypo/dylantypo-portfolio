import type * as THREE from 'three';
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import type { Writable } from 'svelte/store';

// Audio Processing Types
export interface AudioData {
    frequencies: Float32Array;
    waveform: Float32Array;
    averageFrequency: number;
}

export interface FluidState {
    density: Float32Array;
    velocityX: Float32Array;
    velocityY: Float32Array;
    velocityZ: Float32Array;
    temp: Float32Array;
}

export interface SimulationConfig {
    gridSize: number;
    iterations: number;
    viscosity: number;
    diffusion: number;
    timeStep: number;
    useWebGL?: boolean;
    useSpatialIndex?: boolean;
}

export interface ThreeContext {
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    controls: OrbitControls;
}

export interface FluidStore {
    density: Writable<Float32Array>;
    velocityX: Writable<Float32Array>;
    velocityY: Writable<Float32Array>;
    velocityZ: Writable<Float32Array>;
    temp: Writable<Float32Array>;
}

export interface BufferPair {
    current: FluidState;
    next: FluidState;
}