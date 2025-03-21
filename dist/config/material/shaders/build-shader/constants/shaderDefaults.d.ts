import { ShaderPropertyValueTypes } from "./buildShader.consts";
export declare const DEFAULT_UNIFORMS: {
    uPosition: {
        valueType: ShaderPropertyValueTypes;
        defaultValue: any;
    };
    uResolution: {
        valueType: ShaderPropertyValueTypes;
        defaultValue: any;
    };
    uMaterial: {
        valueType: ShaderPropertyValueTypes;
        defaultValue: any;
    };
    uOpacity: {
        valueType: ShaderPropertyValueTypes;
        defaultValue: number;
    };
    uProgress: {
        valueType: ShaderPropertyValueTypes;
        defaultValue: number;
    };
    uBrightness: {
        valueType: ShaderPropertyValueTypes;
        defaultValue: number;
    };
    uStrength: {
        valueType: ShaderPropertyValueTypes;
        defaultValue: number;
    };
    uLoopCount: {
        valueType: ShaderPropertyValueTypes;
        defaultValue: number;
    };
    uCenter: {
        valueType: ShaderPropertyValueTypes;
        defaultValue: any;
    };
    uIsTriggered: {
        valueType: ShaderPropertyValueTypes;
        defaultValue: number;
    };
    uTextureSize: {
        valueType: ShaderPropertyValueTypes;
        defaultValue: any;
    };
};
export declare const DEFAULT_VARYINGS: {};
export declare const DEFAULT_VERTEX_EFFECT: {
    requiredFunctions: any[];
    uniformConfig: {
        defaultUniforms: any[];
        customUniforms: any[];
    };
    transformation: string;
    varyingConfig: any[];
    attributeConfig: any[];
    pointName: string;
};
