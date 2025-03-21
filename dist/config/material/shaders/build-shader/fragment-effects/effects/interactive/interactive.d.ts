import { InteractiveFragmentEffect } from "../../../types";
export declare const getInteractiveEffects: (transformName: string, effectProps: InteractiveFragmentEffect) => {
    requiredFunctions: import("../../../types").ShaderFunction[];
    uniformConfig: import("../../../types").UniformConfig;
    transformation: string;
    varyingConfig: import("../../../types").VaryingConfig[];
    attributeConfig: import("../../../types").AttributeConfig[];
};
