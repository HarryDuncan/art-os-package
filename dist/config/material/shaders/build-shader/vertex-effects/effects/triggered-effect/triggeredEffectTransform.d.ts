import { TriggeredEffectProps } from "../../../types";
export declare const triggeredEffectTransform: (triggeredEffectProps: TriggeredEffectProps) => {
    transformation: string;
    effectUniforms: import("../../../types").UniformConfig;
    effectVaryings: import("../../../types").VaryingConfig[];
    effectFunctions: import("../../../types").ShaderFunction[];
    effectAttributes: import("../../../types").AttributeConfig[];
};
