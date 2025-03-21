"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transition = exports.sinNoise = exports.frostedTips = exports.displaceByNoise = exports.wavePattern = exports.fitPosition = exports.smoothMod = exports.twisterDistortion = void 0;
exports.twisterDistortion = `
vec4 twister( vec4 pos, float t ) {
	float st = sin(t);
	float ct = cos(t);
	vec4 new_pos = vec4( pos );
	
	new_pos.x = pos.x*ct - pos.z*st;
	new_pos.z = pos.x*st + pos.z*ct;
	
	new_pos.y = pos.y;
	new_pos.w = pos.w;

	return new_pos;
}`;
exports.smoothMod = `float smoothMod(float axis, float amp, float rad){
    float top = cos(3.1415926535897932384626433832795 * (axis / amp)) * sin(3.1415926535897932384626433832795 * (axis / amp));
    float bottom = pow(sin(3.1415926535897932384626433832795 * (axis / amp)), 2.0) + pow(rad, 2.0);
    float at = atan(top / bottom);
    return amp * (1.0 / 2.0) - (1.0 / 3.1415926535897932384626433832795) * at;
}`;
exports.fitPosition = `float fitPosition(float unscaled, float originalMin, float originalMax, float minAllowed, float maxAllowed) {
  return (maxAllowed - minAllowed) * (unscaled - originalMin) / (originalMax - originalMin) + minAllowed;
}`;
exports.wavePattern = `float wavePattern(vec3 position) {
  return fitPosition(smoothMod(position.y * uDensity, 1.0, 1.5), 0.35, 0.73, 0.0, 1.0);
}`;
exports.displaceByNoise = `float displaceByNoise(vec3 point) {
	vec3 coords = point;
	coords.xy += 1.0 * uTime;
	vec3 noisePattern = vec3(transitionalNoise(coords * 2.));
	float pattern = wavePattern(noisePattern);
	return pattern;
  }`;
exports.frostedTips = `vec4 frostedTips(vec2 vUv) {
	float displaced = displaceByNoise(vPosition);
	float colorOut = clamp((displaced - 0.5) * 10.0, 0.0, 1.0);
	return vec4(uInColor * vec3(colorOut), 1.0);
  }`;
exports.sinNoise = `vec4 sinNoise(vec2 vUv) {
	vec2 position = vUv * uResolution;
	float color = normSin(30.3 * position.x + interpolate(normSin(25. * position.y + 10.0), 11.0, 25.0) + 
			      30. * position.y + interpolate(normSin(25. * position.x + 10.0), 5.0, 25.) + 2. * uTime);
	vec3 mixt = mix(vec3(0.0), uSinColor, (vDisplacement * 9.0));
	mixt = vec3(vDisplacement) * uSinBrightness;
	return vec4(clamp(uSinColor * mixt, vec3(0.0), vec3(1.0)), 1.0 );
}`;
exports.transition = `vec4 transition(vec2 uv, float progress) {
	vec2 v = normalize(uDirection);
	v /= abs(v.x) + abs(v.y);
	vec2 center = vec2(0.5, 0.5);
	float d = v.x * center.x + v.y * center.y;
	float m = 1.0 - smoothstep(-uSmoothness, 0.0, v.x * uv.x + v.y * uv.y - (d - 0.5 + progress * (1.0 + uSmoothness)));
	vec4 c1 = frostedTips((uv - 0.5) * (1.0 - m) + 0.5);
	vec4 c2 = sinNoise((uv - 0.5) * m + 0.5);
	return mix(c1, c2, m);
  }`;
