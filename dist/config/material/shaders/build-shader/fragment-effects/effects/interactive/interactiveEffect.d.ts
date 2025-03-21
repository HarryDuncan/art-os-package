import { InteractiveFragmentEffect } from "../../../types";
export declare const getInteractiveEffects: (effectProps: Partial<InteractiveFragmentEffect>) => {
    requiredFunctions: import("../../../types").ShaderFunction[];
    uniformConfig: import("../../../types").UniformConfig;
    transformation: string;
    varyingConfig: import("../../../types").VaryingConfig[];
    attributeConfig: import("../../../types").AttributeConfig[];
};
