import { FragmentEffectConfig, ShaderFunction, StructConfig } from "../types";
export declare const setUpFragmentEffects: (fragmentEffects: FragmentEffectConfig[]) => {
    fragColor: string;
    varyingConfigs: import("../types").VaryingConfig[];
    uniformConfigs: import("../types").UniformConfig;
    transformations: string;
    attributeConfigs: import("../types").AttributeConfig[];
    requiredFunctions: ShaderFunction[];
    structConfigs: StructConfig[];
};
export declare const getFragmentColors: (fragmentEffects: FragmentEffectConfig[]) => {
    varyingConfigs: import("../types").VaryingConfig[];
    uniformConfigs: import("../types").UniformConfig;
    transformations: string;
    attributeConfigs: import("../types").AttributeConfig[];
    requiredFunctions: ShaderFunction[];
    structConfigs: StructConfig[];
};
