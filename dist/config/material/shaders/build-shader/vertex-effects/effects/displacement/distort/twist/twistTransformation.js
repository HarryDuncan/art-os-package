import { VERTEX_POINT_NAME } from "../../../../vertexEffects.consts";
import { TWIST_UNIFORM_CONFIG, TWIST_VARYINGS } from "./twist.consts";
export const twistTransformation = (_effectProps) => {
    const uniformConfig = TWIST_UNIFORM_CONFIG;
    const varyingConfig = TWIST_VARYINGS;
    const transformation = `

	float howFarUp = ${VERTEX_POINT_NAME}.y;
    vec3 cXaxis = vec3(1.0, 0.0, 0.0);
    vec3 cYaxis = vec3(0.0, 1.0, 0.0);
    vec3 cZaxis = vec3(0.0, 0.0, 1.0);
    vec3 directionVec = normalize(vec3(${VERTEX_POINT_NAME}.xyz));
    
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

    vec3 timeVec = ${VERTEX_POINT_NAME}.xyz;
	timeVec.x += directionVec.x * cosx * siny * cosz * uDistortStrength;
	timeVec.y += directionVec.y * sinx * cosy * sinz * uDistortStrength;
	timeVec.z += directionVec.z * sinx * cosy * cosz * uDistortStrength;

    
    float twistAngle = uDistortAngle * howFarUp;
    ${VERTEX_POINT_NAME} = twister( vec4( ${VERTEX_POINT_NAME}.xyz, 1.0 ), twistAngle ).xyz;
    vec4 twistedNormal = twister( vec4( normal, 1.0 ), twistAngle);
	`;
    return {
        transformation,
        uniformConfig,
        varyingConfig,
    };
};
