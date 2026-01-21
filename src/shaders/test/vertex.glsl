uniform mat4 projectionMatrix; // provided by Three.js
uniform mat4 viewMatrix; // provided by Three.js
uniform mat4 modelMatrix; // provided by Three.js
uniform vec2 uFrequency; // our custom uniform
uniform float uTime; // our custom uniform

attribute vec3 position;
attribute vec2 uv;

varying vec2 vUv;
varying float vElevation;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0); 

  float elevation = sin(modelPosition.x * uFrequency.x - uTime) * 0.1;
  elevation += sin(modelPosition.y * uFrequency.y - uTime) * 0.1;
  modelPosition.z += elevation;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;

  // Varyings
  vUv = uv;
  vElevation = elevation;
}