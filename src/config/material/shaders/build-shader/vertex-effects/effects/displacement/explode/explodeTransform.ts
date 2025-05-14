import { VERTEX_POINT_NAME } from "../../../vertexEffects.consts";
import {
  UniformValueConfig,
  TransformationConfig,
} from "../../../../../../../../types/materials/index";
import { generateVertexTransformation } from "../../../../helpers/generateTransform";

const explodeTransformConfig = {
  effectName: "explode",
  singleInstance: true,
  effectCode: [
    `${VERTEX_POINT_NAME}.x +=  cos(randomAngle * uTime) * uStrength ;`,
    `${VERTEX_POINT_NAME}.y +=  sin(randomAngle * uTime) * uStrength;`,
  ],
} as unknown as TransformationConfig;
export const explodeTransform = (uniforms: UniformValueConfig[]) => {
  const transformation = generateVertexTransformation(
    explodeTransformConfig,
    uniforms
  );
  console.log("transformation", transformation);
  return transformation;
};
