export const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const fragmentShader = /* glsl */ `
  uniform sampler2D uTexture;
  uniform vec2 uPointer;
  uniform vec2 uResolution;
  uniform vec2 uImageSize;
  uniform float uTime;
  uniform float uHover;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    float viewAspect = uResolution.x / uResolution.y;
    float imageAspect = uImageSize.x / uImageSize.y;
    vec2 cover = vec2(min(viewAspect / imageAspect, 1.0), min(imageAspect / viewAspect, 1.0));
    vec2 delta = (uv - uPointer) * vec2(viewAspect, 1.0);
    float distanceFromPointer = length(delta);
    float falloff = exp(-distanceFromPointer * 5.5);
    float wave = sin(distanceFromPointer * 35.0 - uTime * 4.0) * falloff;
    vec2 direction = normalize(delta + vec2(0.0001));
    uv += direction * wave * 0.026 * uHover;
    uv = (uv - 0.5) * cover + 0.5;
    gl_FragColor = texture2D(uTexture, clamp(uv, vec2(0.001), vec2(0.999)));
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;
