import type { FluidState, SimulationConfig } from './types';
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

	constructor(config: Partial<SimulationConfig>) {
		// Provide defaults for all required properties
		const fullConfig = {
			// Required core properties (from your existing config)
			gridSize: config.gridSize ?? 64,
			iterations: config.iterations ?? 4,
			viscosity: config.viscosity ?? 0.000001,
			diffusion: config.diffusion ?? 0.000001,
			timeStep: config.timeStep ?? 1 / 60,
			temperature: config.temperature ?? 0.5,
			density: config.density ?? 1.0,
			gravity: config.gravity ?? -9.81,
			vorticityStrength: config.vorticityStrength ?? 0.15,

			// Additional required properties with defaults
			useWebGL: config.useWebGL ?? true,
			useSpatialIndex: config.useSpatialIndex ?? false,
			wavelength: config.wavelength ?? 4.0,
			damping: config.damping ?? 0.985,
			causticStrength: config.causticStrength ?? 0.75,
			normalStrength: config.normalStrength ?? 1.0,
			refractionRatio: config.refractionRatio ?? 0.98,
			surfaceTension: config.surfaceTension ?? 0.072,
			buoyancy: config.buoyancy ?? 9.81,
			turbulenceFactor: config.turbulenceFactor ?? 0.1,
			foamThreshold: config.foamThreshold ?? 0.5,
			vorticityConfinement: config.vorticityConfinement ?? 0.3
		} as const;

		this.gridSize = fullConfig.gridSize;
		this.iterations = fullConfig.iterations;
		this.viscosity = fullConfig.viscosity;
		this.diffusion = fullConfig.diffusion;
		this.timeStep = fullConfig.timeStep;
		this.temperature = fullConfig.temperature;
		this.densityCoef = fullConfig.density;
		this.gravity = fullConfig.gravity;
		this.vorticityStrength = fullConfig.vorticityStrength;
	}

	private idx(x: number, y: number, z: number): number {
		x = Math.max(0, Math.min(this.gridSize - 1, Math.floor(x)));
		y = Math.max(0, Math.min(this.gridSize - 1, Math.floor(y)));
		z = Math.max(0, Math.min(this.gridSize - 1, Math.floor(z)));
		return x + y * this.gridSize + z * this.gridSize * this.gridSize;
	}

	updateSimulation(
		buffers: FluidState,
		time: number,
		activeRegions: Uint8Array,
		spatialIndex: Set<number>
	): void {
		// Apply physics steps
		this.diffuse(buffers.velocityX, buffers.velocityX, this.viscosity, buffers.temperature);
		this.diffuse(buffers.velocityY, buffers.velocityY, this.viscosity, buffers.temperature);
		this.diffuse(buffers.velocityZ, buffers.velocityZ, this.viscosity, buffers.temperature);

		this.advect(
			buffers.density,
			buffers.density,
			buffers.velocityX,
			buffers.velocityY,
			buffers.velocityZ,
			buffers.temperature
		);

		this.applyVorticityConfinement(
			buffers.velocityX,
			buffers.velocityY,
			buffers.velocityZ,
			buffers.temp,
			buffers.temperature
		);
		this.applyBuoyancy(buffers.velocityY, buffers.temperature, buffers.density, buffers.pressure);
	}

	addForce(
		buffers: FluidState,
		spatialIndex: Set<number>,
		x: number,
		y: number,
		z: number,
		amount: number
	): void {
		const index = this.idx(x, y, z);
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
		const index = this.idx(x, y, z);
		buffers.velocityX[index] += vx;
		buffers.velocityY[index] += vy;
		buffers.velocityZ[index] += vz;
		spatialIndex.add(index);
	}

	applyBoundaryConditions(field: Float32Array, scale: number = 1): void {
		for (let i = 0; i < this.gridSize; i++) {
			for (let j = 0; j < this.gridSize; j++) {
				// Bottom and top boundaries
				field[this.idx(i, 0, j)] = field[this.idx(i, 1, j)] * scale;
				field[this.idx(i, this.gridSize - 1, j)] = field[this.idx(i, this.gridSize - 2, j)] * scale;

				// Left and right boundaries with damping
				field[this.idx(0, i, j)] = field[this.idx(1, i, j)] * scale * 0.8;
				field[this.idx(this.gridSize - 1, i, j)] =
					field[this.idx(this.gridSize - 2, i, j)] * scale * 0.8;

				// Front and back boundaries with reflection
				field[this.idx(i, j, 0)] = field[this.idx(i, j, 1)] * scale * 0.9;
				field[this.idx(i, j, this.gridSize - 1)] =
					field[this.idx(i, j, this.gridSize - 2)] * scale * 0.9;
			}
		}
	}

	diffuse(x: Float32Array, x0: Float32Array, diff: number, temperature: Float32Array): void {
		const a = this.timeStep * diff * (this.gridSize - 2) * (this.gridSize - 2);
		const invDenom = 1 / (1 + 6 * a);

		for (let iter = 0; iter < this.iterations; iter++) {
			for (let i = 1; i < this.gridSize - 1; i++) {
				for (let j = 1; j < this.gridSize - 1; j++) {
					for (let k = 1; k < this.gridSize - 1; k++) {
						const index = this.idx(i, j, k);
						const tempFactor = 1.0 + temperature[index] * 0.1;

						x[index] =
							(x0[index] +
								a *
									tempFactor *
									(x[this.idx(i + 1, j, k)] +
										x[this.idx(i - 1, j, k)] +
										x[this.idx(i, j + 1, k)] +
										x[this.idx(i, j - 1, k)] +
										x[this.idx(i, j, k + 1)] +
										x[this.idx(i, j, k - 1)])) *
							invDenom;
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
		for (let i = 1; i < this.gridSize - 1; i++) {
			for (let j = 1; j < this.gridSize - 1; j++) {
				for (let k = 1; k < this.gridSize - 1; k++) {
					const index = this.idx(i, j, k);
					const tempFactor = 1.0 + temperature[index] * 0.05;

					let x = i - dtx * velocX[index] * tempFactor * direction;
					let y = j - dty * velocY[index] * tempFactor * direction;
					let z = k - dtz * velocZ[index] * tempFactor * direction;

					x = Math.max(0.5, Math.min(this.gridSize - 1.5, x));
					y = Math.max(0.5, Math.min(this.gridSize - 1.5, y));
					z = Math.max(0.5, Math.min(this.gridSize - 1.5, z));

					target[index] = this.interpolate(source, x, y, z);
				}
			}
		}
	}

	private interpolate(field: Float32Array, x: number, y: number, z: number): number {
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

		return (
			s0 *
				(t0 * (u0 * field[this.idx(i0, j0, k0)] + u1 * field[this.idx(i0, j0, k1)]) +
					t1 * (u0 * field[this.idx(i0, j1, k0)] + u1 * field[this.idx(i0, j1, k1)])) +
			s1 *
				(t0 * (u0 * field[this.idx(i1, j0, k0)] + u1 * field[this.idx(i1, j0, k1)]) +
					t1 * (u0 * field[this.idx(i1, j1, k0)] + u1 * field[this.idx(i1, j1, k1)]))
		);
	}

	private macCormackStep(
		d: Float32Array,
		d0: Float32Array,
		forward: Float32Array,
		backward: Float32Array,
		boundaryScale: number
	): void {
		for (let i = 1; i < this.gridSize - 1; i++) {
			for (let j = 1; j < this.gridSize - 1; j++) {
				for (let k = 1; k < this.gridSize - 1; k++) {
					const index = this.idx(i, j, k);

					const correction = (forward[index] - backward[index]) * 0.5;
					d[index] = forward[index] + correction;

					// Ensure monotonicity
					const maxVal = Math.max(
						d0[this.idx(i - 1, j, k)],
						d0[this.idx(i + 1, j, k)],
						d0[this.idx(i, j - 1, k)],
						d0[this.idx(i, j + 1, k)],
						d0[this.idx(i, j, k - 1)],
						d0[this.idx(i, j, k + 1)]
					);
					const minVal = Math.min(
						d0[this.idx(i - 1, j, k)],
						d0[this.idx(i + 1, j, k)],
						d0[this.idx(i, j - 1, k)],
						d0[this.idx(i, j + 1, k)],
						d0[this.idx(i, j, k - 1)],
						d0[this.idx(i, j, k + 1)]
					);
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
		// Calculate curl and vorticity
		for (let i = 1; i < this.gridSize - 1; i++) {
			for (let j = 1; j < this.gridSize - 1; j++) {
				for (let k = 1; k < this.gridSize - 1; k++) {
					const index = this.idx(i, j, k);

					const dwzdy = (velocZ[this.idx(i, j + 1, k)] - velocZ[this.idx(i, j - 1, k)]) * 0.5;
					const dwydz = (velocY[this.idx(i, j, k + 1)] - velocY[this.idx(i, j, k - 1)]) * 0.5;
					const dwxdz = (velocX[this.idx(i, j, k + 1)] - velocX[this.idx(i, j, k - 1)]) * 0.5;
					const dwzdx = (velocZ[this.idx(i + 1, j, k)] - velocZ[this.idx(i - 1, j, k)]) * 0.5;
					const dwydx = (velocY[this.idx(i + 1, j, k)] - velocY[this.idx(i - 1, j, k)]) * 0.5;
					const dwxdy = (velocX[this.idx(i, j + 1, k)] - velocX[this.idx(i, j - 1, k)]) * 0.5;

					temp[index] = Math.sqrt(
						Math.pow(dwzdy - dwydz, 2) + Math.pow(dwxdz - dwzdx, 2) + Math.pow(dwydx - dwxdy, 2)
					);
				}
			}
		}

		// Apply vorticity confinement force
		const epsilon = this.vorticityStrength;
		for (let i = 1; i < this.gridSize - 1; i++) {
			for (let j = 1; j < this.gridSize - 1; j++) {
				for (let k = 1; k < this.gridSize - 1; k++) {
					const index = this.idx(i, j, k);

					const dx = (temp[this.idx(i + 1, j, k)] - temp[this.idx(i - 1, j, k)]) * 0.5;
					const dy = (temp[this.idx(i, j + 1, k)] - temp[this.idx(i, j - 1, k)]) * 0.5;
					const dz = (temp[this.idx(i, j, k + 1)] - temp[this.idx(i, j, k - 1)]) * 0.5;

					const length = Math.sqrt(dx * dx + dy * dy + dz * dz) + 1e-5;
					const nx = dx / length;
					const ny = dy / length;
					const nz = dz / length;

					const tempFactor = 1.0 + temperature[index] * 0.2;
					const strength = epsilon * temp[index] * this.timeStep * tempFactor;

					velocX[index] += strength * nx;
					velocY[index] += strength * ny;
					velocZ[index] += strength * nz;
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

					const buoyancy = temp[index] * this.temperature - dens[index] * this.densityCoef;
					velocY[index] += (buoyancy + this.gravity * dens[index]) * this.timeStep;

					// Wave dynamics
					const height = pressure[index];
					const targetHeight = dens[index];
					const delta = (targetHeight - height) * 0.1;
					pressure[index] = height + delta;
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
		const gridCenter = Math.floor(this.gridSize / 2);
		const frictionCoeff = 0.98;
		const rotationScale = 0.5;

		// Create rotation matrix from provided rotation
		const rotationMatrix = new THREE.Matrix4().makeRotationFromEuler(rotation);
		const inverseRotation = new THREE.Matrix4().copy(rotationMatrix).invert();

		for (let i = 1; i < this.gridSize - 1; i++) {
			for (let j = 1; j < this.gridSize - 1; j++) {
				for (let k = 1; k < this.gridSize - 1; k++) {
					const index = this.idx(i, j, k);

					// Calculate position relative to center in local space
					const relX = (i - gridCenter) / gridCenter;
					const relY = (j - gridCenter) / gridCenter;
					const relZ = (k - gridCenter) / gridCenter;

					// Convert to world space
					const localPos = new THREE.Vector3(relX, relY, relZ);
					const worldPos = localPos.applyMatrix4(rotationMatrix);

					// Calculate tangential velocity in world space
					const targetVelocX =
						(angularVelocity.y * worldPos.z - angularVelocity.z * worldPos.y) * rotationScale;
					const targetVelocY =
						(angularVelocity.z * worldPos.x - angularVelocity.x * worldPos.z) * rotationScale;
					const targetVelocZ =
						(angularVelocity.x * worldPos.y - angularVelocity.y * worldPos.x) * rotationScale;

					// Convert velocity back to local space
					const worldVel = new THREE.Vector3(targetVelocX, targetVelocY, targetVelocZ);
					const localVel = worldVel.applyMatrix4(inverseRotation);

					// Apply forces with friction
					velocX[index] += (localVel.x - velocX[index]) * (1 - frictionCoeff) * this.timeStep;
					velocY[index] += (localVel.y - velocY[index]) * (1 - frictionCoeff) * this.timeStep;
					velocZ[index] += (localVel.z - velocZ[index]) * (1 - frictionCoeff) * this.timeStep;

					// Add gravity in world space
					const gravity = -9.81 * this.timeStep;
					const worldGravity = new THREE.Vector3(0, gravity, 0).applyMatrix4(inverseRotation);
					velocY[index] += worldGravity.y;
				}
			}
		}
	}
}
