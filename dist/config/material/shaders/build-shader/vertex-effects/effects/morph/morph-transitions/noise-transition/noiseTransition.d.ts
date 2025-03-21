import { AttributeConfig, NoiseTransitionProps, ShaderFunction, VaryingConfig } from "../../../../../types";
export declare const noiseTransition: (effectProps: Partial<NoiseTransitionProps>) => {
    requiredFunctions: ShaderFunction[];
    uniformConfig: import("../../../../../types").UniformConfig;
    attributeConfig: AttributeConfig[];
    transformation: string;
    varyingConfig: VaryingConfig[];
};
