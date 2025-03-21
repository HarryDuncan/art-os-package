import { EMPTY_UNIFORM_CONFIG } from "../shader-properties/uniforms/uniforms.consts";
export const fragmentEffectToEffectData = (effect) => {
    const { attributeConfig, requiredFunctions, transformation, uniformConfig, varyingConfig, } = effect;
    return {
        effectAttributes: attributeConfig !== null && attributeConfig !== void 0 ? attributeConfig : [],
        effectTransform: transformation,
        effectRequiredFunctions: requiredFunctions !== null && requiredFunctions !== void 0 ? requiredFunctions : [],
        effectUniforms: uniformConfig !== null && uniformConfig !== void 0 ? uniformConfig : EMPTY_UNIFORM_CONFIG,
        effectVaryings: varyingConfig !== null && varyingConfig !== void 0 ? varyingConfig : [],
    };
};
