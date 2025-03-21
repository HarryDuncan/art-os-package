"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fragmentEffectToEffectData = void 0;
const uniforms_consts_1 = require("../shader-properties/uniforms/uniforms.consts");
const fragmentEffectToEffectData = (effect) => {
    const { attributeConfig, requiredFunctions, transformation, uniformConfig, varyingConfig, } = effect;
    return {
        effectAttributes: attributeConfig !== null && attributeConfig !== void 0 ? attributeConfig : [],
        effectTransform: transformation,
        effectRequiredFunctions: requiredFunctions !== null && requiredFunctions !== void 0 ? requiredFunctions : [],
        effectUniforms: uniformConfig !== null && uniformConfig !== void 0 ? uniformConfig : uniforms_consts_1.EMPTY_UNIFORM_CONFIG,
        effectVaryings: varyingConfig !== null && varyingConfig !== void 0 ? varyingConfig : [],
    };
};
exports.fragmentEffectToEffectData = fragmentEffectToEffectData;
