"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noise = void 0;
const formatVertexParameters_1 = require("../../../../helpers/formatVertexParameters");
const noise_consts_1 = require("./noise.consts");
const noiseTransform_1 = require("./noiseTransform");
const noise = (effectProps) => {
    const noiseEffectProps = (0, formatVertexParameters_1.formatVertexParameters)(effectProps !== null && effectProps !== void 0 ? effectProps : {}, noise_consts_1.DEFAULT_NOISE_PARAMETERS);
    const varyingConfig = noise_consts_1.NOISE_VARYINGS;
    const { transformation, requiredFunctions, uniformConfig } = (0, noiseTransform_1.noiseTransform)(noiseEffectProps);
    const attributeConfig = [];
    return {
        attributeConfig,
        requiredFunctions,
        // @ts-ignore
        uniformConfig,
        transformation,
        varyingConfig,
    };
};
exports.noise = noise;
