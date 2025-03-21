import { FragmentEffectData } from "../types";
export declare const fragmentEffectToEffectData: (effect: Partial<FragmentEffectData>) => {
    effectAttributes: import("../types").AttributeConfig[];
    effectTransform: string;
    effectRequiredFunctions: import("../types").ShaderFunction[];
    effectUniforms: import("../types").UniformConfig | {
        defaultUniforms: any[];
        customUniforms: any[];
    };
    effectVaryings: import("../types").VaryingConfig[];
};
