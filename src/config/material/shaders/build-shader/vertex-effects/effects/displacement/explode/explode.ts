import { VERTEX_POINT_NAME } from "../../../vertexEffects.consts";
import { TransformationConfig } from "../../../../../../../../types/materials/index";
import { generateShaderTransformationOld } from "../../../../helpers/generateTransform";
import { VertexEffectProps } from "../../../vertexEffects.types";

const explodeTransformConfig = {
  effectName: "explode",
  singleInstance: true,
  effectCode: [
    `${VERTEX_POINT_NAME}.x +=  cos(randomAngle * uTime) * uStrength ;`,
    `${VERTEX_POINT_NAME}.y +=  sin(randomAngle * uTime) * uStrength;`,
  ],
} as unknown as TransformationConfig;
export const explode = (effectProps: VertexEffectProps) => {
  const { effectParameters } = effectProps;
  const transformation = generateShaderTransformationOld(
    explodeTransformConfig,
    effectParameters
  );
  return { transformation };
};
