import { OperatorConfig } from "../../../schema";
import { ShaderParameterMap, TransformData } from "../../types";
import { applyEffectWrapper } from "./operators/applyOperator";
import { generateShaderTransformData } from "./transformData";

export const transformSetup = (
  wrapperFunction: OperatorConfig,
  parameterMap: ShaderParameterMap
): TransformData | null => {
  const { effects } = wrapperFunction;
  const effectTransformationData =
    effects?.flatMap((effect) => {
      const data = generateShaderTransformData(effect, parameterMap);
      if (data) {
        return {
          id: effect.guid,
          ...data,
        };
      }
      return [];
    }) || [];

  return applyEffectWrapper(
    wrapperFunction,
    effectTransformationData,
    parameterMap
  );
};
