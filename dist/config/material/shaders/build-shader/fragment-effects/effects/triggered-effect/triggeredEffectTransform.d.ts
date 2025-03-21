import { TriggeredFragmentEffect } from "../../../types";
export declare const triggeredEffectTransform: (effectProps: TriggeredFragmentEffect) => {
    effectUniforms: import("../../../types").UniformConfig;
    effectVaryings: import("../../../types").VaryingConfig[];
    effectFunctions: import("../../../types").ShaderFunction[];
    transformation: string;
    effectAttributes: import("../../../types").AttributeConfig[];
};
