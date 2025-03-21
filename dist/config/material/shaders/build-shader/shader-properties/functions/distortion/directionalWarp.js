"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.directionalWarpVertex = exports.directionalWarpFrag = void 0;
exports.directionalWarpFrag = `
    vec4 directionalWarp (vec2 uv, float progress) {
    vec2 v = normalize(direction);
    v /= abs(v.x) + abs(v.y);
    float d = v.x * center.x + v.y * center.y;
    float m = 1.0 - smoothstep(-smoothness, 0.0, v.x * uv.x + v.y * uv.y - (d - 0.5 + progress * (1.0 + smoothness)));
    vec4 c1 = texture2D(image1, (uv - 0.5) * (1.0 - m) + 0.5);
    vec4 c2 = texture2D(image2, (uv - 0.5) * m + 0.5);
    return mix(c1, c2, m);
    }
`;
exports.directionalWarpVertex = `
    const vec2 center = vec2(0.5, 0.5);
    vec3 transition(vec2 uv, float progress) {
    vec2 v = normalize(direction);
    v /= abs(v.x) + abs(v.y);
    float d = v.x * center.x + v.y * center.y;
    float m = 1.0 - smoothstep(-smoothness, 0.0, v.x * uv.x + v.y * uv.y - (d - 0.5 + progress * (1.0 + smoothness)));
    vec3 c1 = texture2D(pos1, (uv - 0.5) * (1.0 - m) + 0.5);
    vec3 c2 = texture2D(pos2, (uv - 0.5) * m + 0.5);

    // Hack: Hard code the replacement of normals to the mangled node names
    vNormal = mix(vN1_1723231183772_83, vN2_1723231163841_63, m);

    return mix(c1, c2, m);
    }
`;
