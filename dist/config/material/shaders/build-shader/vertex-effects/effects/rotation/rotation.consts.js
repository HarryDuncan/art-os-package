"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROTATION_EFFECT_TYPES = exports.DEFAULT_ROTATION_EFFECT_CONFIG = exports.ROTATION_ATTRIBUTES = exports.ROTATION_VARYINGS = exports.ROTATION_FUNCTIONS = exports.ROTATION_UNIFORMS = void 0;
const position_types_1 = require("../../../../../../../utils/three-dimension-space/position/position.types");
const buildShader_consts_1 = require("../../../constants/buildShader.consts");
exports.ROTATION_UNIFORMS = {
    defaultUniforms: [],
    customUniforms: [
        {
            id: "uRotationSpeed",
            valueType: buildShader_consts_1.ShaderPropertyValueTypes.FLOAT,
        },
    ],
};
exports.ROTATION_FUNCTIONS = [];
exports.ROTATION_VARYINGS = [];
exports.ROTATION_ATTRIBUTES = [];
exports.DEFAULT_ROTATION_EFFECT_CONFIG = {
    axis: position_types_1.AXIS.Y,
    speed: 0.2,
};
exports.ROTATION_EFFECT_TYPES = {
    ROTATION_BY_TIME: "ROTATION_BY_TIME",
    ROTATION_BY_DEGREES: "ROTATION_BY_DEGREES",
};
