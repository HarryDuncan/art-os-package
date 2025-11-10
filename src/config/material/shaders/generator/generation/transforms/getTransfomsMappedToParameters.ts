import { EffectConfig, ShaderEffectConfig } from "../../../schema";
import { getTransformConfigForFunctionMappedParameter } from "./formatting/transformConfig";
import { functionInstantiation } from "../helpers/functionInstantiation";
import {
  ShaderParameter,
  ShaderParameterMap,
  ShaderTransformationConfig,
} from "../../types";
import { transformFunction } from "./formatting/transformFunction";

export const getTransformsMappedToParameters = (
  parameterMap: ShaderParameterMap,
  functionConfigs: EffectConfig[]
) => {
  const applicableParameters = functionConfigs.reduce((acc, config) => {
    const { outputMapping, guid } = config;
    Object.keys(outputMapping).forEach((key) => {
      const parameter = parameterMap.get(key);
      if (parameter) {
        acc[guid] = parameter;
      }
    });
    return acc;
  }, {} as Record<string, ShaderParameter>);

  const transformConfigs = Object.entries(applicableParameters).reduce(
    (acc, [guid, shaderParameter]) => {
      const functionConfig = functionConfigs.find(
        (config) => config.guid === guid
      );
      if (functionConfig) {
        const transformConfigs = getTransformConfigForFunctionMappedParameter(
          shaderParameter,
          functionConfig,
          parameterMap
        );
        console.log("transformConfigs", transformConfigs);
        if (transformConfigs) {
          acc.push(...transformConfigs);
        }
      }
      return acc;
    },
    [] as ShaderTransformationConfig[]
  );

  // TODO - fix up the way the ids are set - they are currently undefined because i'm setting a single guid

  const transformFunctions = transformFunction(transformConfigs, {
    guid: "effectId",
  } as unknown as ShaderEffectConfig);

  const transformInstantiations = transformFunctions.flatMap(
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

  return { transformInstantiations, transformFunctions };
};
