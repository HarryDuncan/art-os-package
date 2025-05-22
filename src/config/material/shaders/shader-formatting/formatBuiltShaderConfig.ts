import { BuiltShaderConfig } from "../../../../types/materials/index";

export const formatBuiltShaderConfig = (
  parsedConfig: Partial<BuiltShaderConfig>
): BuiltShaderConfig => {
  const { shaderEffectConfigs, uniformConfig, varyingConfig, attributeConfig } =
    parsedConfig;
  return {
    shaderEffectConfigs: shaderEffectConfigs ?? [],
    uniformConfig: uniformConfig ?? [],
    attributeConfig: attributeConfig ?? [],
    varyingConfig: varyingConfig ?? [],
  };
};
