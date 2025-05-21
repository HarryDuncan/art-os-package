import { TransformationConfig } from "../../../buildShader.types";
import { generateShaderTransformation } from "../../../helpers/generateTransform";
import { VERTEX_POINT_NAME } from "../../vertexEffects.consts";
import { VertexEffectProps } from "../../vertexEffects.types";
const rotationTransformConfig = {
  effectName: "rotation",
  singleInstance: true,
  effectCode: [
    `float angle = uTime * uRotationSpeed;`,
    `mat4 rotationMatrix = mat4(1.0);`,
    `rotationMatrix[0][0] = cos(angle) + (1.0 - cos(angle)) * uRotationAxis.x * uRotationAxis.x;`,
    `rotationMatrix[0][1] = (1.0 - cos(angle)) * uRotationAxis.x * uRotationAxis.y - sin(angle) * uRotationAxis.z;`,
    `rotationMatrix[0][2] = (1.0 - cos(angle)) * uRotationAxis.x * uRotationAxis.z + sin(angle) * uRotationAxis.y;`,
    `rotationMatrix[1][0] = (1.0 - cos(angle)) * uRotationAxis.y * uRotationAxis.x + sin(angle) * uRotationAxis.z;`,
    `rotationMatrix[1][1] = cos(angle) + (1.0 - cos(angle)) * uRotationAxis.y * uRotationAxis.y;`,
    `rotationMatrix[1][2] = (1.0 - cos(angle)) * uRotationAxis.y * uRotationAxis.z - sin(angle) * uRotationAxis.x;`,
    `rotationMatrix[2][0] = (1.0 - cos(angle)) * uRotationAxis.z * uRotationAxis.x - sin(angle) * uRotationAxis.y;`,
    `rotationMatrix[2][1] = (1.0 - cos(angle)) * uRotationAxis.z * uRotationAxis.y + sin(angle) * uRotationAxis.x;`,
    `rotationMatrix[2][2] = cos(angle) + (1.0 - cos(angle)) * uRotationAxis.z * uRotationAxis.z;`,
    `${VERTEX_POINT_NAME} = (rotationMatrix * ${VERTEX_POINT_NAME});`,
  ],
} as unknown as TransformationConfig;

export const rotationEffect = (effectProps: VertexEffectProps) => {
  const { effectUniforms } = effectProps;
  const transformation = generateShaderTransformation(
    rotationTransformConfig,
    effectUniforms
  );
  return { transformation };
};
