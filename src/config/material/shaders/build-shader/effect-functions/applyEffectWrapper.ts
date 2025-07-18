import { EFFECT_FUNCTIONS } from ".";
import {
  OperatorConfig,
  ShaderParameterMap,
  TransformData,
} from "../buildShader.types";
import { andFunctionTransform } from "./transforms/andFunction";
import { splitValueTransform } from "./transforms/splitValueTransform";

export const applyEffectWrapper = (
  effectFunctionConfig: OperatorConfig,
  effectTransforms: (TransformData & { id: string })[],
  parameterMap: ShaderParameterMap
) => {
  const { functionId } = effectFunctionConfig;

  switch (functionId) {
    case EFFECT_FUNCTIONS.DEFAULT:
      return effectTransforms[0];
    case EFFECT_FUNCTIONS.SPLIT_VALUE:
      return splitValueTransform(
        effectTransforms,
        effectFunctionConfig,
        parameterMap
      );
    case EFFECT_FUNCTIONS.AND_FUNCTION:
      return andFunctionTransform(
        effectTransforms,
        effectFunctionConfig,
        parameterMap
      );
    default:
      return null;
  }
};
