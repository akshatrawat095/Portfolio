varying vec2 vUv;
varying float vDepth;
uniform float u_depth;

void main() {
  vUv = uv;
  vDepth = u_depth;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
