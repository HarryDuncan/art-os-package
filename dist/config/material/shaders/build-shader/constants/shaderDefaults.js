"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_VERTEX_EFFECT = exports.DEFAULT_VARYINGS = exports.DEFAULT_UNIFORMS = void 0;
const three_1 = require("three");
const buildShader_consts_1 = require("./buildShader.consts");
const uniforms_consts_1 = require("../shader-properties/uniforms/uniforms.consts");
exports.DEFAULT_UNIFORMS = {
    uPosition: {
        valueType: buildShader_consts_1.ShaderPropertyValueTypes.VEC3,
        defaultValue: new three_1.Vector3(0, 0, 0),
    },
    uResolution: {
        valueType: buildShader_consts_1.ShaderPropertyValueTypes.VEC2,
        defaultValue: new three_1.Vector2(0, 0),
    },
    uMaterial: {
        valueType: buildShader_consts_1.ShaderPropertyValueTypes.SAMPLER2D,
        defaultValue: null,
    },
    uOpacity: {
        valueType: buildShader_consts_1.ShaderPropertyValueTypes.FLOAT,
        defaultValue: 1.0,
    },
    uProgress: {
        valueType: buildShader_consts_1.ShaderPropertyValueTypes.FLOAT,
        defaultValue: 0.0,
    },
    uBrightness: {
        valueType: buildShader_consts_1.ShaderPropertyValueTypes.FLOAT,
        defaultValue: 1.0,
    },
    uStrength: {
        valueType: buildShader_consts_1.ShaderPropertyValueTypes.FLOAT,
        defaultValue: 8.0,
    },
    uLoopCount: {
        valueType: buildShader_consts_1.ShaderPropertyValueTypes.INT,
        defaultValue: 0,
    },
    uCenter: {
        valueType: buildShader_consts_1.ShaderPropertyValueTypes.VEC3,
        defaultValue: new three_1.Vector3(0, 0, 0),
    },
    uIsTriggered: {
        valueType: buildShader_consts_1.ShaderPropertyValueTypes.FLOAT,
        defaultValue: 0.0,
    },
    uTextureSize: {
        valueType: buildShader_consts_1.ShaderPropertyValueTypes.VEC2,
        defaultValue: new three_1.Vector3(0, 0),
    },
};
exports.DEFAULT_VARYINGS = {};
exports.DEFAULT_VERTEX_EFFECT = {
    requiredFunctions: [],
    uniformConfig: uniforms_consts_1.EMPTY_UNIFORM_CONFIG,
    transformation: "",
    varyingConfig: [],
    attributeConfig: [],
    pointName: "",
};
