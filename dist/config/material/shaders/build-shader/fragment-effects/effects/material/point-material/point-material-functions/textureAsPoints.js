"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.textureAsPoints = void 0;
const fragmentEffects_consts_1 = require("../../../../fragmentEffects.consts");
const textureAsPoints = (_effectProps) => {
    const transformation = `
        vec4 color = vec4(0.0);
	vec2 uv = vUv;
	vec2 puv = vPUv;

	// pixel color
	vec4 colA = texture2D(uTexture, puv);

	// greyscale
	float grey = colA.r * 0.21 + colA.g * 0.71 + colA.b * 0.07;
	vec4 colB = vec4(colA.rgb, 1.0);

	// circle
	float border = 0.3;
	float radius = 0.5;
	float dist = radius - distance(uv, vec2(0.5));
	float t = smoothstep(0.0, border, dist);

	// final color
	color = colB;
	color.a = t;
    ${fragmentEffects_consts_1.FRAG_COLOR_NAME} = color;
    `;
    return { transformation };
};
exports.textureAsPoints = textureAsPoints;
