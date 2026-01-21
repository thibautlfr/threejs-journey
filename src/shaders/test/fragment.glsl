uniform vec3 uColor; // our custom uniform
uniform sampler2D uTexture; // our custom uniform

varying vec2 vUv;
varying float vElevation;

void main() {
  vec4 textureColor = texture2D(uTexture, vUv);
  textureColor.rgb *= vElevation * 2.0 + 0.8;

  gl_FragColor = textureColor;
}