/** @resolution */
uniform vec2 u_resolution;

/** @time */
uniform float u_time;

/**
 * @label Scan Speed
 * @default 0.16
 * @range 0, 1
 */
uniform float u_speed;

/**
 * @label Grid Size
 * @default 58
 * @range 20, 140
 */
uniform float u_grid;

/**
 * @label Signal Strength
 * @default 0.75
 * @range 0, 1.5
 */
uniform float u_signalStrength;

/**
 * @label Background
 * @color
 * @default #050506
 */
uniform vec3 u_background;

/**
 * @label Grid Color
 * @color
 * @default #3b312a
 */
uniform vec3 u_gridColor;

/**
 * @label Scan Color
 * @color
 * @default #c81d2b
 */
uniform vec3 u_scanColor;

float lineMask(float v, float width) {
  float d = abs(fract(v) - 0.5);
  return 1.0 - smoothstep(width, width + 0.02, d);
}

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  vec2 p = uv - 0.5;
  p.x *= u_resolution.x / u_resolution.y;
  float t = u_time * u_speed;
  float depth = max(0.08, uv.y + 0.08);
  vec2 perspective = vec2(p.x / depth, 1.0 / depth);
  float gx = lineMask(perspective.x * u_resolution.y / u_grid, 0.47);
  float gy = lineMask(perspective.y * 0.8, 0.475);
  float floorMask = smoothstep(0.48, 0.86, uv.y);
  float grid = max(gx, gy) * floorMask;
  float r = length(p);
  float ring1 = 1.0 - smoothstep(0.006, 0.012, abs(r - 0.30));
  float ring2 = 1.0 - smoothstep(0.004, 0.01, abs(r - 0.48));
  float angle = atan(p.y, p.x);
  float sweepAngle = mod(angle - t * 2.0 + 6.28318, 6.28318);
  float sweep = exp(-sweepAngle * 4.5) * smoothstep(0.55, 0.08, r);
  float scanY = exp(-abs(uv.y - fract(t * 0.4 + 0.12)) * 90.0);
  float axis = exp(-abs(p.x) * 420.0) + exp(-abs(p.y) * 420.0);
  vec3 color = u_background;
  color += u_gridColor * grid * 0.55;
  color += u_scanColor * (ring1 * 0.18 + ring2 * 0.12 + sweep * 0.32 + scanY * 0.16 + axis * 0.08) * u_signalStrength;
  float centerShield = smoothstep(0.0, 0.34, r);
  color *= mix(0.58, 1.0, centerShield);
  color += (hash(gl_FragCoord.xy + floor(t * 20.0)) - 0.5) * 0.018;
  gl_FragColor = vec4(max(color, 0.0), 1.0);
}
