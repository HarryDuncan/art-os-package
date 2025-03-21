import { AttributeConfig, ShaderFunction, TriggeredVertexEffect } from "../../../types";
export declare const triggeredEffect: (effectProps: TriggeredVertexEffect) => {
    requiredFunctions: ShaderFunction[];
    uniformConfig: import("../../../types").UniformConfig;
    attributeConfig: AttributeConfig[];
    transformation: string;
    varyingConfig: import("../../../types").VaryingConfig[];
};
