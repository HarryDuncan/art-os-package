"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.textureLevel = exports.matcapFunction = void 0;
exports.matcapFunction = ` vec2 matcapFunction(vec3 eye, vec3 normal) {
    vec3 reflected = reflect(eye, normal);
    float m = 2.8284271247461903 * sqrt( reflected.z+1.0 );
    return reflected.xy / m + 0.5;
}`;
exports.textureLevel = `float textureLevel(in sampler2D sampler, in vec2 v_st){
    vec2 size = vec2(textureSize(sampler, 0));

    float levelCount = max(log2(size.x), log2(size.y));

    vec2 dx = dFdx(v_st * size);
    vec2 dy = dFdy(v_st * size);
    float d = max(dot(dx, dx), dot(dy, dy));

    d = clamp(d, 1.0, pow(2.0, (levelCount - 1.0) * 2.0));

    return 0.5 * log2(d);
}`;
