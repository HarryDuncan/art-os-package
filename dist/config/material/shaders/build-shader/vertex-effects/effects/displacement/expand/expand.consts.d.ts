import { ShaderFunction, VaryingConfig } from "../../../../types";
export declare const EXPAND_UNIFORMS: {
    defaultUniforms: string[];
    customUniforms: {
        id: string;
        valueType: string;
        value: number;
    }[];
};
export declare const EXPAND_FUNCTIONS: ShaderFunction[];
export declare const EXPAND_VARYINGS: VaryingConfig[];
export declare const DEFAULT_EXPAND_PARAMETERS: {
    effectDistanceMinLength: number;
    effectStrength: number;
    maxEffectStrength: number;
    multiplier: number;
};
