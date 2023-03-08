uniform vec3 color;
uniform sampler2D tDiffuse;
uniform sampler2D tDudv;
uniform float time;
uniform float waveStrength;
uniform float waveSpeed;
uniform float transmission;

varying vec4 vUv;

#include <logdepthbuf_pars_fragment>

void main() {
  #include <logdepthbuf_fragment>
  // simple distortion (ripple) via dudv map (see https://www.youtube.com/watch?v=6B7IF6GOu7s)
  vec2 distortedUv = texture2D( tDudv, vec2( vUv.x + time * waveSpeed, vUv.y ) ).rg * waveStrength;
  distortedUv = vUv.xy + vec2( distortedUv.x, distortedUv.y + time * waveSpeed );
  vec2 distortion = ( texture2D( tDudv, distortedUv ).rg * 2.0 - 1.0 ) * waveStrength;
  // new uv coords
  vec4 uv = vec4( vUv );
  uv.xy += distortion;


  vec4 base = texture2DProj( tDiffuse, uv );
  gl_FragColor = vec4( mix( base.rgb, color, transmission ), 1.0 );
  #include <tonemapping_fragment>
  #include <encodings_fragment>
}