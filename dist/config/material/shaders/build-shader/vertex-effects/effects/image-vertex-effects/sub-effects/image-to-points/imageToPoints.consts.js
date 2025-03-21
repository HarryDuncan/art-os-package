"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IMAGE_TO_POINTS_ATTRIBUTE_CONFIG = exports.IMAGE_TO_POINTS_REQUIRED_FUNCTIONS = exports.IMAGE_TO_POINTS_VARYING_CONFIG = exports.IMAGE_TO_POINTS_UNIFORM_CONFIG = exports.DEFAULT_IMAGE_TO_POINTS_EFFECT_PROPS = void 0;
const vertexEffects_consts_1 = require("../../../../vertexEffects.consts");
exports.DEFAULT_IMAGE_TO_POINTS_EFFECT_PROPS = {
    declareInTransform: true,
    effectType: vertexEffects_consts_1.IMAGE_VERTEX_EFFECT.IMAGE_TO_POINTS,
    effectProps: {},
};
exports.IMAGE_TO_POINTS_UNIFORM_CONFIG = {
    defaultUniforms: [],
    customUniforms: [],
};
exports.IMAGE_TO_POINTS_VARYING_CONFIG = [];
exports.IMAGE_TO_POINTS_REQUIRED_FUNCTIONS = [];
exports.IMAGE_TO_POINTS_ATTRIBUTE_CONFIG = [];
