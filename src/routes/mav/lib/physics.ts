import type { FluidState, SimulationConfig } from './types';
import { DEFAULT_CONFIG } from './config';
import * as THREE from 'three';
export class FluidPhysics {
	private readonly gridSize: number;
	private readonly iterations: number;
	private readonly viscosity: number;
	private readonly diffusion: number;
	private readonly timeStep: number;
	private readonly temperature: number;
	private readonly densityCoef: number;
	private readonly gravity: number;
	private readonly vorticityStrength: number;
	private readonly surfaceTension: number;
	private readonly buoyancy: number;
	private readonly vorticityConfinement: number;
	private readonly turbulenceFactor: number;
	private readonly wavelength: number;
	private readonly damping: number;

	// Cache frequently used calculations
	private readonly gridSizeSquared: number;
	private readonly gridSizeMinus1: number;
	private readonly gridSizeMinus2: number;
	private readonly halfGridSize: number;
	private readonly dtScale: number;
	private readonly vorticityScale: number;
	private readonly buoyancyScale: number;

	constructor(config: Partial<SimulationConfig>) {
		// Merge with DEFAULT_CONFIG for complete configuration
		const fullConfig = {
			...DEFAULT_CONFIG,
			...config
		};

		// Core simulation parameters
		this.gridSize = fullConfig.gridSize;
		this.iterations = fullConfig.iterations;
		this.timeStep = fullConfig.timeStep;

		// Fluid properties
		this.viscosity = fullConfig.viscosity;
		this.diffusion = fullConfig.diffusion;
		this.temperature = fullConfig.temperature;
		this.densityCoef = fullConfig.density;

		// Forces and dynamics
		this.gravity = fullConfig.gravity;
		this.vorticityStrength = fullConfig.vorticityStrength;
		this.surfaceTension = fullConfig.surfaceTension;
		this.buoyancy = fullConfig.buoyancy;
		this.vorticityConfinement = fullConfig.vorticityConfinement;
		this.turbulenceFactor = fullConfig.turbulenceFactor;

		// Wave characteristics
		this.wavelength = fullConfig.wavelength;
		this.damping = fullConfig.damping;

		// Precalculate frequently used values
		this.gridSizeSquared = this.gridSize * this.gridSize;
		this.gridSizeMinus1 = this.gridSize - 1;
		this.gridSizeMinus2 = this.gridSize - 2;
		this.halfGridSize = Math.floor(this.gridSize / 2);
		this.dtScale = this.timeStep * this.gridSizeMinus2;
		this.vorticityScale = this.vorticityStrength * this.vorticityConfinement * this.timeStep;
		this.buoyancyScale = this.buoyancy * this.timeStep;
	}

	// Optimize the idx function for better performance
	private idx(x: number, y: number, z: number): number {
		// Use bitwise operations for faster bounds checking
		x = x < 0 ? 0 : x > this.gridSizeMinus1 ? this.gridSizeMinus1 : x | 0;
		y = y < 0 ? 0 : y > this.gridSizeMinus1 ? this.gridSizeMinus1 : y | 0;
		z = z < 0 ? 0 : z > this.gridSizeMinus1 ? this.gridSizeMinus1 : z | 0;
		return x + y * this.gridSize + z * this.gridSizeSquared;
	}

	updateSimulation(
        next: FluidState,
        current: FluidState,
        time: number,
        activeRegions: Uint8Array,
        spatialIndex: Set<number>
    ): void {
        const {
            velocityX: currVelX,
            velocityY: currVelY,
            velocityZ: currVelZ,
            density: currDensity,
            temperature: currTemp,
            pressure: currPressure
        } = current;

        const {
            velocityX: nextVelX,
            velocityY: nextVelY,
            velocityZ: nextVelZ,
            density: nextDensity,
            temperature: nextTemp,
            pressure: nextPressure,
            temp: nextT
        } = next;

        // Process velocity fields in parallel
        Promise.all([
            new Promise<void>((resolve) => {
                this.diffuse(nextVelX, currVelX, this.viscosity, currTemp);
                resolve();
            }),
            new Promise<void>((resolve) => {
                this.diffuse(nextVelY, currVelY, this.viscosity, currTemp);
                resolve();
            }),
            new Promise<void>((resolve) => {
                this.diffuse(nextVelZ, currVelZ, this.viscosity, currTemp);
                resolve();
            })
        ]).then(() => {
            // Advect density field
            this.advect(nextDensity, currDensity, currVelX, currVelY, currVelZ, currTemp);

            // Apply forces
            this.applyVorticityConfinement(nextVelX, nextVelY, nextVelZ, nextT, currTemp);
            this.applyBuoyancy(nextVelY, currTemp, currDensity, nextPressure);
        });

        // Update active regions if needed
        if (spatialIndex.size > 0) {
            this.updateActiveRegions(activeRegions, spatialIndex);
        }
    }

	// Helper method to update active regions
	private updateActiveRegions(activeRegions: Uint8Array, spatialIndex: Set<number>): void {
		const cellSize = Math.max(1, Math.floor(this.gridSize / 8));
		const cellCount = Math.ceil(this.gridSize / cellSize);

		// Clear previous active regions
		activeRegions.fill(0);

		// Update from spatial index more efficiently
		for (const index of spatialIndex) {
			const x = ((index % this.gridSize) / cellSize) | 0;
			const y = (((index / this.gridSize) % this.gridSize) / cellSize) | 0;
			const z = (index / this.gridSizeSquared / cellSize) | 0;

			// Mark current cell and immediate neighbors
			for (let dx = -1; dx <= 1; dx++) {
				const nx = x + dx;
				if (nx < 0 || nx >= cellCount) continue;

				for (let dy = -1; dy <= 1; dy++) {
					const ny = y + dy;
					if (ny < 0 || ny >= cellCount) continue;

					for (let dz = -1; dz <= 1; dz++) {
						const nz = z + dz;
						if (nz < 0 || nz >= cellCount) continue;

						activeRegions[nx + ny * cellCount + nz * cellCount * cellCount] = 1;
					}
				}
			}
		}
	}

	addForce(
		buffers: FluidState,
		spatialIndex: Set<number>,
		x: number,
		y: number,
		z: number,
		amount: number
	): void {
		// Use optimal idx calculation directly
		x = x < 0 ? 0 : x > this.gridSizeMinus1 ? this.gridSizeMinus1 : x | 0;
		y = y < 0 ? 0 : y > this.gridSizeMinus1 ? this.gridSizeMinus1 : y | 0;
		z = z < 0 ? 0 : z > this.gridSizeMinus1 ? this.gridSizeMinus1 : z | 0;
		const index = x + y * this.gridSize + z * this.gridSizeSquared;

		buffers.density[index] += amount;
		spatialIndex.add(index);
	}

	addVelocity(
		buffers: FluidState,
		spatialIndex: Set<number>,
		x: number,
		y: number,
		z: number,
		vx: number,
		vy: number,
		vz: number
	): void {
		// Use optimal idx calculation directly
		x = x < 0 ? 0 : x > this.gridSizeMinus1 ? this.gridSizeMinus1 : x | 0;
		y = y < 0 ? 0 : y > this.gridSizeMinus1 ? this.gridSizeMinus1 : y | 0;
		z = z < 0 ? 0 : z > this.gridSizeMinus1 ? this.gridSizeMinus1 : z | 0;
		const index = x + y * this.gridSize + z * this.gridSizeSquared;

		buffers.velocityX[index] += vx;
		buffers.velocityY[index] += vy;
		buffers.velocityZ[index] += vz;
		spatialIndex.add(index);
	}

	applyBoundaryConditions(field: Float32Array, scale: number = 1): void {
		const tensionFactor = scale * (1.0 - this.surfaceTension);
		const dampingTensionFactor = tensionFactor * this.damping;
		const gridSize = this.gridSize;
		const gridSizeM1 = this.gridSizeMinus1;
		const gridSizeM2 = this.gridSizeMinus2;

		for (let i = 0; i < gridSize; i++) {
			for (let j = 0; j < gridSize; j++) {
				const rowOffset = i + j * gridSize;
				const rowOffsetM1 = i + gridSizeM1 * gridSize;
				const rowOffsetM2 = i + gridSizeM2 * gridSize;

				// Bottom and top boundaries
				field[rowOffset] = field[i + gridSize] * tensionFactor;
				field[rowOffsetM1] = field[rowOffsetM2] * tensionFactor;

				// Left and right boundaries
				const leftIdx = j * gridSize;
				const rightIdxM1 = gridSizeM1 + j * gridSize;
				const rightIdxM2 = gridSizeM2 + j * gridSize;
				field[leftIdx] = field[1 + j * gridSize] * dampingTensionFactor;
				field[rightIdxM1] = field[rightIdxM2] * dampingTensionFactor;

				// Front and back boundaries
				const frontIdx = i + j * gridSize;
				const backIdxM1 = i + j * gridSize + gridSizeM1 * this.gridSizeSquared;
				const backIdxM2 = i + j * gridSize + gridSizeM2 * this.gridSizeSquared;
				field[frontIdx] = field[i + j * gridSize + this.gridSizeSquared] * tensionFactor;
				field[backIdxM1] = field[backIdxM2] * tensionFactor;
			}
		}
	}

	diffuse(x: Float32Array, x0: Float32Array, diff: number, temperature: Float32Array): void {
		const turbulentDiff = diff * (1.0 + this.turbulenceFactor * this.diffusion);
		const a = this.timeStep * turbulentDiff * this.gridSizeMinus2 * this.gridSizeMinus2;
		const invDenom = 1 / (1 + 6 * a);

		// Preallocate indices for the 6 neighbor cells
		const neighbors = new Int32Array(6);

		for (let iter = 0; iter < this.iterations; iter++) {
			for (let i = 1; i < this.gridSizeMinus1; i++) {
				for (let j = 1; j < this.gridSizeMinus1; j++) {
					const rowOffset = i + j * this.gridSize;
					for (let k = 1; k < this.gridSizeMinus1; k++) {
						const index = rowOffset + k * this.gridSizeSquared;

						// Precompute neighbor indices
						neighbors[0] = index + 1; // i+1
						neighbors[1] = index - 1; // i-1
						neighbors[2] = index + this.gridSize; // j+1
						neighbors[3] = index - this.gridSize; // j-1
						neighbors[4] = index + this.gridSizeSquared; // k+1
						neighbors[5] = index - this.gridSizeSquared; // k-1

						// Sum neighbors in a SIMD-friendly way
						let sum = 0;
						for (let n = 0; n < 6; n++) {
							sum += x[neighbors[n]];
						}

						const tempFactor = 1.0 + temperature[index] * this.temperature;
						x[index] = (x0[index] + a * tempFactor * sum) * invDenom;
					}
				}
			}
			this.applyBoundaryConditions(x);
		}
	}

	advect(
		d: Float32Array,
		d0: Float32Array,
		velocX: Float32Array,
		velocY: Float32Array,
		velocZ: Float32Array,
		temperature: Float32Array,
		boundaryScale: number = 1
	): void {
		const forward = new Float32Array(d.length);
		const backward = new Float32Array(d.length);
		const dtx = this.timeStep * (this.gridSize - 2);
		const dty = this.timeStep * (this.gridSize - 2);
		const dtz = this.timeStep * (this.gridSize - 2);

		// Forward pass
		this.advectPass(forward, d0, velocX, velocY, velocZ, temperature, dtx, dty, dtz, 1);

		// Backward pass
		this.advectPass(backward, forward, velocX, velocY, velocZ, temperature, -dtx, -dty, -dtz, 1);

		// Final MacCormack step with limiting
		this.macCormackStep(d, d0, forward, backward, boundaryScale);
	}

	private advectPass(
		target: Float32Array,
		source: Float32Array,
		velocX: Float32Array,
		velocY: Float32Array,
		velocZ: Float32Array,
		temperature: Float32Array,
		dtx: number,
		dty: number,
		dtz: number,
		direction: number
	): void {
		// Pre-calculate array offsets
		const gridSizeF = this.gridSize;
		const maxIndex = this.gridSizeMinus1 - 0.5;
		const minIndex = 0.5;

		for (let i = 1; i < this.gridSizeMinus1; i++) {
			for (let j = 1; j < this.gridSizeMinus1; j++) {
				const rowOffset = i + j * gridSizeF;
				for (let k = 1; k < this.gridSizeMinus1; k++) {
					const index = rowOffset + k * this.gridSizeSquared;

					// Optimize temperature factor calculation
					const tempFactor = 1.0 + temperature[index] * 0.05;
					const velocityScale = tempFactor * direction;

					// Vectorize position calculations
					const x = Math.max(minIndex, Math.min(maxIndex, i - dtx * velocX[index] * velocityScale));
					const y = Math.max(minIndex, Math.min(maxIndex, j - dty * velocY[index] * velocityScale));
					const z = Math.max(minIndex, Math.min(maxIndex, k - dtz * velocZ[index] * velocityScale));

					target[index] = this.interpolateOptimized(source, x, y, z);
				}
			}
		}
	}

	private interpolateOptimized(field: Float32Array, x: number, y: number, z: number): number {
		// Use bitwise operations for faster floor
		const i0 = x | 0;
		const j0 = y | 0;
		const k0 = z | 0;

		// Compute fractions once
		const sx = x - i0;
		const sy = y - j0;
		const sz = z - k0;

		// Pre-calculate array indices
		const i0j0k0 = i0 + j0 * this.gridSize + k0 * this.gridSizeSquared;
		const i0j0k1 = i0j0k0 + this.gridSizeSquared;
		const i0j1k0 = i0j0k0 + this.gridSize;
		const i0j1k1 = i0j1k0 + this.gridSizeSquared;
		const i1j0k0 = i0j0k0 + 1;
		const i1j0k1 = i1j0k0 + this.gridSizeSquared;
		const i1j1k0 = i1j0k0 + this.gridSize;
		const i1j1k1 = i1j1k0 + this.gridSizeSquared;

		// Use linear combination for better vectorization
		return (
			(1 - sx) *
				((1 - sy) * ((1 - sz) * field[i0j0k0] + sz * field[i0j0k1]) +
					sy * ((1 - sz) * field[i0j1k0] + sz * field[i0j1k1])) +
			sx *
				((1 - sy) * ((1 - sz) * field[i1j0k0] + sz * field[i1j0k1]) +
					sy * ((1 - sz) * field[i1j1k0] + sz * field[i1j1k1]))
		);
	}

	private macCormackStep(
		d: Float32Array,
		d0: Float32Array,
		forward: Float32Array,
		backward: Float32Array,
		boundaryScale: number
	): void {
		// Pre-calculate offsets for neighbor access
		const gridSize = this.gridSize;
		const neighbors = {
			left: -1,
			right: 1,
			bottom: -gridSize,
			top: gridSize,
			back: -this.gridSizeSquared,
			front: this.gridSizeSquared
		};

		for (let i = 1; i < this.gridSizeMinus1; i++) {
			for (let j = 1; j < this.gridSizeMinus1; j++) {
				const rowOffset = i + j * gridSize;
				for (let k = 1; k < this.gridSizeMinus1; k++) {
					const index = rowOffset + k * this.gridSizeSquared;

					// Apply MacCormack correction
					const correction = (forward[index] - backward[index]) * 0.5;
					d[index] = forward[index] + correction;

					// Calculate min/max from neighbors more efficiently
					let maxVal = d0[index];
					let minVal = d0[index];

					// Check neighbors with direct array access
					for (const offset of Object.values(neighbors)) {
						const neighborVal = d0[index + offset];
						maxVal = Math.max(maxVal, neighborVal);
						minVal = Math.min(minVal, neighborVal);
					}

					// Clamp value for monotonicity
					d[index] = Math.max(minVal, Math.min(maxVal, d[index]));
				}
			}
		}

		this.applyBoundaryConditions(d, boundaryScale);
	}

	applyVorticityConfinement(
		velocX: Float32Array,
		velocY: Float32Array,
		velocZ: Float32Array,
		temp: Float32Array,
		temperature: Float32Array
	): void {
		const halfDelta = 0.5;
		const gridSize = this.gridSize;
		const gridSizeSquared = this.gridSizeSquared;

		// Pre-allocate arrays for curl components
		const curlX = new Float32Array(gridSizeSquared * gridSize);
		const curlY = new Float32Array(gridSizeSquared * gridSize);
		const curlZ = new Float32Array(gridSizeSquared * gridSize);

		// Calculate curl components in separate passes for better cache usage
		for (let i = 1; i < this.gridSizeMinus1; i++) {
			for (let j = 1; j < this.gridSizeMinus1; j++) {
				const rowOffset = i + j * gridSize;
				for (let k = 1; k < this.gridSizeMinus1; k++) {
					const index = rowOffset + k * gridSizeSquared;

					// Calculate curl components with better memory access
					const dwzdy = (velocZ[index + gridSize] - velocZ[index - gridSize]) * halfDelta;
					const dwydz =
						(velocY[index + gridSizeSquared] - velocY[index - gridSizeSquared]) * halfDelta;
					const dwxdz =
						(velocX[index + gridSizeSquared] - velocX[index - gridSizeSquared]) * halfDelta;
					const dwzdx = (velocZ[index + 1] - velocZ[index - 1]) * halfDelta;
					const dwydx = (velocY[index + 1] - velocY[index - 1]) * halfDelta;
					const dwxdy = (velocX[index + gridSize] - velocX[index - gridSize]) * halfDelta;

					// Store curl components
					curlX[index] = dwzdy - dwydz;
					curlY[index] = dwxdz - dwzdx;
					curlZ[index] = dwydx - dwxdy;

					// Calculate curl magnitude with turbulence
					const turbulenceFactor = 1.0 + this.turbulenceFactor * temperature[index];
					temp[index] =
						Math.sqrt(
							curlX[index] * curlX[index] +
								curlY[index] * curlY[index] +
								curlZ[index] * curlZ[index]
						) * turbulenceFactor;
				}
			}
		}

		// Apply vorticity confinement in a separate pass
		const vorticityScale = this.vorticityScale;

		for (let i = 1; i < this.gridSizeMinus1; i++) {
			for (let j = 1; j < this.gridSizeMinus1; j++) {
				const rowOffset = i + j * gridSize;
				for (let k = 1; k < this.gridSizeMinus1; k++) {
					const index = rowOffset + k * gridSizeSquared;

					const dx = (temp[index + 1] - temp[index - 1]) * halfDelta;
					const dy = (temp[index + gridSize] - temp[index - gridSize]) * halfDelta;
					const dz = (temp[index + gridSizeSquared] - temp[index - gridSizeSquared]) * halfDelta;

					const lenSqr = dx * dx + dy * dy + dz * dz;
					if (lenSqr > 1e-10) {
						const len = Math.sqrt(lenSqr);
						const strengthScale =
							(vorticityScale * temp[index] * (1.0 + temperature[index] * this.temperature)) / len;

						velocX[index] += strengthScale * (dy * curlZ[index] - dz * curlY[index]);
						velocY[index] += strengthScale * (dz * curlX[index] - dx * curlZ[index]);
						velocZ[index] += strengthScale * (dx * curlY[index] - dy * curlX[index]);
					}
				}
			}
		}
	}

	applyBuoyancy(
		velocY: Float32Array,
		temp: Float32Array,
		dens: Float32Array,
		pressure: Float32Array
	): void {
		for (let i = 1; i < this.gridSize - 1; i++) {
			for (let j = 1; j < this.gridSize - 1; j++) {
				for (let k = 1; k < this.gridSize - 1; k++) {
					const index = this.idx(i, j, k);

					// Enhanced buoyancy calculation using temperature and density
					const buoyancyForce = temp[index] * this.temperature - dens[index] * this.densityCoef;
					const finalBuoyancy = buoyancyForce * this.buoyancy;

					// Apply combined forces with gravity
					velocY[index] += (finalBuoyancy + this.gravity * dens[index]) * this.timeStep;

					// Wave dynamics with wavelength and damping
					const height = pressure[index];
					const targetHeight = dens[index];

					// Apply wavelength and damping to wave motion
					const waveStep = this.wavelength / this.gridSize;
					const dampingFactor = 1.0 - this.damping;
					const delta = (targetHeight - height) * dampingFactor * waveStep;

					pressure[index] = height + delta;

					// Apply surface tension to pressure field
					if (j > 1 && j < this.gridSize - 2) {
						const surfaceCurvature =
							(pressure[this.idx(i, j + 1, k)] +
								pressure[this.idx(i, j - 1, k)] -
								2.0 * pressure[index]) *
							this.surfaceTension;
						pressure[index] += surfaceCurvature * this.timeStep;
					}
				}
			}
		}
	}

	applyRotationalForces(
		velocX: Float32Array,
		velocY: Float32Array,
		velocZ: Float32Array,
		angularVelocity: THREE.Vector3,
		rotation: THREE.Euler
	): void {
		const frictionFactor = (1 - 0.98) * this.timeStep; // Pre-calculate friction
		const rotationScale = 0.5;
		const gravity = -9.81 * this.timeStep;

		// Create rotation matrices once
		const rotationMatrix = new THREE.Matrix4().makeRotationFromEuler(rotation);
		const inverseRotation = new THREE.Matrix4().copy(rotationMatrix).invert();

		// Pre-calculate inverse grid center for normalization
		const invGridCenter = 1 / this.halfGridSize;

		// Reuse vectors to avoid allocation
		const localPos = new THREE.Vector3();
		const worldPos = new THREE.Vector3();
		const worldVel = new THREE.Vector3();
		const worldGravity = new THREE.Vector3(0, gravity, 0).applyMatrix4(inverseRotation);

		for (let i = 1; i < this.gridSizeMinus1; i++) {
			for (let j = 1; j < this.gridSizeMinus1; j++) {
				const rowOffset = i + j * this.gridSize;
				for (let k = 1; k < this.gridSizeMinus1; k++) {
					const index = rowOffset + k * this.gridSizeSquared;

					// Calculate normalized position relative to center
					localPos.set(
						(i - this.halfGridSize) * invGridCenter,
						(j - this.halfGridSize) * invGridCenter,
						(k - this.halfGridSize) * invGridCenter
					);

					// Transform to world space
					worldPos.copy(localPos).applyMatrix4(rotationMatrix);

					// Calculate tangential velocity directly
					worldVel
						.set(
							(angularVelocity.y * worldPos.z - angularVelocity.z * worldPos.y) * rotationScale,
							(angularVelocity.z * worldPos.x - angularVelocity.x * worldPos.z) * rotationScale,
							(angularVelocity.x * worldPos.y - angularVelocity.y * worldPos.x) * rotationScale
						)
						.applyMatrix4(inverseRotation);

					// Apply forces with combined friction and timestep
					velocX[index] += worldVel.x * frictionFactor;
					velocY[index] += worldVel.y * frictionFactor + worldGravity.y;
					velocZ[index] += worldVel.z * frictionFactor;
				}
			}
		}
	}
}
