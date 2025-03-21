"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IMAGE_AS_MASK_ATTRIBUTE_CONFIG = exports.IMAGE_AS_MASK_REQUIRED_FUNCTIONS = exports.IMAGE_AS_MASK_VARYING_CONFIG = exports.IMAGE_AS_MASK_UNIFORM_CONFIG = exports.DEFAULT_IMAGE_AS_MASK_EFFECT_PROPS = void 0;
const vertexEffects_consts_1 = require("../../../../vertexEffects.consts");
exports.DEFAULT_IMAGE_AS_MASK_EFFECT_PROPS = {
    declareInTransform: true,
    effectType: vertexEffects_consts_1.IMAGE_VERTEX_EFFECT.IMAGE_AS_MASK,
    removedColors: ["#ffffff"],
};
exports.IMAGE_AS_MASK_UNIFORM_CONFIG = {
    defaultUniforms: [],
    customUniforms: [],
};
exports.IMAGE_AS_MASK_VARYING_CONFIG = [];
exports.IMAGE_AS_MASK_REQUIRED_FUNCTIONS = [];
exports.IMAGE_AS_MASK_ATTRIBUTE_CONFIG = [];
