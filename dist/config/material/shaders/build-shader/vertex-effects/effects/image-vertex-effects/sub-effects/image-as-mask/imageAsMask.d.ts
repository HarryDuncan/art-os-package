import { AttributeConfig, ImageToPointsEffectProps, ShaderFunction, VaryingConfig } from "../../../../../types";
export declare const imageAsMask: (effectProps: Partial<ImageToPointsEffectProps>) => {
    requiredFunctions: ShaderFunction[];
    uniformConfig: import("../../../../../types").UniformConfig;
    attributeConfig: AttributeConfig[];
    transformation: string;
    varyingConfig: VaryingConfig[];
};
