import { ShaderFunction, VaryingConfig } from "../../../../types";
export declare const EXPLODE_UNIFORMS: {
    defaultUniforms: string[];
    customUniforms: {
        id: string;
        valueType: string;
        value: number;
    }[];
};
export declare const EXPLODE_FUNCTIONS: ShaderFunction[];
export declare const EXPLODE_VARYINGS: VaryingConfig[];
export declare const DEFAULT_EXPLODE_PARAMETERS: {
    effectDistanceMinLength: number;
    effectStrength: number;
};
