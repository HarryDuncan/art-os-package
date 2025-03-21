"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POINT_PARENTS = exports.FRAG_COLOR_INSTANTIATION = exports.MAIN_END = exports.VERTEX_NORMAL_INSTANTIATION = exports.VERTEX_POINT_INSTANTIATION = exports.MAIN_START = exports.ShaderPropertyTypes = exports.ShaderPropertyValueTypes = void 0;
const fragmentEffects_consts_1 = require("../fragment-effects/fragmentEffects.consts");
const vertexEffects_consts_1 = require("../vertex-effects/vertexEffects.consts");
var ShaderPropertyValueTypes;
(function (ShaderPropertyValueTypes) {
    ShaderPropertyValueTypes["INT"] = "INT";
    ShaderPropertyValueTypes["FLOAT"] = "FLOAT";
    ShaderPropertyValueTypes["BOOL"] = "BOOL";
    ShaderPropertyValueTypes["VEC2"] = "VEC2";
    ShaderPropertyValueTypes["VEC3"] = "VEC3";
    ShaderPropertyValueTypes["VEC4"] = "VEC4";
    ShaderPropertyValueTypes["MAT2"] = "MAT2";
    ShaderPropertyValueTypes["MAT3"] = "MAT3";
    ShaderPropertyValueTypes["MAT4"] = "MAT4";
    ShaderPropertyValueTypes["SAMPLER2D"] = "SAMPLER2D";
    ShaderPropertyValueTypes["SAMPLER_CUBE"] = "SAMPLER_CUBE";
    ShaderPropertyValueTypes["VOID"] = "VOID";
    ShaderPropertyValueTypes["CONST"] = "CONST";
    ShaderPropertyValueTypes["STRUCT"] = "STRUCT";
})(ShaderPropertyValueTypes = exports.ShaderPropertyValueTypes || (exports.ShaderPropertyValueTypes = {}));
var ShaderPropertyTypes;
(function (ShaderPropertyTypes) {
    ShaderPropertyTypes["UNIFORM"] = "UNIFORM";
    ShaderPropertyTypes["VARYING"] = "VARYING";
    ShaderPropertyTypes["ATTRIBUTE"] = "ATTRIBUTE";
})(ShaderPropertyTypes = exports.ShaderPropertyTypes || (exports.ShaderPropertyTypes = {}));
exports.MAIN_START = `void main() { `;
exports.VERTEX_POINT_INSTANTIATION = `vec4 ${vertexEffects_consts_1.VERTEX_POINT_NAME} = vec4(position.xyz, 1.0);`;
exports.VERTEX_NORMAL_INSTANTIATION = `vec4 ${vertexEffects_consts_1.VERTEX_NORMAL_NAME} = vec4(normal.xyz, 1.0);`;
exports.MAIN_END = "}";
exports.FRAG_COLOR_INSTANTIATION = `vec4 ${fragmentEffects_consts_1.FRAG_COLOR_NAME} = vec4(1.0,0,0,1.0);`;
exports.POINT_PARENTS = {
    INTERACTIVE: "INTERACTIVE",
    TRIGGERED: "TRIGGERED",
    IMAGE_EFFECT: "IMAGE_EFFECT",
    TRANSITION: "TRANSITION",
    MORPH_TRANSITION: "MORPH_TRANSITION",
};
