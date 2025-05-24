import { FRAG_COLOR_NAME } from "../../../../../../../consts";
import { TransformationConfig } from "../../../buildShader.types";
// import { generateShaderTransformationOld } from "../../../helpers/generateTransform";
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
  const { effectParameters } = effectProps;
  // const transformation = generateShaderTransformationOld(
  //   colorTransformationConfig,
  //   effectParameters
  //  );
  return { transformation: "" };
};
