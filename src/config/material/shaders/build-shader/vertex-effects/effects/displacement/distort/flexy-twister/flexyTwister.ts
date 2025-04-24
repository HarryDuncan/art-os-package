import {
  UniformConfig,
  ShaderFunction,
} from "../../../../../../../../../types/materials/shaders/buildShader.types";
import { SHADER_PROPERTY_VALUE_TYPES } from "../../../../../../../../../consts/materials/shader.consts";
import { twisterDistortion } from "../../../../../shader-properties/functions/distortion/distortion";
import { VERTEX_POINT_NAME } from "../../../../../../../../../consts/materials/vertexEffects.consts";

export const flexyTwister = (_effectProps: unknown) => {
  const uniformConfig = {
    defaultUniforms: [],
    customUniforms: [
      {
        id: "uTwistRange",
        valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
        value: 1.5,
      },
    ],
  } as UniformConfig;
  const requiredFunctions = [
    { id: "twister", functionDefinition: twisterDistortion },
  ] as ShaderFunction[];
  const transformation = `
     float howFarUp = position.y;

    float angle = sin(uTime) * uTwistRange;

    float twistAngle = angle * howFarUp;
    vec4 ${VERTEX_POINT_NAME} = twister( vec4( position, 1.0 ), twistAngle );
    vec4 twistNormal = twister( vec4( normal, 1.0 ), twistAngle );
    vec4 twistedNormal = twister( vec4( normal, 1.0 ), twistAngle );`;
  return {
    transformation,
    uniformConfig,

    requiredFunctions,
  };
};
