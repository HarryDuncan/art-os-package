import { NoiseEffectProps, UniformConfig } from "../../../../types";
export declare const noiseTransform: (noiseParameters: NoiseEffectProps) => {
    transformation: string;
    requiredFunctions: {
        id: string;
        functionDefinition: string;
    }[] | {
        id: string;
        functionDefinition: string;
    }[];
    uniformConfig: {
        defaultUniforms: any[];
        customUniforms: {
            id: string;
            valueType: string;
            value: number;
        }[];
    } | UniformConfig;
};
export declare const noiseCloudTransform: (effectStrength: any) => string;
export declare const cloudTransform: (effectStrength: any) => string;
