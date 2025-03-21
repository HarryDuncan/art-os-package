"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vertexEffectToEffectData = void 0;
const uniforms_consts_1 = require("../shader-properties/uniforms/uniforms.consts");
const vertexEffectToEffectData = (effect) => {
    const { attributeConfig, requiredFunctions, transformation, uniformConfig, varyingConfig, } = effect;
    return {
        transformation,
        attributeConfig: attributeConfig !== null && attributeConfig !== void 0 ? attributeConfig : [],
        requiredFunctions: requiredFunctions !== null && requiredFunctions !== void 0 ? requiredFunctions : [],
        uniformConfig: uniformConfig !== null && uniformConfig !== void 0 ? uniformConfig : uniforms_consts_1.EMPTY_UNIFORM_CONFIG,
        varyingConfig: varyingConfig !== null && varyingConfig !== void 0 ? varyingConfig : [],
    };
};
exports.vertexEffectToEffectData = vertexEffectToEffectData;
