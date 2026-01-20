uniform mat4 projectionMatrix; // provided by Three.js
uniform mat4 viewMatrix; // provided by Three.js
uniform mat4 modelMatrix; // provided by Three.js

attribute vec3 position;
attribute float aRandom; // our custom attribute

varying float vRandom;

void main() {
  // gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
  
  vec4 modelPosition = modelMatrix * vec4(position, 1.0); 
  modelPosition.z += aRandom * 0.1; // modify the position based on the custom attribute
  
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
  vRandom = aRandom;
}