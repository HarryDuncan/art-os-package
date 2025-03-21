import { PointMaterialFragmentEffectProps, UniformConfig } from "../../../../types";
export declare const pointMaterial: (effectProps?: Partial<PointMaterialFragmentEffectProps>) => {
    requiredFunctions: import("../../../../types").ShaderFunction[];
    uniformConfig: UniformConfig;
    transformation: string;
    varyingConfig: import("../../../../types").VaryingConfig[];
    attributeConfig: import("../../../../types").AttributeConfig[];
};
