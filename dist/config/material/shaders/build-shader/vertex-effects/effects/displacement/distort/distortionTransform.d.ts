import { DistortionEffectProps } from "../../../../types";
export declare const distortionTransform: (distortEffectProps: DistortionEffectProps) => {
    transformation: string;
    uniformConfig: import("../../../../types").UniformConfig;
    requiredFunctions: import("../../../../types").ShaderFunction[];
    varyingConfig: import("../../../../types").VaryingConfig[];
};
