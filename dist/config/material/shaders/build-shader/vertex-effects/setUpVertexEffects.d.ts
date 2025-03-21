import { AttributeConfig, ShaderFunction, StructConfig, UniformConfig, VaryingConfig, VertexEffectConfig } from "../types";
export declare const setUpVertexEffects: (vertexEffects: VertexEffectConfig[]) => {
    uniformConfigs: UniformConfig;
    varyingConfigs: VaryingConfig[];
    transformations: string;
    requiredFunctions: ShaderFunction[];
    viewMatrix: string;
    attributeConfigs: AttributeConfig[];
    structConfigs: StructConfig[];
};
