import { TransitionConfig } from "../../../../types";
export declare const morphTransitions: (transitionConfig: TransitionConfig) => {
    requiredFunctions: import("../../../../types").ShaderFunction[];
    uniformConfig: import("../../../../types").UniformConfig;
    attributeConfig: import("../../../../types").AttributeConfig[];
    transformation: string;
    varyingConfig: import("../../../../types").VaryingConfig[];
};
