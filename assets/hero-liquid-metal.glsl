/** @resolution */
uniform vec2 u_resolution;

/** @time */
uniform float u_time;

/**
 * @label Motion Speed
 * @default 0.12
 * @range 0, 1
 */
uniform float u_speed;

/**
 * @label Surface Scale
 * @default 2.4
 * @range 0.5, 6
 */
uniform float u_scale;

/**
 * @label Reflection Strength
 * @default 0.85
 * @range 0, 1.5
 */
uniform float u_reflection;

/**
 * @label Black Paint
 * @color
 * @default #050506
 */
uniform vec3 u_black;

/**
 * @label Metal Highlight
 * @color
 * @default #c7ad7b
 */
uniform vec3 u_metal;

/**
 * @label Red Reflection
 * @color
 * @default #c81d2b
 */
uniform vec3 u_red;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 345.45));
  p += dot(p, p + 34.345);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec2(13.2, 7.7);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  vec2 p = uv - 0.5;
  p.x *= u_resolution.x / u_resolution.y;
  float t = u_time * u_speed;
  vec2 q = vec2(fbm(p * u_scale + vec2(t, 0.0)), fbm(p * u_scale + vec2(4.2, 1.7 - t)));
  vec2 r = vec2(fbm(p * u_scale + 2.2 * q + vec2(1.7, 9.2)), fbm(p * u_scale + 2.2 * q + vec2(8.3, 2.8)));
  float field = fbm(p * u_scale + 3.0 * r);
  float ridge = pow(1.0 - abs(field * 2.0 - 1.0), 5.0);
  float sweep = pow(max(0.0, sin((p.x * 0.8 + p.y * 1.8 + field + t) * 8.0)), 12.0);
  float redBand = exp(-abs(p.y + 0.08 + 0.18 * sin(p.x * 2.5 + t)) * 8.0);
  vec3 color = u_black;
  color += u_metal * ridge * 0.42 * u_reflection;
  color += vec3(0.22, 0.24, 0.27) * sweep * 0.5 * u_reflection;
  color += u_red * redBand * (0.08 + 0.18 * field);
  float centerShade = smoothstep(0.0, 0.42, length(p * vec2(0.7, 1.15)));
  color *= mix(0.55, 1.0, centerShade);
  float grain = (hash(gl_FragCoord.xy + floor(t * 20.0)) - 0.5) * 0.025;
  gl_FragColor = vec4(max(color + grain, 0.0), 1.0);
}
