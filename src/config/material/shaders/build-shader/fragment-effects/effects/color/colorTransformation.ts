import { FRAG_COLOR_NAME } from "../../../../../../../consts";
import {
  TransformationConfig,
  UniformValueConfig,
} from "../../../buildShader.types";
import { generateShaderTransformation } from "../../../helpers/generateTransform";

const colorTransformationConfig = {
  effectName: "pointMaterial",
  instantiationName: "",
  singleInstance: true,
  allowedValueTypes: [],
  prefix: "",
  effectCode: [`${FRAG_COLOR_NAME} = uColor;`],
} as unknown as TransformationConfig;

export const colorTransformation = (
  configuredUniforms: UniformValueConfig[]
) => {
  const transformation = generateShaderTransformation(
    colorTransformationConfig,
    configuredUniforms
  );
  return transformation;
};
