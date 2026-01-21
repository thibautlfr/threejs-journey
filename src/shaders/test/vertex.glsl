uniform mat4 projectionMatrix; // provided by Three.js
uniform mat4 viewMatrix; // provided by Three.js
uniform mat4 modelMatrix; // provided by Three.js
uniform vec2 uFrequency; // our custom uniform
uniform float uTime; // our custom uniform

attribute vec3 position;

void main() {
  // gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
  
  vec4 modelPosition = modelMatrix * vec4(position, 1.0); 
  modelPosition.z += sin(modelPosition.x * uFrequency.x - uTime) * 0.1; // modify the position based on the custom attribute
  modelPosition.z += sin(modelPosition.y * uFrequency.y - uTime) * 0.1; // modify the position based on the custom attribute

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}