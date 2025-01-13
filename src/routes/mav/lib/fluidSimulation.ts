import { writable, type Writable } from 'svelte/store';
import type { FluidState, SimulationConfig, FluidStore, BufferPair } from './types';

const DEFAULT_CONFIG: SimulationConfig = {
	gridSize: 256, // Increased for better detail
	iterations: 16, // From water.js optimal value
	viscosity: 0.000001, // Keep your lower viscosity for water behavior
	diffusion: 0.000001, // Keep lower diffusion for sharper waves
	timeStep: 0.016, // Stable timestep from water.js
	useWebGL: true,
	useSpatialIndex: true,
	temperature: 0.25,
	density: 0.0125,
	gravity: -9.81,
	vorticityStrength: 0.15
};

let time = 0;

// Enhanced shaders from water.js with your improvements
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
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uTexture;
    uniform float uDeltaTime;
    uniform vec2 texelSize;
    
    void main() {
        vec4 L = texture2D(uTexture, vL);
        vec4 R = texture2D(uTexture, vR);
        vec4 T = texture2D(uTexture, vT);
        vec4 B = texture2D(uTexture, vB);
        vec4 C = texture2D(uTexture, vUv);

        // Combine the water simulation logic from water.js
        float div = (R.x - L.x + T.y - B.y) * 0.5;
        
        // Height field computation
        float height = texture2D(uTexture, vUv).r;
        float dx = texture2D(uTexture, vR).r - texture2D(uTexture, vL).r;
        float dy = texture2D(uTexture, vT).r - texture2D(uTexture, vB).r;
        
        // Enhanced wave propagation
        vec2 velocity = C.gb;
        float newHeight = height + (-dx * velocity.x - dy * velocity.y) * uDeltaTime;
        
        // Add atmospheric pressure term from water.js
        float pressure = (L.x + R.x + T.x + B.x - 4.0 * C.x) * 0.25;
        
        // Combine with your temperature influence
        float tempInfluence = texture2D(uTexture, vUv).a;
        newHeight += pressure * (1.0 + tempInfluence * 0.1);
        
        gl_FragColor = vec4(newHeight, div, velocity);
    }
`;

// Enhanced normal mapping shader from water.js
const NORMAL_SHADER = `
    precision highp float;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uTexture;
    uniform vec2 texelSize;

    void main() {
        vec4 center = texture2D(uTexture, vUv);
        vec4 left = texture2D(uTexture, vL);
        vec4 right = texture2D(uTexture, vR);
        vec4 top = texture2D(uTexture, vT);
        vec4 bottom = texture2D(uTexture, vB);
        
        vec3 dx = vec3(texelSize.x * 2.0, right.r - left.r, 0.0);
        vec3 dy = vec3(0.0, top.r - bottom.r, texelSize.y * 2.0);
        vec3 normal = normalize(cross(dy, dx));
        
        gl_FragColor = vec4(normal * 0.5 + 0.5, 1.0);
    }
`;

// Enhanced spherical caustics shader from water.js
const CAUSTICS_SHADER = `
    precision highp float;
    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform float uTime;
    
    void main() {
        vec3 normal = texture2D(uTexture, vUv).xyz * 2.0 - 1.0;
        vec3 light = normalize(vec3(0.0, 1.0, 0.0));
        float caustic = pow(max(0.0, dot(normal, light)), 4.0);
        
        // Add ripple effect
        vec2 p = vUv * 2.0 - 1.0;
        float dist = length(p);
        caustic *= smoothstep(1.0, 0.0, dist);
        caustic *= 1.0 + 0.2 * sin(dist * 20.0 - uTime);
        
        gl_FragColor = vec4(vec3(caustic), 1.0);
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

	// WebGL context and shader programs setup
	let gl: WebGLRenderingContext | null = null;
	let computeProgram: WebGLProgram | null = null;
	let normalProgram: WebGLProgram | null = null;
	let causticsProgram: WebGLProgram | null = null;
	let vertexBuffer: WebGLBuffer | null = null;
	let densityTexture: WebGLTexture | null = null;
	let velocityTexture: WebGLTexture | null = null;
	let temperatureTexture: WebGLTexture | null = null;
	let normalTexture: WebGLTexture | null = null;
	let causticsTexture: WebGLTexture | null = null;

	// Enhanced buffer system from both implementations
	const buffers: BufferPair = {
		current: {
			density: new Float32Array(N * N * N),
			velocityX: new Float32Array(N * N * N),
			velocityY: new Float32Array(N * N * N),
			velocityZ: new Float32Array(N * N * N),
			temp: new Float32Array(N * N * N),
			pressure: new Float32Array(N * N * N),
			temperature: new Float32Array(N * N * N),
			normal: new Float32Array(N * N * N * 3), // Added from water.js
			caustics: new Float32Array(N * N * N) // Added from water.js
		},
		next: {
			density: new Float32Array(N * N * N),
			velocityX: new Float32Array(N * N * N),
			velocityY: new Float32Array(N * N * N),
			velocityZ: new Float32Array(N * N * N),
			temp: new Float32Array(N * N * N),
			pressure: new Float32Array(N * N * N),
			temperature: new Float32Array(N * N * N),
			normal: new Float32Array(N * N * N * 3),
			caustics: new Float32Array(N * N * N)
		}
	};

	// Stores setup
	const stores: FluidStore = {
		density: writable(buffers.current.density),
		velocityX: writable(buffers.current.velocityX),
		velocityY: writable(buffers.current.velocityY),
		velocityZ: writable(buffers.current.velocityZ),
		temp: writable(buffers.current.temp),
		pressure: writable(buffers.current.pressure),
		temperature: writable(buffers.current.temperature),
        normal: writable(buffers.current.normal),
        caustics: writable(buffers.current.caustics)
	};

	// Spatial indexing setup
	const cellSize = Math.max(1, Math.floor(N / 8));
	const cellCount = Math.ceil(N / cellSize);
	const activeRegions = new Uint8Array(cellCount * cellCount * cellCount);
	const spatialIndex = new Set<number>();

	// Enhanced index calculation with boundary handling from water.js
	const idx = (x: number, y: number, z: number): number => {
		x = Math.max(0, Math.min(N - 1, Math.floor(x)));
		y = Math.max(0, Math.min(N - 1, Math.floor(y)));
		z = Math.max(0, Math.min(N - 1, Math.floor(z)));
		return x + y * N + z * N * N;
	};

	// Enhanced boundary conditions from water.js
	function applyBoundaryConditions(field: Float32Array, scale: number = 1): void {
		for (let i = 0; i < N; i++) {
			for (let j = 0; j < N; j++) {
				// Bottom and top boundaries
				field[idx(i, 0, j)] = field[idx(i, 1, j)] * scale;
				field[idx(i, N - 1, j)] = field[idx(i, N - 2, j)] * scale;

				// Left and right boundaries with damping
				field[idx(0, i, j)] = field[idx(1, i, j)] * scale * 0.8;
				field[idx(N - 1, i, j)] = field[idx(N - 2, i, j)] * scale * 0.8;

				// Front and back boundaries with reflection
				field[idx(i, j, 0)] = field[idx(i, j, 1)] * scale * 0.9;
				field[idx(i, j, N - 1)] = field[idx(i, j, N - 2)] * scale * 0.9;
			}
		}
	}

	// Enhanced diffusion solver combining both implementations
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
						x[index] =
							(x0[index] +
								a *
									tempFactor *
									(x[index + 1] +
										x[index - 1] +
										x[index + N] +
										x[index - N] +
										x[index + N * N] +
										x[index - N * N])) *
							invDenom;
					}
				}
			}
			applyBoundaryConditions(x);
		}
	}

	// Enhanced advection combining both implementations
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

		// MacCormack scheme buffers from water.js
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

					// Improved boundary handling from water.js
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

					forward[index] =
						s0 *
							(t0 * (u0 * d0[idx(i0, j0, k0)] + u1 * d0[idx(i0, j0, k1)]) +
								t1 * (u0 * d0[idx(i0, j1, k0)] + u1 * d0[idx(i0, j1, k1)])) +
						s1 *
							(t0 * (u0 * d0[idx(i1, j0, k0)] + u1 * d0[idx(i1, j0, k1)]) +
								t1 * (u0 * d0[idx(i1, j1, k0)] + u1 * d0[idx(i1, j1, k1)]));
				}
			}
		}

		// Backward pass from water.js for enhanced accuracy
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
						s0 *
							(t0 * (u0 * forward[idx(i0, j0, k0)] + u1 * forward[idx(i0, j0, k1)]) +
								t1 * (u0 * forward[idx(i0, j1, k0)] + u1 * forward[idx(i0, j1, k1)])) +
						s1 *
							(t0 * (u0 * forward[idx(i1, j0, k0)] + u1 * forward[idx(i1, j0, k1)]) +
								t1 * (u0 * forward[idx(i1, j1, k0)] + u1 * forward[idx(i1, j1, k1)]));
				}
			}
		}

		// Final MacCormack step with limiting from water.js
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
						d0[idx(i - 1, j, k)],
						d0[idx(i + 1, j, k)],
						d0[idx(i, j - 1, k)],
						d0[idx(i, j + 1, k)],
						d0[idx(i, j, k - 1)],
						d0[idx(i, j, k + 1)]
					);
					const minVal = Math.min(
						d0[idx(i - 1, j, k)],
						d0[idx(i + 1, j, k)],
						d0[idx(i, j - 1, k)],
						d0[idx(i, j + 1, k)],
						d0[idx(i, j, k - 1)],
						d0[idx(i, j, k + 1)]
					);
					d[index] = Math.max(minVal, Math.min(maxVal, d[index]));
				}
			}
		}

		applyBoundaryConditions(d, boundaryScale);
	}

	// Enhanced vorticity confinement from water.js
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

					const dwzdy = (velocZ[idx(i, j + 1, k)] - velocZ[idx(i, j - 1, k)]) * 0.5;
					const dwydz = (velocY[idx(i, j, k + 1)] - velocY[idx(i, j, k - 1)]) * 0.5;
					const dwxdz = (velocX[idx(i, j, k + 1)] - velocX[idx(i, j, k - 1)]) * 0.5;
					const dwzdx = (velocZ[idx(i + 1, j, k)] - velocZ[idx(i - 1, j, k)]) * 0.5;
					const dwydx = (velocY[idx(i + 1, j, k)] - velocY[idx(i - 1, j, k)]) * 0.5;
					const dwxdy = (velocX[idx(i, j + 1, k)] - velocX[idx(i, j - 1, k)]) * 0.5;

					temp[index] = Math.sqrt(
						Math.pow(dwzdy - dwydz, 2) + Math.pow(dwxdz - dwzdx, 2) + Math.pow(dwydx - dwxdy, 2)
					);
				}
			}
		}

		// Apply vorticity confinement force with temperature influence
		const epsilon = vorticityStrength;
		for (let i = 1; i < N - 1; i++) {
			for (let j = 1; j < N - 1; j++) {
				for (let k = 1; k < N - 1; k++) {
					const index = idx(i, j, k);
					if (!hasActivity(i, j, k)) continue;

					const dx = (temp[idx(i + 1, j, k)] - temp[idx(i - 1, j, k)]) * 0.5;
					const dy = (temp[idx(i, j + 1, k)] - temp[idx(i, j - 1, k)]) * 0.5;
					const dz = (temp[idx(i, j, k + 1)] - temp[idx(i, j, k - 1)]) * 0.5;

					const length = Math.sqrt(dx * dx + dy * dy + dz * dz) + 1e-5;
					const nx = dx / length;
					const ny = dy / length;
					const nz = dz / length;

					const tempFactor = 1.0 + buffers.current.temperature[index] * 0.2;
					const strength = epsilon * temp[index] * timeStep * tempFactor;

					velocX[index] += strength * nx;
					velocY[index] += strength * ny;
					velocZ[index] += strength * nz;
				}
			}
		}
	}

	// Enhanced buoyancy calculation with water.js wave dynamics
	function applyBuoyancy(velocY: Float32Array, temp: Float32Array, dens: Float32Array): void {
		for (let i = 1; i < N - 1; i++) {
			for (let j = 1; j < N - 1; j++) {
				for (let k = 1; k < N - 1; k++) {
					const index = idx(i, j, k);
					if (!hasActivity(i, j, k)) continue;

					const buoyancy = temp[index] * temperature - dens[index] * densityCoef;
					velocY[index] += (buoyancy + gravity * dens[index]) * timeStep;

					// Add wave dynamics from water.js
					const height = buffers.current.pressure[index];
					const targetHeight = buffers.current.density[index];
					const delta = (targetHeight - height) * 0.1;
					buffers.next.pressure[index] = height + delta;
				}
			}
		}
	}

	// Enhanced pressure solver combining both implementations
	function solvePressure(
		velocX: Float32Array,
		velocY: Float32Array,
		velocZ: Float32Array,
		pressure: Float32Array,
		div: Float32Array
	): void {
		const h = 1.0 / N;
		// Over-relaxation for faster convergence from water.js
		const omega = 1.9;

		// Calculate divergence with temperature influence
		for (let i = 1; i < N - 1; i++) {
			for (let j = 1; j < N - 1; j++) {
				for (let k = 1; k < N - 1; k++) {
					const index = idx(i, j, k);
					if (!hasActivity(i, j, k)) continue;

					const tempFactor = 1.0 + buffers.current.temperature[index] * 0.1;
					div[index] =
						-0.5 *
						h *
						tempFactor *
						(velocX[idx(i + 1, j, k)] -
							velocX[idx(i - 1, j, k)] +
							velocY[idx(i, j + 1, k)] -
							velocY[idx(i, j - 1, k)] +
							velocZ[idx(i, j, k + 1)] -
							velocZ[idx(i, j, k - 1)]);
					pressure[index] = 0;
				}
			}
		}

		// Solve pressure using SOR with water.js optimizations
		for (let iter = 0; iter < iterations; iter++) {
			let maxDiff = 0;
			for (let i = 1; i < N - 1; i++) {
				for (let j = 1; j < N - 1; j++) {
					for (let k = 1; k < N - 1; k++) {
						const index = idx(i, j, k);
						if (!hasActivity(i, j, k)) continue;

						const oldP = pressure[index];
						const newP =
							(pressure[idx(i + 1, j, k)] +
								pressure[idx(i - 1, j, k)] +
								pressure[idx(i, j + 1, k)] +
								pressure[idx(i, j - 1, k)] +
								pressure[idx(i, j, k + 1)] +
								pressure[idx(i, j, k - 1)] -
								div[index]) /
							6;

						pressure[index] = oldP * (1 - omega) + newP * omega;
						maxDiff = Math.max(maxDiff, Math.abs(pressure[index] - oldP));
					}
				}
			}
			applyBoundaryConditions(pressure, -1);

			// Early convergence check from water.js
			if (maxDiff < 1e-4) break;
		}

		// Apply pressure gradient with temperature influence
		for (let i = 1; i < N - 1; i++) {
			for (let j = 1; j < N - 1; j++) {
				for (let k = 1; k < N - 1; k++) {
					const index = idx(i, j, k);
					if (!hasActivity(i, j, k)) continue;

					const tempFactor = 1.0 + buffers.current.temperature[index] * 0.1;
					velocX[index] -=
						((0.5 * (pressure[idx(i + 1, j, k)] - pressure[idx(i - 1, j, k)])) / h) * tempFactor;
					velocY[index] -=
						((0.5 * (pressure[idx(i, j + 1, k)] - pressure[idx(i, j - 1, k)])) / h) * tempFactor;
					velocZ[index] -=
						((0.5 * (pressure[idx(i, j, k + 1)] - pressure[idx(i, j, k - 1)])) / h) * tempFactor;
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

	// Update active regions with temporal coherence from water.js
	function updateActiveRegions(): void {
		const oldRegions = new Uint8Array(activeRegions);
		activeRegions.fill(0);

		// Update from spatial index
		for (const index of spatialIndex) {
			const x = Math.floor((index % N) / cellSize);
			const y = Math.floor(((index / N) % N) / cellSize);
			const z = Math.floor(index / (N * N) / cellSize);

			// Mark current cell and neighbors as active
			for (let dx = -1; dx <= 1; dx++) {
				for (let dy = -1; dy <= 1; dy++) {
					for (let dz = -1; dz <= 1; dz++) {
						const nx = x + dx;
						const ny = y + dy;
						const nz = z + dz;
						if (
							nx >= 0 &&
							nx < cellCount &&
							ny >= 0 &&
							ny < cellCount &&
							nz >= 0 &&
							nz < cellCount
						) {
							activeRegions[nx + ny * cellCount + nz * cellCount * cellCount] = 1;
						}
					}
				}
			}
		}

		// Add temporal coherence from water.js
		for (let i = 0; i < activeRegions.length; i++) {
			if (oldRegions[i] && !activeRegions[i]) {
				activeRegions[i] = 0.5; // Keep region partially active
			}
		}
	}

	// Enhanced WebGL initialization combining both implementations
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
			});

			if (!gl) {
				console.warn('WebGL not available, falling back to CPU simulation');
				return false;
			}

			// Check for required extensions from water.js
			const requiredExtensions = [
				'OES_texture_float',
				'OES_texture_float_linear',
				'OES_standard_derivatives',
				'WEBGL_draw_buffers'
			];

			const extensions = requiredExtensions.map((name) => {
				const ext = gl?.getExtension(name);
				if (!ext) console.warn(`Extension ${name} not available`);
				return ext;
			});

			if (extensions.some((ext) => !ext)) {
				console.warn('Some required WebGL extensions not available');
				return false;
			}

			setupShaderPrograms();
			setupBuffers();
			setupTextures();

			return true;
		} catch (error) {
			console.error('WebGL initialization failed:', error);
			gl = null;
			return false;
		}
	}

	// Enhanced shader setup from water.js
	function setupShaderPrograms(): void {
		if (!gl) return;

		const vertShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
		const fragShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
		const normalFragShader = compileShader(gl, gl.FRAGMENT_SHADER, NORMAL_SHADER);
		const causticsFragShader = compileShader(gl, gl.FRAGMENT_SHADER, CAUSTICS_SHADER);

		if (!vertShader || !fragShader || !normalFragShader || !causticsFragShader) {
			throw new Error('Failed to compile shaders');
		}

		computeProgram = createProgram(gl, vertShader, fragShader);
		normalProgram = createProgram(gl, vertShader, normalFragShader);
		causticsProgram = createProgram(gl, vertShader, causticsFragShader);

		gl.deleteShader(vertShader);
		gl.deleteShader(fragShader);
		gl.deleteShader(normalFragShader);
		gl.deleteShader(causticsFragShader);
	}

	// WebGL buffer setup
	function setupBuffers(): void {
		if (!gl) return;

		vertexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
		gl.bufferData(
			gl.ARRAY_BUFFER,
			new Float32Array([-1, -1, 1, -1, -1, 1, 1, -1, -1, 1, 1, 1]),
			gl.STATIC_DRAW
		);
	}

	// Enhanced texture setup from water.js
    function setupTextures(): void {
        if (!gl) return;

        const createTexture = (internalFormat: number = gl?.RGBA || 0x1908, format: number = gl?.RGBA || 0x1908): WebGLTexture | null => {
            if (!gl) return null;
            const texture = gl.createTexture();
            if (!texture) return null;
            
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, N, N, 0, format, gl.FLOAT, null);
            return texture;
        };

        densityTexture = createTexture() || null;
        velocityTexture = createTexture() || null;
        temperatureTexture = createTexture() || null;
        normalTexture = createTexture() || null;
        causticsTexture = createTexture() || null;
    }

	// Enhanced WebGL helpers from water.js
	function compileShader(
		gl: WebGLRenderingContext,
		type: number,
		source: string
	): WebGLShader | null {
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

	function createProgram(
		gl: WebGLRenderingContext,
		vertexShader: WebGLShader,
		fragmentShader: WebGLShader
	): WebGLProgram {
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

	// Enhanced simulation update with WebGL support
	function updateSimulation(): void {
		time += timeStep;

		if (useWebGL && gl && computeProgram) {
			updateSimulationWebGL();
		} else {
			updateSimulationCPU();
		}

		updateActiveRegions();
	}

	// Update simulation using WebGL
	function updateSimulationWebGL(): void {
		if (!gl || !computeProgram || !causticsProgram) return;

		// Bind framebuffer and set viewport
		gl.viewport(0, 0, N, N);

		// Update main simulation
		gl.useProgram(computeProgram);

		const uniforms = {
			uTexture: 0,
			uDeltaTime: timeStep,
			texelSize: [1.0 / N, 1.0 / N]
		};

		for (const [name, value] of Object.entries(uniforms)) {
			const location = gl.getUniformLocation(computeProgram, name);
			if (typeof value === 'number') {
				gl.uniform1f(location, value);
			} else {
				gl.uniform2f(location, value[0], value[1]);
			}
		}

		// Draw simulation step
		gl.drawArrays(gl.TRIANGLES, 0, 6);

		// Update normals
		gl.useProgram(normalProgram);
		gl.drawArrays(gl.TRIANGLES, 0, 6);

		// Update caustics
		gl.useProgram(causticsProgram);
		gl.uniform1f(gl.getUniformLocation(causticsProgram, 'uTime'), time);
		gl.drawArrays(gl.TRIANGLES, 0, 6);
	}

	// CPU-based simulation update
	function updateSimulationCPU(): void {
		const { current, next } = buffers;

		// Temperature step
		diffuse(next.temperature, current.temperature, diffusion);
		advect(
			next.temperature,
			current.temperature,
			current.velocityX,
			current.velocityY,
			current.velocityZ
		);

		// Velocity steps
		diffuse(next.velocityX, current.velocityX, viscosity);
		diffuse(next.velocityY, current.velocityY, viscosity);
		diffuse(next.velocityZ, current.velocityZ, viscosity);

		solvePressure(next.velocityX, next.velocityY, next.velocityZ, next.pressure, next.temp);
		applyVorticityConfinement(next.velocityX, next.velocityY, next.velocityZ, next.temp);
		applyBuoyancy(next.velocityY, next.temperature, next.density);

		// Advection
		advect(
			next.velocityX,
			current.velocityX,
			current.velocityX,
			current.velocityY,
			current.velocityZ,
			-1
		);
		advect(
			next.velocityY,
			current.velocityY,
			current.velocityX,
			current.velocityY,
			current.velocityZ,
			-1
		);
		advect(
			next.velocityZ,
			current.velocityZ,
			current.velocityX,
			current.velocityY,
			current.velocityZ,
			-1
		);

		// Final pressure solve
		solvePressure(next.velocityX, next.velocityY, next.velocityZ, next.pressure, next.temp);

		// Density and temperature advection
		diffuse(next.density, current.density, diffusion);
		advect(next.density, current.density, next.velocityX, next.velocityY, next.velocityZ);

		// Swap buffers and update stores
		[buffers.current, buffers.next] = [buffers.next, buffers.current];

		// Update all stores
		for (const key in stores) {
			if (Object.prototype.hasOwnProperty.call(stores, key)) {
				(stores[key as keyof FluidStore] as Writable<Float32Array>).set(
					buffers.current[key as keyof FluidState]
				);
			}
		}
	}

	// Initialize WebGL if enabled
	if (useWebGL) {
		initWebGL();
	}

    function addForce(x: number, y: number, z: number, amount: number): void {
        const centerIndex = idx(Math.floor(x), Math.floor(y), Math.floor(z));
        const radius = 2.5;
        const falloffFactor = 2.0;
        
        for (let i = -Math.ceil(radius); i <= Math.ceil(radius); i++) {
            for (let j = -Math.ceil(radius); j <= Math.ceil(radius); j++) {
                for (let k = -Math.ceil(radius); k <= Math.ceil(radius); k++) {
                    const dist = Math.sqrt(i*i + j*j + k*k);
                    if (dist > radius) continue;
                    
                    const falloff = Math.exp(-falloffFactor * (dist / radius));
                    const forceAmount = amount * falloff;
                    const currentIndex = idx(x + i, y + j, z + k);
                    
                    buffers.current.density[currentIndex] += forceAmount;
                    spatialIndex.add(currentIndex);
                }
            }
        }
    }
    
    function addVelocity(x: number, y: number, z: number, vx: number, vy: number, vz: number): void {
        const centerIndex = idx(Math.floor(x), Math.floor(y), Math.floor(z));
        const radius = 3.0;
        
        for (let i = -Math.ceil(radius); i <= Math.ceil(radius); i++) {
            for (let j = -Math.ceil(radius); j <= Math.ceil(radius); j++) {
                for (let k = -Math.ceil(radius); k <= Math.ceil(radius); k++) {
                    const dist = Math.sqrt(i*i + j*j + k*k);
                    if (dist > radius) continue;
                    
                    const currentIndex = idx(x + i, y + j, z + k);
                    const factor = Math.exp(-dist / radius);
                    
                    buffers.current.velocityX[currentIndex] += vx * factor;
                    buffers.current.velocityY[currentIndex] += vy * factor;
                    buffers.current.velocityZ[currentIndex] += vz * factor;
                    spatialIndex.add(currentIndex);
                }
            }
        }
    }

	// Return public interface
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
		reset: () => {
			// Reset all buffers
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
					(stores[key as keyof FluidStore] as Writable<Float32Array>).set(
						buffers.current[key as keyof FluidState]
					);
				}
			}
		}
	};
}
