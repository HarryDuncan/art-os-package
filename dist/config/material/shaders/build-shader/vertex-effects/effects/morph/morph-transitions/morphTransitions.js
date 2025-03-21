"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.morphTransitions = void 0;
const noiseTransition_1 = require("./noise-transition/noiseTransition");
const morphTransitions = (transitionConfig) => {
    const { requiredFunctions, uniformConfig, attributeConfig, transformation, varyingConfig, } = (0, noiseTransition_1.noiseTransition)(transitionConfig);
    return {
        requiredFunctions,
        uniformConfig,
        attributeConfig,
        transformation,
        varyingConfig,
    };
};
exports.morphTransitions = morphTransitions;
