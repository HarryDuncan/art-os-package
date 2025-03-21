"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_TRIGGERED_EFFECT = exports.TRIGGERED_VARYING_CONFIG = exports.TRIGGERED_UNIFORM_CONFIG = void 0;
const buildShader_consts_1 = require("../../../constants/buildShader.consts");
const fragmentEffects_consts_1 = require("../../../fragment-effects/fragmentEffects.consts");
exports.TRIGGERED_UNIFORM_CONFIG = {
    defaultUniforms: ["uIsTriggered"],
    customUniforms: [],
};
exports.TRIGGERED_VARYING_CONFIG = [
    {
        id: "vTriggered",
        valueType: "FLOAT",
        varyingType: "CUSTOM",
        value: "isTriggered",
    },
];
exports.DEFAULT_TRIGGERED_EFFECT = {
    declareInTransform: false,
    pointParent: buildShader_consts_1.POINT_PARENTS.TRIGGERED,
    effectType: fragmentEffects_consts_1.TRIGGERED_FRAGMENT_EFFECT.EMPTY,
};
