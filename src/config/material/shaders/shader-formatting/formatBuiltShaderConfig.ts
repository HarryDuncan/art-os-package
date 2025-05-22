import { BuiltShaderConfig } from "../../../../types/materials/index";

export const formatBuiltShaderConfig = (
  parsedConfig: Partial<BuiltShaderConfig>
): BuiltShaderConfig => {
  const {
    vertexEffectConfigs,
    fragmentEffectConfigs,
    uniformConfig,
    varyingConfig,
    attributeConfig,
  } = parsedConfig;
  return {
    vertexEffectConfigs: vertexEffectConfigs ?? [],
    fragmentEffectConfigs: fragmentEffectConfigs ?? [],
    uniformConfig: uniformConfig ?? [],
    attributeConfig: attributeConfig ?? [],
    varyingConfig: varyingConfig ?? [],
  };
};
