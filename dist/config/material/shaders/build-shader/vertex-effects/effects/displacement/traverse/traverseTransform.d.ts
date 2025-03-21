import { VaryingConfig } from "../../../../types";
import { VertexEffectData } from "../../../vertexEffects.types";
export declare const distortFunctions: () => {
    id: string;
    functionDefinition: string;
}[];
export declare const distortUniforms: () => {
    defaultUniforms: any[];
    customUniforms: {
        id: string;
        valueType: string;
        value: number;
    }[];
};
export declare const distortVaryings: () => VaryingConfig[];
export declare const traverseTransform: () => VertexEffectData;
export declare const traverseDownTransform: () => string;
