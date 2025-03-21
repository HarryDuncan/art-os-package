"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pointsVertex = void 0;
const points_consts_1 = require("./points.consts");
const formatVertexParameters_1 = require("../../../helpers/formatVertexParameters");
const pointsTransform_1 = require("./pointsTransform");
const pointsVertex = (effectProps = {}) => {
    const formattedEffectProps = (0, formatVertexParameters_1.formatVertexParameters)(effectProps, points_consts_1.DEFAULT_POINT_EFFECT_CONFIG);
    const uniformConfig = points_consts_1.POINTS_UNIFORMS;
    const requiredFunctions = points_consts_1.POINTS_FUNCTIONS;
    const varyingConfig = points_consts_1.POINTS_VARYINGS;
    const attributeConfig = points_consts_1.POINTS_ATTRIBUTES;
    const transformation = (0, pointsTransform_1.pointsTransform)(formattedEffectProps);
    return {
        requiredFunctions,
        uniformConfig,
        transformation,
        varyingConfig,
        attributeConfig,
    };
};
exports.pointsVertex = pointsVertex;
