"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_MORPH_ATTRIBUTE_CONFIG = void 0;
const buildShader_consts_1 = require("../../../../config/material/shaders/build-shader/constants/buildShader.consts");
exports.DEFAULT_MORPH_ATTRIBUTE_CONFIG = [
    {
        id: "pointIndex",
        valueType: buildShader_consts_1.ShaderPropertyValueTypes.FLOAT,
    },
    {
        id: "randomAngle",
        valueType: buildShader_consts_1.ShaderPropertyValueTypes.FLOAT,
    },
    {
        id: "randomBool",
        valueType: buildShader_consts_1.ShaderPropertyValueTypes.FLOAT,
    },
    {
        id: "randomBool2",
        valueType: buildShader_consts_1.ShaderPropertyValueTypes.FLOAT,
    },
];
