import { EffectConfig, ParameterConfig } from "../../../schema";
import { ConfiguredTransform, ShaderParameterMap } from "../../types";
import { configureTransform } from "./config-setup/configureTransform";

export const getTransformsMappedToParameters = (
  assignedParameters: ParameterConfig[],
  parameterMap: ShaderParameterMap,
  functionConfigs: EffectConfig[]
): ConfiguredTransform[] => {
  const assignmentConfigs = functionConfigs.reduce((acc, config) => {
    const { outputMapping, guid } = config;
    Object.keys(outputMapping).forEach((key) => {
      const parameter = parameterMap.get(key);
      const assignedParameter = assignedParameters.find(
        (p) => p.guid === parameter?.guid
      );
      if (assignedParameter && parameter) {
        acc[guid] = parameter;
      }
    });
    return acc;
  }, {} as Record<string, ParameterConfig>);

  const configuredTransforms: ConfiguredTransform[] = Object.entries(
    assignmentConfigs
  ).flatMap(([guid, assignmentConfig]) => {
    const selectedEffect = functionConfigs.find(
      (config) => config.guid === guid
    );

    return selectedEffect
      ? configureTransform(selectedEffect, parameterMap)
      : [];
  });

  return configuredTransforms;
};
