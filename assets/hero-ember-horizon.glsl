/** @resolution */
uniform vec2 u_resolution;

/** @time */
uniform float u_time;

/**
 * @label Motion Speed
 * @default 0.18
 * @range 0, 1
 */
uniform float u_speed;

/**
 * @label Horizon Height
 * @default 0.47
 * @range 0.2, 0.8
 */
uniform float u_horizon;

/**
 * @label Band Density
 * @default 8
 * @range 2, 18
 */
uniform float u_density;

/**
 * @label Glow
 * @default 0.7
 * @range 0, 1.5
 */
uniform float u_glow;

/**
 * @label Base Color
 * @color
 * @default #050506
 */
uniform vec3 u_base;

/**
 * @label Deep Red
 * @color
 * @default #541118
 */
uniform vec3 u_deep;

/**
 * @label Signal Red
 * @color
 * @default #c81d2b
 */
uniform vec3 u_signal;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  float aspect = u_resolution.x / u_resolution.y;
  vec2 p = vec2((uv.x - 0.5) * aspect, uv.y - u_horizon);
  float t = u_time * u_speed;
  float warp = (noise(vec2(uv.x * 3.0 + t, uv.y * 2.0)) - 0.5) * 0.08;
  float horizon = exp(-abs(p.y + warp) * 12.0);
  float bands = 0.5 + 0.5 * sin((uv.y + warp) * u_density * 6.28318 - t * 4.0);
  bands = pow(bands, 7.0) * smoothstep(0.58, 0.1, abs(p.y));
  float streak = pow(max(0.0, sin((uv.x * 2.4 + noise(vec2(uv.y * 8.0, t))) * 6.28318)), 10.0);
  streak *= smoothstep(0.38, 0.02, abs(p.y));
  float radial = exp(-length(vec2(p.x * 0.55, p.y * 1.4)) * 2.0);
  vec3 color = mix(u_base, u_deep, radial * 0.9 + horizon * 0.35);
  color += u_signal * (horizon * 0.28 + bands * 0.18 + streak * 0.12) * u_glow;
  float scan = 0.025 * sin(gl_FragCoord.y * 1.2);
  float grain = (hash(gl_FragCoord.xy + floor(t * 24.0)) - 0.5) * 0.035;
  float vignette = smoothstep(0.95, 0.18, length((uv - 0.5) * vec2(1.05, 1.35)));
  color = color * (0.7 + 0.3 * vignette) + scan + grain;
  gl_FragColor = vec4(max(color, 0.0), 1.0);
}
