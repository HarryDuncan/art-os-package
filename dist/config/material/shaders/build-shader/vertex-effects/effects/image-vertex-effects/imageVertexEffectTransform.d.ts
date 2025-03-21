import { ImageVertexEffect } from "../../../types";
export declare const imageVertexEffectTransform: (imageVertexEffectProps: ImageVertexEffect) => {
    transformation: string;
    effectUniforms: import("../../../types").UniformConfig;
    effectVaryings: import("../../../types").VaryingConfig[];
    effectFunctions: import("../../../types").ShaderFunction[];
    effectAttributes: import("../../../types").AttributeConfig[];
};
