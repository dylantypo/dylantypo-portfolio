import { writable, type Writable } from 'svelte/store';
import type { FluidState, SimulationConfig, FluidStore, BufferPair } from './types';

const DEFAULT_CONFIG: SimulationConfig = {
    gridSize: 64,        // N
    iterations: 128,       // Solver iterations
    viscosity: 0.00001,    // Fluid viscosity
    diffusion: 0.0001,   // Diffusion rate
    timeStep: 0.016,     // dt
    useWebGL: true,      // Enable WebGL acceleration when available
    useSpatialIndex: true // Enable spatial indexing for optimization
};

// WebGL shaders
const VERTEX_SHADER = `
    precision highp float;
    
    attribute vec4 position;
    varying vec2 vUv;
    
    void main() {
        vUv = position.xy * 0.5 + 0.5;
        gl_Position = position;
    }
`;

const FRAGMENT_SHADER = `
    precision highp float;
    
    uniform sampler2D u_density;
    uniform sampler2D u_velocity;
    uniform vec2 u_resolution;
    uniform float u_deltaTime;
    uniform float u_viscosity;
    
    varying vec2 vUv;
    
    void main() {
        vec2 uv = vUv;
        vec4 density = texture2D(u_density, uv);
        vec4 velocity = texture2D(u_velocity, uv);
        
        vec2 texelSize = 1.0 / u_resolution;
        vec4 sum = 
            texture2D(u_density, uv + vec2(-1.0, 0.0) * texelSize) +
            texture2D(u_density, uv + vec2(1.0, 0.0) * texelSize) +
            texture2D(u_density, uv + vec2(0.0, -1.0) * texelSize) +
            texture2D(u_density, uv + vec2(0.0, 1.0) * texelSize);
            
        gl_FragColor = mix(density, sum * 0.25, u_viscosity * u_deltaTime);
    }
`;

export function useFluidSimulation(config: Partial<SimulationConfig> = {}) {
    const cfg = { ...DEFAULT_CONFIG, ...config };
    const { gridSize: N, iterations, viscosity, diffusion, timeStep, useWebGL } = cfg;

    // WebGL context and program setup
    let gl: WebGLRenderingContext | null = null;
    let computeProgram: WebGLProgram | null = null;
    let vertexBuffer: WebGLBuffer | null = null;
    let densityTexture: WebGLTexture | null = null;
    let velocityTexture: WebGLTexture | null = null;

    // Double buffering for better performance
    const buffers: BufferPair = {
        current: {
            density: new Float32Array(N * N * N),
            velocityX: new Float32Array(N * N * N),
            velocityY: new Float32Array(N * N * N),
            velocityZ: new Float32Array(N * N * N),
            temp: new Float32Array(N * N * N)
        },
        next: {
            density: new Float32Array(N * N * N),
            velocityX: new Float32Array(N * N * N),
            velocityY: new Float32Array(N * N * N),
            velocityZ: new Float32Array(N * N * N),
            temp: new Float32Array(N * N * N)
        }
    };

    // Create stores with initial values
    const stores: FluidStore = {
        density: writable(buffers.current.density),
        velocityX: writable(buffers.current.velocityX),
        velocityY: writable(buffers.current.velocityY),
        velocityZ: writable(buffers.current.velocityZ),
        temp: writable(buffers.current.temp)
    };

    // Spatial indexing for active regions
    const spatialIndex = new Set<number>();
    const cellSize = Math.max(1, Math.floor(N / 8));

    // Optimized index calculation with boundary checking
    const idx = (() => {
        const n2 = N * N;
        return (x: number, y: number, z: number): number => {
            const ix = Math.max(0, Math.min(N - 1, Math.floor(x)));
            const iy = Math.max(0, Math.min(N - 1, Math.floor(y)));
            const iz = Math.max(0, Math.min(N - 1, Math.floor(z)));
            return ix + iy * N + iz * n2;
        };
    })();

    // Check if a region has significant activity
    function hasActivity(x: number, y: number, z: number): boolean {
        const index = Math.floor(x / cellSize) + 
                     Math.floor(y / cellSize) * Math.floor(N / cellSize) +
                     Math.floor(z / cellSize) * Math.floor(N / cellSize) * Math.floor(N / cellSize);
        return spatialIndex.has(index);
    }

    // Helper function to compile shader
    function compileShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
        const shader = gl.createShader(type);
        if (!shader) return null;

        gl.shaderSource(shader, source);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error(`Shader compilation failed: ${gl.getShaderInfoLog(shader)}`);
            gl.deleteShader(shader);
            return null;
        }

        return shader;
    }
    // Helper function to create and configure a WebGL texture
    function createTexture(gl: WebGLRenderingContext): WebGLTexture | null {
        const texture = gl.createTexture();
        if (!texture) return null;
    
        // Check for extensions
        const floatTextureExt = gl.getExtension('OES_texture_float');
        const floatLinearExt = gl.getExtension('OES_texture_float_linear');
        const halfFloatExt = gl.getExtension('OES_texture_half_float');
        const halfFloatLinearExt = gl.getExtension('OES_texture_half_float_linear');
    
        // Determine best available texture format
        let textureType: number = gl.UNSIGNED_BYTE;
        if (floatTextureExt) {
            textureType = gl.FLOAT as number;
        } else if (halfFloatExt) {
            textureType = (halfFloatExt as any).HALF_FLOAT_OES;
        }
    
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(
            gl.TEXTURE_2D,
            0,
            gl.RGBA,
            N,
            N,
            0,
            gl.RGBA,
            textureType,
            null
        );
    
        // Set texture parameters based on available filtering
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    
        const canUseLinear = (
            (floatTextureExt && textureType === gl.FLOAT) ||
            (halfFloatExt && textureType === (halfFloatExt as any).HALF_FLOAT_OES)
        );
    
        if (canUseLinear) {
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        } else {
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        }
    
        return texture;
    }

    function updateTexture(gl: WebGLRenderingContext, texture: WebGLTexture, data: Float32Array): void {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        
        // Create temporary RGBA data
        const rgbaData = new Float32Array(N * N * 4);
        for (let i = 0; i < N * N; i++) {
            rgbaData[i * 4] = data[i];      // R channel
            rgbaData[i * 4 + 1] = 0;        // G channel
            rgbaData[i * 4 + 2] = 0;        // B channel
            rgbaData[i * 4 + 3] = 1;        // A channel
        }
        
        gl.texSubImage2D(
            gl.TEXTURE_2D,
            0,
            0,
            0,
            N,
            N,
            gl.RGBA,
            gl.FLOAT as number,
            rgbaData
        );
    }

    // Optimized diffusion step
    function diffuse(x: Float32Array, x0: Float32Array, diff: number): void {
        const a = timeStep * diff * (N - 2) * (N - 2);
        const invDenom = 1 / (1 + 6 * a);
        
        for (let iter = 0; iter < iterations; iter++) {
            for (let i = 1; i < N - 1; i++) {
                for (let j = 1; j < N - 1; j++) {
                    const rowOffset = i * N;
                    const sliceOffset = j * N * N;
                    
                    for (let k = 1; k < N - 1; k++) {
                        const index = rowOffset + sliceOffset + k;
                        if (!hasActivity(i, j, k)) continue;
                        
                        x[index] = (x0[index] + a * (
                            x[index + 1] + x[index - 1] +
                            x[index + N] + x[index - N] +
                            x[index + N * N] + x[index - N * N]
                        )) * invDenom;
                    }
                }
            }
        }
    }

    // Optimized advection step
    function advect(
        d: Float32Array,
        d0: Float32Array,
        velocX: Float32Array,
        velocY: Float32Array,
        velocZ: Float32Array
    ): void {
        const dtx = timeStep * (N - 2);
        const dty = timeStep * (N - 2);
        const dtz = timeStep * (N - 2);

        for (let i = 1; i < N - 1; i++) {
            for (let j = 1; j < N - 1; j++) {
                for (let k = 1; k < N - 1; k++) {
                    if (!hasActivity(i, j, k)) continue;

                    const index = idx(i, j, k);
                    
                    let x = i - dtx * velocX[index];
                    let y = j - dty * velocY[index];
                    let z = k - dtz * velocZ[index];
                    
                    x = Math.max(0.5, Math.min(N - 1.5, x));
                    y = Math.max(0.5, Math.min(N - 1.5, y));
                    z = Math.max(0.5, Math.min(N - 1.5, z));
                    
                    const i0 = Math.floor(x);
                    const i1 = i0 + 1;
                    const j0 = Math.floor(y);
                    const j1 = j0 + 1;
                    const k0 = Math.floor(z);
                    const k1 = k0 + 1;
                    
                    const s1 = x - i0;
                    const s0 = 1 - s1;
                    const t1 = y - j0;
                    const t0 = 1 - t1;
                    const u1 = z - k0;
                    const u0 = 1 - u1;
                    
                    d[index] = 
                        s0 * (t0 * (u0 * d0[idx(i0,j0,k0)] + u1 * d0[idx(i0,j0,k1)]) +
                            t1 * (u0 * d0[idx(i0,j1,k0)] + u1 * d0[idx(i0,j1,k1)])) +
                        s1 * (t0 * (u0 * d0[idx(i1,j0,k0)] + u1 * d0[idx(i1,j0,k1)]) +
                            t1 * (u0 * d0[idx(i1,j1,k0)] + u1 * d0[idx(i1,j1,k1)]));
                }
            }
        }
    }

    // Optimized projection step
    function project(
        velocX: Float32Array,
        velocY: Float32Array,
        velocZ: Float32Array,
        tempArray: Float32Array
    ): void {
        const h = 1.0 / N;

        // Calculate divergence
        for (let i = 1; i < N - 1; i++) {
            for (let j = 1; j < N - 1; j++) {
                for (let k = 1; k < N - 1; k++) {
                    if (!hasActivity(i, j, k)) continue;

                    const index = idx(i, j, k);
                    tempArray[index] = -0.5 * h * (
                        velocX[idx(i+1,j,k)] - velocX[idx(i-1,j,k)] +
                        velocY[idx(i,j+1,k)] - velocY[idx(i,j-1,k)] +
                        velocZ[idx(i,j,k+1)] - velocZ[idx(i,j,k-1)]
                    );
                }
            }
        }

        // Solve pressure
        for (let iter = 0; iter < iterations; iter++) {
            for (let i = 1; i < N - 1; i++) {
                for (let j = 1; j < N - 1; j++) {
                    for (let k = 1; k < N - 1; k++) {
                        if (!hasActivity(i, j, k)) continue;

                        const index = idx(i, j, k);
                        tempArray[index] = (
                            tempArray[idx(i+1,j,k)] + tempArray[idx(i-1,j,k)] +
                            tempArray[idx(i,j+1,k)] + tempArray[idx(i,j-1,k)] +
                            tempArray[idx(i,j,k+1)] + tempArray[idx(i,j,k-1)]
                        ) / 6;
                    }
                }
            }
        }

        // Apply pressure gradient
        for (let i = 1; i < N - 1; i++) {
            for (let j = 1; j < N - 1; j++) {
                for (let k = 1; k < N - 1; k++) {
                    if (!hasActivity(i, j, k)) continue;

                    const index = idx(i, j, k);
                    velocX[index] -= 0.5 * (tempArray[idx(i+1,j,k)] - tempArray[idx(i-1,j,k)]) / h;
                    velocY[index] -= 0.5 * (tempArray[idx(i,j+1,k)] - tempArray[idx(i,j-1,k)]) / h;
                    velocZ[index] -= 0.5 * (tempArray[idx(i,j,k+1)] - tempArray[idx(i,j,k-1)]) / h;
                }
            }
        }
    }

    // Main simulation step with WebGL acceleration when available
    function updateSimulation(): void {
        if (useWebGL && gl && computeProgram) {
            updateSimulationWebGL();
        } else {
            updateSimulationCPU();
        }
    }

    function updateSimulationCPU(): void {
        const { current, next } = buffers;

        // Diffuse velocities
        diffuse(next.velocityX, current.velocityX, viscosity);
        diffuse(next.velocityY, current.velocityY, viscosity);
        diffuse(next.velocityZ, current.velocityZ, viscosity);
        
        // Project
        project(next.velocityX, next.velocityY, next.velocityZ, next.temp);
        
        // Advect
        advect(next.velocityX, current.velocityX, current.velocityX, current.velocityY, current.velocityZ);
        advect(next.velocityY, current.velocityY, current.velocityX, current.velocityY, current.velocityZ);
        advect(next.velocityZ, current.velocityZ, current.velocityX, current.velocityY, current.velocityZ);
        
        // Project again
        project(next.velocityX, next.velocityY, next.velocityZ, next.temp);
        
        // Density
        diffuse(next.density, current.density, diffusion);
        advect(next.density, current.density, current.velocityX, current.velocityY, current.velocityZ);

        // Swap buffers
        [buffers.current, buffers.next] = [buffers.next, buffers.current];

        // Update stores
        stores.density.set(buffers.current.density);
        stores.velocityX.set(buffers.current.velocityX);
        stores.velocityY.set(buffers.current.velocityY);
        stores.velocityZ.set(buffers.current.velocityZ);
    }

    function updateSimulationWebGL(): void {
        if (!gl || !computeProgram || !vertexBuffer || !densityTexture || !velocityTexture) return;

        gl.useProgram(computeProgram);

        // Update textures with current state
        updateTexture(gl, densityTexture, buffers.current.density);
        updateTexture(gl, velocityTexture, buffers.current.velocityX);

        // Set up vertex attributes
        const positionLoc = gl.getAttribLocation(computeProgram, 'position');
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.enableVertexAttribArray(positionLoc);
        gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

        // Update uniforms
        const uDeltaTime = gl.getUniformLocation(computeProgram, 'u_deltaTime');
        const uViscosity = gl.getUniformLocation(computeProgram, 'u_viscosity');
        gl.uniform1f(uDeltaTime, timeStep);
        gl.uniform1f(uViscosity, viscosity);

        // Draw
        gl.drawArrays(gl.TRIANGLES, 0, 6);

        // Read back results
        gl.readPixels(0, 0, N, N, gl.RGBA, gl.FLOAT, buffers.next.density);

        // Update stores
        stores.density.set(buffers.next.density);
    }

    // Initialize WebGL
    function initWebGL(): boolean {
        if (!useWebGL) return false;

        try {
            const canvas = document.createElement('canvas');
            gl = canvas.getContext('webgl', {
                alpha: true,
                depth: false,
                stencil: false,
                antialias: false,
                preserveDrawingBuffer: true
            }) as WebGLRenderingContext;
            
            if (!gl) {
                console.warn('WebGL not available, falling back to CPU implementation');
                return false;
            }

            // Check for required extensions
            const requiredExtensions = [
                'OES_texture_float',
                'OES_texture_float_linear',
                'OES_texture_half_float',
                'OES_texture_half_float_linear'
            ];

            const supportedExtensions = requiredExtensions.filter(ext => gl?.getExtension(ext));
            if (supportedExtensions.length === 0) {
                console.warn('No required WebGL extensions available');
                return false;
            }

            // Compile shaders
            const vertShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
            const fragShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);

            if (!vertShader || !fragShader) {
                throw new Error('Failed to compile shaders');
            }

            // Create and link program
            computeProgram = gl.createProgram();
            if (!computeProgram) throw new Error('Failed to create program');

            gl.attachShader(computeProgram, vertShader);
            gl.attachShader(computeProgram, fragShader);
            gl.linkProgram(computeProgram);

            if (!gl.getProgramParameter(computeProgram, gl.LINK_STATUS)) {
                const info = gl.getProgramInfoLog(computeProgram);
                throw new Error('Program link failed: ' + info);
            }

            // Create vertex buffer
            vertexBuffer = gl.createBuffer();
            const vertices = new Float32Array([
                -1, -1,  1, -1,  -1, 1,
                 1, -1,  -1,  1,   1, 1
            ]);
            gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

            // Set up textures
            densityTexture = createTexture(gl);
            velocityTexture = createTexture(gl);

            const framebuffer = gl.createFramebuffer();
            gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, densityTexture, 0);

            // Check framebuffer status
            const fbStatus = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
            if (fbStatus !== gl.FRAMEBUFFER_COMPLETE) {
                console.error('Framebuffer is not complete:', fbStatus);
                return false;
            }

            // Set up uniforms
            gl.useProgram(computeProgram);
            const uResolution = gl.getUniformLocation(computeProgram, 'u_resolution');
            gl.uniform2f(uResolution, N, N);

            // Clean up shaders
            gl.deleteShader(vertShader);
            gl.deleteShader(fragShader);

            return true;
        } catch (error) {
            console.error('WebGL initialization failed:', error);
            gl = null;
            computeProgram = null;
            return false;
        }
    }

    // Optimized force addition with spatial indexing
    function addForce(x: number, y: number, z: number, amount: number): void {
        const index = idx(x, y, z);
        buffers.current.density[index] += amount;
        
        // Update spatial index
        const cellX = Math.floor(x / cellSize);
        const cellY = Math.floor(y / cellSize);
        const cellZ = Math.floor(z / cellSize);
        const cellIndex = cellX + cellY * Math.floor(N / cellSize) + 
                         cellZ * Math.floor(N / cellSize) * Math.floor(N / cellSize);
        spatialIndex.add(cellIndex);

        stores.density.set(buffers.current.density);
    }

    // Optimized velocity addition
    function addVelocity(x: number, y: number, z: number, vx: number, vy: number, vz: number): void {
        const index = idx(x, y, z);
        
        buffers.current.velocityX[index] += vx;
        buffers.current.velocityY[index] += vy;
        buffers.current.velocityZ[index] += vz;
        
        // Update spatial index
        const cellIndex = Math.floor(x / cellSize) + 
                         Math.floor(y / cellSize) * Math.floor(N / cellSize) +
                         Math.floor(z / cellSize) * Math.floor(N / cellSize) * Math.floor(N / cellSize);
        spatialIndex.add(cellIndex);

        stores.velocityX.set(buffers.current.velocityX);
        stores.velocityY.set(buffers.current.velocityY);
        stores.velocityZ.set(buffers.current.velocityZ);
    }

    // Reset simulation state
    function reset(): void {
        // Clear spatial index
        spatialIndex.clear();

        // Reset both buffer pairs
        for (const key in buffers.current) {
            if (Object.prototype.hasOwnProperty.call(buffers.current, key)) {
                (buffers.current[key as keyof FluidState] as Float32Array).fill(0);
                (buffers.next[key as keyof FluidState] as Float32Array).fill(0);
            }
        }

        // Update all stores with zeroed arrays
        stores.density.set(buffers.current.density);
        stores.velocityX.set(buffers.current.velocityX);
        stores.velocityY.set(buffers.current.velocityY);
        stores.velocityZ.set(buffers.current.velocityZ);
        stores.temp.set(buffers.current.temp);

        // Reset WebGL state if needed
        if (gl && computeProgram) {
            gl.useProgram(computeProgram);
            if (densityTexture) updateTexture(gl, densityTexture, new Float32Array(N * N * 4));
            if (velocityTexture) updateTexture(gl, velocityTexture, new Float32Array(N * N * 4));
        }
    }

    // Initialize WebGL if enabled
    if (useWebGL) {
        initWebGL();
    }

    // Return public interface
    return {
        density: stores.density,
        velocityX: stores.velocityX,
        velocityY: stores.velocityY,
        velocityZ: stores.velocityZ,
        config: cfg,
        updateSimulation,
        addForce,
        addVelocity,
        reset
    };
}