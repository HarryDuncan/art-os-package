import { AttributeConfig, ImageVertexEffect, ShaderFunction } from "../../../types";
export declare const imageVertexEffect: (effectProps: Partial<ImageVertexEffect>) => {
    requiredFunctions: ShaderFunction[];
    uniformConfig: import("../../../types").UniformConfig;
    attributeConfig: AttributeConfig[];
    transformation: string;
    varyingConfig: import("../../../types").VaryingConfig[];
};
