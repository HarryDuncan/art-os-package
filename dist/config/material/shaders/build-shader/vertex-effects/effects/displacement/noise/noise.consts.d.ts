import { UniformConfig } from "../../../../types";
export declare const NOISE_EFFECT_TYPES: {
    PERLIN: string;
    NORMAL: string;
    VORONOI: string;
};
export declare const NOISE_UNIFORMS: {
    defaultUniforms: any[];
    customUniforms: {
        id: string;
        valueType: string;
        value: number;
    }[];
};
export declare const VORONOI_UNIFORMS: UniformConfig;
export declare const NOISE_VARYINGS: {
    id: string;
    valueType: string;
    varyingType: string;
}[];
export declare const DEFAULT_NOISE_PARAMETERS: {
    noiseType: string;
    effectStrength: number;
};
export declare const NOISE_FUNCTIONS: {
    id: string;
    functionDefinition: string;
}[];
