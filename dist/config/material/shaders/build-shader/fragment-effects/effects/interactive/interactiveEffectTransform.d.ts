import { InteractiveEffectProps } from "../../../types";
export declare const getInteractiveEffectTransform: (interactiveEffectProps: InteractiveEffectProps) => {
    uniformConfig: import("../../../types").UniformConfig;
    varyingConfig: import("../../../types").VaryingConfig[];
    transformation: string;
    requiredFunctions: import("../../../types").ShaderFunction[];
    attributeConfig: import("../../../types").AttributeConfig[];
};
