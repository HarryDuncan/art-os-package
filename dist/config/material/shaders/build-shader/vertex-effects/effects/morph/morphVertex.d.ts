import { MorphEffectProps, ShaderFunction } from "../../../types";
export declare const morphVertex: (effectProps?: Partial<MorphEffectProps> | undefined) => {
    requiredFunctions: ShaderFunction[];
    uniformConfig: import("../../../types").UniformConfig;
    transformation: string;
    attributeConfig: import("../../../types").AttributeConfig[];
    varyingConfig: import("../../../types").VaryingConfig[];
};
