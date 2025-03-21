"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alienTransform = void 0;
const vertexEffects_consts_1 = require("../../../vertexEffects.consts");
const alienTransform = () => `
	float shift = 2.0
			* cnoise(vec2(3.0 * cos(atan(${vertexEffects_consts_1.VERTEX_POINT_NAME}.z, ${vertexEffects_consts_1.VERTEX_POINT_NAME}.x)), 2.0 * uTime + 3.0 * acos(${vertexEffects_consts_1.VERTEX_POINT_NAME}.y / uRadius)));
	vec4 ${vertexEffects_consts_1.VERTEX_POINT_NAME} = ${vertexEffects_consts_1.VERTEX_POINT_NAME} + normal * shift;
`;
exports.alienTransform = alienTransform;
