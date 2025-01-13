import { writable, type Writable } from 'svelte/store';
import type { FluidState, SimulationConfig, FluidStore, BufferPair } from './types';

const DEFAULT_CONFIG: SimulationConfig = {
    gridSize: 64,          // N
    iterations: 20,        // More iterations for stability
    viscosity: 0.000001,   // Much lower viscosity for water-like behavior
    diffusion: 0.000001,   // Lower diffusion for sharper waves
    timeStep: 0.016,       // Stable timestep
    useWebGL: true,        // Enable WebGL acceleration
    useSpatialIndex: true, // Enable spatial indexing
    temperature: 0.25,     // Temperature buoyancy coefficient
    density: 0.0125,       // Density buoyancy coefficient
    gravity: -9.81,        // Gravity force
    vorticityStrength: 0.15 // Vorticity confinement strength
};

let time = 0;

// Enhanced WebGL shaders with caustics and wave patterns
const VERTEX_SHADER = `
    precision highp float;
    attribute vec4 position;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform vec2 texelSize;
    
    void main() {
        vUv = position.xy * 0.5 + 0.5;
        vL = vUv - vec2(texelSize.x, 0.0);
        vR = vUv + vec2(texelSize.x, 0.0);
        vT = vUv + vec2(0.0, texelSize.y);
        vB = vUv - vec2(0.0, texelSize.y);
        gl_Position = position;
    }
`;

const FRAGMENT_SHADER = `
    precision highp float;
    
    uniform sampler2D u_density;
    uniform sampler2D u_velocity;
    uniform sampler2D u_temperature;
    uniform vec2 u_resolution;
    uniform float u_deltaTime;
    uniform float u_viscosity;
    
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    
    void main() {
        vec4 L = texture2D(u_velocity, vL);
        vec4 R = texture2D(u_velocity, vR);
        vec4 T = texture2D(u_velocity, vT);
        vec4 B = texture2D(u_velocity, vB);
        vec4 C = texture2D(u_velocity, vUv);
        
        // Improved pressure solving
        float div = (R.x - L.x + T.y - B.y) * 0.5;
        
        // Temperature influence
        float temp = texture2D(u_temperature, vUv).r;
        float buoyancy = temp * 0.1;
        
        // Density with improved handling
        vec4 density = texture2D(u_density, vUv);
        vec4 result = C;
        
        // Apply buoyancy and mixing
        result.y += buoyancy * u_deltaTime;
        result += vec4(div, div, div, 1.0) * u_deltaTime;
        
        // Improved density mixing
        gl_FragColor = mix(density, result, u_viscosity * u_deltaTime);
    }
`;

// Caustics computation shader
const CAUSTICS_SHADER = `
    precision highp float;
    varying vec2 vUv;
    uniform sampler2D u_density;
    uniform float u_time;
    
    void main() {
        vec2 uv = vUv;
        float density = texture2D(u_density, uv).r;
        
        // Compute caustics pattern
        vec2 p = uv * 2.0 - 1.0;
        float angle = atan(p.y, p.x);
        float radius = length(p);
        
        float caustic = sin(angle * 8.0 + u_time + radius * 10.0) * 0.5 + 0.5;
        caustic *= smoothstep(1.0, 0.0, radius);
        
        gl_FragColor = vec4(vec3(caustic * density), 1.0);
    }
`;

export function useFluidSimulation(config: Partial<SimulationConfig> = {}) {
    const cfg = { ...DEFAULT_CONFIG, ...config };
    const {
        gridSize: N,
        iterations,
        viscosity,
        diffusion,
        timeStep,
        useWebGL,
        temperature,
        density: densityCoef,
        gravity,
        vorticityStrength
    } = cfg;

    // WebGL context and program setup
    let gl: WebGLRenderingContext | null = null;
    let computeProgram: WebGLProgram | null = null;
    let causticsProgram: WebGLProgram | null = null;
    let vertexBuffer: WebGLBuffer | null = null;
    let densityTexture: WebGLTexture | null = null;
    let velocityTexture: WebGLTexture | null = null;
    let temperatureTexture: WebGLTexture | null = null;
    let causticsTexture: WebGLTexture | null = null;

    // Enhanced buffer system with temperature and caustics
    const buffers: BufferPair = {
        current: {
            density: new Float32Array(N * N * N),
            velocityX: new Float32Array(N * N * N),
            velocityY: new Float32Array(N * N * N),
            velocityZ: new Float32Array(N * N * N),
            temp: new Float32Array(N * N * N),
            pressure: new Float32Array(N * N * N),
            temperature: new Float32Array(N * N * N)
        },
        next: {
            density: new Float32Array(N * N * N),
            velocityX: new Float32Array(N * N * N),
            velocityY: new Float32Array(N * N * N),
            velocityZ: new Float32Array(N * N * N),
            temp: new Float32Array(N * N * N),
            pressure: new Float32Array(N * N * N),
            temperature: new Float32Array(N * N * N)
        }
    };

    // Enhanced stores with temperature and caustics
    const stores: FluidStore = {
        density: writable(buffers.current.density),
        velocityX: writable(buffers.current.velocityX),
        velocityY: writable(buffers.current.velocityY),
        velocityZ: writable(buffers.current.velocityZ),
        temp: writable(buffers.current.temp),
        pressure: writable(buffers.current.pressure),
        temperature: writable(buffers.current.temperature)
    };

    // Optimized spatial indexing with octree-like structure
    const spatialIndex = new Set<number>();
    const cellSize = Math.max(1, Math.floor(N / 8));
    const cellCount = Math.ceil(N / cellSize);
    const activeRegions = new Uint8Array(cellCount * cellCount * cellCount);

    // Optimized index calculation with improved boundary handling
    const idx = (() => {
        const n2 = N * N;
        return (x: number, y: number, z: number): number => {
            const ix = Math.max(0, Math.min(N - 1, Math.floor(x)));
            const iy = Math.max(0, Math.min(N - 1, Math.floor(y)));
            const iz = Math.max(0, Math.min(N - 1, Math.floor(z)));
            return ix + iy * N + iz * n2;
        };
    })();

    // Enhanced boundary condition handling
    function applyBoundaryConditions(field: Float32Array, scale: number = 1): void {
        for (let i = 0; i < N; i++) {
            for (let j = 0; j < N; j++) {
                // Bottom and top boundaries with improved handling
                field[idx(i, 0, j)] = field[idx(i, 1, j)] * scale;
                field[idx(i, N-1, j)] = field[idx(i, N-2, j)] * scale;
                
                // Left and right boundaries with damping
                field[idx(0, i, j)] = field[idx(1, i, j)] * scale * 0.8;
                field[idx(N-1, i, j)] = field[idx(N-2, i, j)] * scale * 0.8;
                
                // Front and back boundaries with reflection
                field[idx(i, j, 0)] = field[idx(i, j, 1)] * scale * 0.9;
                field[idx(i, j, N-1)] = field[idx(i, j, N-2)] * scale * 0.9;
            }
        }
    }

    // Optimized diffusion with improved stability
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
                        
                        // Enhanced diffusion with temperature influence
                        const tempFactor = 1.0 + buffers.current.temperature[index] * 0.1;
                        x[index] = (x0[index] + a * tempFactor * (
                            x[index + 1] + x[index - 1] +
                            x[index + N] + x[index - N] +
                            x[index + N * N] + x[index - N * N]
                        )) * invDenom;
                    }
                }
            }
            applyBoundaryConditions(x);
        }
    }

    // Improved advection with MacCormack scheme and temperature coupling
    function advect(
        d: Float32Array,
        d0: Float32Array,
        velocX: Float32Array,
        velocY: Float32Array,
        velocZ: Float32Array,
        boundaryScale: number = 1
    ): void {
        const dtx = timeStep * (N - 2);
        const dty = timeStep * (N - 2);
        const dtz = timeStep * (N - 2);

        // Temporary arrays for MacCormack scheme
        const forward = new Float32Array(d.length);
        const backward = new Float32Array(d.length);

        // Forward pass
        for (let i = 1; i < N - 1; i++) {
            for (let j = 1; j < N - 1; j++) {
                for (let k = 1; k < N - 1; k++) {
                    if (!hasActivity(i, j, k)) continue;

                    const index = idx(i, j, k);
                    
                    // Temperature influence on advection
                    const tempFactor = 1.0 + buffers.current.temperature[index] * 0.05;
                    
                    let x = i - dtx * velocX[index] * tempFactor;
                    let y = j - dty * velocY[index] * tempFactor;
                    let z = k - dtz * velocZ[index] * tempFactor;
                    
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
                    
                    // Enhanced interpolation with temperature influence
                    forward[index] = 
                        s0 * (t0 * (u0 * d0[idx(i0,j0,k0)] + u1 * d0[idx(i0,j0,k1)]) +
                              t1 * (u0 * d0[idx(i0,j1,k0)] + u1 * d0[idx(i0,j1,k1)])) +
                        s1 * (t0 * (u0 * d0[idx(i1,j0,k0)] + u1 * d0[idx(i1,j0,k1)]) +
                              t1 * (u0 * d0[idx(i1,j1,k0)] + u1 * d0[idx(i1,j1,k1)]));
                }
            }
        }
        // Backward pass for MacCormack
        for (let i = 1; i < N - 1; i++) {
            for (let j = 1; j < N - 1; j++) {
                for (let k = 1; k < N - 1; k++) {
                    if (!hasActivity(i, j, k)) continue;

                    const index = idx(i, j, k);
                    
                    let x = i + dtx * velocX[index];
                    let y = j + dty * velocY[index];
                    let z = k + dtz * velocZ[index];
                    
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
                    
                    backward[index] = 
                        s0 * (t0 * (u0 * forward[idx(i0,j0,k0)] + u1 * forward[idx(i0,j0,k1)]) +
                              t1 * (u0 * forward[idx(i0,j1,k0)] + u1 * forward[idx(i0,j1,k1)])) +
                        s1 * (t0 * (u0 * forward[idx(i1,j0,k0)] + u1 * forward[idx(i1,j0,k1)]) +
                              t1 * (u0 * forward[idx(i1,j1,k0)] + u1 * forward[idx(i1,j1,k1)]));
                }
            }
        }

        // Final MacCormack step with limiting
        for (let i = 1; i < N - 1; i++) {
            for (let j = 1; j < N - 1; j++) {
                for (let k = 1; k < N - 1; k++) {
                    if (!hasActivity(i, j, k)) continue;

                    const index = idx(i, j, k);
                    
                    // MacCormack correction with limiting
                    const correction = (forward[index] - backward[index]) * 0.5;
                    d[index] = forward[index] + correction;
                    
                    // Ensure monotonicity
                    const maxVal = Math.max(
                        d0[idx(i-1,j,k)], d0[idx(i+1,j,k)],
                        d0[idx(i,j-1,k)], d0[idx(i,j+1,k)],
                        d0[idx(i,j,k-1)], d0[idx(i,j,k+1)]
                    );
                    const minVal = Math.min(
                        d0[idx(i-1,j,k)], d0[idx(i+1,j,k)],
                        d0[idx(i,j-1,k)], d0[idx(i,j+1,k)],
                        d0[idx(i,j,k-1)], d0[idx(i,j,k+1)]
                    );
                    d[index] = Math.max(minVal, Math.min(maxVal, d[index]));
                }
            }
        }

        applyBoundaryConditions(d, boundaryScale);
    }

    // Enhanced vorticity confinement
    function applyVorticityConfinement(
        velocX: Float32Array,
        velocY: Float32Array,
        velocZ: Float32Array,
        temp: Float32Array
    ): void {
        // Calculate curl and vorticity
        for (let i = 1; i < N - 1; i++) {
            for (let j = 1; j < N - 1; j++) {
                for (let k = 1; k < N - 1; k++) {
                    const index = idx(i, j, k);
                    if (!hasActivity(i, j, k)) continue;

                    const dwzdy = (velocZ[idx(i,j+1,k)] - velocZ[idx(i,j-1,k)]) * 0.5;
                    const dwydz = (velocY[idx(i,j,k+1)] - velocY[idx(i,j,k-1)]) * 0.5;
                    const dwxdz = (velocX[idx(i,j,k+1)] - velocX[idx(i,j,k-1)]) * 0.5;
                    const dwzdx = (velocZ[idx(i+1,j,k)] - velocZ[idx(i-1,j,k)]) * 0.5;
                    const dwydx = (velocY[idx(i+1,j,k)] - velocY[idx(i-1,j,k)]) * 0.5;
                    const dwxdy = (velocX[idx(i,j+1,k)] - velocX[idx(i,j-1,k)]) * 0.5;

                    // Store curl magnitude
                    temp[index] = Math.sqrt(
                        Math.pow(dwzdy - dwydz, 2) +
                        Math.pow(dwxdz - dwzdx, 2) +
                        Math.pow(dwydx - dwxdy, 2)
                    );
                }
            }
        }

        // Apply vorticity confinement force
        const epsilon = vorticityStrength;
        for (let i = 1; i < N - 1; i++) {
            for (let j = 1; j < N - 1; j++) {
                for (let k = 1; k < N - 1; k++) {
                    const index = idx(i, j, k);
                    if (!hasActivity(i, j, k)) continue;

                    // Calculate vorticity gradient
                    const dx = (temp[idx(i+1,j,k)] - temp[idx(i-1,j,k)]) * 0.5;
                    const dy = (temp[idx(i,j+1,k)] - temp[idx(i,j-1,k)]) * 0.5;
                    const dz = (temp[idx(i,j,k+1)] - temp[idx(i,j,k-1)]) * 0.5;

                    // Normalize with improved numerical stability
                    const length = Math.sqrt(dx * dx + dy * dy + dz * dz) + 1e-5;
                    const nx = dx / length;
                    const ny = dy / length;
                    const nz = dz / length;

                    // Apply temperature-modulated force
                    const tempFactor = 1.0 + buffers.current.temperature[index] * 0.2;
                    const strength = epsilon * temp[index] * timeStep * tempFactor;
                    
                    velocX[index] += strength * nx;
                    velocY[index] += strength * ny;
                    velocZ[index] += strength * nz;
                }
            }
        }
    }

    // Enhanced buoyancy calculation
    function applyBuoyancy(velocY: Float32Array, temp: Float32Array, dens: Float32Array): void {
        for (let i = 1; i < N - 1; i++) {
            for (let j = 1; j < N - 1; j++) {
                for (let k = 1; k < N - 1; k++) {
                    const index = idx(i, j, k);
                    if (!hasActivity(i, j, k)) continue;

                    const buoyancy = (temp[index] * temperature - dens[index] * densityCoef);
                    velocY[index] += (buoyancy + gravity * dens[index]) * timeStep;
                }
            }
        }
    }

    // Improved pressure solver
    function solvePressure(
        velocX: Float32Array,
        velocY: Float32Array,
        velocZ: Float32Array,
        pressure: Float32Array,
        div: Float32Array
    ): void {
        const h = 1.0 / N;
        const omega = 1.9; // Over-relaxation factor for faster convergence

        // Calculate divergence with temperature influence
        for (let i = 1; i < N - 1; i++) {
            for (let j = 1; j < N - 1; j++) {
                for (let k = 1; k < N - 1; k++) {
                    const index = idx(i, j, k);
                    if (!hasActivity(i, j, k)) continue;

                    const tempFactor = 1.0 + buffers.current.temperature[index] * 0.1;
                    div[index] = -0.5 * h * tempFactor * (
                        velocX[idx(i+1,j,k)] - velocX[idx(i-1,j,k)] +
                        velocY[idx(i,j+1,k)] - velocY[idx(i,j-1,k)] +
                        velocZ[idx(i,j,k+1)] - velocZ[idx(i,j,k-1)]
                    );
                    pressure[index] = 0;
                }
            }
        }

        // Solve pressure using SOR
        for (let iter = 0; iter < iterations; iter++) {
            let maxDiff = 0;
            for (let i = 1; i < N - 1; i++) {
                for (let j = 1; j < N - 1; j++) {
                    for (let k = 1; k < N - 1; k++) {
                        const index = idx(i, j, k);
                        if (!hasActivity(i, j, k)) continue;

                        const oldP = pressure[index];
                        const newP = (
                            pressure[idx(i+1,j,k)] +
                            pressure[idx(i-1,j,k)] +
                            pressure[idx(i,j+1,k)] +
                            pressure[idx(i,j-1,k)] +
                            pressure[idx(i,j,k+1)] +
                            pressure[idx(i,j,k-1)] -
                            div[index]
                        ) / 6;

                        pressure[index] = oldP * (1 - omega) + newP * omega;
                        maxDiff = Math.max(maxDiff, Math.abs(pressure[index] - oldP));
                    }
                }
            }
            applyBoundaryConditions(pressure, -1);

            // Early convergence check
            if (maxDiff < 1e-4) break;
        }

        // Apply pressure gradient with temperature influence
        for (let i = 1; i < N - 1; i++) {
            for (let j = 1; j < N - 1; j++) {
                for (let k = 1; k < N - 1; k++) {
                    const index = idx(i, j, k);
                    if (!hasActivity(i, j, k)) continue;

                    const tempFactor = 1.0 + buffers.current.temperature[index] * 0.1;
                    velocX[index] -= 0.5 * (pressure[idx(i+1,j,k)] - pressure[idx(i-1,j,k)]) / h * tempFactor;
                    velocY[index] -= 0.5 * (pressure[idx(i,j+1,k)] - pressure[idx(i,j-1,k)]) / h * tempFactor;
                    velocZ[index] -= 0.5 * (pressure[idx(i,j,k+1)] - pressure[idx(i,j,k-1)]) / h * tempFactor;
                }
            }
        }
    }

    // Efficient activity checking with octree optimization
    function hasActivity(x: number, y: number, z: number): boolean {
        const cx = Math.floor(x / cellSize);
        const cy = Math.floor(y / cellSize);
        const cz = Math.floor(z / cellSize);
        return activeRegions[cx + cy * cellCount + cz * cellCount * cellCount] > 0;
    }

    // Update active regions with temporal coherence
    function updateActiveRegions(): void {
        const oldRegions = new Uint8Array(activeRegions);
        activeRegions.fill(0);
        
        for (const index of spatialIndex) {
            const x = Math.floor(index % N / cellSize);
            const y = Math.floor((index / N) % N / cellSize);
            const z = Math.floor(index / (N * N) / cellSize);
            
            // Mark current cell and neighbors as active
            for (let dx = -1; dx <= 1; dx++) {
                for (let dy = -1; dy <= 1; dy++) {
                    for (let dz = -1; dz <= 1; dz++) {
                        const nx = x + dx;
                        const ny = y + dy;
                        const nz = z + dz;
                        if (nx >= 0 && nx < cellCount &&
                            ny >= 0 && ny < cellCount &&
                            nz >= 0 && nz < cellCount) {
                            activeRegions[nx + ny * cellCount + nz * cellCount * cellCount] = 1;
                        }
                    }
                }
            }
        }

        // Add temporal coherence - keep previously active regions partially active
        for (let i = 0; i < activeRegions.length; i++) {
            if (oldRegions[i] && !activeRegions[i]) {
                activeRegions[i] = 0.5; // Keep region partially active for smoother transitions
            }
        }
    }

    // Enhanced WebGL initialization
    function initWebGL(): boolean {
        if (!useWebGL) return false;

        try {
            const canvas = document.createElement('canvas');
            gl = canvas.getContext('webgl', {
                alpha: true,
                depth: false,
                stencil: false,
                antialias: false,
                preserveDrawingBuffer: true,
                powerPreference: 'high-performance'
            }) as WebGLRenderingContext;
            
            if (!gl) {
                console.warn('WebGL not available, falling back to CPU implementation');
                return false;
            }

            // Check for all required extensions
            const requiredExtensions = [
                'OES_texture_float',
                'OES_texture_float_linear',
                'OES_standard_derivatives',
                'WEBGL_draw_buffers'
            ];

            const extensions = requiredExtensions.map(name => {
                const ext = gl?.getExtension(name);
                if (!ext) console.warn(`Extension ${name} not available`);
                return ext;
            });

            if (extensions.some(ext => !ext)) {
                console.warn('Some required WebGL extensions not available');
                return false;
            }

            // Setup programs
            setupShaderPrograms();
            setupBuffers();
            setupTextures();

            return true;
        } catch (error) {
            console.error('WebGL initialization failed:', error);
            gl = null;
            computeProgram = null;
            return false;
        }
    }

    function compileShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
        const shader = gl.createShader(type);
        if (!shader) return null;
    
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
    
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error('Shader compile error:', gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
    
        return shader;
    }
    
    function createTexture(gl: WebGLRenderingContext): WebGLTexture {
        const texture = gl.createTexture();
        if (!texture) {
            throw new Error('Failed to create texture');
        }
    
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    
        return texture;
    }

    // Enhanced shader program setup
    function setupShaderPrograms(): void {
        if (!gl) return;

        // Main compute program
        const vertShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
        const fragShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
        
        if (!vertShader || !fragShader) {
            throw new Error('Failed to compile main shaders');
        }

        computeProgram = createProgram(gl, vertShader, fragShader);

        // Caustics program
        const causticsFragShader = compileShader(gl, gl.FRAGMENT_SHADER, CAUSTICS_SHADER);
        if (!causticsFragShader) {
            throw new Error('Failed to compile caustics shader');
        }

        causticsProgram = createProgram(gl, vertShader, causticsFragShader);

        // Clean up
        gl.deleteShader(vertShader);
        gl.deleteShader(fragShader);
        gl.deleteShader(causticsFragShader);
    }

    // Enhanced buffer setup
    function setupBuffers(): void {
        if (!gl) return;

        vertexBuffer = gl.createBuffer();
        const vertices = new Float32Array([
            -1, -1,  1, -1,  -1, 1,
             1, -1,  -1,  1,   1, 1
        ]);
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    }

    // Enhanced texture setup
    function setupTextures(): void {
        if (!gl) return;

        const textures = [
            { texture: densityTexture = createTexture(gl), name: 'density' },
            { texture: velocityTexture = createTexture(gl), name: 'velocity' },
            { texture: temperatureTexture = createTexture(gl), name: 'temperature' },
            { texture: causticsTexture = createTexture(gl), name: 'caustics' }
        ];

        // Setup framebuffer for each texture
        textures.forEach(({ texture, name }) => {
            if(!gl) return;
            const framebuffer = gl.createFramebuffer();
            gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);

            const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
            if (status !== gl.FRAMEBUFFER_COMPLETE) {
                throw new Error(`Framebuffer not complete for ${name}: ${status}`);
            }
        });
    }

    // Enhanced WebGL helpers
    function createProgram(gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram {
        const program = gl.createProgram();
        if (!program) throw new Error('Failed to create shader program');

        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            const info = gl.getProgramInfoLog(program);
            throw new Error('Failed to link program: ' + info);
        }

        return program;
    }

    function updateTexture(gl: WebGLRenderingContext, texture: WebGLTexture, data: Float32Array): void {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        
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

    // Enhanced force and velocity addition
    function addForce(x: number, y: number, z: number, amount: number): void {
        const radius = 2.5;
        const falloffFactor = 2.0;
        
        // Apply force with improved distribution
        for (let i = -Math.ceil(radius); i <= Math.ceil(radius); i++) {
            for (let j = -Math.ceil(radius); j <= Math.ceil(radius); j++) {
                for (let k = -Math.ceil(radius); k <= Math.ceil(radius); k++) {
                    const dist = Math.sqrt(i*i + j*j + k*k);
                    if (dist > radius) continue;
                    
                    const falloff = Math.exp(-falloffFactor * (dist / radius));
                    const forceAmount = amount * falloff;
                    
                    const index = idx(x + i, y + j, z + k);
                    buffers.current.density[index] += forceAmount;
                    buffers.current.temperature[index] += forceAmount * temperature;

                    // Enhanced buoyancy and swirl
                    const swirl = 0.15 * Math.exp(-dist);
                    buffers.current.velocityY[index] += forceAmount * 0.2; // Buoyancy
                    buffers.current.velocityX[index] += -j * swirl; // Rotational component
                    buffers.current.velocityZ[index] += i * swirl;
                }
            }
        }

        // Update spatial indices efficiently
        const cx = Math.floor(x / cellSize);
        const cy = Math.floor(y / cellSize);
        const cz = Math.floor(z / cellSize);
        
        for (let i = -2; i <= 2; i++) {
            for (let j = -2; j <= 2; j++) {
                for (let k = -2; k <= 2; k++) {
                    const index = (cx + i) + 
                                (cy + j) * cellCount + 
                                (cz + k) * cellCount * cellCount;
                    if (index >= 0 && index < activeRegions.length) {
                        activeRegions[index] = 1;
                    }
                }
            }
        }

        // Update stores
        stores.density.set(buffers.current.density);
        stores.temperature.set(buffers.current.temperature);
        stores.velocityX.set(buffers.current.velocityX);
        stores.velocityY.set(buffers.current.velocityY);
        stores.velocityZ.set(buffers.current.velocityZ);
    }

    // Enhanced velocity addition with improved dynamics
    function addVelocity(x: number, y: number, z: number, vx: number, vy: number, vz: number): void {
        const radius = 3.0;
        const turbulenceScale = 0.3;
        const swirlStrength = 0.15;
        
        for (let i = -Math.ceil(radius); i <= Math.ceil(radius); i++) {
            for (let j = -Math.ceil(radius); j <= Math.ceil(radius); j++) {
                for (let k = -Math.ceil(radius); k <= Math.ceil(radius); k++) {
                    const dist = Math.sqrt(i*i + j*j + k*k);
                    if (dist > radius) continue;
                    
                    // Enhanced turbulence
                    const angle = Math.atan2(j, i) + dist * turbulenceScale;
                    const turbX = Math.cos(angle) * turbulenceScale;
                    const turbZ = Math.sin(angle) * turbulenceScale;
                    
                    // Improved swirl
                    const swirl = Math.exp(-dist/radius) * swirlStrength;
                    const swirlX = -j * swirl;
                    const swirlZ = i * swirl;
                    
                    const index = idx(x + i, y + j, z + k);
                    
                    // Temperature influence on velocity
                    const tempFactor = 1.0 + buffers.current.temperature[index] * 0.1;
                    
                    // Combine velocities with improved dynamics
                    buffers.current.velocityX[index] += (vx + turbX + swirlX) * tempFactor;
                    buffers.current.velocityY[index] += vy * tempFactor;
                    buffers.current.velocityZ[index] += (vz + turbZ + swirlZ) * tempFactor;
                    
                    // Add temperature variation
                    buffers.current.temperature[index] += Math.abs(vx + vy + vz) * 0.01;
                }
            }
        }

        // Update spatial indexing
        const cx = Math.floor(x / cellSize);
        const cy = Math.floor(y / cellSize);
        const cz = Math.floor(z / cellSize);
        
        for (let i = -3; i <= 3; i++) {
            for (let j = -3; j <= 3; j++) {
                for (let k = -3; k <= 3; k++) {
                    const index = (cx + i) + 
                                (cy + j) * cellCount + 
                                (cz + k) * cellCount * cellCount;
                    if (index >= 0 && index < activeRegions.length) {
                        activeRegions[index] = 1;
                    }
                }
            }
        }

        // Update stores
        stores.velocityX.set(buffers.current.velocityX);
        stores.velocityY.set(buffers.current.velocityY);
        stores.velocityZ.set(buffers.current.velocityZ);
        stores.temperature.set(buffers.current.temperature);
    }

    // Main simulation update
    function updateSimulation(): void {
        if (useWebGL && gl && computeProgram && causticsProgram) {
            updateSimulationWebGL();
        } else {
            updateSimulationCPU();
        }
        updateActiveRegions();
    }

    // Enhanced CPU simulation update
    function updateSimulationCPU(): void {
        const { current, next } = buffers;

        // Temperature step
        diffuse(next.temperature, current.temperature, diffusion);
        advect(next.temperature, current.temperature, current.velocityX, current.velocityY, current.velocityZ);

        // Velocity step with improved dynamics
        diffuse(next.velocityX, current.velocityX, viscosity);
        diffuse(next.velocityY, current.velocityY, viscosity);
        diffuse(next.velocityZ, current.velocityZ, viscosity);

        // Pressure and vorticity
        solvePressure(next.velocityX, next.velocityY, next.velocityZ, next.pressure, next.temp);
        applyVorticityConfinement(next.velocityX, next.velocityY, next.velocityZ, next.temp);
        applyBuoyancy(next.velocityY, next.temperature, next.density);

        // Advanced advection
        advect(next.velocityX, current.velocityX, current.velocityX, current.velocityY, current.velocityZ, -1);
        advect(next.velocityY, current.velocityY, current.velocityX, current.velocityY, current.velocityZ, -1);
        advect(next.velocityZ, current.velocityZ, current.velocityX, current.velocityY, current.velocityZ, -1);

        // Final pressure solve
        solvePressure(next.velocityX, next.velocityY, next.velocityZ, next.pressure, next.temp);

        // Density advection with caustics
        diffuse(next.density, current.density, diffusion);
        advect(next.density, current.density, next.velocityX, next.velocityY, next.velocityZ);

        // Swap buffers and update stores
        [buffers.current, buffers.next] = [buffers.next, buffers.current];

        // Update all stores
        for (const key in stores) {
            if (Object.prototype.hasOwnProperty.call(stores, key)) {
                (stores[key as keyof FluidStore] as Writable<Float32Array>)
                    .set(buffers.current[key as keyof FluidState]);
            }
        }
    }

    // Enhanced WebGL simulation update
    function updateSimulationWebGL(): void {
        if (!gl || !computeProgram || !causticsProgram) return;

        // Update textures
        updateTexture(gl, densityTexture!, buffers.current.density);
        updateTexture(gl, velocityTexture!, buffers.current.velocityX);
        updateTexture(gl, temperatureTexture!, buffers.current.temperature);

        // Main simulation step
        gl.useProgram(computeProgram);
        gl.viewport(0, 0, N, N);

        // Set uniforms
        const uniforms = {
            u_deltaTime: timeStep,
            u_viscosity: viscosity,
            u_resolution: [N, N],
            u_density: 0,
            u_velocity: 1,
            u_temperature: 2
        };

        for (const [name, value] of Object.entries(uniforms)) {
            const location = gl.getUniformLocation(computeProgram, name);
            if (typeof value === 'number') {
                gl.uniform1i(location, value);
            } else {
                gl.uniform2f(location, value[0], value[1]);
            }
        }

        // Render simulation step
        gl.drawArrays(gl.TRIANGLES, 0, 6);

        // Caustics pass
        gl.useProgram(causticsProgram);
        gl.uniform1f(gl.getUniformLocation(causticsProgram, 'u_time'), time);
        gl.drawArrays(gl.TRIANGLES, 0, 6);

        // Read back results
        gl.readPixels(0, 0, N, N, gl.RGBA, gl.FLOAT, buffers.next.density);

        // Update stores
        stores.density.set(buffers.next.density);
    }

    // Reset simulation
    function reset(): void {
        // Clear all buffers
        for (const key in buffers.current) {
            if (Object.prototype.hasOwnProperty.call(buffers.current, key)) {
                (buffers.current[key as keyof FluidState] as Float32Array).fill(0);
                (buffers.next[key as keyof FluidState] as Float32Array).fill(0);
            }
        }

        // Reset spatial indexing
        spatialIndex.clear();
        activeRegions.fill(0);

        // Update all stores
        for (const key in stores) {
            if (Object.prototype.hasOwnProperty.call(stores, key)) {
                (stores[key as keyof FluidStore] as Writable<Float32Array>)
                    .set(buffers.current[key as keyof FluidState]);
            }
        }

        // Reset WebGL state
        if (gl && computeProgram) {
            const textures = [densityTexture, velocityTexture, temperatureTexture, causticsTexture];
            gl.useProgram(computeProgram);
            textures.forEach(texture => {
                if (texture) {
                    if(!gl) return;
                    updateTexture(gl, texture, new Float32Array(N * N * 4));
                }
            });
        }
    }

    // Initialize WebGL if enabled
    if (useWebGL) {
        initWebGL();
    }

    // Return enhanced public interface
    return {
        density: stores.density,
        velocityX: stores.velocityX,
        velocityY: stores.velocityY,
        velocityZ: stores.velocityZ,
        temperature: stores.temperature,
        pressure: stores.pressure,
        config: cfg,
        updateSimulation,
        addForce,
        addVelocity,
        reset
    };
}