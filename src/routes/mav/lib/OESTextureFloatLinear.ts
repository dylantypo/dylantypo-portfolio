/**
 * Polyfill for OES_texture_float_linear WebGL extension
 * Provides robust support for linear filtering of floating-point textures
 */
export function installOESTextureFloatLinearPolyfill(): boolean {
	// Early exit if not in a browser environment
	if (typeof window === 'undefined' || !window.WebGLRenderingContext) {
		console.warn('WebGL polyfill: Environment not supported');
		return false;
	}

	/**
	 * Internal function to check if linear filtering is supported for floating-point textures
	 * @param gl - WebGL rendering context
	 * @returns Boolean indicating support for linear filtering
	 */
	function supportsOESTextureFloatLinear(gl: WebGLRenderingContext): boolean {
		// Check for base floating-point texture support
		if (!gl.getExtension('OES_texture_float')) {
			return false;
		}

		// Safely create WebGL resources
		const framebuffer = gl.createFramebuffer();
		const byteTexture = gl.createTexture();
		const floatTexture = gl.createTexture();
		const program = gl.createProgram();
		const vertexShader = gl.createShader(gl.VERTEX_SHADER);
		const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

		// Validate resource creation
		if (
			!framebuffer ||
			!byteTexture ||
			!floatTexture ||
			!program ||
			!vertexShader ||
			!fragmentShader
		) {
			return false;
		}

		try {
			// Prepare byte texture
			gl.bindTexture(gl.TEXTURE_2D, byteTexture);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

			gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
			gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, byteTexture, 0);

			// Prepare float texture with specific pixel values
			const rgba = [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

			gl.bindTexture(gl.TEXTURE_2D, floatTexture);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 2, 2, 0, gl.RGBA, gl.FLOAT, new Float32Array(rgba));

			// Vertex shader
			gl.shaderSource(
				vertexShader,
				`
            attribute vec2 vertex;
            void main() {
              gl_Position = vec4(vertex, 0.0, 1.0);
            }
          `
			);
			gl.compileShader(vertexShader);

			// Fragment shader
			gl.shaderSource(
				fragmentShader,
				`
            uniform sampler2D texture;
            void main() {
              gl_FragColor = texture2D(texture, vec2(0.5));
            }
          `
			);
			gl.compileShader(fragmentShader);

			gl.attachShader(program, vertexShader);
			gl.attachShader(program, fragmentShader);
			gl.linkProgram(program);

			// Create rendering buffer
			const buffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0]), gl.STREAM_DRAW);

			const vertexLocation = gl.getAttribLocation(program, 'vertex');
			gl.enableVertexAttribArray(vertexLocation);
			gl.vertexAttribPointer(vertexLocation, 2, gl.FLOAT, false, 0, 0);

			// Render and check pixel value
			const pixel = new Uint8Array(4);
			gl.useProgram(program);
			gl.viewport(0, 0, 1, 1);
			gl.bindTexture(gl.TEXTURE_2D, floatTexture);
			gl.drawArrays(gl.POINTS, 0, 1);
			gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixel);

			// Check if linear filtering is supported
			return pixel[0] === 127 || pixel[0] === 128;
		} catch (error) {
			console.warn('WebGL polyfill: Texture float linear test failed', error);
			return false;
		} finally {
			// Cleanup resources
			gl.deleteFramebuffer(framebuffer);
			gl.deleteTexture(byteTexture);
			gl.deleteTexture(floatTexture);
			gl.deleteProgram(program);
			gl.deleteShader(vertexShader);
			gl.deleteShader(fragmentShader);
		}
	}

	// Attempt to get WebGL context
	const canvas = document.createElement('canvas');
	const gl = canvas.getContext('webgl');

	// Exit if no WebGL or already supports the extension
	if (!gl) {
		return false;
	}

	// Add type-safe extension check
	const extensions = gl.getSupportedExtensions() ?? [];
	if (extensions.includes('OES_texture_float_linear')) {
		return false;
	}

	// If linear filtering is supported, patch WebGL context methods
	if (supportsOESTextureFloatLinear(gl)) {
		// Use type assertion to bypass strict type checking
		const proto = WebGLRenderingContext.prototype as any;

		const originalGetExtension = proto.getExtension;
		const originalGetSupportedExtensions = proto.getSupportedExtensions;

		// Patch getExtension to return a mock extension object
		proto.getExtension = function (name: string): any {
			if (name === 'OES_texture_float_linear') {
				return {}; // Return a mock extension object
			}
			return originalGetExtension.call(this, name);
		};

		// Patch getSupportedExtensions to include the extension
		proto.getSupportedExtensions = function (): string[] {
			const extensions = originalGetSupportedExtensions.call(this) ?? [];

			if (!extensions.includes('OES_texture_float_linear')) {
				extensions.push('OES_texture_float_linear');
			}

			return extensions;
		};

		return true;
	}

	return false;
}

/**
 * Check if OES Texture Float Linear is supported
 * @returns Boolean indicating support for the extension
 */
export function isOESTextureFloatLinearSupported(): boolean {
	try {
		const canvas = document.createElement('canvas');
		const gl = canvas.getContext('webgl');

		if (!gl) return false;

		const extensions = gl.getSupportedExtensions() ?? [];

		// Use internal support check function
		return extensions.includes('OES_texture_float_linear') || supportsOESTextureFloatLinear(gl);
	} catch (error) {
		console.warn('WebGL support check failed', error);
		return false;
	}
}

// Helper function made available for testing/internal use
function supportsOESTextureFloatLinear(gl: WebGLRenderingContext): boolean {
	// Use the implementation from earlier in the file
	// Check for base floating-point texture support
	if (!gl.getExtension('OES_texture_float')) {
		return false;
	}

	// Safely create WebGL resources
	const framebuffer = gl.createFramebuffer();
	const byteTexture = gl.createTexture();
	const floatTexture = gl.createTexture();
	const program = gl.createProgram();
	const vertexShader = gl.createShader(gl.VERTEX_SHADER);
	const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

	// Validate resource creation
	if (
		!framebuffer ||
		!byteTexture ||
		!floatTexture ||
		!program ||
		!vertexShader ||
		!fragmentShader
	) {
		return false;
	}

	try {
		// Prepare byte texture
		gl.bindTexture(gl.TEXTURE_2D, byteTexture);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

		gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
		gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, byteTexture, 0);

		// Prepare float texture with specific pixel values
		const rgba = [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

		gl.bindTexture(gl.TEXTURE_2D, floatTexture);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 2, 2, 0, gl.RGBA, gl.FLOAT, new Float32Array(rgba));

		// Vertex shader
		gl.shaderSource(
			vertexShader,
			`
          attribute vec2 vertex;
          void main() {
            gl_Position = vec4(vertex, 0.0, 1.0);
          }
        `
		);
		gl.compileShader(vertexShader);

		// Fragment shader
		gl.shaderSource(
			fragmentShader,
			`
          uniform sampler2D texture;
          void main() {
            gl_FragColor = texture2D(texture, vec2(0.5));
          }
        `
		);
		gl.compileShader(fragmentShader);

		gl.attachShader(program, vertexShader);
		gl.attachShader(program, fragmentShader);
		gl.linkProgram(program);

		// Create rendering buffer
		const buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0]), gl.STREAM_DRAW);

		const vertexLocation = gl.getAttribLocation(program, 'vertex');
		gl.enableVertexAttribArray(vertexLocation);
		gl.vertexAttribPointer(vertexLocation, 2, gl.FLOAT, false, 0, 0);

		// Render and check pixel value
		const pixel = new Uint8Array(4);
		gl.useProgram(program);
		gl.viewport(0, 0, 1, 1);
		gl.bindTexture(gl.TEXTURE_2D, floatTexture);
		gl.drawArrays(gl.POINTS, 0, 1);
		gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixel);

		// Check if linear filtering is supported
		return pixel[0] === 127 || pixel[0] === 128;
	} catch (error) {
		console.warn('WebGL polyfill: Texture float linear test failed', error);
		return false;
	} finally {
		// Cleanup resources
		gl.deleteFramebuffer(framebuffer);
		gl.deleteTexture(byteTexture);
		gl.deleteTexture(floatTexture);
		gl.deleteProgram(program);
		gl.deleteShader(vertexShader);
		gl.deleteShader(fragmentShader);
	}
}
