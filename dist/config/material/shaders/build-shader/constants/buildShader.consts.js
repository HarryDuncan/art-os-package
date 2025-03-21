import { FRAG_COLOR_NAME } from "../fragment-effects/fragmentEffects.consts";
import { VERTEX_NORMAL_NAME, VERTEX_POINT_NAME, } from "../vertex-effects/vertexEffects.consts";
export var ShaderPropertyValueTypes;
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
})(ShaderPropertyValueTypes || (ShaderPropertyValueTypes = {}));
export var ShaderPropertyTypes;
(function (ShaderPropertyTypes) {
    ShaderPropertyTypes["UNIFORM"] = "UNIFORM";
    ShaderPropertyTypes["VARYING"] = "VARYING";
    ShaderPropertyTypes["ATTRIBUTE"] = "ATTRIBUTE";
})(ShaderPropertyTypes || (ShaderPropertyTypes = {}));
export const MAIN_START = `void main() { `;
export const VERTEX_POINT_INSTANTIATION = `vec4 ${VERTEX_POINT_NAME} = vec4(position.xyz, 1.0);`;
export const VERTEX_NORMAL_INSTANTIATION = `vec4 ${VERTEX_NORMAL_NAME} = vec4(normal.xyz, 1.0);`;
export const MAIN_END = "}";
export const FRAG_COLOR_INSTANTIATION = `vec4 ${FRAG_COLOR_NAME} = vec4(1.0,0,0,1.0);`;
export const POINT_PARENTS = {
    INTERACTIVE: "INTERACTIVE",
    TRIGGERED: "TRIGGERED",
    IMAGE_EFFECT: "IMAGE_EFFECT",
    TRANSITION: "TRANSITION",
    MORPH_TRANSITION: "MORPH_TRANSITION",
};
