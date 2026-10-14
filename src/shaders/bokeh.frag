precision highp float;

varying vec2 vUv;
varying float vDepth;

uniform sampler2D u_texture;
uniform float u_focalDepth;
uniform float u_aperture;
uniform float u_intensity;
uniform vec2 u_resolution;

// 16-tap disc kernel for hexagonal bokeh
const int SAMPLES = 16;
vec2 poissonDisk[16];

void initPoisson() {
  poissonDisk[0]  = vec2(-0.94201624, -0.39906216);
  poissonDisk[1]  = vec2( 0.94558609, -0.76890725);
  poissonDisk[2]  = vec2(-0.09418410, -0.92938870);
  poissonDisk[3]  = vec2( 0.34495938,  0.29387760);
  poissonDisk[4]  = vec2(-0.91588581,  0.45771432);
  poissonDisk[5]  = vec2(-0.81544232, -0.87912464);
  poissonDisk[6]  = vec2(-0.38277543,  0.27676845);
  poissonDisk[7]  = vec2( 0.97484398,  0.75648379);
  poissonDisk[8]  = vec2( 0.44323325, -0.97511554);
  poissonDisk[9]  = vec2( 0.53742981, -0.47373420);
  poissonDisk[10] = vec2(-0.26496911, -0.41893023);
  poissonDisk[11] = vec2( 0.79197514,  0.19090188);
  poissonDisk[12] = vec2(-0.24188840,  0.99706507);
  poissonDisk[13] = vec2(-0.81409955,  0.91437590);
  poissonDisk[14] = vec2( 0.19984126,  0.78641367);
  poissonDisk[15] = vec2( 0.14383161, -0.14100790);
}

void main() {
  initPoisson();
  
  // Circle of confusion based on depth difference
  float coc = abs(vDepth - u_focalDepth) * u_aperture;
  coc = clamp(coc, 0.0, 1.0);
  
  // Apply blur intensity  
  float blurRadius = coc * u_intensity * 8.0;
  vec2 texelSize = 1.0 / u_resolution;
  
  vec4 color = vec4(0.0);
  float totalWeight = 0.0;
  
  if (blurRadius < 0.5) {
    // Sharp — no blur needed
    color = texture2D(u_texture, vUv);
    totalWeight = 1.0;
  } else {
    // Poisson disc sampling for smooth bokeh
    for (int i = 0; i < SAMPLES; i++) {
      vec2 offset = poissonDisk[i] * texelSize * blurRadius;
      vec2 sampleUV = clamp(vUv + offset, 0.0, 1.0);
      vec4 sampleColor = texture2D(u_texture, sampleUV);
      
      // Weight brighter samples more for bokeh highlight effect
      float luminance = dot(sampleColor.rgb, vec3(0.299, 0.587, 0.114));
      float weight = 1.0 + luminance * 2.0 * coc;
      
      color += sampleColor * weight;
      totalWeight += weight;
    }
  }
  
  gl_FragColor = color / totalWeight;
}
