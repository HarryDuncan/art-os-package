import { OperatorConfig } from "../../../../schema";
import { TransformData, ShaderParameterMap } from "../../../types";
import { andFunctionTransform } from "./andFunction";
import { splitValueTransform } from "./splitValueTransform";
import { OPERATOR_TYPES } from "../../../../schema/operators";

export const applyEffectWrapper = (
  effectFunctionConfig: OperatorConfig,
  effectTransforms: (TransformData & { id: string })[],
  parameterMap: ShaderParameterMap
): TransformData | null => {
  const { functionId } = effectFunctionConfig;

  switch (functionId) {
    case OPERATOR_TYPES.DEFAULT:
      return effectTransforms[0];
    case OPERATOR_TYPES.SPLIT_VALUE:
      return splitValueTransform(
        effectTransforms,
        effectFunctionConfig,
        parameterMap
      );
    case OPERATOR_TYPES.AND:
      return andFunctionTransform(
        effectTransforms,
        effectFunctionConfig,
        parameterMap
      );
    default:
      return null;
  }
};
