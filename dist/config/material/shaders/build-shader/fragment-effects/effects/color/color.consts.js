"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_COLOR_VARYINGS = exports.DEFAULT_COLOR_UNIFORMS = exports.DEFAULT_COLOR_FUNCTIONS = exports.DEFAULT_COLOR_EFFECT_PROPS = void 0;
const three_1 = require("three");
const constants_1 = require("../../../constants");
exports.DEFAULT_COLOR_EFFECT_PROPS = {};
exports.DEFAULT_COLOR_FUNCTIONS = [];
exports.DEFAULT_COLOR_UNIFORMS = {
    defaultUniforms: [],
    customUniforms: [
        {
            id: "uColor",
            valueType: constants_1.ShaderPropertyValueTypes.VEC3,
            value: new three_1.Vector3(0, 0, 0),
        },
    ],
};
exports.DEFAULT_COLOR_VARYINGS = [];
