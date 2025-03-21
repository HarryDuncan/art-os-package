import { Vector2, Vector3 } from "three";
import { ShaderPropertyValueTypes } from "./buildShader.consts";
import { EMPTY_UNIFORM_CONFIG } from "../shader-properties/uniforms/uniforms.consts";
export const DEFAULT_UNIFORMS = {
    uPosition: {
        valueType: ShaderPropertyValueTypes.VEC3,
        defaultValue: new Vector3(0, 0, 0),
    },
    uResolution: {
        valueType: ShaderPropertyValueTypes.VEC2,
        defaultValue: new Vector2(0, 0),
    },
    uMaterial: {
        valueType: ShaderPropertyValueTypes.SAMPLER2D,
        defaultValue: null,
    },
    uOpacity: {
        valueType: ShaderPropertyValueTypes.FLOAT,
        defaultValue: 1.0,
    },
    uProgress: {
        valueType: ShaderPropertyValueTypes.FLOAT,
        defaultValue: 0.0,
    },
    uBrightness: {
        valueType: ShaderPropertyValueTypes.FLOAT,
        defaultValue: 1.0,
    },
    uStrength: {
        valueType: ShaderPropertyValueTypes.FLOAT,
        defaultValue: 8.0,
    },
    uLoopCount: {
        valueType: ShaderPropertyValueTypes.INT,
        defaultValue: 0,
    },
    uCenter: {
        valueType: ShaderPropertyValueTypes.VEC3,
        defaultValue: new Vector3(0, 0, 0),
    },
    uIsTriggered: {
        valueType: ShaderPropertyValueTypes.FLOAT,
        defaultValue: 0.0,
    },
    uTextureSize: {
        valueType: ShaderPropertyValueTypes.VEC2,
        defaultValue: new Vector3(0, 0),
    },
};
export const DEFAULT_VARYINGS = {};
export const DEFAULT_VERTEX_EFFECT = {
    requiredFunctions: [],
    uniformConfig: EMPTY_UNIFORM_CONFIG,
    transformation: "",
    varyingConfig: [],
    attributeConfig: [],
    pointName: "",
};
