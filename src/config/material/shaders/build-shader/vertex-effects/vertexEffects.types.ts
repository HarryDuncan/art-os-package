import {
  AttributeConfig,
  ShaderFunction,
  StructConfig,
  UniformConfig,
  VaryingConfig,
} from "../types";

export interface VertexEffectData {
  requiredFunctions: ShaderFunction[];
  uniformConfig: UniformConfig;
  varyingConfig: VaryingConfig[];
  transformation: string;
  pointName: string;
  attributeConfig: AttributeConfig[];
  vertexPointInstantiation?: string;
  structConfigs?: StructConfig[];
}

export type MorphObject = {
  pointName: string;
  normalName: string;
};
