// Define the WebGL extension interface
export interface OESTextureFloatLinear {
	readonly name: 'OES_texture_float_linear';
}

// String key for storing the extension
const OES_TEXTURE_FLOAT_LINEAR_KEY = '__OES_texture_float_linear__';

// Extend WebGL types
declare global {
	interface WebGLRenderingContextExtensions {
		OES_texture_float_linear: OESTextureFloatLinear;
	}

	interface WebGLRenderingContext {
		readonly [OES_TEXTURE_FLOAT_LINEAR_KEY]?: OESTextureFloatLinear;
	}
}

/**
 * Tests if linear filtering of floating-point textures is supported
 */
function supportsOESTextureFloatLinear(gl: WebGLRenderingContext): boolean {
	try {
		// Check for base floating point texture support
		if (!gl.getExtension('OES_texture_float')) {
			return false;
		}

		// Create resources with error checking
		const framebuffer = gl.createFramebuffer();
		const byteTexture = gl.createTexture();
		const floatTexture = gl.createTexture();
		const program = gl.createProgram();
		const vertexShader = gl.createShader(gl.VERTEX_SHADER);
		const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

		if (
			!framebuffer ||
			!byteTexture ||
			!floatTexture ||
			!program ||
			!vertexShader ||
			!fragmentShader
		) {
			throw new Error('Failed to create WebGL resources');
		}

		// Setup byte texture as render target
		gl.bindTexture(gl.TEXTURE_2D, byteTexture);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

		gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
		gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, byteTexture, 0);

		// Create float texture with test pattern
		const rgba = new Float32Array([
			2,
			0,
			0,
			0, // One pixel with value 2
			0,
			0,
			0,
			0, // Three pixels with value 0
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0
		]);

		gl.bindTexture(gl.TEXTURE_2D, floatTexture);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 2, 2, 0, gl.RGBA, gl.FLOAT, rgba);

		// Create shaders and program
		gl.shaderSource(
			vertexShader,
			`
            attribute vec2 vertex;
            void main() {
                gl_Position = vec4(vertex, 0.0, 1.0);
            }
        `
		);
		gl.shaderSource(
			fragmentShader,
			`
            uniform sampler2D texture;
            void main() {
                gl_FragColor = texture2D(texture, vec2(0.5));
            }
        `
		);

		gl.compileShader(vertexShader);
		gl.compileShader(fragmentShader);
		gl.attachShader(program, vertexShader);
		gl.attachShader(program, fragmentShader);
		gl.linkProgram(program);

		// Create and setup vertex buffer
		const buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0]), gl.STREAM_DRAW);

		const vertexLocation = gl.getAttribLocation(program, 'vertex');
		gl.enableVertexAttribArray(vertexLocation);
		gl.vertexAttribPointer(vertexLocation, 2, gl.FLOAT, false, 0, 0);

		// Render and read pixel
		const pixel = new Uint8Array(4);
		gl.useProgram(program);
		gl.viewport(0, 0, 1, 1);
		gl.bindTexture(gl.TEXTURE_2D, floatTexture);
		gl.drawArrays(gl.POINTS, 0, 1);
		gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixel);

		// Clean up resources
		gl.deleteFramebuffer(framebuffer);
		gl.deleteTexture(byteTexture);
		gl.deleteTexture(floatTexture);
		gl.deleteProgram(program);
		gl.deleteShader(vertexShader);
		gl.deleteShader(fragmentShader);
		if (buffer) gl.deleteBuffer(buffer);

		// Check if linear filtering worked
		return pixel[0] === 127 || pixel[0] === 128;
	} catch (error) {
		console.warn('OES_texture_float_linear support test failed:', error);
		return false;
	}
}

/**
 * Creates a new OES_texture_float_linear extension object
 */
function createExtension(): OESTextureFloatLinear {
	return {
		name: 'OES_texture_float_linear' as const
	};
}

/**
 * Type-safe wrapper for getExtension that preserves the original function signature
 */
function createGetExtension(
	original: WebGLRenderingContext['getExtension']
): WebGLRenderingContext['getExtension'] {
	return function (this: WebGLRenderingContext, extensionName: string) {
		if (extensionName === 'OES_texture_float_linear') {
			const ctx = this as { [key: string]: any };
			if (!ctx[OES_TEXTURE_FLOAT_LINEAR_KEY]) {
				ctx[OES_TEXTURE_FLOAT_LINEAR_KEY] = createExtension();
			}
			return ctx[OES_TEXTURE_FLOAT_LINEAR_KEY];
		}
		return original.call(this, extensionName as any);
	} as WebGLRenderingContext['getExtension'];
}

/**
 * Installs the OES_texture_float_linear polyfill if needed and supported
 */
export function installOESTextureFloatLinearPolyfill(): boolean {
	// Skip if not in browser environment
	if (typeof window === 'undefined' || !window.WebGLRenderingContext) {
		return false;
	}

	try {
		// Get test context
		const canvas = document.createElement('canvas');
		const gl = canvas.getContext('webgl');

		if (!gl) {
			return false;
		}

		// Skip if extension is already supported
		const extensions = gl.getSupportedExtensions();
		if (extensions?.includes('OES_texture_float_linear')) {
			return false;
		}

		// Test for support and install polyfill if supported
		if (supportsOESTextureFloatLinear(gl)) {
			const proto = WebGLRenderingContext.prototype;
			const originalGetExtension = proto.getExtension;
			const originalGetSupportedExtensions = proto.getSupportedExtensions;

			// Install type-safe patches
			proto.getExtension = createGetExtension(originalGetExtension);
			proto.getSupportedExtensions = function () {
				const extensions = originalGetSupportedExtensions.call(this);
				if (extensions && !extensions.includes('OES_texture_float_linear')) {
					extensions.push('OES_texture_float_linear');
				}
				return extensions;
			};

			return true;
		}
	} catch (error) {
		console.warn('Failed to install OES_texture_float_linear polyfill:', error);
	}

	return false;
}

/**
 * Checks if OES_texture_float_linear is supported (either natively or via polyfill)
 */
export function isOESTextureFloatLinearSupported(): boolean {
	try {
		const canvas = document.createElement('canvas');
		const gl = canvas.getContext('webgl');

		if (!gl) return false;

		const extensions = gl.getSupportedExtensions();
		return extensions?.includes('OES_texture_float_linear') || supportsOESTextureFloatLinear(gl);
	} catch (error) {
		console.warn('OES_texture_float_linear support check failed:', error);
		return false;
	}
}
