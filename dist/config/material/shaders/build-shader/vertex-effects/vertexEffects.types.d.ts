import { AttributeConfig, ShaderFunction, StructConfig, UniformConfig, VaryingConfig } from "../types";
export interface VertexEffectData {
    requiredFunctions: ShaderFunction[];
    uniformConfig: UniformConfig;
    varyingConfig: VaryingConfig[];
    transformation: string;
    attributeConfig: AttributeConfig[];
    structConfigs?: StructConfig[];
}
export type MorphObject = {
    pointName: string;
    normalName: string;
};
