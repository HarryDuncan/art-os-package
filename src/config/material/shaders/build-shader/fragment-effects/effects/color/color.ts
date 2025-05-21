import { FRAG_COLOR_NAME } from "../../../../../../../consts";
import { TransformationConfig } from "../../../buildShader.types";
import { generateShaderTransformation } from "../../../helpers/generateTransform";
import { FragmentEffectProps } from "../../fragmentShader.types";

const colorTransformationConfig = {
  effectName: "pointMaterial",
  instantiationName: "",
  singleInstance: true,
  allowedValueTypes: [],
  prefix: "",
  effectCode: [`${FRAG_COLOR_NAME} = uColor;`],
} as unknown as TransformationConfig;

export const color = (effectProps: FragmentEffectProps) => {
  const { effectUniforms } = effectProps;
  const transformation = generateShaderTransformation(
    colorTransformationConfig,
    effectUniforms
  );
  return { transformation };
};
