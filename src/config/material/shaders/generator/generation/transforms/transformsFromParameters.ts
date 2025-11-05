import { ParameterConfig, ShaderEffectConfig } from "../../../schema";
import { transformationConfigFromFunctionParameter } from "./formatting/transformConfig";
import { functionInstantiation } from "../helpers/functionInstantiation";
import { ShaderParameterMap } from "../../types";
import { transformFunction } from "./formatting/transformFunction";

export const transformsFromParameters = (
  parameters: ParameterConfig[],
  parameterMap: ShaderParameterMap
) => {
  const functionParameters = parameters.filter((item) => item.isFunctionBased);

  const transformConfigs = functionParameters.flatMap((item) => {
    return transformationConfigFromFunctionParameter(item, parameterMap) ?? [];
  });

  const transformFunctions = transformFunction(transformConfigs, {
    id: "effectId",
  } as unknown as ShaderEffectConfig);

  const functionInstantiations = transformFunctions.flatMap(
    ({ outputConfig, functionName, inputMap, isSubFunction }) => {
      return !isSubFunction
        ? functionInstantiation(
            outputConfig,
            functionName,
            inputMap,
            "effectId"
          )
        : [];
    }
  );

  return { functionInstantiations, transformFunctions };
};
