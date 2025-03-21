import { formatParsedUniformConfigs } from "../build-shader/shader-properties/uniforms/formatParsedUniformConfigs";
import { EMPTY_UNIFORM_CONFIG } from "../build-shader/shader-properties/uniforms/uniforms.consts";
export const formatBuiltShaderConfig = (parsedConfig) => {
    const { vertexEffectConfigs, fragmentEffectConfigs, uniformConfig, varyingConfig, attributeConfig, } = parsedConfig;
    return {
        vertexEffectConfigs: vertexEffectConfigs !== null && vertexEffectConfigs !== void 0 ? vertexEffectConfigs : [],
        fragmentEffectConfigs: fragmentEffectConfigs !== null && fragmentEffectConfigs !== void 0 ? fragmentEffectConfigs : [],
        uniformConfig: uniformConfig
            ? formatParsedUniformConfigs(uniformConfig)
            : EMPTY_UNIFORM_CONFIG,
        attributeConfig: attributeConfig !== null && attributeConfig !== void 0 ? attributeConfig : [],
        varyingConfig: varyingConfig !== null && varyingConfig !== void 0 ? varyingConfig : [],
    };
};
