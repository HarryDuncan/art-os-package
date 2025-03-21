import { AttributeConfig, NoiseTransitionProps } from "../../../../../types";
export declare const noiseTransitionTransform: (noiseTransitionProps: NoiseTransitionProps) => {
    transformation: string;
    effectUniforms: {
        defaultUniforms: any[];
        customUniforms: {
            id: string;
            valueType: string;
            value: number;
        }[];
    };
    effectVaryings: any[];
    VERTEX_POINT_NAME: string;
    effectFunctions: {
        id: string;
        functionDefinition: string;
    }[];
    effectAttributes: AttributeConfig[];
};
