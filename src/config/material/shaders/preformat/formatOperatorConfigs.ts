import { EffectConfig, OPERATOR_TYPES, OperatorConfig } from "../schema";

export const formatOperatorConfigs = (
  shaderEffectsConfigs: EffectConfig[],
  functionConfigs: EffectConfig[],
  operatorConfigs: OperatorConfig[],
) => {
  const includedShaderEffects = new Set<string>();
  const includedFunctionConfigs = new Set<string>();
  const v2OperatorConfigs = operatorConfigs.map((config) => {
    const outputIds = Object.values(config.outputMapping).map(
      (mapping) => mapping.itemId,
    );
    const shaderEffects = shaderEffectsConfigs.filter((effect) => {
      return outputIds.includes(effect.guid);
    });
    const shaderFunctions = functionConfigs.filter((functionConfig) => {
      return outputIds.includes(functionConfig.guid);
    });
    shaderFunctions.forEach((functionConfig) => {
      includedFunctionConfigs.add(functionConfig.guid);
    });
    shaderEffects.forEach((effect) => {
      includedShaderEffects.add(effect.guid);
    });
    const type = config.type || shaderFunctions[0]?.type;
    return { ...config, effects: [...shaderEffects, ...shaderFunctions], type };
  });

  const excludedShaderEffects = shaderEffectsConfigs.filter((effect) => {
    return !includedShaderEffects.has(effect.guid);
  });
  const defaultOperatorConfigs = excludedShaderEffects.map((effect) => {
    return {
      guid: effect.guid,
      schemaId: OPERATOR_TYPES.DEFAULT,
      effects: [effect],
      outputMapping: {},
      inputMapping: {},
      type: effect.type,
    };
  });
  return {
    operatorConfigs: [...v2OperatorConfigs, ...defaultOperatorConfigs],
    includedFunctionConfigs,
    includedShaderEffects,
  };
};
