import { formatParsedUniformConfigs } from "../build-shader/shader-properties/uniforms/formatParsedUniformConfigs";
import { EMPTY_UNIFORM_CONFIG } from "../build-shader/shader-properties/uniforms/uniforms.consts";
import { BuiltShaderConfig } from "../build-shader/types";

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
    uniformConfig: uniformConfig
      ? formatParsedUniformConfigs(uniformConfig)
      : EMPTY_UNIFORM_CONFIG,
    attributeConfig: attributeConfig ?? [],
    varyingConfig: varyingConfig ?? [],
  };
};
