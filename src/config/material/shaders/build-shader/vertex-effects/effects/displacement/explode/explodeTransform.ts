import { VERTEX_POINT_NAME } from "../../../../../../../../consts/materials/vertexEffects.consts";
import { SHADER_PROPERTY_VALUE_TYPES } from "../../../../constants/shader.consts";
import {
  UniformValueConfig,
  VertexTransformationConfig,
} from "../../../../../../../../types/materials/index";
import { generateVertexTransformation } from "../../../../helpers/generateTransform";

const explodeTransformConfig = {
  effectName: "explode",
  instantiationName: "displacedPosition",
  instantiationType: SHADER_PROPERTY_VALUE_TYPES.VEC3,
  instantiationValue: `vec3(${VERTEX_POINT_NAME}.xy, 0)`,
  allowedValueTypes: [
    SHADER_PROPERTY_VALUE_TYPES.VEC2,
    SHADER_PROPERTY_VALUE_TYPES.VEC3,
  ],
  prefix: "float isAffected = 0.0;",
  effectCode: [
    `vec3 {{effectDistanceVector}} =  {{EFFECT}} - {{displacedPosition}};`,
    `float {{effectDistanceLength}} = length({{effectDistanceVector}});`,
    `if({{effectDistanceLength}} <= uMinDistance * uStrength){`,
    `float {{effectDirection}} = sign({{effectDistanceVector}}.x);`,
    `if({{effectDirection}} == 0.0){`,
    `{{effectDirection}} = -1.0;`,
    `}`,

    `${VERTEX_POINT_NAME}.x +=  cos(randomAngle * uTime) * uStrength * {{effectDirection}};`,
    `${VERTEX_POINT_NAME}.y +=  sin(randomAngle * uTime) * uStrength * {{effectDirection}};`,
    `isAffected = 1.0;`,
    `}`,
  ],
} as unknown as VertexTransformationConfig;
export const explodeTransform = (uniforms: UniformValueConfig[]) => {
  const transformation = generateVertexTransformation(
    explodeTransformConfig,
    uniforms
  );
  return transformation;
};
