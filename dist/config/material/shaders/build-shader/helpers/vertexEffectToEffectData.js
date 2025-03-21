import { EMPTY_UNIFORM_CONFIG } from "../shader-properties/uniforms/uniforms.consts";
export const vertexEffectToEffectData = (effect) => {
    const { attributeConfig, requiredFunctions, transformation, uniformConfig, varyingConfig, } = effect;
    return {
        transformation,
        attributeConfig: attributeConfig !== null && attributeConfig !== void 0 ? attributeConfig : [],
        requiredFunctions: requiredFunctions !== null && requiredFunctions !== void 0 ? requiredFunctions : [],
        uniformConfig: uniformConfig !== null && uniformConfig !== void 0 ? uniformConfig : EMPTY_UNIFORM_CONFIG,
        varyingConfig: varyingConfig !== null && varyingConfig !== void 0 ? varyingConfig : [],
    };
};
