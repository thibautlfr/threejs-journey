precision mediump float;

uniform vec3 uColor; // our custom uniform

void main() {
  gl_FragColor = vec4(uColor, 1.0);
}