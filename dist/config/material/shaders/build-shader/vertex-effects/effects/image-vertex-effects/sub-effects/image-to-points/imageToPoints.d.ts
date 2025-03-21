import { AttributeConfig, ImageToPointsEffectProps, ShaderFunction, VaryingConfig } from "../../../../../types";
export declare const imageToPoints: (effectProps: Partial<ImageToPointsEffectProps>) => {
    requiredFunctions: ShaderFunction[];
    uniformConfig: import("../../../../../types").UniformConfig;
    attributeConfig: AttributeConfig[];
    transformation: string;
    varyingConfig: VaryingConfig[];
};
