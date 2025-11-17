import { EffectConfig, ParameterConfig } from "../../../schema";
import { ConfiguredTransform, ShaderParameterMap } from "../../types";
import { configureTransform } from "./config-setup/configureTransform";
import { findKeyMatch } from "../../../utils";

export const getTransformsMappedToParameters = (
  assignedParameters: ParameterConfig[],
  parameterMap: ShaderParameterMap,
  functionConfigs: EffectConfig[]
): ConfiguredTransform[] => {
  const selectedFunctions = functionConfigs.flatMap((config) => {
    const { outputMapping } = config;
    const matches: EffectConfig[] = [];
    Object.keys(outputMapping).forEach((key) => {
      const parameterKey = findKeyMatch(key, parameterMap);
      const assignedParameter = assignedParameters.find(
        (p) => p.key === parameterKey
      );
      if (assignedParameter) {
        matches.push(config);
      }
    });
    return matches;
  });

  const configuredTransforms: ConfiguredTransform[] = selectedFunctions.flatMap(
    (functionConfig) => configureTransform(functionConfig, parameterMap)
  );
  return configuredTransforms;
};
