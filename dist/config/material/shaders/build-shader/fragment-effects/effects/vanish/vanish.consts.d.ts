import { ShaderPropertyValueTypes } from "../../../constants/buildShader.consts";
import { UniformConfig } from "../../../types";
export declare const VANISH_FUNCTIONS: {
    id: string;
    functionDefinition: string;
}[];
export declare const VANISH_UNIFORMS: UniformConfig;
export declare const VANISH_VARYINGS: {
    id: string;
    varyingType: string;
    valueType: ShaderPropertyValueTypes;
}[];
export declare const VANISH_ATTRIBUTES: any[];
export declare const DEFAULT_VANISH_EFFECT_PARAMS: {
    vanishHeight: number;
};
