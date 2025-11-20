import { OperatorConfig } from "../../../schema";
import { ShaderParameterMap, ConfiguredTransform } from "../../types";
import { OPERATOR_TYPES } from "../../../schema/operators";
import { splitValueTransform } from "../operators/splitValueTransform";
import { andFunctionTransform } from "../operators/andFunction";

export const applyEffectWrapper = (
  effectFunctionConfig: OperatorConfig,
  effectTransforms: ConfiguredTransform[],
  parameterMap: ShaderParameterMap
): ConfiguredTransform | null => {
  const { schemaId } = effectFunctionConfig;
  switch (schemaId) {
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
    case OPERATOR_TYPES.DEFAULT:
      return {
        guid: effectFunctionConfig.guid,
        outputConfigs: effectTransforms.flatMap(
          (transform) => transform.outputConfigs
        ),
        transformAssignments: effectTransforms.flatMap(
          (transform) => transform.transformAssignments
        ),
        transformDefinitions: effectTransforms.flatMap(
          (transform) => transform.transformDefinitions
        ),
      };
    default:
      return null;
  }
};
