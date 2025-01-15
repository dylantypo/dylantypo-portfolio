// renderer.ts
import type { FluidState, TextureConfig, UniformLocations } from './types';
import { SHADERS } from './shaders';
import { WebGLUtils } from './utils';

export class FluidRenderer {
	private gl: WebGLRenderingContext | null = null;
	private computeProgram: WebGLProgram | null = null;
	private normalProgram: WebGLProgram | null = null;
	private causticsProgram: WebGLProgram | null = null;
	private vertexBuffer: WebGLBuffer | null = null;
	private velocityTexture: WebGLTexture | null = null;
	private _velocityData: Float32Array | null = null;
	private _temperatureData: Float32Array | null = null;
	private temperatureTexture: WebGLTexture | null = null;
	private uniformLocations: UniformLocations;
    private textureA: WebGLTexture | null = null;
    private textureB: WebGLTexture | null = null;
	private textureSize: number = 0;
    private dropShader: WebGLProgram | null = null;
    private updateShader: WebGLProgram | null = null;

	constructor() {
        this.uniformLocations = {
            compute: {
                position: null,
                uTexture: null,
                uDeltaTime: null,
                uTemperature: null,
                texelSize: null,
                uTime: null
            },
            normal: {
                position: null,
                uTexture: null,
                texelSize: null,
                delta: null
            },
            caustics: {
                position: null,
                uTexture: null,
                uTime: null
            },
            drop: {
                center: null,
                radius: null,
                strength: null
            },
            update: {
                delta: null,
                texture: null
            }
        };
    }

	init(canvas: HTMLCanvasElement, gridSize: number): boolean {
		try {
			const context = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
			if (!context) {
				throw new Error('WebGL not supported');
			}
			this.gl = context as WebGLRenderingContext; // Type assertion here

			// Enable required extensions
			const ext = WebGLUtils.getExtension(this.gl, 'OES_texture_float');
			if (!ext) {
				throw new Error('OES_texture_float not supported');
			}

			this.textureSize = gridSize;
			this.setupShaderPrograms();
			this.setupBuffers();
			this.setupTextures(gridSize);

			return true;
		} catch (error) {
			console.error('Renderer initialization failed:', error);
			return false;
		}
	}

	isInitialized(): boolean {
		return this.gl !== null && this.computeProgram !== null;
	}

    private swapTextures(): void {
        const temp = this.textureA;
        this.textureA = this.textureB;
        this.textureB = temp;
    }

	private setupShaderPrograms(): void {
		if (!this.gl) return;

		const vertShader = WebGLUtils.createShader(this.gl, this.gl.VERTEX_SHADER, SHADERS.vertex);
		const fragShader = WebGLUtils.createShader(this.gl, this.gl.FRAGMENT_SHADER, SHADERS.fragment);
		const normalFragShader = WebGLUtils.createShader(
			this.gl,
			this.gl.FRAGMENT_SHADER,
			SHADERS.normal
		);
		const causticsFragShader = WebGLUtils.createShader(
			this.gl,
			this.gl.FRAGMENT_SHADER,
			SHADERS.caustics
		);

		if (!vertShader || !fragShader || !normalFragShader || !causticsFragShader) {
			throw new Error('Failed to compile shaders');
		}

		this.computeProgram = WebGLUtils.createProgram(this.gl, vertShader, fragShader);
		this.normalProgram = WebGLUtils.createProgram(this.gl, vertShader, normalFragShader);
		this.causticsProgram = WebGLUtils.createProgram(this.gl, vertShader, causticsFragShader);

		// Set up uniform locations for compute program
		if (this.computeProgram) {
			this.uniformLocations.compute = {
				position: this.gl.getAttribLocation(this.computeProgram, 'position'),
				uTexture: this.gl.getUniformLocation(this.computeProgram, 'uTexture'),
				uDeltaTime: this.gl.getUniformLocation(this.computeProgram, 'uDeltaTime'),
				uTemperature: this.gl.getUniformLocation(this.computeProgram, 'uTemperature'),
				texelSize: this.gl.getUniformLocation(this.computeProgram, 'texelSize'),
				uTime: this.gl.getUniformLocation(this.computeProgram, 'uTime') // Added missing uniform
			};
		}

		// Set up uniform locations for normal program
		if (this.normalProgram) {
            this.uniformLocations.normal = {
                position: this.gl.getAttribLocation(this.normalProgram, 'position'),
                uTexture: this.gl.getUniformLocation(this.normalProgram, 'uTexture'),
                texelSize: this.gl.getUniformLocation(this.normalProgram, 'texelSize'),
                delta: this.gl.getUniformLocation(this.normalProgram, 'delta')
            };
        }

		// Set up uniform locations for caustics program
		if (this.causticsProgram) {
			this.uniformLocations.caustics = {
				position: this.gl.getAttribLocation(this.causticsProgram, 'position'),
				uTexture: this.gl.getUniformLocation(this.causticsProgram, 'uTexture'),
				uTime: this.gl.getUniformLocation(this.causticsProgram, 'uTime')
			};
		}

		// Clean up shaders after linking
		this.gl.deleteShader(vertShader);
		this.gl.deleteShader(fragShader);
		this.gl.deleteShader(normalFragShader);
		this.gl.deleteShader(causticsFragShader);
	}

	private setupBuffers(): void {
		if (!this.gl) return;

		this.vertexBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
		this.gl.bufferData(
			this.gl.ARRAY_BUFFER,
			new Float32Array([-1, -1, 1, -1, -1, 1, 1, -1, -1, 1, 1, 1]),
			this.gl.STATIC_DRAW
		);
	}

	private setupTextures(gridSize: number): void {
		if (!this.gl) return;

		const textureConfig: TextureConfig = {
			size: gridSize,
			width: gridSize,
			height: gridSize,
			format: this.gl.RGBA,
			type: this.gl.FLOAT,
			minFilter: this.gl.LINEAR,
			magFilter: this.gl.LINEAR,
			wrapS: this.gl.CLAMP_TO_EDGE,
			wrapT: this.gl.CLAMP_TO_EDGE,
			generateMipmaps: false,
			flipY: false,
			unpackAlignment: 1
		};

		this.velocityTexture = this.createFloatTexture(textureConfig);
		this.temperatureTexture = this.createFloatTexture(textureConfig);

		if (this.velocityTexture && this.temperatureTexture) {
			const initialVelocity = new Float32Array(gridSize * gridSize * 4);
			const initialTemp = new Float32Array(gridSize * gridSize * 4).fill(0.5);

			this.gl.bindTexture(this.gl.TEXTURE_2D, this.velocityTexture);
			this.gl.texSubImage2D(
				this.gl.TEXTURE_2D,
				0,
				0,
				0,
				gridSize,
				gridSize,
				this.gl.RGBA,
				this.gl.FLOAT,
				initialVelocity
			);

			this.gl.bindTexture(this.gl.TEXTURE_2D, this.temperatureTexture);
			this.gl.texSubImage2D(
				this.gl.TEXTURE_2D,
				0,
				0,
				0,
				gridSize,
				gridSize,
				this.gl.RGBA,
				this.gl.FLOAT,
				initialTemp
			);
		}
	}

	private createFloatTexture(config: TextureConfig): WebGLTexture | null {
		if (!this.gl) return null;

		const texture = this.gl.createTexture();
		if (!texture) return null;

		this.gl.bindTexture(this.gl.TEXTURE_2D, texture);

		if (config.generateMipmaps === false) {
			this.gl.texParameteri(
				this.gl.TEXTURE_2D,
				this.gl.TEXTURE_MIN_FILTER,
				config.minFilter || this.gl.NEAREST
			);
		}

		this.gl.texParameteri(
			this.gl.TEXTURE_2D,
			this.gl.TEXTURE_MAG_FILTER,
			config.magFilter || this.gl.NEAREST
		);
		this.gl.texParameteri(
			this.gl.TEXTURE_2D,
			this.gl.TEXTURE_WRAP_S,
			config.wrapS || this.gl.CLAMP_TO_EDGE
		);
		this.gl.texParameteri(
			this.gl.TEXTURE_2D,
			this.gl.TEXTURE_WRAP_T,
			config.wrapT || this.gl.CLAMP_TO_EDGE
		);

		if (config.unpackAlignment) {
			this.gl.pixelStorei(this.gl.UNPACK_ALIGNMENT, config.unpackAlignment);
		}

		if (config.flipY !== undefined) {
			this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, config.flipY);
		}

		const internalFormat = this.gl.RGBA;
		this.gl.texImage2D(
			this.gl.TEXTURE_2D,
			0,
			internalFormat,
			config.width,
			config.height,
			0,
			config.format,
			config.type,
			null
		);

		return texture;
	}

    private renderToTexture(targetTexture: WebGLTexture): void {
        if (!this.gl) return;
    
        const framebuffer = this.gl.createFramebuffer();
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, framebuffer);
        this.gl.framebufferTexture2D(
            this.gl.FRAMEBUFFER,
            this.gl.COLOR_ATTACHMENT0,
            this.gl.TEXTURE_2D,
            targetTexture,
            0
        );
    
        // Check framebuffer status
        if (this.gl.checkFramebufferStatus(this.gl.FRAMEBUFFER) !== this.gl.FRAMEBUFFER_COMPLETE) {
            console.error('Framebuffer not complete');
            return;
        }
    
        this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
        this.gl.deleteFramebuffer(framebuffer);
    }
    
    private updateWaterSimulation(): void {
        if (!this.gl || !this.updateShader) return;
    
        this.gl.useProgram(this.updateShader);
        this.gl.uniform2f(
            this.uniformLocations.update.delta,
            1.0 / this.textureSize,
            1.0 / this.textureSize
        );
    
        this.renderToTexture(this.textureB!);
        this.swapTextures();
    }

    private updateNormals(): void {
        if (!this.gl || !this.normalProgram) return;
    
        this.gl.useProgram(this.normalProgram);
        this.gl.uniform2f(
            this.uniformLocations.normal.delta,
            1.0 / this.textureSize,
            1.0 / this.textureSize
        );
    
        // Sample neighboring heights to calculate normals
        this.renderToTexture(this.textureB!);
        this.swapTextures();
    }

    public addDrop(x: number, y: number, radius: number, strength: number): void {
        if (!this.gl || !this.dropShader) return;
    
        this.gl.useProgram(this.dropShader);
        this.gl.uniform2f(this.uniformLocations.drop.center, x, y);
        this.gl.uniform1f(this.uniformLocations.drop.radius, radius);
        this.gl.uniform1f(this.uniformLocations.drop.strength, strength);
    
        this.renderToTexture(this.textureB!);
        this.swapTextures();
    }

	public updateSimulation(buffers: FluidState, time: number): void {
        if (!this.isInitialized()) return;
        
        const gridSize = Math.cbrt(buffers.density.length);
        
        // Update water physics
        this.updateWaterSimulation();
        // Update normal maps
        this.updateNormals();
        // Update main simulation
        this.updateTextures(buffers, gridSize);
        this.render(gridSize, time);
    }

	public render(gridSize: number, time: number): void {
		if (!this.gl || !this.computeProgram || !this.velocityTexture || !this.temperatureTexture)
			return;

		this.gl.viewport(0, 0, gridSize, gridSize);
		this.gl.useProgram(this.computeProgram);

		// Set up attributes and uniforms
		if (this.vertexBuffer && this.uniformLocations.compute.position !== null) {
			this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
			this.gl.enableVertexAttribArray(this.uniformLocations.compute.position);
			this.gl.vertexAttribPointer(
				this.uniformLocations.compute.position,
				2,
				this.gl.FLOAT,
				false,
				0,
				0
			);
		}

		// Bind textures
		if (this.uniformLocations.compute.uTexture !== null) {
			this.gl.activeTexture(this.gl.TEXTURE0);
			this.gl.bindTexture(this.gl.TEXTURE_2D, this.velocityTexture);
			this.gl.uniform1i(this.uniformLocations.compute.uTexture, 0);
		}

		if (this.uniformLocations.compute.uTime !== null) {
			this.gl.uniform1f(this.uniformLocations.compute.uTime, time);
		}

		// Draw
		this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
	}

	public updateTextures(buffers: FluidState, gridSize: number): void {
		if (!this.gl || !this.velocityTexture || !this.temperatureTexture) return;

		// Pre-allocate typed arrays to avoid garbage collection
		if (!this._velocityData || this._velocityData.length !== gridSize * gridSize * 4) {
			this._velocityData = new Float32Array(gridSize * gridSize * 4);
			this._temperatureData = new Float32Array(gridSize * gridSize * 4);
		}

		// Early return if data arrays aren't initialized
		if (!this._velocityData || !this._temperatureData) return;

		// Use direct array manipulation instead of multiple array accesses
		let idx = 0;
		const vData = this._velocityData;
		const tData = this._temperatureData;

		// Batch copy operations
		for (let i = 0; i < gridSize * gridSize; i++) {
			vData[idx] = buffers.velocityX[i];
			vData[idx + 1] = buffers.velocityY[i];
			vData[idx + 2] = buffers.velocityZ[i];
			vData[idx + 3] = 1.0;

			tData[idx] = buffers.temperature[i];
			tData[idx + 1] = 0.0;
			tData[idx + 2] = 0.0;
			tData[idx + 3] = 1.0;

			idx += 4;
		}

		// Minimize texture bindings
		this.gl.bindTexture(this.gl.TEXTURE_2D, this.velocityTexture);
		this.gl.texImage2D(
			this.gl.TEXTURE_2D,
			0,
			this.gl.RGBA,
			gridSize,
			gridSize,
			0,
			this.gl.RGBA,
			this.gl.FLOAT,
			vData
		);

		this.gl.bindTexture(this.gl.TEXTURE_2D, this.temperatureTexture);
		this.gl.texImage2D(
			this.gl.TEXTURE_2D,
			0,
			this.gl.RGBA,
			gridSize,
			gridSize,
			0,
			this.gl.RGBA,
			this.gl.FLOAT,
			tData
		);
	}

	public updateVelocityTexture(
		x: number,
		y: number,
		z: number,
		vx: number,
		vy: number,
		vz: number
	): void {
		if (!this.gl || !this.velocityTexture || !this.textureSize) return;

		const data = new Float32Array(4);
		data[0] = vx;
		data[1] = vy;
		data[2] = vz;
		data[3] = 1.0;

		this.gl.bindTexture(this.gl.TEXTURE_2D, this.velocityTexture);
		this.gl.texSubImage2D(
			this.gl.TEXTURE_2D,
			0,
			x % this.textureSize,
			Math.floor(x / this.textureSize),
			1,
			1,
			this.gl.RGBA,
			this.gl.FLOAT,
			data
		);
	}

	public reset(): void {
		if (!this.gl || !this.textureSize) return;

		if (this.velocityTexture) {
			const data = new Float32Array(this.textureSize * this.textureSize * 4);
			this.gl.bindTexture(this.gl.TEXTURE_2D, this.velocityTexture);
			this.gl.texImage2D(
				this.gl.TEXTURE_2D,
				0,
				this.gl.RGBA,
				this.textureSize,
				this.textureSize,
				0,
				this.gl.RGBA,
				this.gl.FLOAT,
				data
			);
		}
	}

	public dispose(): void {
		if (!this.gl) return;

		[this.velocityTexture, this.temperatureTexture].forEach((texture) => {
			if (texture) this.gl?.deleteTexture(texture);
		});

		if (this.vertexBuffer) this.gl.deleteBuffer(this.vertexBuffer);

		[this.computeProgram, this.normalProgram, this.causticsProgram].forEach((program) => {
			if (program) this.gl?.deleteProgram(program);
		});

		const ext = this.gl.getExtension('WEBGL_lose_context');
		if (ext) ext.loseContext();

		this.gl = null;
		this.textureSize = 0;
	}
}
