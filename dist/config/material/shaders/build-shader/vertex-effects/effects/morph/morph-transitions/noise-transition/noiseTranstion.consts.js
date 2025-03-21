"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NOISE_TRANSITION_ATTRIBUTE_CONFIG = exports.NOISE_TRANSITION_REQUIRED_FUNCTIONS = exports.NOISE_TRANSITION_VARYING_CONFIG = exports.NOISE_TRANSITION_UNIFORM_CONFIG = exports.DEFAULT_NOISE_TRANSITION_EFFECT_PROPS = void 0;
const vertexEffects_consts_1 = require("../../../../vertexEffects.consts");
exports.DEFAULT_NOISE_TRANSITION_EFFECT_PROPS = {
    effectType: vertexEffects_consts_1.MORPH_TRANSITION_EFFECTS.NOISE_TRANSITION,
    effectStrength: 1.0,
    noiseUniformName: "uNoiseStrength",
};
exports.NOISE_TRANSITION_UNIFORM_CONFIG = {
    defaultUniforms: [],
    customUniforms: [],
};
exports.NOISE_TRANSITION_VARYING_CONFIG = [];
exports.NOISE_TRANSITION_REQUIRED_FUNCTIONS = [];
exports.NOISE_TRANSITION_ATTRIBUTE_CONFIG = [];
