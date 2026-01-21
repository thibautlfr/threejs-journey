precision mediump float;

uniform vec3 uColor; // our custom uniform
uniform sampler2D uTexture; // our custom uniform
varying vec2 vUv;

void main() {
  vec4 textureColor = texture2D(uTexture, vUv);
  gl_FragColor = textureColor;
}