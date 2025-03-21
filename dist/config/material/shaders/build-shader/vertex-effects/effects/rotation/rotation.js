"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rotationEffect = void 0;
const formatVertexParameters_1 = require("../../../helpers/formatVertexParameters");
const rotation_consts_1 = require("./rotation.consts");
const rotationTransform_1 = require("./rotationTransform");
const rotationEffect = (effectProps = {}) => {
    const formattedProps = (0, formatVertexParameters_1.formatVertexParameters)(effectProps, rotation_consts_1.DEFAULT_ROTATION_EFFECT_CONFIG);
    const { uniformConfig, requiredFunctions, transformation } = (0, rotationTransform_1.rotationTransform)(formattedProps);
    return {
        requiredFunctions,
        uniformConfig,
        transformation,
        varyingConfig: rotation_consts_1.ROTATION_VARYINGS,
        attributeConfig: rotation_consts_1.ROTATION_ATTRIBUTES,
    };
};
exports.rotationEffect = rotationEffect;
