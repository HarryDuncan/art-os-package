"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatVertexParameters = void 0;
const vertexEffects_consts_1 = require("../vertex-effects/vertexEffects.consts");
const formatVertexParameters = (parsedEffectProps, defaultEffectProps) => {
    return Object.assign(Object.assign(Object.assign({}, vertexEffects_consts_1.DEFAULT_VERTEX_EFFECT_PARAMS), defaultEffectProps), parsedEffectProps);
};
exports.formatVertexParameters = formatVertexParameters;
