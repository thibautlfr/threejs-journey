uniform float uTime;

uniform float uBigWavesElevation;
uniform vec2 uBigWavesFrequency;
uniform float uBigWavesSpeed;

varying float vElevation;

void main() {
  float speed = uTime * uBigWavesSpeed;
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  // Elevation
  float xElevation = sin(modelPosition.x * uBigWavesFrequency.x + speed);
  float zElevation = sin(modelPosition.z * uBigWavesFrequency.y + speed);

  float elevation = xElevation * zElevation * uBigWavesElevation;
    
  modelPosition.y += elevation;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;

  // Varyings
  vElevation = elevation;
}