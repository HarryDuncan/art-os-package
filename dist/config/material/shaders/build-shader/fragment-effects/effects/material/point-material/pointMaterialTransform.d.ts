import { PointMaterialFragmentEffectProps } from "../../../../types";
export declare const pointMaterialTransform: (pointEffectProps: PointMaterialFragmentEffectProps) => {
    transform: string;
    effectAttributes: import("../../../../types").AttributeConfig[];
    effectRequiredFunctions: import("../../../../types").ShaderFunction[];
    effectVaryings: import("../../../../types").VaryingConfig[];
    effectUniforms: import("../../../../types").UniformConfig;
};
