import { ShaderPropertyValueTypes } from "../../../constants/buildShader.consts";
export declare const ROTATION_UNIFORMS: {
    defaultUniforms: any[];
    customUniforms: {
        id: string;
        valueType: ShaderPropertyValueTypes;
    }[];
};
export declare const ROTATION_FUNCTIONS: any[];
export declare const ROTATION_VARYINGS: any[];
export declare const ROTATION_ATTRIBUTES: any[];
export declare const DEFAULT_ROTATION_EFFECT_CONFIG: {
    axis: string;
    speed: number;
};
export declare const ROTATION_EFFECT_TYPES: {
    ROTATION_BY_TIME: string;
    ROTATION_BY_DEGREES: string;
};
