import { AttributeConfig, InteractiveEffectProps, UniformConfig, VaryingConfig } from "../../../types";
export declare const interactiveEffect: (effectProps: InteractiveEffectProps) => {
    requiredFunctions: import("../../../types").ShaderFunction[];
    uniformConfig: UniformConfig;
    attributeConfig: AttributeConfig[];
    transformation: string;
    varyingConfig: VaryingConfig[];
};
