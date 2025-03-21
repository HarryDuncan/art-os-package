"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.twistTransformation = void 0;
const vertexEffects_consts_1 = require("../../../../vertexEffects.consts");
const twist_consts_1 = require("./twist.consts");
const twistTransformation = (_effectProps) => {
    const uniformConfig = twist_consts_1.TWIST_UNIFORM_CONFIG;
    const varyingConfig = twist_consts_1.TWIST_VARYINGS;
    const transformation = `

	float howFarUp = ${vertexEffects_consts_1.VERTEX_POINT_NAME}.y;
    vec3 cXaxis = vec3(1.0, 0.0, 0.0);
    vec3 cYaxis = vec3(0.0, 1.0, 0.0);
    vec3 cZaxis = vec3(0.0, 0.0, 1.0);
    vec3 directionVec = normalize(vec3(${vertexEffects_consts_1.VERTEX_POINT_NAME}.xyz));
    
	float xangle = dot(cXaxis, directionVec) * 5.0;
	float yangle = dot(cYaxis, directionVec) * 6.0;
	float zangle = dot(cZaxis, directionVec) * 4.5;
	float mTime = uTime * 1.05;
	
	float cosx = cos(mTime + xangle);
	float sinx = sin(mTime + xangle);
	float cosy = cos(mTime + yangle);
	float siny = sin(mTime + yangle);
	float cosz = cos(mTime + zangle);
	float sinz = sin(mTime + zangle);

    vec3 timeVec = ${vertexEffects_consts_1.VERTEX_POINT_NAME}.xyz;
	timeVec.x += directionVec.x * cosx * siny * cosz * uDistortStrength;
	timeVec.y += directionVec.y * sinx * cosy * sinz * uDistortStrength;
	timeVec.z += directionVec.z * sinx * cosy * cosz * uDistortStrength;

    
    float twistAngle = uDistortAngle * howFarUp;
    ${vertexEffects_consts_1.VERTEX_POINT_NAME} = twister( vec4( ${vertexEffects_consts_1.VERTEX_POINT_NAME}.xyz, 1.0 ), twistAngle ).xyz;
    vec4 twistedNormal = twister( vec4( normal, 1.0 ), twistAngle);
	`;
    return {
        transformation,
        uniformConfig,
        varyingConfig,
    };
};
exports.twistTransformation = twistTransformation;
