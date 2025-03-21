"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatBuiltShaderConfig = void 0;
const formatParsedUniformConfigs_1 = require("../build-shader/shader-properties/uniforms/formatParsedUniformConfigs");
const uniforms_consts_1 = require("../build-shader/shader-properties/uniforms/uniforms.consts");
const formatBuiltShaderConfig = (parsedConfig) => {
    const { vertexEffectConfigs, fragmentEffectConfigs, uniformConfig, varyingConfig, attributeConfig, } = parsedConfig;
    return {
        vertexEffectConfigs: vertexEffectConfigs !== null && vertexEffectConfigs !== void 0 ? vertexEffectConfigs : [],
        fragmentEffectConfigs: fragmentEffectConfigs !== null && fragmentEffectConfigs !== void 0 ? fragmentEffectConfigs : [],
        uniformConfig: uniformConfig
            ? (0, formatParsedUniformConfigs_1.formatParsedUniformConfigs)(uniformConfig)
            : uniforms_consts_1.EMPTY_UNIFORM_CONFIG,
        attributeConfig: attributeConfig !== null && attributeConfig !== void 0 ? attributeConfig : [],
        varyingConfig: varyingConfig !== null && varyingConfig !== void 0 ? varyingConfig : [],
    };
};
exports.formatBuiltShaderConfig = formatBuiltShaderConfig;
