uniform mat4 projectionMatrix; // provided by Three.js
uniform mat4 viewMatrix; // provided by Three.js
uniform mat4 modelMatrix; // provided by Three.js

attribute vec3 position;

void main() {
  // gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
  
  vec4 modelPosition = modelMatrix * vec4(position, 1.0); 
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;

}