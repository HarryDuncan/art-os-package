import { VertexEffectData } from "../../vertexEffects.types";
export declare const vertexFilterFunctions: () => any[];
export declare const vertexFilterUniforms: () => {
    defaultUniforms: any[];
    customUniforms: {
        id: string;
        valueType: string;
        value: number;
    }[];
};
export declare const vertexFilterVaryings: () => any[];
export declare const vertexFilter: () => VertexEffectData;
