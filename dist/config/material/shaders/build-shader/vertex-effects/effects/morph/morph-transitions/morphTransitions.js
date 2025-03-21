import { noiseTransition } from "./noise-transition/noiseTransition";
export const morphTransitions = (transitionConfig) => {
    const { requiredFunctions, uniformConfig, attributeConfig, transformation, varyingConfig, } = noiseTransition(transitionConfig);
    return {
        requiredFunctions,
        uniformConfig,
        attributeConfig,
        transformation,
        varyingConfig,
    };
};
