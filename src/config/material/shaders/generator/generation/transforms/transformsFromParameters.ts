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
  console.log("functionParameters", functionParameters);
  const transformConfigs = functionParameters.flatMap((item) => {
    return transformationConfigFromFunctionParameter(item, parameterMap) ?? [];
  });
  console.log("transformConfigs", transformConfigs);
  const transformFunctions = transformFunction(transformConfigs, {
    id: "effectId",
  } as unknown as ShaderEffectConfig);
  console.log("transformFunctions", transformFunctions);

  const functionInstantiations = transformFunctions.flatMap(
    ({ outputConfig, functionName, inputMap }) => {
      return functionInstantiation(
        outputConfig,
        functionName,
        inputMap,
        "effectId"
      );
    }
  );

  return { functionInstantiations, transformFunctions };
};
