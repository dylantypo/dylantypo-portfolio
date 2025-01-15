// shaders.ts
// Common shader utilities
const COMMON_UNIFORMS = `
    uniform float uTime;
    uniform vec2 texelSize;
`;

const COMMON_VARYINGS = `
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
`;

// Core shaders
export const VERTEX_SHADER = `
    precision highp float;
    attribute vec4 position;
    ${COMMON_VARYINGS}
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

export const FRAGMENT_SHADER = `
    precision highp float;
    ${COMMON_VARYINGS}
    ${COMMON_UNIFORMS}
    uniform sampler2D uTexture;
    uniform vec3 uLightPosition;
    uniform vec3 uGlobeDeformation;

    const vec3 DEEP_WATER = vec3(0.0, 0.05, 0.2);
    const vec3 SHALLOW_WATER = vec3(0.0, 0.5, 1.0);
    const float SURFACE_TENSION = 0.08;

    #include "./shaderUtils/waterCalculations.glsl"
    
    void main() {
        vec4 center = texture2D(uTexture, vUv);
        vec4 left = texture2D(uTexture, vL);
        vec4 right = texture2D(uTexture, vR);
        vec4 top = texture2D(uTexture, vT);
        vec4 bottom = texture2D(uTexture, vB);

        float depth = calculateWaterDepth(center, left, right, top, bottom);
        vec3 waterColor = calculateWaterColor(depth);
        float causticIntensity = calculateCaustics(depth, uLightPosition);
        vec3 deformedNormal = calculateDeformation(depth, uGlobeDeformation);
        
        gl_FragColor = vec4(waterColor + causticIntensity * vec3(0.2, 0.3, 0.4), 0.9);
    }
`;

export const NORMAL_SHADER = `
    precision highp float;
    ${COMMON_VARYINGS}
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

export const CAUSTICS_SHADER = `
    precision highp float;
    ${COMMON_VARYINGS}
    ${COMMON_UNIFORMS}
    uniform sampler2D uTexture;
    
    void main() {
        vec3 normal = texture2D(uTexture, vUv).xyz * 2.0 - 1.0;
        vec3 light = normalize(vec3(0.0, 1.0, 0.0));
        float caustic = pow(max(0.0, dot(normal, light)), 4.0);
        
        vec2 p = vUv * 2.0 - 1.0;
        float dist = length(p);
        caustic *= smoothstep(1.0, 0.0, dist) * 
                  (1.0 + 0.2 * sin(dist * 20.0 - uTime));
        
        gl_FragColor = vec4(vec3(caustic), 1.0);
    }
`;

// Group shaders for easier access
export const SHADERS = {
	vertex: VERTEX_SHADER,
	fragment: FRAGMENT_SHADER,
	normal: NORMAL_SHADER,
	caustics: CAUSTICS_SHADER
} as const;

// Types for shader uniforms
export interface ShaderUniforms {
	uTime: WebGLUniformLocation | null;
	uTexture: WebGLUniformLocation | null;
	texelSize: WebGLUniformLocation | null;
	uLightPosition?: WebGLUniformLocation | null;
	uGlobeDeformation?: WebGLUniformLocation | null;
}
