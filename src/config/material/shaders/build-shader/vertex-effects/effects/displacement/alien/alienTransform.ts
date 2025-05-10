import { VERTEX_POINT_NAME } from "../../../vertexEffects.consts";

export const alienTransform = () => `
	float shift = 2.0
			* cnoise(vec2(3.0 * cos(atan(${VERTEX_POINT_NAME}.z, ${VERTEX_POINT_NAME}.x)), 2.0 * uTime + 3.0 * acos(${VERTEX_POINT_NAME}.y / uRadius)));
	vec4 ${VERTEX_POINT_NAME} = ${VERTEX_POINT_NAME} + normal * shift;
`;
