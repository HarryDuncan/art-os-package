import { VaryingConfig } from "../../../../types";
import { VertexEffectData } from "../../../vertexEffects.types";
export declare const distortFunctions: () => {
    id: string;
    functionDefinition: string;
}[];
export declare const distortUniforms: () => {
    defaultUniforms: string[];
    customUniforms: {
        id: string;
        valueType: string;
        value: number;
    }[];
};
export declare const distortVaryings: () => VaryingConfig[];
export declare const cloudEffect: () => VertexEffectData;
export declare const noiseCloudTransform: () => string;
export declare const cloudTransform: (VERTEX_POINT_NAME: string, pointName: string) => string;
